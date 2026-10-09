"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SearchBox from "./SearchBox";

export type NavGroup = { id: string; title: string; chapters: { slug: string; number: number; title: string }[] };

export default function AppShell({ groups, children }: { groups: NavGroup[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  return (
    <>
      <header className="topbar">
        <button className="icon-btn menu-btn" aria-label="Toggle navigation" onClick={() => setOpen((o) => !o)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
        <Link href="/" className="wordmark" aria-label="JavaBook home">
          JavaBook
        </Link>
        <div className="topbar-spacer" />
        <SearchBox />
      </header>

      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Chapters">
        <nav>
          <Link href="/" className={`side-home ${pathname === "/" ? "active" : ""}`}>
            Overview
          </Link>
          {groups.map((g) => (
            <div key={g.id} className="side-group">
              <div className="side-title">{g.title}</div>
              {g.chapters.map((c) => {
                const active = pathname === `/learn/${c.slug}`;
                return (
                  <Link key={c.slug} href={`/learn/${c.slug}`} className={`side-link ${active ? "active" : ""}`} aria-current={active ? "page" : undefined}>
                    <span className="side-num">{String(c.number).padStart(2, "0")}</span>
                    <span>{c.title}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <main className="main">
        {children}
        <footer className="site-footer">Made by Akshit Suthar</footer>
      </main>
    </>
  );
}
