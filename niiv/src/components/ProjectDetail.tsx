import { ArrowLeft, Code2, ExternalLink, MonitorPlay, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getProjectLatestYear,
  getProjectPublications,
  projectsData,
  type ProjectData,
  type ProjectResource,
} from "../data/projectData";
import { paperHref } from "../data/publications";
import { getPaperLinks } from "../lib/paperLinks";
import LinkButton from "./LinkButton";
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
    <>
      {resources.map((resource) => (
        <LinkButton
          key={`${resource.label}-${resource.href}`}
          href={resource.href}
          label={resource.label}
          icon={resourceIcon[resource.type]}
        />
      ))}
    </>
  );
};

const ProjectDetail = ({ project }: ProjectDetailProps) => {
  const publications = getProjectPublications(project);
  const latestYear = getProjectLatestYear(project);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="border-b border-gray-100 bg-[#F8F9FA]">
        <div className="site-shell py-10 sm:py-14">
          <Link
            to="/research"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to research
          </Link>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[#B00000]">
                Research area
              </p>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight text-gray-950 sm:text-5xl">
                {project.title}
              </h1>
              <p className="reading-copy mt-5 max-w-3xl text-gray-700">
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
                <div className="mt-7 flex flex-wrap gap-2">
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
          <div className="site-shell grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]">
            <h2 className="text-sm font-semibold uppercase text-[#B00000]">
              Overview
            </h2>
            <p className="reading-copy text-gray-700">{project.overview}</p>
          </div>
        </section>

        <section
          className="bg-[#F8F9FA] py-12 sm:py-16"
          aria-labelledby="research-outputs"
        >
          <div className="site-shell">
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
                ({ publication, summary, resources, ...entry }) => {
                  // A figure set on this project wins; otherwise the paper's first figure.
                  const figure = entry.image
                    ? { image: entry.image, alt: entry.imageAlt ?? "", caption: entry.caption }
                    : publication.figures?.[0];
                  const image = figure?.image;

                  return (
                  <article
                    key={publication.id}
                    className="rounded-lg border border-gray-200/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-8 supports-[backdrop-filter]:bg-white/70"
                  >
                    <div
                      className={
                        image
                          ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12"
                          : "max-w-4xl"
                      }
                    >
                      <div>
                        <p className="mb-3 text-sm font-semibold text-[#B00000]">
                          {publication.venue} · {publication.year}
                        </p>
                        <h3 className="text-2xl font-semibold leading-snug text-gray-950">
                          <Link
                            to={paperHref(publication.id)}
                            className="hover:text-[#B00000] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                          >
                            {publication.title}
                          </Link>
                        </h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600">
                          {publication.authors}
                        </p>
                        {summary && (
                          <p className="reading-copy mt-5 text-gray-700">
                            {summary}
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap gap-2">
                          {getPaperLinks(publication).map((link) => (
                            <LinkButton key={link.href} href={link.href} label={link.label} icon={link.icon} primary={link.primary} />
                          ))}
                          <ResourceLinks resources={resources} />
                        </div>
                      </div>

                      {figure && (
                        <figure>
                          <div className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-md border border-gray-200/80 bg-[#F8F9FA] p-4">
                            <img
                              src={figure.image}
                              alt={figure.alt}
                              loading="lazy"
                              className="h-full w-full object-contain"
                            />
                          </div>
                          {(figure.caption || figure.credit) && (
                            <figcaption className="mt-3 text-xs leading-5 text-gray-500">
                              {figure.caption ?? figure.credit}
                            </figcaption>
                          )}
                        </figure>
                      )}
                    </div>
                  </article>
                  );
                },
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
