// Checks that run in the editor when someone saves, so problems are caught while
// filling in the form rather than later in the build. A failed check keeps the
// entry unsaved and shows the message at the top right of the editor.
// Checks across entries (e.g. "is this featured paper part of a project?") need
// all the content, so they run in scripts/validate-content.mjs on every pull
// request and build instead.
(function () {
  const blank = (value) => value === undefined || value === null || String(value).trim() === "";
  const isFilled = (object) => Boolean(object) && Object.values(object).some((value) => !blank(value));

  const RULES = {
    publications(data) {
      const problems = [];
      const spotlight = data.spotlight;
      if (isFilled(spotlight)) {
        const missing = [
          ["title", "Short title"],
          ["summary", "Short summary"],
        ]
          .filter(([field]) => blank(spotlight[field]))
          .map(([, label]) => label);
        if (!(data.figures || []).some((figure) => !blank(figure.image))) missing.push("a figure (add one under Figures)");
        if (missing.length) {
          problems.push(
            `To feature this paper in the Research Spotlight it still needs: ${missing.join(", ")}. ` +
              "Fill these in, or clear the spotlight section to stop featuring the paper.",
          );
        }
      }
      return problems;
    },

    projects(data) {
      const problems = [];
      const papers = data.publications || [];
      if (papers.some((paper) => blank(paper.publicationId))) {
        problems.push('Every entry under "Papers in this project" needs a paper selected, or remove the empty entry.');
      }
      const ids = papers.map((paper) => paper.publicationId).filter(Boolean);
      const repeated = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
      if (repeated.length) {
        problems.push(`This paper is listed more than once in the project: ${repeated.join(", ")}.`);
      }
      const links = [...(data.resources || []), ...papers.flatMap((paper) => paper.resources || [])];
      if (links.some((link) => blank(link.label) || blank(link.href) || blank(link.type))) {
        problems.push("Every link needs link text, a URL and a kind.");
      }
      return problems;
    },
  };

  CMS.registerEventListener({
    name: "preSave",
    handler: ({ entry }) => {
      const rule = RULES[entry.get("collection")];
      if (!rule) return;
      const problems = rule(entry.get("data").toJS());
      // Decap shows the thrown text as "Failed to persist entry: <text>".
      if (problems.length) throw problems.join(" ");
    },
  });
})();
