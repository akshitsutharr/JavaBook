/**
 * Converts the ASCII / box-drawing diagrams used in the course notes into Mermaid.
 *
 * Supported shapes
 *  1. Vertical flows        A ↓ B ↓ C   (with optional "│ label" lines, ▲/↑ for reverse edges)
 *  2. Trees                 root ├── child └── child
 *  3. Pointer lines         a ───► b    a ───── b    a - - - > b    A ◇──── B
 *
 * Anything else (boxes, merged arrows, prose) returns null and stays as an
 * ordinary code block, so nothing is ever converted wrongly.
 */

export type Conversion = { code: string; kind: "flow" | "tree" | "pointers" };

const esc = (s: string) =>
  s
    .replace(/"/g, "#quot;")
    .replace(/</g, "#lt;")
    .replace(/>/g, "#gt;")
    .replace(/`/g, "'")
    .replace(/\\/g, "#92;")
    .replace(/\s+/g, " ")
    .trim();

const MAX_LABEL = 70;

type Kind = "blank" | "pipe" | "down" | "up" | "label" | "text";

function classify(line: string): { kind: Kind; text: string } {
  const t = line.trim();
  if (!t) return { kind: "blank", text: "" };
  const stripped = t.replace(/[│|\s]/g, "");
  if (stripped === "") return { kind: "pipe", text: "" };
  if (/^[↓▼]+$/.test(stripped)) return { kind: "down", text: "" };
  if (/^[↑▲^]+$/.test(stripped)) return { kind: "up", text: "" };
  const lab = t.match(/^[│|]\s+(.+)$/);
  if (lab) return { kind: "label", text: lab[1].trim() };
  return { kind: "text", text: t };
}

/* ---------------------------------------------------------------- flows */

function tryFlow(lines: string[]): Conversion | null {
  type Group = { nodes: { id: string; text: string }[]; edges: string[] };
  const groups: Group[] = [];
  let cur: Group = { nodes: [], edges: [] };
  let counter = 0;
  let last: { id: string; text: string } | null = null;
  let pending: "down" | "up" | null = null;
  let label: string | null = null;

  const flush = () => {
    if (cur.nodes.length) groups.push(cur);
    cur = { nodes: [], edges: [] };
    last = null;
    pending = null;
    label = null;
  };

  for (const line of lines) {
    const { kind, text } = classify(line);
    switch (kind) {
      case "blank":
        flush();
        break;
      case "pipe":
        if (!last) return null;
        pending = pending ?? "down";
        break;
      case "down":
        if (!last) return null;
        pending = "down";
        break;
      case "up":
        if (!last) return null;
        pending = "up";
        break;
      case "label":
        if (!last) return null;
        label = text;
        pending = pending ?? "down";
        break;
      case "text": {
        if (text.length > MAX_LABEL) return null;
        const node = { id: `n${++counter}`, text };
        if (last) {
          if (!pending) return null; // two text lines without an arrow between them
          const lbl = label ? `|${esc(label).replace(/\|/g, "/")}|` : "";
          cur.edges.push(
            pending === "down"
              ? `${last.id} -->${lbl} ${node.id}`
              : `${node.id} -->${lbl} ${last.id}`
          );
        }
        cur.nodes.push(node);
        last = node;
        pending = null;
        label = null;
        break;
      }
    }
  }
  flush();

  if (!groups.length || groups.length > 8) return null;
  if (groups.some((g) => g.edges.length === 0)) return null;
  const nodeCount = groups.reduce((n, g) => n + g.nodes.length, 0);
  if (nodeCount > 32) return null;

  const out = ["flowchart TD"];
  for (const g of groups) {
    for (const n of g.nodes) out.push(`  ${n.id}("${esc(n.text)}")`);
    for (const e of g.edges) out.push(`  ${e}`);
  }
  return { code: out.join("\n"), kind: "flow" };
}

/* ---------------------------------------------------------------- trees */

function tryTree(lines: string[]): Conversion | null {
  const nodes: { id: string; text: string }[] = [];
  const edges: string[] = [];
  let root: { id: string; text: string } | null = null;
  const stack: { col: number; id: string }[] = [];
  let counter = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const conn = line.match(/^(.*?)(├──|└──)\s*(.*)$/);
    if (conn) {
      if (!root) return null;
      const col = conn[1].length;
      const text = conn[3].trim();
      if (!text || text.length > MAX_LABEL) return null;
      while (stack.length && stack[stack.length - 1].col >= col) stack.pop();
      if (!stack.length) return null;
      const node = { id: `n${++counter}`, text };
      nodes.push(node);
      edges.push(`  ${stack[stack.length - 1].id} --> ${node.id}`);
      stack.push({ col, id: node.id });
      continue;
    }
    const { kind, text } = classify(line);
    if (kind === "pipe") continue;
    if (kind !== "text") return null;
    if (root) return null; // a second root — not a single tree
    if (text.length > MAX_LABEL) return null;
    root = { id: `n${++counter}`, text };
    nodes.push(root);
    stack.push({ col: -1, id: root.id });
  }

  if (!root || nodes.length < 3 || nodes.length > 45) return null;

  // File-system listings read better as plain trees than as a graph.
  const names = nodes.map((n) => n.text);
  const fileish = names.filter((n) => /^[\w.\-/ ]+\.[A-Za-z]{1,6}$/.test(n)).length;
  if (root.text.endsWith("/") || fileish >= names.length / 2) return null;

  const out = ["flowchart LR"];
  nodes.forEach((n, i) => out.push(`  ${n.id}${i === 0 ? "[" : "("}"${esc(n.text)}"${i === 0 ? "]" : ")"}`));
  out.push(...edges);
  return { code: out.join("\n"), kind: "tree" };
}

/* ------------------------------------------------------------- pointers */

const POINTER =
  /^\s*(.+?)\s*([◇◆])?\s*((?:[─━]{2,})|(?:(?:-\s){2,}-?)|(?:-{3,}))\s*([►▶>])?\s*(.+?)\s*$/;

function tryPointers(lines: string[]): Conversion | null {
  const ids = new Map<string, string>();
  const decl: string[] = [];
  const edges: string[] = [];
  let counter = 0;

  const idFor = (text: string) => {
    let id = ids.get(text);
    if (!id) {
      id = `n${++counter}`;
      ids.set(text, id);
      decl.push(`  ${id}("${esc(text)}")`);
    }
    return id;
  };

  for (const line of lines) {
    if (!line.trim()) continue;
    const m = line.match(POINTER);
    if (!m) return null;
    const [, a, marker, dashes, head, b] = m;
    if (a.length > MAX_LABEL || b.length > MAX_LABEL) return null;
    if (/[─━│]/.test(a + b)) return null;
    const dotted = /\s/.test(dashes);
    const link = head ? (dotted ? "-.->" : "-->") : dotted ? "-.-" : "---";
    const lbl = marker === "◇" ? "|aggregates|" : marker === "◆" ? "|composes|" : "";
    edges.push(`  ${idFor(a)} ${link}${lbl} ${idFor(b)}`);
  }
  if (!edges.length || edges.length > 30) return null;
  return { code: ["flowchart LR", ...decl, ...edges].join("\n"), kind: "pointers" };
}

/* ----------------------------------------------------------------- main */

export function asciiToMermaid(source: string): Conversion | null {
  const lines = source.replace(/\r/g, "").split("\n");
  const nonBlank = lines.filter((l) => l.trim());
  if (!nonBlank.length || nonBlank.length > 60) return null;

  const connectors = lines.filter((l) => /(├──|└──)/.test(l)).length;
  if (connectors >= 2) return tryTree(lines);
  if (connectors === 1) return null;

  // Boxes, merged arrows, ascii tables: leave untouched.
  if (/[┌┐┘└┬┴┼┤├]/.test(source)) return null;
  if (/\+[-=]{2,}\+?/.test(source)) return null;

  if (/[─━]|(?:-\s){2,}-?\s*>/.test(source)) {
    const p = tryPointers(lines);
    if (p) return p;
  }

  if (/[↓▼↑▲]/.test(source)) return tryFlow(lines);
  return null;
}
