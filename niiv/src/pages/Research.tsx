import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import HighlightedText from "../components/HighlightedText";
import ProjectCard, {
  type ProjectSearchMatch,
  type ProjectSearchMatchSection,
} from "../components/ProjectCard";
import ProjectDetail from "../components/ProjectDetail";
import {
  getProjectBySlug,
  getProjectPublications,
  projectsData,
  type ProjectData,
} from "../data/projectData";

type SearchSection = ProjectSearchMatchSection & {
  values?: string[];
};

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getSearchSections = (project: ProjectData): SearchSection[] => {
  const publications = getProjectPublications(project);

  const publicationTitles = publications.map(({ publication }) => publication.title);
  const publicationAuthors = publications.map(({ publication }) => publication.authors);
  const publicationVenues = publications.map(
    ({ publication }) => `${publication.venue} (${publication.year})`,
  );
  const publicationTags = [
    ...new Set(publications.flatMap(({ publication }) => publication.tags ?? [])),
  ];
  const publicationSummaries = publications
    .map(({ summary }) => summary)
    .filter((summary): summary is string => Boolean(summary));

  const sections: SearchSection[] = [
    {
      key: "title",
      label: "Title",
      text: project.title,
    },
    {
      key: "description",
      label: "Description",
      text: project.description,
    },
    {
      key: "overview",
      label: "Overview",
      text: project.overview,
    },
    {
      key: "project-tags",
      label: "Project tags",
      text: project.tags.join(", "),
      values: project.tags,
    },
    {
      key: "publication-tags",
      label: "Publication tags",
      text: publicationTags.join(", "),
      values: publicationTags,
    },
    {
      key: "publication-titles",
      label: "Publication titles",
      text: publicationTitles.join("; "),
      values: publicationTitles,
    },
    {
      key: "publication-summaries",
      label: "Publication summaries",
      text: publicationSummaries.join(" "),
      values: publicationSummaries,
    },
    {
      key: "authors",
      label: "Authors",
      text: publicationAuthors.join("; "),
      values: publicationAuthors,
    },
    {
      key: "venues",
      label: "Venues",
      text: publicationVenues.join("; "),
      values: publicationVenues,
    },
  ];

  return sections.filter((section) => section.text.length > 0);
};

const sectionMatchesAnyTerm = (section: SearchSection, terms: string[]) => {
  const searchable = normalizeSearchText(section.text);
  const compactSearchable = searchable.replace(/\s+/g, "");

  return terms.some(
    (term) => searchable.includes(term) || compactSearchable.includes(term),
  );
};

const sectionContainsEveryTerm = (sections: SearchSection[], terms: string[]) => {
  const searchable = normalizeSearchText(
    sections.map((section) => section.text).join(" "),
  );
  const compactSearchable = searchable.replace(/\s+/g, "");

  return terms.every(
    (term) => searchable.includes(term) || compactSearchable.includes(term),
  );
};

const matchingValues = (section: SearchSection, terms: string[]) =>
  (section.values ?? [section.text]).filter((value) => {
    const searchable = normalizeSearchText(value);
    const compactSearchable = searchable.replace(/\s+/g, "");

    return terms.some(
      (term) => searchable.includes(term) || compactSearchable.includes(term),
    );
  });

const buildProjectMatch = (
  project: ProjectData,
  terms: string[],
): ProjectSearchMatch | undefined => {
  if (terms.length === 0) return undefined;

  const sections = getSearchSections(project);
  const matchedSections = sections
    .filter((section) => sectionMatchesAnyTerm(section, terms))
    .map((section) => {
      const matches = matchingValues(section, terms);

      return {
        key: section.key,
        label: section.label,
        text: matches.length > 0 ? matches.slice(0, 3).join("; ") : section.text,
      };
    });

  const matchedTags = getSearchSections(project)
    .filter(
      (section) =>
        section.key === "project-tags" || section.key === "publication-tags",
    )
    .flatMap((section) => matchingValues(section, terms));

  return {
    sections: matchedSections,
    matchedTags,
  };
};

const ProjectNotFound = () => (
  <div className="min-h-[70vh] bg-[#F8F9FA]">
    <div className="site-shell py-24 text-center">
      <p className="mb-3 text-sm font-semibold text-[#B00000]">
        Project not found
      </p>
      <h1 className="text-3xl font-bold text-gray-950">
        This research page is not available.
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-gray-600">
        The project may have moved, or the address may be incomplete.
      </p>
      <Link
        to="/research"
        className="mt-7 inline-flex min-h-10 items-center rounded-md bg-[#CC0000] px-4 py-2 text-sm font-semibold text-white hover:bg-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
      >
        View all research
      </Link>
    </div>
  </div>
);

const Research = () => {
  const { projectSlug } = useParams<{ projectSlug?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedProject = projectSlug ? getProjectBySlug(projectSlug) : undefined;
  const searchQuery = searchParams.get("q") ?? "";
  const [searchOpen, setSearchOpen] = useState(false);
  const searchTerms = useMemo(
    () => normalizeSearchText(searchQuery).split(" ").filter(Boolean),
    [searchQuery],
  );

  useEffect(() => {
    document.title = selectedProject
      ? `${selectedProject.title} | NIIV Lab`
      : projectSlug
        ? "Project not found | NIIV Lab"
        : "Research Projects | NIIV Lab";

    return () => {
      document.title = "NIIV";
    };
  }, [projectSlug, selectedProject]);

  const projectSearchResults = useMemo(() => {
    if (searchTerms.length === 0) {
      return projectsData.map((project) => ({ project, match: undefined }));
    }

    return projectsData
      .map((project) => {
        const sections = getSearchSections(project);

        return {
          project,
          match: buildProjectMatch(project, searchTerms),
          isMatch: sectionContainsEveryTerm(sections, searchTerms),
        };
      })
      .filter(({ isMatch }) => isMatch)
      .map(({ project, match }) => ({ project, match }));
  }, [searchTerms]);

  const updateSearch = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }
    nextParams.delete("scope");

    setSearchParams(nextParams, { replace: true });
  };

  if (projectSlug) {
    return selectedProject ? (
      <ProjectDetail project={selectedProject} />
    ) : (
      <ProjectNotFound />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <header className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                  Research projects
                </h1>
                <p className="reading-copy mt-5 text-gray-700">
                  Explore our work in intelligible AI, visual analytics,
                  privacy, and human-centered computing.
                </p>
              </header>

              <section aria-label="Research project search">
                <div
                  className="relative w-full"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setSearchOpen(false);
                    }
                  }}
                >
                  <div className="relative">
                    <Search
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                      aria-hidden="true"
                    />
                    <label htmlFor="project-search" className="sr-only">
                      Search research projects
                    </label>
                    <input
                      id="project-search"
                      type="search"
                      placeholder="Search topics, tags, publications, authors, or venues"
                      value={searchQuery}
                      onChange={(event) => {
                        updateSearch(event.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => setSearchOpen(true)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setSearchOpen(false);
                      }}
                      aria-expanded={searchOpen && searchTerms.length > 0}
                      aria-controls="project-live-results"
                      autoComplete="off"
                      className="search-input h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => {
                          updateSearch("");
                          setSearchOpen(false);
                        }}
                        aria-label="Clear project search"
                        title="Clear search"
                        className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {searchOpen && searchTerms.length > 0 && (
                    <div
                      id="project-live-results"
                      className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
                    >
                      {projectSearchResults.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto" role="list">
                          {projectSearchResults.map(({ project, match }) => (
                            <Link
                              key={project.slug}
                              to={`/research/${project.slug}`}
                              onClick={() => setSearchOpen(false)}
                              className="block border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#F8F9FA] focus-visible:bg-[#F8F9FA] focus-visible:outline-none"
                              role="listitem"
                            >
                              <p className="text-sm font-semibold leading-5 text-gray-950">
                                <HighlightedText
                                  text={project.title}
                                  terms={searchTerms}
                                />
                              </p>
                              <div className="mt-1 space-y-0.5">
                                {(match?.sections ?? [])
                                  .filter((section) => section.key !== "title")
                                  .slice(0, 2)
                                  .map((section) => (
                                    <p
                                      key={section.key}
                                      className="line-clamp-1 text-xs leading-5 text-gray-600"
                                    >
                                      <span className="font-semibold text-gray-800">
                                        {section.label}:{" "}
                                      </span>
                                      <HighlightedText
                                        text={section.text}
                                        terms={searchTerms}
                                      />
                                    </p>
                                  ))}
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <p className="px-4 py-5 text-sm text-gray-600">
                          No matching research projects
                        </p>
                      )}

                    </div>
                  )}
                </div>

                <p
                  className="mt-4 text-sm text-gray-600 lg:text-right"
                  aria-live="polite"
                >
                  <strong className="font-semibold text-gray-950">
                    {projectsData.length}
                  </strong>{" "}
                  {projectsData.length === 1
                    ? "research area"
                    : "research areas"}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section
          id="research-results"
          className="scroll-mt-24 pb-14 pt-6 sm:pb-20 sm:pt-8"
        >
          <div className="site-shell">
            <div className="cards-grid gap-6">
              {projectsData.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Research;
