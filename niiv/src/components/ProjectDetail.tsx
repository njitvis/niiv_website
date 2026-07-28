import {
  ArrowLeft,
  Code2,
  ExternalLink,
  FileText,
  MonitorPlay,
  PlayCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  getProjectLatestYear,
  getProjectPublications,
  projectsData,
  type ProjectData,
  type ProjectResource,
} from "../data/projectData";
import type { Pub } from "../data/publications";
import RelatedProjects from "./RelatedProjects";

type ProjectDetailProps = {
  project: ProjectData;
};

const resourceIcon = {
  code: Code2,
  demo: MonitorPlay,
  video: PlayCircle,
  website: ExternalLink,
};

const ResourceLinks = ({
  resources,
}: {
  resources: ProjectResource[] | undefined;
}) => {
  if (!resources?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {resources.map((resource) => {
        const Icon = resourceIcon[resource.type];

        return (
          <a
            key={`${resource.label}-${resource.href}`}
            href={resource.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:border-[#CC0000] hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
            {resource.label}
          </a>
        );
      })}
    </div>
  );
};

const PublicationLinks = ({ publication }: { publication: Pub }) => {
  const links = [
    publication.links?.pdf
      ? {
          label: "PDF",
          href: publication.links.pdf,
          icon: FileText,
        }
      : null,
    publication.links?.doi
      ? {
          label: "DOI",
          href: publication.links.doi,
          icon: ExternalLink,
        }
      : null,
    publication.links?.arxiv
      ? {
          label: "arXiv",
          href: publication.links.arxiv,
          icon: ExternalLink,
        }
      : null,
    publication.links?.website
      ? {
          label: "Publication page",
          href: publication.links.website,
          icon: ExternalLink,
        }
      : null,
    publication.links?.code
      ? {
          label: "Code",
          href: publication.links.code,
          icon: Code2,
        }
      : null,
  ].filter((link) => link !== null);

  if (links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ label, href, icon: Icon }) => (
        <a
          key={`${label}-${href}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center gap-2 rounded-md bg-gray-950 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
        >
          <Icon className="h-4 w-4" aria-hidden="true" />
          {label}
        </a>
      ))}
    </div>
  );
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const publications = getProjectPublications(project);
  const latestYear = getProjectLatestYear(project);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-gray-100 bg-[#F8F9FA]">
        <div className="container mx-auto px-4 py-10 sm:py-14 lg:px-8">
          <Link
            to="/research"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to research
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[#B00000]">
                Research area
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">
                {project.description}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                <span>
                  <strong className="font-semibold text-gray-950">
                    {publications.length}
                  </strong>{" "}
                  selected publications
                </span>
                {latestYear && (
                  <span>
                    Latest work{" "}
                    <strong className="font-semibold text-gray-950">
                      {latestYear}
                    </strong>
                  </span>
                )}
              </div>

              {project.resources && (
                <div className="mt-7">
                  <ResourceLinks resources={project.resources} />
                </div>
              )}
            </div>

            <figure className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-lg border border-white/90 bg-white/75 p-5 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/65">
              <img
                src={project.image}
                alt={project.imageAlt}
                className="h-full w-full object-contain"
              />
            </figure>
          </div>
        </div>
      </header>

      <main>
        <section className="border-b border-gray-200 bg-white py-12 sm:py-16">
          <div className="container mx-auto grid gap-5 px-4 lg:grid-cols-[220px_minmax(0,760px)] lg:px-8">
            <h2 className="text-sm font-semibold uppercase text-[#B00000]">
              Overview
            </h2>
            <p className="text-lg leading-8 text-gray-700">{project.overview}</p>
          </div>
        </section>

        <section
          className="bg-[#F8F9FA] py-12 sm:py-16"
          aria-labelledby="research-outputs"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-4 max-w-3xl">
              <p className="mb-2 text-xs font-semibold uppercase text-[#B00000]">
                Publications and outcomes
              </p>
              <h2
                id="research-outputs"
                className="text-3xl font-bold text-gray-950"
              >
                Selected research outputs
              </h2>
            </div>

            <div className="mt-8 grid gap-5">
              {publications.map(
                ({
                  publication,
                  summary,
                  image,
                  imageAlt,
                  caption,
                  resources,
                }) => (
                  <article
                    key={publication.id}
                    className="rounded-lg border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 supports-[backdrop-filter]:bg-white/70"
                  >
                    <div
                      className={
                        image
                          ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:gap-12"
                          : "max-w-4xl"
                      }
                    >
                      <div>
                        <p className="mb-3 text-sm font-semibold text-[#B00000]">
                          {publication.venue} · {publication.year}
                        </p>
                        <h3 className="text-2xl font-semibold leading-snug text-gray-950">
                          {publication.title}
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {publication.authors}
                        </p>
                        {summary && (
                          <p className="mt-5 text-base leading-7 text-gray-700">
                            {summary}
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2">
                          <PublicationLinks publication={publication} />
                          <ResourceLinks resources={resources} />
                        </div>
                      </div>

                      {image && (
                        <figure>
                          <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md border border-gray-200/80 bg-[#F8F9FA] p-4">
                            <img
                              src={image}
                              alt={imageAlt ?? ""}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          {caption && (
                            <figcaption className="mt-3 text-xs leading-5 text-gray-500">
                              {caption}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  </article>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <RelatedProjects
        projects={projectsData}
        currentProjectSlug={project.slug}
      />
    </div>
  );
};

export default ProjectDetail;
