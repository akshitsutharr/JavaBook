import fs from "node:fs";
import path from "node:path";
import { CURRICULUM, PARTS, partForNumber, type Part } from "./curriculum";

export const DATA_DIR = path.join(process.cwd(), "data");

export type ChapterMeta = {
  slug: string;
  number: number;
  title: string;
  description: string;
  part: Part | undefined;
  topics: string[];
};

const stripInline = (s: string) =>
  s
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();

/** "Chapter 7 — Loops in Java"  ->  "Loops in Java" */
export function cleanTitle(h1: string): string {
  return stripInline(h1).replace(/^chapter\s+\d+\s*[—–:\-]\s*/i, "").trim();
}

function readMeta(file: string): ChapterMeta | null {
  const m = file.match(/^(\d{1,3})-(.+)\.md$/i);
  if (!m) return null;
  const number = parseInt(m[1], 10);
  const slug = file.replace(/\.md$/i, "");
  const src = fs.readFileSync(path.join(DATA_DIR, file), "utf8");
  const curr = CURRICULUM.find((c) => c.number === number);

  const h1 = src.match(/^#\s+(.+)$/m);
  const title = h1 ? cleanTitle(h1[1]) : curr?.title ?? m[2].replace(/-/g, " ");

  // First paragraph of the opening blockquote that isn't just the "Chapter X of 50" banner.
  let description = "";
  const bq = src.match(/(?:^>.*(?:\n|$))+/m);
  if (bq) {
    const paras = bq[0]
      .split("\n")
      .map((l) => l.replace(/^>\s?/, ""))
      .join("\n")
      .split(/\n\s*\n/)
      .map(stripInline)
      .filter((p) => p && !/^java master course/i.test(p) && !/^```/.test(p));
    description = (paras[0] || "").replace(/^(goal of this chapter:)\s*/i, "");
    if (description.length > 220) description = description.slice(0, 217).replace(/\s+\S*$/, "") + "…";
  }

  return { slug, number, title, description, part: partForNumber(number), topics: curr?.topics ?? [] };
}

let cache: ChapterMeta[] | null = null;

export function getChapters(): ChapterMeta[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  if (!fs.existsSync(DATA_DIR)) return [];
  const list = fs
    .readdirSync(DATA_DIR)
    .filter((f) => f.toLowerCase().endsWith(".md"))
    .map(readMeta)
    .filter((c): c is ChapterMeta => !!c)
    .sort((a, b) => a.number - b.number);
  cache = list;
  return list;
}

export function getChapter(slug: string): ChapterMeta | undefined {
  return getChapters().find((c) => c.slug === slug);
}

export function getAdjacent(slug: string) {
  const list = getChapters();
  const i = list.findIndex((c) => c.slug === slug);
  return { prev: i > 0 ? list[i - 1] : null, next: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
}

export function readChapterSource(slug: string): string {
  return fs.readFileSync(path.join(DATA_DIR, `${slug}.md`), "utf8");
}

/** Chapters grouped by roadmap part (only parts with at least one available chapter). */
export function getGrouped() {
  const chapters = getChapters();
  return PARTS.map((part) => ({ part, chapters: chapters.filter((c) => c.number >= part.from && c.number <= part.to) })).filter(
    (g) => g.chapters.length
  );
}
