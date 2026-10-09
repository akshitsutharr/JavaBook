import { getChapters } from "./chapters";
import { renderChapter } from "./markdown";
import { readChapterSource } from "./chapters";

export type SearchEntry = {
  slug: string;
  number: number;
  title: string;
  description: string;
  headings: { id: string; text: string }[];
  text: string;
};

const plain = (md: string) =>
  md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/^>\s?/gm, "")
    .replace(/[#*_`|>~-]+/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const out: SearchEntry[] = [];
  for (const c of getChapters()) {
    const r = await renderChapter(c.slug);
    out.push({
      slug: c.slug,
      number: c.number,
      title: c.title,
      description: c.description,
      headings: r.toc.map((t) => ({ id: t.id, text: t.text })),
      text: plain(readChapterSource(c.slug)).slice(0, 6000),
    });
  }
  return out;
}
