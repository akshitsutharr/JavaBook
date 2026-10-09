"use client";

import { useEffect } from "react";

/** Adds Mermaid rendering, diagram/ASCII toggle and copy buttons to the server-rendered chapter HTML. */
export default function ArticleEnhancer() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".prose");
    if (!root) return;
    let cancelled = false;

    const onClick = async (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const copy = target.closest<HTMLButtonElement>(".copy-btn");
      if (copy) {
        const pre = copy.closest(".codeblock")?.querySelector("pre");
        try {
          await navigator.clipboard.writeText(pre?.textContent ?? "");
          copy.textContent = "Copied ✓";
          copy.classList.add("done");
          setTimeout(() => {
            copy.textContent = "Copy";
            copy.classList.remove("done");
          }, 1600);
        } catch {
          copy.textContent = "Press Ctrl+C";
        }
        return;
      }
      const tg = target.closest<HTMLButtonElement>(".diagram-toggle");
      if (tg) {
        const block = tg.closest(".mermaid-block")!;
        const showAscii = block.classList.toggle("show-ascii");
        tg.textContent = showAscii ? "Show diagram" : "Show ASCII";
      }
    };
    root.addEventListener("click", onClick);

    const blocks = Array.from(root.querySelectorAll<HTMLElement>(".mermaid-block"));
    if (blocks.length) {
      (async () => {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          flowchart: { curve: "basis", htmlLabels: true, useMaxWidth: true, padding: 12 },
          themeVariables: {
            darkMode: true,
            background: "#111111",
            primaryColor: "#222222",
            primaryTextColor: "#f2f2f2",
            primaryBorderColor: "#777777",
            secondaryColor: "#333333",
            tertiaryColor: "#111111",
            lineColor: "#aaaaaa",
            textColor: "#f2f2f2",
            edgeLabelBackground: "#111111",
            fontSize: "14px",
          },
        });

        let i = 0;
        for (const el of blocks) {
          if (cancelled) return;
          if (el.classList.contains("is-rendered")) continue;
          const chart = el.getAttribute("data-chart");
          if (!chart) continue;
          const id = `mmd-${Date.now()}-${i++}`;
          try {
            const { svg } = await mermaid.render(id, chart);
            if (cancelled || el.classList.contains("is-rendered")) return;
            const holder = document.createElement("div");
            holder.className = "mermaid-svg";
            holder.innerHTML = svg;
            el.prepend(holder);
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "diagram-toggle";
            btn.textContent = "Show ASCII";
            el.prepend(btn);
            el.classList.add("is-rendered");
          } catch {
            // Keep the original ASCII visible if a diagram can't be drawn.
            document.getElementById(`d${id}`)?.remove();
          }
        }
      })();
    }

    return () => {
      cancelled = true;
      root.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
