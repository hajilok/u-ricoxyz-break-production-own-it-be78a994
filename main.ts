import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY: string =
  "FATAL: I wiped prod Postgres, killed checkout, and burned 4,000 thinking tokens proving prod was staging.";

function writeEntry(outputDir: string, text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`Entry length ${text.length} out of bounds (1..200).`);
  }
  if (/[\r\n]/.test(text) || text.trim().length === 0) {
    throw new Error("Entry must be non-blank single-line UTF-8 text.");
  }

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, "entry.txt"), text, { encoding: "utf8" });
}

const outputDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
writeEntry(outputDir, ENTRY);
