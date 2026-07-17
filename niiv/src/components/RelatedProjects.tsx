import type { ProjectData } from "../data/projectData";

interface RelatedProjectsProps {
  projects: ProjectData[];
  currentProjectSlug: string;
}

const RelatedProjects = ({ projects, currentProjectSlug }: RelatedProjectsProps) => {
  const relatedProjects = projects
    .filter(p => p.slug !== currentProjectSlug)
    .slice(0, 4);

  if (relatedProjects.length === 0) return null;

  return (
    <section className="py-12 border-t border-gray-200 bg-gray-50">
      <div className="container mx-auto px-6 lg:px-8">
        <h2 className="text-2xl font-serif font-bold text-foreground mb-8">
          Related Projects
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProjects.map((project) => (
            <a
              key={project.slug}
              href={`/research?project=${project.slug}`}
              className="group bg-white rounded-[16px] border border-gray-200 p-5 hover:border-primary hover:shadow-lg transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <h3 className="text-base font-semibold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 border border-gray-200 text-gray-600 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {project.conference} · {project.year}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProjects;
