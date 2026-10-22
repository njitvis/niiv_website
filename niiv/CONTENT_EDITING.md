# Editing website content

Lab members update the website through an editing screen at **`/admin`**, not by editing code.
Every edit becomes a pull request that a maintainer approves before it goes live.

| What | Where it's stored | Edited in `/admin` |
| --- | --- | --- |
| People | `src/content/people/*.json` | Yes |
| Publications | `src/content/publications/*.json` | Yes |
| Previous research assistants | `src/content/research-assistants/*.json` | Yes |
| Research projects | `src/content/projects/*.json` | Yes |
| News / lab updates | `src/content/news/*.json` | Yes |

Each person, paper and project is its own JSON file, and the file name is its id:
- A publication's file name (e.g. `trivea-transparent-ranking-interpretation.json`) is what projects use to link to it.
  In `/admin`, projects pick papers from a searchable list, so nobody types ids.
- A news item's file name starts with its month (`2024-11-kaustav-phd-defense.json`); the latest six show on the home page.
- **Paper pages:** every paper has its own page at `/publications/<file name>`, opened by clicking its title anywhere
  on the site. It shows the title, authors and venue, link buttons plus **Cite** (copies BibTeX; a simple entry is
  generated if the BibTeX field is empty), a gallery of the paper's **Figures**, its **Research description** (or the
  abstract if there is no description; with both, the abstract sits under "Read abstract"), the projects it belongs to,
  and more papers from those projects.
- **Figures:** add them under **Figures** on the publication; drag to reorder. The first one is also used in the Research
  Spotlight and on project pages (a figure set on a project's paper entry overrides it there).
- **Feature a paper:** the home page Research Spotlight is for research only (news stays in Lab Updates). Fill in the
  **Homepage Research Spotlight** section of the publication (a short title and a short summary) and make sure it has at
  least one figure. The spotlight shows featured papers newest first, up to five, as a list of short titles (the full
  title appears on hover); research projects are shown only when no paper is featured. Ideally the paper is part of a
  research project, so the spotlight shows "Part of: project" (not required: the content check only warns; set
  `FEATURED_PAPERS_NEED_A_PROJECT` in `scripts/validate-content.mjs` to enforce it). Clear the section to stop featuring.
- A project's file name is its URL (`privee.json` → `/research/privee`). New projects get a file name from their title;
  rename the file in the pull request if you want a shorter URL.

## For lab members

1. Ask the maintainer to add your GitHub username to the editor list (one time).
2. Go to `https://<website>/admin` and sign in with GitHub.
3. Pick **People**, **Publications**, **Research projects** or **News**, open an entry (or **New**), and fill in the form.
   To add a new paper to a project: add it under Publications first, then select it in the project.
4. Click **Save**, then set the status to **Ready**. This sends the change to the maintainers.
5. After a maintainer approves it, the website updates within a few minutes.

## For maintainers

### Roles

| Role | Who | Can do | How it's granted |
| --- | --- | --- | --- |
| **Editor** | lab members | sign in to `/admin`, edit, submit changes for review; can't publish | GitHub username in `ALLOWED_USERS` (Cloudflare); **no** write access to the repository |
| **Approver** | at least two maintainers | review and merge pull requests, which publishes them | write access to `njitvis/niiv_website`, plus `ALLOWED_USERS` to use `/admin` |
| **Access-list manager** | at least two maintainers | add and remove editors | member of the Cloudflare account that hosts the sign-in helper |

Editors edit through their own fork (`open_authoring` in `public/admin/config.yml`), so their changes always arrive
as pull requests. Decap itself has no roles; it does what each person's GitHub permissions allow.

**Adding an editor:** add their GitHub username to `ALLOWED_USERS`
([how](../cms-auth/README.md#managing-who-can-edit)). **Removing one:** delete it there. That blocks new sign-ins
immediately; an already-open session lasts until they log out, but they still can't publish without an approver.
In an emergency, the OAuth App's settings page has **Revoke all user tokens**, which signs everyone out.

### Getting notified and approving edits

- **Review requests:** `.github/CODEOWNERS` makes GitHub automatically request a review from the approvers on every
  pull request that changes content. That sends them an email and lists it at github.com/pulls/review-requested.
- **Everything else:** approvers should **Watch** the repository (Watch → Custom → Pull requests) and keep email
  notifications on (GitHub → Settings → Notifications).
- Pending edits also appear in `/admin` → **Workflow**.

To approve: open the pull request, check the **Content check** result and the changed files, then **Merge**. Amplify
rebuilds the site within a few minutes. To reject, leave a comment or close the pull request.

### Checks

Content is checked at three points, so mistakes are caught as early as possible:

1. **While editing (`/admin`):** required fields, link formats and dropdowns are enforced by the form, and
   `public/admin/checks.js` blocks saving an incomplete spotlight section or a project with an empty, repeated or
   half-filled paper or link. The reason appears at the top right of the editor.
2. **On every pull request:** the **Content check** GitHub Action (`.github/workflows/content-check.yml`) runs
   `scripts/validate-content.mjs` and shows ✅ or ❌ on the pull request. This covers checks across entries: a project
   pointing to a deleted paper, a featured paper that isn't in any project, missing image/PDF files, duplicates, and
   file sizes (images: warning over 1 MB, fails over 5 MB; PDFs: warning over 15 MB, fails over 30 MB). Don't
   merge a pull request with a ❌; open the check's details to see what to fix. (GitHub may ask you to click
   **Approve and run** the first time someone new opens a pull request.)
3. **On every build:** `npm run build` runs the same check first, so a bad merge fails the Amplify build instead of
   breaking the live site. Run `npm run validate` locally for the same report.

### Content inventory

`npm run inventory` regenerates `CONTENT_INVENTORY.md`: every person, paper, project and news item, the file
behind it, and which optional details are still missing. Use it to plan what to add, update or remove.

### Trying the editor locally

```sh
npm run cms   # terminal 1: local content server (no GitHub login needed)
npm run dev   # terminal 2
```

Open `http://localhost:5173/admin/index.html` and click **Login**. Locally, saving writes straight to
the files in `src/content/`, so review them with `git diff` like any other change.

### Launch checklist

Do these once, before sharing `/admin` with the lab:

- [ ] **OAuth App owned by the organization:** an `njitvis` owner creates it under the organization (organization
      Settings → Developer settings → OAuth Apps) rather than on a personal account, so it keeps working when people
      leave. If saving still fails with "OAuth App access restrictions", approve it at
      github.com/organizations/njitvis/settings/oauth_application_policy.
- [ ] **Sign-in helper:** deploy `../cms-auth/worker.js` on Cloudflare and fill in its settings, including
      `ALLOWED_USERS` ([steps](../cms-auth/README.md)). Then set `base_url` in `public/admin/config.yml`.
- [ ] **Two people on the Cloudflare account** (or a shared lab account), so the access list can always be managed.
- [ ] **Two approvers** with write access, with their GitHub usernames replacing `@APPROVER_1`/`@APPROVER_2` in
      `../.github/CODEOWNERS`.
- [ ] **Merge this setup into `master`.** The editor reads and writes the `master` branch.
- [ ] **Amplify rewrites:** copy the rules from `../aws-amplify-routes.json` into the Amplify console (Hosting →
      Rewrites and redirects): the new `/admin` rule above the catch-all rule, and `xml` added to the catch-all
      rule's list so `sitemap.xml` is served.
- [ ] **Site address:** check `VITE_SITE_URL` in `.env` (currently `https://niiv.njitvis.com`). Link previews,
      `sitemap.xml` and `robots.txt` use it.
- [ ] **Branch protection on `master`** (repository Settings → Branches → Add rule): require a pull request with
      1 approval and the **Content check** to pass. This also stops approvers publishing directly from `/admin`; their
      own edits then need the other approver.
- [ ] **Test with one lab member:** they sign in, edit and submit; you get the review request, merge, and see the
      change live.
