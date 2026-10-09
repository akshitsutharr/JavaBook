"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Entry = {
  slug: string;
  number: number;
  title: string;
  description: string;
  headings: { id: string; text: string }[];
  text: string;
};
type Hit = { slug: string; number: number; title: string; sub: string; id?: string; score: number };

function snippet(text: string, term: string) {
  const i = text.toLowerCase().indexOf(term);
  if (i < 0) return "";
  const start = Math.max(0, i - 40);
  return (start > 0 ? "…" : "") + text.slice(start, i + 90).trim() + "…";
}

export default function SearchBox() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [index, setIndex] = useState<Entry[] | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setSel(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
      } else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    if (!index) {
      fetch("/search-index.json")
        .then((r) => {
          if (!r.ok) throw new Error(`Search index request failed: ${r.status}`);
          return r.json();
        })
        .then((entries: Entry[]) => {
          setIndex(entries);
          setLoadError(false);
        })
        .catch(() => {
          setIndex([]);
          setLoadError(true);
        });
    }
  }, [open, index]);

  const hits = useMemo<Hit[]>(() => {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length || !index) return [];
    const out: Hit[] = [];
    for (const e of index) {
      let score = 0;
      let sub = e.description;
      let id: string | undefined;
      const title = e.title.toLowerCase();
      for (const t of terms) {
        if (title.includes(t)) score += 10;
        if (e.description.toLowerCase().includes(t)) score += 3;
        const h = e.headings.find((h) => h.text.toLowerCase().includes(t));
        if (h) {
          score += 6;
          if (!id) {
            id = h.id;
            sub = h.text;
          }
        }
        const body = e.text.toLowerCase();
        if (body.includes(t)) {
          score += 1;
          if (!id && !title.includes(t)) sub = snippet(e.text, t) || sub;
        }
      }
      if (score) out.push({ slug: e.slug, number: e.number, title: e.title, sub, id, score });
    }
    return out.sort((a, b) => b.score - a.score).slice(0, 8);
  }, [q, index]);

  const go = (h: Hit) => {
    router.push(`/learn/${h.slug}${h.id ? `#${h.id}` : ""}`);
    close();
  };

  return (
    <>
      <button className="search-btn" onClick={() => setOpen(true)} aria-label="Search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <span className="search-label">Search</span>
        <kbd>/</kbd>
      </button>

      {open && (
        <div className="search-overlay" onMouseDown={close}>
          <div className="search-modal" role="dialog" aria-label="Search" onMouseDown={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={q}
              placeholder="Search chapters, topics, keywords…"
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(s + 1, hits.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(s - 1, 0));
                } else if (e.key === "Enter" && hits[sel]) go(hits[sel]);
              }}
            />
            <ul>
              {hits.map((h, i) => (
                <li key={h.slug + (h.id || "")}>
                  <button className={i === sel ? "sel" : ""} onMouseEnter={() => setSel(i)} onClick={() => go(h)}>
                    <span className="hit-title">
                      <em>{String(h.number).padStart(2, "0")}</em> {h.title}
                    </span>
                    <span className="hit-sub">{h.sub}</span>
                  </button>
                </li>
              ))}
              {loadError && <li className="search-empty">Search is temporarily unavailable. Please refresh and try again.</li>}
              {q && index && !hits.length && !loadError && <li className="search-empty">No results for “{q}”</li>}
              {!q && <li className="search-empty">Type to search · ↑ ↓ to move · Enter to open · Esc to close</li>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
