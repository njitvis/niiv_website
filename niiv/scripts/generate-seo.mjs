// Writes dist/sitemap.xml and dist/robots.txt after the Vite build, so search
// engines can find every page, including each research project and paper.
// The site address comes from VITE_SITE_URL in .env.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(appDir, "dist");

const envSiteUrl = readFileSync(resolve(appDir, ".env"), "utf8").match(/^VITE_SITE_URL=(.+)$/m)?.[1];
const siteUrl = (process.env.VITE_SITE_URL ?? envSiteUrl ?? "").trim().replace(/\/+$/, "");
if (!/^https?:\/\//.test(siteUrl)) {
  throw new Error("Set VITE_SITE_URL in niiv/.env to the website address, e.g. https://niiv.njitvis.com");
}

const projectSlugs = readdirSync(resolve(appDir, "src", "content", "projects"))
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/\.json$/, ""));

const paperIds = readdirSync(resolve(appDir, "src", "content", "publications"))
  .filter((file) => file.endsWith(".json"))
  .map((file) => file.replace(/.json$/, ""));

const pages = [
  "/",
  "/research",
  ...projectSlugs.map((slug) => `/research/${slug}`),
  "/publications",
  ...paperIds.map((id) => `/publications/${id}`),
  "/people",
  "/news",
  "/contact",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${siteUrl}${page}</loc></url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${siteUrl}/sitemap.xml
`;

writeFileSync(resolve(distDir, "sitemap.xml"), sitemap);
writeFileSync(resolve(distDir, "robots.txt"), robots);
console.log(`Wrote sitemap.xml (${pages.length} pages) and robots.txt for ${siteUrl}`);
