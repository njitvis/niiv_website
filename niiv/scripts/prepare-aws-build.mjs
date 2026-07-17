import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const appDir = resolve(scriptDir, "..");
const repoRoot = resolve(appDir, "..");
const legacySource = resolve(repoRoot, "legacy");
const legacyTarget = resolve(appDir, "dist", "legacy");

if (!existsSync(resolve(appDir, "dist", "index.html"))) {
  throw new Error("Run the Vite build before preparing the AWS artifact.");
}

if (!existsSync(resolve(legacySource, "index.html"))) {
  throw new Error(`Missing legacy index.html at ${legacySource}`);
}

rmSync(legacyTarget, { recursive: true, force: true });
mkdirSync(dirname(legacyTarget), { recursive: true });
cpSync(legacySource, legacyTarget, { recursive: true });

console.log(`Copied legacy site to ${legacyTarget}`);
