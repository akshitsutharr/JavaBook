"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/markdown";

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-72px 0px -70% 0px" }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [items]);

  if (items.length < 2) return null;
  return (
    <aside className="toc" aria-label="On this page">
      <div className="toc-title">On this page</div>
      <ul>
        {items.map((i) => (
          <li key={i.id} className={`lvl${i.level} ${active === i.id ? "active" : ""}`}>
            <a href={`#${i.id}`}>{i.text}</a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
