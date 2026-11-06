# Curated intermediate outputs for the pipeline figure

Use one real run across every hover: `20260826-043224`, IEEE VIS publications, 1990–2024.
The source has **3,877 rows and 20 fields**. The package contains compact excerpts, exact selected artifacts, a local copy of the generated report, and recorded validator evidence.

## Default content for each stage

| Hover target | Show first | Small supporting detail | Expand/download |
|---|---|---|---|
| A · Data Extractor | Three rows from the annual-count table: 1990 = 53, 2004 = 174, 2024 = 124 | 3,877 source rows, 20 source fields, 11 output tables | Complete 35-row annual table as CSV/JSON |
| B · Persona Explorer | One exact guided question from the expert and curious-reader personas | 6 questions total: 4 guided and 2 exploratory; each references tables and fields | The exact question JSON, including `answerable_because` |
| C · Visualization Generator | A live `l1` chart, with a selector for all six accepted panels | Line chart: `year` on x, `count` on y; Start year range slider | Complete accepted specifications and chart data |
| D · Report Designer | Actual generated report opening plus the guided/open panel sequence | 4 guided panels, 2 open panels; saved check recorded 6/6 rendered | Open the locally bundled interactive report |

The default hovers should answer **“what did this stage produce?”**. Put the complete JSON behind an explicit link. Treat the validator strip as its own hover targets so it answers **“what did the checks catch?”**.

## Ready-to-use hover copy

**A — Analysis tables ready for question generation**
3,877 source rows retained, with 20 source fields and 10 additional tables for analysis.

**B — Questions grounded in the available tables**
Each persona contributes two guided questions and one question for open exploration.

**C — Annual VIS output ranges from 53 to 174 papers**
The generated panel includes its question, chart specification, answer, and interaction instructions.

**D — IEEE VIS Publications: Growth, Venue Mix, and the Journal Turn**
The report shell places four guided panels before two panels for independent exploration.

## Validator hover content

- **A:** Rejected a handoff with 10 default insights because the required range was 4–5. The saved metadata has five analyses. The source table equals both its mechanical baseline and accepted snapshot.
- **B:** Rejected three guided questions for the expert persona. The final output has exactly two guided questions and one exploratory question for each persona.
- **C:** Rejected a chart batch that encoded nonexistent fields `C` and `J`. The accepted `h2` panel uses `share_pct` and `PaperType`; C and J are category values. The log does not identify the rejected panel, and no rejected spec or screenshot was saved. Show the recorded error plus a final accepted example, without fabricating a before image.
- **D:** Show the exact `report_check` result: six rendered IDs, no failed charts, no console errors, and no reported problems. Label it **Recorded browser check**.

## Corrections to the schematic before pairing it with this run

1. Change **3,620** to **3,877 source rows** and state **20 source fields retained**.
2. The real input is **IEEE VIS papers 1990-2024 - Main dataset.csv**. There is no separate `citations.json` input in this run.
3. Change the example annual count for **2024 to 124**. **174** is the peak annual total in **2004**. Keep the source grouping label **Vis**, rather than silently renaming it to VIS.
4. Use the saved questions when identifying an actual intermediate output. The question examples in the figure differ from this run.
5. Replace **filter matched 0 rows** with the documented **unknown encoded fields C and J** rejection, or label the existing rejection as an illustrative example rather than evidence from this run.

## Report order and evidence boundaries

The shell uses saved chart order within each stage: guided **h1, h2, l1, l2**, then open **h3, l3**. This is the order represented in `data/d-report.json` and in the report DOM. The saved framing prose describes a different stem order; use actual rendered order for the hover sequence.

The copied `report/index.html` is the original generated report. The report opening and panel previews in `images/` are new screenshots of that unchanged saved output. A fresh local check also confirmed that the `l1` slider reduces 35 marks to 5 for 2020 onward, reset restores 35, and the 2004 tooltip reports 174. This newer check is separate from the historical run result. `evidence/report-check-original.png` is the original screenshot from the historical run, including the export-status message that was visible when it was taken.

The saved chart specifications and framing are generated outputs, not independent scientific validation of their interpretations. The curation checks source preservation, annual totals, question/chart ID coverage, and saved validator results. It does not rerun the agent or claim universal correctness.

## Files to use

- `hover-content.json`: all four compact cards, validator events, copy, image paths and relative source pointers.
- `preview.html`: opens immediately on a live annual-count chart. Select any of the six generated panels, or hover, focus or click a stage. Images, chart data and visualization libraries are embedded; no build step or internet connection is needed. Linked downloads and the original report remain in the bundle.
- `data/c-chart-gallery.json`: all six exact accepted chart objects and the five source tables they use (319 rows total).
- `data/`: exact selected artifacts and compact display extracts, clearly named.
- `images/`: visual previews for the chart and report hovers.
- `report/`: complete original generated report with local JavaScript dependencies.
- `evidence/`: exact log excerpts, the original report-check screenshot, source hashes and verification results.

For the interactive report, serve this directory over HTTP as part of your website. For local review, open `preview.html` directly; its curated content, chart data, images and chart libraries are embedded so it does not require fetching assets. The live preview adjusts chart width to fit its container and follows the original renderer in removing problematic legend bindings on composite charts; accepted source specifications remain unchanged in the downloadable gallery.

Use a popover that stays open while the pointer is over it. Let click/tap pin it open, allow focus access from the keyboard, and close it with Escape or an outside click. Keep the preview readable at roughly 560 px wide with a scrollable maximum height. The detailed report should open only after an explicit click, not inside a tiny hover.

## Source on this computer

`/Users/saikiranbattula/Documents/visxgenai_challenge_2026/my-agent/local-runs/20260826-043224`

Every public excerpt links to a run-relative file and JSON pointer or log line. Full source file hashes are in `evidence/provenance.json`.

The refreshed preview was checked across all six live charts, the annual-count year slider (35 marks initially, five from 2020 onward), all eight stage/validator targets, pinning, keyboard access and a phone-width layout. See `evidence/preview-ui-check.json`.
