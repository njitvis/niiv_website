import { loadEntries } from "../lib/content";
import { PUBLICATIONS, type Pub } from "./publications";

export type ProjectResource = {
  label: string;
  href: string;
  type: "code" | "demo" | "video" | "website";
};

export type ProjectPublication = {
  publicationId: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  resources?: ProjectResource[];
};

export type ProjectData = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  imageAlt: string;
  tags: string[];
  publications: ProjectPublication[];
  resources?: ProjectResource[];
};

export type ResolvedProjectPublication = ProjectPublication & {
  publication: Pub;
};

/**
 * Each project is one JSON file in src/content/projects/ (edited via /admin).
 * The file name is the project slug used in its URL; `order` sets the order on
 * the Research page (the first three are featured on Home).
 */
type ProjectEntry = Omit<ProjectData, "slug" | "tags" | "publications"> & {
  tags?: string[];
  publications?: ProjectPublication[];
  order?: number;
};

export const projectsData: ProjectData[] = loadEntries<ProjectEntry>(
  import.meta.glob("../content/projects/*.json", { eager: true }),
)
  .sort(
    (a, b) =>
      (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
      a.title.localeCompare(b.title),
  )
  .map(({ id, tags, publications, ...project }) => ({
    ...project,
    slug: id,
    tags: tags ?? [],
    publications: publications ?? [],
  }));

const publicationById = new Map(
  PUBLICATIONS.map((publication) => [publication.id, publication]),
);

export const getProjectBySlug = (slug: string): ProjectData | undefined =>
  projectsData.find((project) => project.slug === slug);

export const getProjectPublications = (
  project: ProjectData,
): ResolvedProjectPublication[] =>
  project.publications.flatMap((entry) => {
    const publication = publicationById.get(entry.publicationId);
    return publication ? [{ ...entry, publication }] : [];
  });

export const getProjectLatestYear = (project: ProjectData): number | undefined =>
  getProjectPublications(project).reduce<number | undefined>(
    (latest, { publication }) =>
      latest === undefined || publication.year > latest
        ? publication.year
        : latest,
    undefined,
  );
