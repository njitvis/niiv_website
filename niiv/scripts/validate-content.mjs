// Checks the JSON content edited through /admin before every build, so a bad
// edit fails the build instead of breaking the live site.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = resolve(appDir, "src", "content");
const publicDir = resolve(appDir, "public");
const errors = [];
const warnings = [];

// File size limits for images and PDFs used by the content. Large files slow the
// site down; very large ones also make the repository slow to work with.
const MB = 1024 * 1024;
const SIZE_LIMITS = {
  image: { warn: 1 * MB, fail: 5 * MB, advice: "resize it to about 2000 px wide or save it as a compressed JPEG/WebP" },
  pdf: { warn: 15 * MB, fail: 30 * MB, advice: "compress it, or link to the publisher/arXiv version instead" },
};

const blank = (value) => value === undefined || value === null || String(value).trim() === "";

function readCollection(name) {
  const dir = resolve(contentDir, name);
  return readdirSync(dir)
    .filter((file) => file.endsWith(".json"))
    .map((file) => {
      const where = `src/content/${name}/${file}`;
      try {
        return { id: file.replace(/\.json$/, ""), where, data: JSON.parse(readFileSync(resolve(dir, file), "utf8")) };
      } catch (error) {
        errors.push(`${where}: not valid JSON (${error.message})`);
        return null;
      }
    })
    .filter(Boolean);
}

function requireFields({ where, data }, fields) {
  for (const field of fields) if (blank(data[field])) errors.push(`${where}: "${field}" is required`);
}

function requireOneOf({ where, data }, field, allowed) {
  if (!blank(data[field]) && !allowed.includes(data[field])) {
    errors.push(`${where}: "${field}" must be one of ${allowed.join(", ")} (got "${data[field]}")`);
  }
}

function checkSize(where, field, value, size) {
  const kind = /.pdf$/i.test(value) ? "pdf" : /.(png|jpe?g|gif|webp|svg|avif)$/i.test(value) ? "image" : null;
  if (!kind) return;
  const limit = SIZE_LIMITS[kind];
  const message = `${where}: "${field}" (${value}) is ${(size / MB).toFixed(1)} MB; ${limit.advice}`;
  if (size > limit.fail) errors.push(`${message} (limit ${limit.fail / MB} MB)`);
  else if (size > limit.warn) warnings.push(`${message} (recommended under ${limit.warn / MB} MB)`);
}

function checkLink(where, field, value) {
  if (blank(value)) return;
  if (value.startsWith("/")) {
    const file = resolve(publicDir, decodeURI(value).slice(1));
    if (!existsSync(file)) {
      errors.push(`${where}: "${field}" points to ${value}, but public${value} does not exist`);
    } else {
      checkSize(where, field, value, statSync(file).size);
    }
  } else if (!/^https?:\/\//.test(value) && !/^mailto:/.test(value)) {
    errors.push(`${where}: "${field}" should be a full https:// link or a /path to a file (got "${value}")`);
  }
}

const people = readCollection("people");
for (const entry of people) {
  requireFields(entry, ["name", "role", "group"]);
  requireOneOf(entry, "group", ["faculty", "phd", "alumni", "former"]);
  for (const field of ["image", "website", "workWebsite", "github", "linkedin", "scholar"]) checkLink(entry.where, field, entry.data[field]);
}

const publications = readCollection("publications");
for (const entry of publications) {
  requireFields(entry, ["title", "authors", "venue", "year"]);
  requireOneOf(entry, "type", ["conf", "journal", "thesis", "preprint"]);
  if (!blank(entry.data.year) && !Number.isInteger(entry.data.year)) errors.push(`${entry.where}: "year" must be a whole number`);
  if (entry.data.tags !== undefined && !Array.isArray(entry.data.tags)) errors.push(`${entry.where}: "tags" must be a list`);
  for (const [field, value] of Object.entries(entry.data.links ?? {})) checkLink(entry.where, `links.${field}`, value);
  const figures = entry.data.figures;
  if (figures !== undefined && !Array.isArray(figures)) errors.push(`${entry.where}: "figures" must be a list`);
  (Array.isArray(figures) ? figures : []).forEach((figure, index) => {
    const where = `${entry.where} (figure ${index + 1})`;
    requireFields({ where, data: figure }, ["image", "alt"]);
    checkLink(where, "image", figure.image);
    checkLink(where, "source", figure.source);
  });
  const spotlight = entry.data.spotlight;
  if (spotlight && Object.values(spotlight).some((value) => !blank(value))) {
    const where = `${entry.where} (homepage spotlight)`;
    requireFields({ where, data: spotlight }, ["title", "summary"]);
    if (!(Array.isArray(figures) && figures.some((figure) => !blank(figure.image)))) {
      errors.push(`${where}: a featured paper needs at least one figure under "Figures"`);
    }
  }
}

const news = readCollection("news");
for (const entry of news) {
  requireFields(entry, ["date", "category", "title"]);
  requireOneOf(entry, "category", ["Publication", "Award", "Challenge", "Grant", "Milestone", "Event", "Showcase"]);
  if (!blank(entry.data.date) && !/^\d{4}-(0[1-9]|1[0-2])(-\d{2})?$/.test(entry.data.date)) {
    errors.push(`${entry.where}: "date" must be a month like 2024-11 (got "${entry.data.date}")`);
  }
  checkLink(entry.where, "link", entry.data.link);
}

const assistants = readCollection("research-assistants");
for (const entry of assistants) {
  requireFields(entry, ["name", "program"]);
  requireOneOf(entry, "program", ["M.S. Data Science", "B.S. IT/CS/DS"]);
}

const RESOURCE_TYPES = ["code", "demo", "video", "website"];
function checkResources(where, resources) {
  if (resources === undefined) return;
  if (!Array.isArray(resources)) return errors.push(`${where}: "resources" must be a list`);
  resources.forEach((resource, index) => {
    const entry = { where: `${where} (link ${index + 1})`, data: resource };
    requireFields(entry, ["label", "href", "type"]);
    requireOneOf(entry, "type", RESOURCE_TYPES);
    checkLink(entry.where, "href", resource.href);
  });
}

const publicationIds = new Set(publications.map((entry) => entry.id));
const projects = readCollection("projects");
for (const entry of projects) {
  requireFields(entry, ["title", "description", "overview", "image", "imageAlt"]);
  checkLink(entry.where, "image", entry.data.image);
  checkResources(entry.where, entry.data.resources);
  (entry.data.publications ?? []).forEach((paper, index) => {
    const where = `${entry.where} (paper ${index + 1})`;
    if (blank(paper.publicationId)) errors.push(`${where}: choose a paper`);
    else if (!publicationIds.has(paper.publicationId)) {
      errors.push(`${where}: paper "${paper.publicationId}" does not exist in src/content/publications/`);
    }
    checkLink(where, "image", paper.image);
    checkResources(where, paper.resources);
  });
}

// The home page Research Spotlight is for research. A featured paper should belong to
// a research project (its spotlight tab then links there). Set this to true to make
// that a hard rule; while false it's only a warning, and the tab has no project link.
const FEATURED_PAPERS_NEED_A_PROJECT = false;
const papersInProjects = new Set(projects.flatMap((entry) => (entry.data.publications ?? []).map((paper) => paper.publicationId)));
for (const entry of publications) {
  const spotlight = entry.data.spotlight;
  const featured = spotlight && Object.values(spotlight).some((value) => !blank(value));
  if (featured && !papersInProjects.has(entry.id)) {
    (FEATURED_PAPERS_NEED_A_PROJECT ? errors : warnings).push(
      `${entry.where}: this paper is featured in the home spotlight but isn't part of any research project yet; add it to a project under Research projects so its tab links there`,
    );
  }
}

// News items are headlines only.
for (const entry of news) {
  const extra = ["spotlight", "image", "imageAlt", "project"].filter((field) => entry.data[field] !== undefined);
  if (extra.length) {
    errors.push(`${entry.where}: news items are headlines only and can't use ${extra.join(", ")}; feature research through a publication's spotlight section instead`);
  }
}

for (const [label, entries, key] of [["person", people, "name"], ["publication", publications, "title"], ["project", projects, "title"]]) {
  const seen = new Map();
  for (const entry of entries) {
    const value = String(entry.data[key] ?? "").trim().toLowerCase();
    if (value && seen.has(value)) errors.push(`${entry.where}: duplicate ${label} (same ${key} as ${seen.get(value)})`);
    seen.set(value, entry.where);
  }
}

// On GitHub, also report each problem as an annotation so it shows on the pull request.
const annotate = (level, message) => {
  if (!process.env.GITHUB_ACTIONS) return;
  const file = message.match(/^(src\/content\/[^:\s]+)/)?.[1];
  console.log(`::${level}${file ? ` file=niiv/${file}` : ""}::${message.replace(/%/g, "%25").replace(/\n/g, "%0A")}`);
};

if (warnings.length) {
  console.warn(`${warnings.length} warning(s):\n`);
  for (const warning of warnings) {
    console.warn(`  - ${warning}`);
    annotate("warning", warning);
  }
  console.warn("");
}

if (errors.length) {
  console.error(`Content check failed with ${errors.length} problem(s):\n`);
  for (const error of errors) {
    console.error(`  - ${error}`);
    annotate("error", error);
  }
  process.exit(1);
}

console.log(`Content OK: ${people.length} people, ${publications.length} publications, ${projects.length} projects, ${news.length} news items, ${assistants.length} research assistants.`);
