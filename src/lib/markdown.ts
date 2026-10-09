import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolink from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { visit, SKIP } from "unist-util-visit";
import { toString as hastToString } from "hast-util-to-string";
import { asciiToMermaid } from "./ascii-to-mermaid";
import { cleanTitle, readChapterSource } from "./chapters";

export type TocItem = { id: string; text: string; level: 2 | 3 };
export type Rendered = { html: string; title: string; toc: TocItem[]; minutes: number; diagrams: number };

/* --------------------------------------------------------------- remark */

/** ```text blocks -> Mermaid diagrams / checklists. ```mermaid blocks pass straight through. */
function remarkCourse(stats: { diagrams: number }) {
  return (tree: any) => {
    visit(tree, "code", (node: any, index: number | undefined, parent: any) => {
      const lang = (node.lang || "").toLowerCase();

      if (lang === "mermaid") {
        node.data = { hProperties: { dataChart: node.value, dataKind: "manual" } };
        stats.diagrams++;
        return;
      }
      if (lang && lang !== "text" && lang !== "txt") return;

      // "✓ item" lists  ->  real checklist
      const lines = node.value.split("\n").filter((l: string) => l.trim());
      if (lines.length >= 3 && lines.every((l: string) => /^\s*✓\s+/.test(l)) && parent && index != null) {
        parent.children[index] = {
          type: "list",
          ordered: false,
          spread: false,
          data: { hProperties: { className: ["checklist"] } },
          children: lines.map((l: string) => ({
            type: "listItem",
            spread: false,
            children: [{ type: "paragraph", children: [{ type: "text", value: l.replace(/^\s*✓\s+/, "") }] }],
          })),
        };
        return SKIP;
      }

      const conv = asciiToMermaid(node.value);
      if (conv) {
        node.data = { hProperties: { dataChart: conv.code, dataKind: conv.kind } };
        stats.diagrams++;
      } else if (/[┌┐└┘├┤┬┴┼│↓↑▲▼►]|\+[-=]{2,}/.test(node.value) && /[─│↓↑▲▼►]/.test(node.value)) {
        node.data = { hProperties: { dataAscii: "true" } };
      }
    });
  };
}

/* --------------------------------------------------------------- rehype */

const LANG_LABEL: Record<string, string> = {
  java: "Java", bash: "Terminal", sh: "Terminal", shell: "Terminal", text: "Output", txt: "Output",
  xml: "XML", json: "JSON", sql: "SQL", properties: "Properties", yaml: "YAML", html: "HTML",
};

const el = (tagName: string, properties: any = {}, children: any[] = []) => ({ type: "element", tagName, properties, children });

/** Collect headings -> TOC, pull out the page title, demote h1->h2 etc. */
function rehypeHeadings(out: { title: string; toc: TocItem[] }) {
  return (tree: any) => {
    let titleTaken = false;
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (!/^h[1-6]$/.test(node.tagName)) return;
      const level = Number(node.tagName[1]);
      if (level === 1 && !titleTaken && parent && index != null) {
        titleTaken = true;
        out.title = cleanTitle(hastToString(node));
        parent.children.splice(index, 1);
        return [SKIP, index];
      }
      if (level <= 2) out.toc.push({ id: node.properties?.id, text: hastToString(node).trim(), level: (level + 1) as 2 | 3 });
    });
  };
}

function rehypeDemote() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      const m = /^h([1-5])$/.exec(node.tagName);
      if (m) node.tagName = `h${Number(m[1]) + 1}`;
    });
  };
}

/** Wrap <pre><code> in a titled frame; turn diagram blocks into mermaid containers. */
function rehypeBlocks() {
  return (tree: any) => {
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== "pre" || !parent || index == null) return;
      const code = node.children?.find((c: any) => c.type === "element" && c.tagName === "code");
      if (!code) return;
      const props = code.properties || {};
      const classes: string[] = (props.className as string[]) || [];
      const lang = (classes.find((c) => c.startsWith("language-")) || "").replace("language-", "") || "text";

      if (props.dataChart) {
        const chart = props.dataChart;
        const kind = props.dataKind;
        delete props.dataChart;
        delete props.dataKind;
        parent.children[index] = el("div", { className: ["mermaid-block"], dataChart: chart, dataKind: kind }, [
          el("pre", { className: ["ascii-fallback"] }, [code]),
        ]);
        return SKIP;
      }

      const isAscii = props.dataAscii === "true";
      delete props.dataAscii;
      const label = isAscii ? "Diagram" : LANG_LABEL[lang] || lang;
      parent.children[index] = el("div", { className: ["codeblock"], dataLang: isAscii ? "diagram" : lang }, [
        el("div", { className: ["codeblock-bar"] }, [
          el("span", { className: ["codeblock-lang"] }, [{ type: "text", value: label }]),
          el("button", { className: ["copy-btn"], type: "button", ariaLabel: "Copy code" }, [{ type: "text", value: "Copy" }]),
        ]),
        node,
      ]);
      return SKIP;
    });
  };
}

/* ----------------------------------------------------------------- main */

export async function renderMarkdown(src: string): Promise<Rendered> {
  const stats = { diagrams: 0 };
  const heads = { title: "", toc: [] as TocItem[] };

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCourse, stats)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeHeadings, heads)
    .use(rehypeAutolink, {
      behavior: "append",
      properties: { className: ["anchor"], ariaLabel: "Link to this section" },
      content: { type: "text", value: "#" },
    })
    .use(rehypeDemote)
    .use(rehypeHighlight as any, { detect: false, ignoreMissing: true })
    .use(rehypeBlocks)
    .use(rehypeStringify)
    .process(src);

  const words = src.replace(/```[\s\S]*?```/g, " ").split(/\s+/).filter(Boolean).length;
  const codeLines = (src.match(/```java[\s\S]*?```/g) || []).join("\n").split("\n").length;
  const minutes = Math.max(1, Math.round(words / 200 + codeLines / 60));

  return { html: String(file), title: heads.title, toc: heads.toc, minutes, diagrams: stats.diagrams };
}

const memo = new Map<string, Promise<Rendered>>();
export function renderChapter(slug: string): Promise<Rendered> {
  if (process.env.NODE_ENV !== "production") return renderMarkdown(readChapterSource(slug));
  let p = memo.get(slug);
  if (!p) memo.set(slug, (p = renderMarkdown(readChapterSource(slug))));
  return p;
}
