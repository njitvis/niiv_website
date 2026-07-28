import { Search, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import ProjectDetail from "../components/ProjectDetail";
import {
  getProjectBySlug,
  getProjectPublications,
  projectsData,
  type ProjectData,
} from "../data/projectData";

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const projectSearchText = (project: ProjectData) => {
  const publicationFields = getProjectPublications(project).flatMap(
    ({ publication, summary }) => [
      publication.title,
      publication.authors,
      publication.venue,
      String(publication.year),
      ...(publication.tags ?? []),
      summary ?? "",
    ],
  );

  return normalizeSearchText(
    [
      project.title,
      project.description,
      project.overview,
      ...project.tags,
      ...publicationFields,
    ].join(" "),
  );
};

const ProjectNotFound = () => (
  <div className="min-h-[70vh] bg-[#F8F9FA]">
    <div className="container mx-auto px-4 py-24 text-center lg:px-8">
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

  const filteredProjects = useMemo(() => {
    const terms = normalizeSearchText(searchQuery).split(" ").filter(Boolean);

    if (terms.length === 0) return projectsData;

    return projectsData.filter((project) => {
      const searchable = projectSearchText(project);
      const compactSearchable = searchable.replace(/\s+/g, "");

      return terms.every(
        (term) =>
          searchable.includes(term) || compactSearchable.includes(term),
      );
    });
  }, [searchQuery]);

  const updateSearch = (value: string) => {
    const nextParams = new URLSearchParams(searchParams);

    if (value) {
      nextParams.set("q", value);
    } else {
      nextParams.delete("q");
    }

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
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:items-center lg:gap-14">
              <header className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                  Research projects
                </h1>
                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Explore our work in intelligible AI, visual analytics,
                  privacy, and human-centered computing.
                </p>
              </header>

              <section aria-label="Research project search">
                <div className="relative w-full">
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
                    placeholder="Search topics, publications, authors, or venues"
                    value={searchQuery}
                    onChange={(event) => updateSearch(event.target.value)}
                    className="search-input h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => updateSearch("")}
                      aria-label="Clear project search"
                      title="Clear search"
                      className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <p
                  className="mt-4 text-sm text-gray-600 lg:text-right"
                  aria-live="polite"
                >
                  <strong className="font-semibold text-gray-950">
                    {filteredProjects.length}
                  </strong>{" "}
                  {filteredProjects.length === 1
                    ? "research area"
                    : "research areas"}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="pb-14 pt-6 sm:pb-20 sm:pt-8">
          <div className="container mx-auto px-4 lg:px-8">
            {filteredProjects.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-lg border border-gray-200/80 bg-white/75 py-20 text-center backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-950">
                  No matching research areas
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Try a broader topic, author, venue, or publication title.
                </p>
                <button
                  type="button"
                  onClick={() => updateSearch("")}
                  className="mt-6 inline-flex min-h-10 items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:border-[#CC0000] hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Research;
