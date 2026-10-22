import { projectsData, type ProjectData } from "./projectData";
import { getShortTitle, paperHref, PUBLICATIONS, type PaperFigure } from "./publications";
import { getPaperLinks, type PaperLink } from "../lib/paperLinks";

export type SpotlightItem = {
  id: string;
  /** Shown in the index on the left; the full title appears on hover. */
  shortTitle: string;
  /** Small line under the short title in the index, e.g. "2023 · IEEE VIS". */
  meta: string;
  title: string;
  /** Small label above the title (venue for papers). */
  eyebrow: string;
  summary: string;
  figure: PaperFigure;
  /** Where the title links: the paper page, or the project page. */
  href: string;
  links: PaperLink[];
  /** The research project the item belongs to, if any. */
  project?: ProjectData;
};

const MAX_ITEMS = 5;
/** Projects are shown only when no paper is featured, so the spotlight is never empty. */
const FALLBACK_PROJECTS = 3;

const projectHref = (slug: string) => `/research/${slug}`;

const projectForPaper = (paperId: string) =>
  projectsData.find((project) =>
    project.publications.some((entry) => entry.publicationId === paperId),
  );

/**
 * Home page "Research Spotlight" is for research only (news stays in Lab Updates):
 * papers with a filled-in spotlight section and at least one figure, newest
 * first, up to five. Projects appear only if no paper is featured.
 */
const featuredPapers: SpotlightItem[] = PUBLICATIONS.filter(
  (paper) => paper.spotlight && paper.figures?.length,
)
  .slice(0, MAX_ITEMS)
  .map((paper) => ({
    id: `publication-${paper.id}`,
    shortTitle: getShortTitle(paper),
    meta: [paper.year, paper.tags?.[0]].filter(Boolean).join(" · "),
    title: paper.title,
    eyebrow: paper.venue,
    summary: paper.spotlight!.summary,
    figure: paper.figures![0],
    href: paperHref(paper.id),
    links: getPaperLinks(paper),
    project: projectForPaper(paper.id),
  }));

const projectFallback: SpotlightItem[] = projectsData
  .slice(0, featuredPapers.length > 0 ? 0 : FALLBACK_PROJECTS)
  .map((project) => ({
    id: `project-${project.slug}`,
    shortTitle: project.title,
    meta: "Research project",
    title: project.title,
    eyebrow: "Research project",
    summary: project.description,
    figure: { image: project.image, alt: project.imageAlt },
    href: projectHref(project.slug),
    links: [],
  }));

export const SPOTLIGHT: SpotlightItem[] = [...featuredPapers, ...projectFallback];
