import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import {
  getProjectLatestYear,
  type ProjectData,
} from "../data/projectData";

type ProjectCardProps = {
  project: ProjectData;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const latestYear = getProjectLatestYear(project);
  const publicationCount = project.publications.length;

  return (
    <article className="group h-full overflow-hidden rounded-lg border border-gray-200/90 bg-white/80 shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md supports-[backdrop-filter]:bg-white/70">
      <Link
        to={`/research/${project.slug}`}
        className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-inset"
        aria-label={`Explore ${project.title}`}
      >
        <div className="p-5 pb-4 sm:p-6 sm:pb-5">
          <h2 className="mb-3 text-xl font-semibold leading-snug text-gray-950 transition-colors group-hover:text-[#B00000]">
            {project.title}
          </h2>
          <p className="text-sm leading-6 text-gray-600">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2" aria-label="Research topics">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gray-200/90 bg-white/70 px-3 py-1.5 text-xs font-medium text-gray-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div className="flex aspect-[16/9] items-center justify-center overflow-hidden rounded-md border border-gray-200/80 bg-[#F8F9FA] p-4">
            <img
              src={project.image}
              alt={project.imageAlt}
              loading="lazy"
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-gray-200/80 px-5 py-4 sm:px-6">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span>
              {publicationCount}{" "}
              {publicationCount === 1 ? "publication" : "publications"}
            </span>
            {latestYear && (
              <>
                <span aria-hidden="true">·</span>
                <span>Latest {latestYear}</span>
              </>
            )}
          </div>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#B00000] transition-colors group-hover:text-[#8F0000]">
            Explore project
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
};

export default ProjectCard;
