import Link from "next/link";
import { getChapters } from "@/lib/chapters";
import { CURRICULUM, INTERVIEW_PRACTICE, PARTS } from "@/lib/curriculum";

export default function Home() {
  const chapters = getChapters();
  const bySlugNum = new Map(chapters.map((c) => [c.number, c]));
  const first = chapters[0];

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-badge">Free · Open · Made for learners</div>
        <h1>
          Learn Java,
          <br />
          <span className="grad">one chapter at a time.</span>
        </h1>
        <p>
          A calm, book-style course with clear notes, runnable code and diagrams — from your first <code>Hello, World</code> to the JVM
          internals. Built for students and teachers.
        </p>
        <div className="hero-cta">
          {first && (
            <Link href={`/learn/${first.slug}`} className="btn primary">
              Start reading →
            </Link>
          )}
          <a href="#chapters" className="btn">
            Browse chapters
          </a>
        </div>
        <dl className="stats">
          <div>
            <dt>{chapters.length}</dt>
            <dd>chapters available</dd>
          </div>
          <div>
            <dt>{CURRICULUM.length}</dt>
            <dd>in the full course</dd>
          </div>
          <div>
            <dt>{PARTS.length}</dt>
            <dd>parts</dd>
          </div>
        </dl>
      </section>

      <section id="chapters" className="parts">
        {PARTS.map((p) => {
          const entries = CURRICULUM.filter((c) => c.number >= p.from && c.number <= p.to);
          return (
            <div key={p.id} className="part">
              <div className="part-head">
                <h2>{p.title}</h2>
                <p>{p.blurb}</p>
              </div>
              <div className="cards">
                {entries.map((e) => {
                  const ch = bySlugNum.get(e.number);
                  const inner = (
                    <>
                      <span className="card-num">{String(e.number).padStart(2, "0")}</span>
                      <span className="card-title">{ch?.title ?? e.title}</span>
                      <span className="card-desc">{ch ? ch.description : "Coming soon"}</span>
                    </>
                  );
                  return ch ? (
                    <Link key={e.number} href={`/learn/${ch.slug}`} className="card">
                      {inner}
                    </Link>
                  ) : (
                    <div key={e.number} className="card soon" aria-disabled>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      <section className="practice-section" aria-labelledby="practice-title">
        <div className="part-head">
          <h2 id="practice-title">Java Interview &amp; Practice</h2>
          <p>Use these prompts after the course to review concepts, explain your thinking, and practise problem solving.</p>
        </div>
        {bySlugNum.get(51) && (
          <Link href={`/learn/${bySlugNum.get(51)!.slug}`} className="btn practice-link">
            Open Chapter 51 →
          </Link>
        )}
        <div className="practice-grid">
          {INTERVIEW_PRACTICE.map((question, index) => (
            <div className="practice-card" key={question}>
              <span className="card-num">Q{String(index + 1).padStart(2, "0")}</span>
              <span className="practice-question">{question}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
