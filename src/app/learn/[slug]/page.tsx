import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAdjacent, getChapter, getChapters } from "@/lib/chapters";
import { renderChapter } from "@/lib/markdown";
import TableOfContents from "@/components/TableOfContents";
import ArticleEnhancer from "@/components/ArticleEnhancer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getChapters().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getChapter(slug);
  return c ? { title: c.title, description: c.description || undefined } : {};
}

export default async function ChapterPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getChapter(slug);
  if (!meta) notFound();
  const r = await renderChapter(slug);
  const { prev, next } = getAdjacent(slug);

  return (
    <div className="chapter-layout">
      <article className="chapter">
        <header className="chapter-head">
          <div className="eyebrow">
            <span>Chapter {meta.number}</span>
            {meta.part && <span>· {meta.part.title}</span>}
          </div>
          <h1>{meta.title}</h1>
          <div className="chip-row">
            <span className="chip">{r.minutes} min read</span>
            {r.diagrams > 0 && <span className="chip">{r.diagrams} diagrams</span>}
          </div>
        </header>

        <div className="prose" dangerouslySetInnerHTML={{ __html: r.html }} />

        <nav className="pager" aria-label="Chapter navigation">
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="pager-card prev">
              <span>← Previous</span>
              <strong>{prev.title}</strong>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="pager-card next">
              <span>Next →</span>
              <strong>{next.title}</strong>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>

      <TableOfContents items={r.toc} />
      <ArticleEnhancer key={slug} />
    </div>
  );
}
