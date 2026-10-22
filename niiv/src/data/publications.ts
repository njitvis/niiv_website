import { loadEntries } from "../lib/content";

export type PaperFigure = {
  image: string;
  alt: string;
  caption?: string;
  credit?: string;
  source?: string;
};

export type Pub = {
  id: string;
  year: number;
  title: string;
  authors: string;
  venue: string;
  tags: string[];
  type?: "conf" | "journal" | "thesis" | "preprint";
  award?: string;
  abstract?: string;
  description?: string;
  /** Shown on the paper page as a gallery; the first one is also used in the spotlight. */
  figures?: PaperFigure[];
  /** Filled in to feature the paper in the home page Research Spotlight. */
  spotlight?: {
    /** Short title for the spotlight index, e.g. "Relevance is not enough". */
    title: string;
    summary: string;
  };
  links?: {
    pdf?: string;
    arxiv?: string;
    doi?: string;
    code?: string;
    website?: string;
    poster?: string;
    demo?: string;
  };
  bibtex?: string;
};

/**
 * PUBLICATIONS
 * Each paper is one JSON file in src/content/publications/ (edited via /admin).
 * The file name is the paper id that projectData.ts refers to. Within a year,
 * papers are listed by `order`; new papers without one appear first.
 */
type PublicationEntry = Omit<Pub, "id"> & { order?: number };

export const PUBLICATIONS: Pub[] = loadEntries<PublicationEntry>(
  import.meta.glob("../content/publications/*.json", { eager: true }),
)
  .sort((a, b) => b.year - a.year || (a.order ?? 0) - (b.order ?? 0));

export const paperHref = (id: string) => `/publications/${id}`;

export const getPublicationById = (id: string) =>
  PUBLICATIONS.find((publication) => publication.id === id);

/** A short name for tight spaces: the spotlight title, or the part before a colon. */
export const getShortTitle = (publication: Pub) =>
  publication.spotlight?.title ?? publication.title.split(":")[0].trim();

const TYPE_LABELS: Record<NonNullable<Pub["type"]>, string> = {
  conf: "Conference paper",
  journal: "Journal article",
  thesis: "Thesis",
  preprint: "Preprint",
};

export const getTypeLabel = (publication: Pub) =>
  publication.type ? TYPE_LABELS[publication.type] : undefined;
