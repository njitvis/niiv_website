// Writes CONTENT_INVENTORY.md: every content entry on the site, with the file
// to edit in /admin and what information it is still missing.
// Run with `npm run inventory` whenever you want a fresh list.
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const appDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const contentDir = resolve(appDir, "src", "content");

const read = (collection) =>
  readdirSync(resolve(contentDir, collection))
    .filter((file) => file.endsWith(".json"))
    .map((file) => ({ id: file.replace(/\.json$/, ""), ...JSON.parse(readFileSync(resolve(contentDir, collection, file), "utf8")) }));

// Opens the entry in the local editor (npm run cms + npm run dev must be running).
const EDITOR_URL = "http://localhost:5173/admin/index.html#/collections";
const editLink = (collection, id) => `[${id}](${EDITOR_URL}/${collection}/entries/${id})`;

const has = (value) => value !== undefined && value !== null && String(value).trim() !== "";
const cell = (value) => String(value ?? "").replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const missing = (checks) => checks.filter(([present]) => !present).map(([, label]) => label).join(", ") || "—";
const table = (headers, rows) =>
  [`| ${headers.join(" | ")} |`, `| ${headers.map(() => "---").join(" | ")} |`, ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`)].join("\n");

const people = read("people");
const publications = read("publications");
const projects = read("projects");
const news = read("news");
const assistants = read("research-assistants");

const GROUPS = { faculty: "Faculty", phd: "Ph.D. students", alumni: "Ph.D. alumni", former: "Former members" };
const GROUP_ORDER = Object.keys(GROUPS);

const projectsByPaper = new Map();
for (const project of projects) {
  for (const { publicationId } of project.publications ?? []) {
    projectsByPaper.set(publicationId, [...(projectsByPaper.get(publicationId) ?? []), project.title]);
  }
}

const sections = [];

sections.push(`## People (${people.length})

${table(
  ["Name", "Role", "Section", "Years", "Missing", "Edit"],
  people
    .sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group) || a.name.localeCompare(b.name))
    .map((person) => [
      person.name,
      person.role,
      GROUPS[person.group] ?? person.group,
      person.period,
      missing([
        [has(person.image), "photo"],
        [has(person.email), "email"],
        [has(person.website) || has(person.github) || has(person.linkedin) || has(person.scholar), "profile links"],
        [person.group === "faculty" || has(person.period), "years"],
        [person.group !== "alumni" || has(person.note), "current position"],
      ]),
      editLink("people", person.id),
    ]),
)}`);

sections.push(`## Previous research assistants (${assistants.length})

${table(
  ["Name", "Program", "Edit"],
  assistants
    .sort((a, b) => b.program.localeCompare(a.program) || a.name.localeCompare(b.name))
    .map((assistant) => [assistant.name, assistant.program, editLink("research-assistants", assistant.id)]),
)}`);

sections.push(`## Research projects (${projects.length})

${table(
  ["Order", "Title", "Papers", "Papers without a project summary", "Missing", "Edit"],
  projects
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title))
    .map((project) => {
      const papers = project.publications ?? [];
      return [
        project.order ?? "—",
        project.title,
        papers.length,
        papers.filter((paper) => !has(paper.summary)).length,
        missing([
          [has(project.image), "cover image"],
          [(project.tags ?? []).length > 0, "topics"],
          [papers.length > 0, "papers"],
        ]),
        editLink("projects", project.id),
      ];
    }),
)}`);

const years = [...new Set(publications.map((paper) => paper.year))].sort((a, b) => b - a);
const paperRows = (year) =>
  publications
    .filter((paper) => paper.year === year)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0) || a.title.localeCompare(b.title))
    .map((paper) => {
      const links = paper.links ?? {};
      return [
        paper.title,
        paper.venue,
        (projectsByPaper.get(paper.id) ?? []).join("; ") || "—",
        paper.spotlight ? "Yes" : "",
        missing([
          [has(paper.type), "type"],
          [has(links.pdf) || has(links.doi) || has(links.arxiv), "PDF/DOI/arXiv link"],
          [has(paper.abstract), "abstract"],
          [projectsByPaper.has(paper.id), "project"],
        ]),
        editLink("publications", paper.id),
      ];
    });

sections.push(`## Publications (${publications.length})

${years
  .map((year) => `### ${year}\n\n${table(["Title", "Venue", "Projects", "Spotlight", "Missing", "Edit"], paperRows(year))}`)
  .join("\n\n")}`);

sections.push(`## News (${news.length})

${table(
  ["Month", "Category", "Headline", "Missing", "Edit"],
  news
    .sort((a, b) => String(b.date).localeCompare(String(a.date)))
    .map((item) => [
      item.date,
      item.category,
      item.title,
      missing([
        [has(item.description), "details"],
        [has(item.link), "link"],
      ]),
      editLink("news", item.id),
    ]),
)}`);

const output = `# Website content inventory

Generated by \`npm run inventory\` from \`src/content/\`. Don't edit this file by hand: make changes in
\`/admin\` (or the JSON files) and run the command again. "Missing" lists optional information that
isn't filled in yet.

**To open an entry in the editor:** start \`npm run cms\` and \`npm run dev\` (in \`niiv/\`), log in at
http://localhost:5173/admin/index.html once, then click the entry's link in the **Edit** column
(in VS Code's Markdown preview, Ctrl+Shift+V, a plain click; in the raw file, Ctrl+click).

| Section | Entries |
| --- | --- |
| People | ${people.length} |
| Previous research assistants | ${assistants.length} |
| Research projects | ${projects.length} |
| Publications | ${publications.length} |
| News | ${news.length} |

${sections.join("\n\n")}
`;

writeFileSync(resolve(appDir, "CONTENT_INVENTORY.md"), output);
console.log(
  `Wrote CONTENT_INVENTORY.md: ${people.length} people, ${assistants.length} research assistants, ${projects.length} projects, ${publications.length} publications, ${news.length} news items.`,
);
