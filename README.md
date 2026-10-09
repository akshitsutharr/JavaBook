# JavaBook

A dark, minimal, book-style website for learning Java. It turns Markdown chapters into a
documentation site with a sidebar, search, table of contents, syntax highlighting and
**Mermaid diagrams generated automatically from your ASCII diagrams**.

## Run it

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Adding chapters

Drop Markdown files into `data/` named `NN-slug.md` (for example `13-constructors.md`).
No config is needed. The chapter number decides its place in the course (part, sidebar,
home page card, previous/next). Chapters you haven't written yet show as "Coming soon".

- The first `#` heading is the page title (`# Chapter 13 — Constructors`).
- ` ```java ` blocks get highlighting and a Copy button.
- ` ```text ` blocks containing flows (`↓`), trees (`├──`) or pointer lines (`────►`) become
  Mermaid diagrams. A "Show ASCII" button on each diagram restores the original.
  Boxes and file-system trees stay as styled code blocks.
- Write ` ```mermaid ` yourself for anything the converter doesn't handle.
- `✓ item` blocks become checklists.

## Tools

- `npm run test:ascii` shows how many ASCII blocks in `data/` convert to Mermaid
  (add `-- --verbose` to see each one).
- The course outline lives in `src/lib/curriculum.ts`; theme colours are at the top of `src/app/globals.css`.
