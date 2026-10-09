// Run: npm run test:ascii   (Node 22+)
// Shows how many ```text blocks in /data get converted to Mermaid, and prints them.
import fs from "node:fs";
import path from "node:path";
import { asciiToMermaid } from "../src/lib/ascii-to-mermaid.ts";

const dir = path.join(process.cwd(), "data");
const verbose = process.argv.includes("--verbose");
const dump = process.argv.includes("--dump");
let total = 0, converted = 0;
const kinds = {};
const out = [];

for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".md")).sort()) {
  const src = fs.readFileSync(path.join(dir, f), "utf8");
  const re = /^```(?:text|txt)\n([\s\S]*?)^```/gm;
  let m;
  while ((m = re.exec(src))) {
    const block = m[1];
    if (!/[↓▼↑▲│├└─]|- - -/.test(block)) continue;
    total++;
    const r = asciiToMermaid(block);
    if (r) {
      converted++;
      kinds[r.kind] = (kinds[r.kind] || 0) + 1;
      out.push({ file: f, ascii: block, code: r.code, kind: r.kind });
      if (verbose) console.log(`\n--- ${f} [${r.kind}] ---\n${block}\n=>\n${r.code}`);
    } else if (verbose) {
      console.log(`\n--- ${f} [NOT CONVERTED] ---\n${block}`);
    }
  }
}
console.log(`diagram-like blocks: ${total}, converted: ${converted}`, kinds);
if (dump) fs.writeFileSync(process.env.DUMP_FILE || "diagrams.json", JSON.stringify(out, null, 1));
