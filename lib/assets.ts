import "server-only";
import fs from "node:fs";
import path from "node:path";

/** Use an optional photo if it has been dropped into /public, otherwise a fallback (or null). */
export function photo(src: string, fallback: string | null = null): string | null {
  return fs.existsSync(path.join(process.cwd(), "public", src)) ? src : fallback;
}
