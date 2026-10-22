import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ProjectData } from "../data/projectData";

type RelatedProjectsProps = {
  projects: ProjectData[];
  currentProjectSlug: string;
};

const RelatedProjects = ({
  projects,
  currentProjectSlug,
}: RelatedProjectsProps) => {
  const otherProjects = projects.filter(
    (project) => project.slug !== currentProjectSlug,
  );

  if (otherProjects.length === 0) return null;

  return (
    <section className="border-t border-gray-200 bg-white py-12 sm:py-16">
      <div className="site-shell">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase text-[#B00000]">
              Continue exploring
            </p>
            <h2 className="text-2xl font-semibold text-gray-950">
              More research areas
            </h2>
          </div>
          <Link
            to="/research"
            className="hidden text-sm font-semibold text-[#B00000] hover:underline sm:inline"
          >
            View all
          </Link>
        </div>

        <div className="compact-cards-grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200">
          {otherProjects.map((project) => (
            <Link
              key={project.slug}
              to={`/research/${project.slug}`}
              className="group flex min-h-44 flex-col bg-white p-5 transition-colors hover:bg-gray-50 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
            >
              <h3 className="mb-3 text-xl font-semibold leading-tight text-gray-950 group-hover:text-[#B00000]">
                {project.title}
              </h3>
              <p className="reading-copy mb-5 line-clamp-3 text-gray-700">
                {project.description}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#B00000]">
                Explore
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProjects;
