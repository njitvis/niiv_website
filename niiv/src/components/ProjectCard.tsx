import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    year: number;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    papers: any[];
  };
  onViewDetails: (slug: string) => void;
}

const ProjectCard = ({ project, onViewDetails }: ProjectCardProps) => {
  return (
    <div 
      onClick={() => onViewDetails(project.slug)}
      className="flex flex-col overflow-hidden transition-all duration-300 rounded-2xl border border-border bg-card shadow-md hover:shadow-2xl hover:-translate-y-2 cursor-pointer group h-full"
    >
      {/* Project Image */}
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
      </div>

      {/* Project Content */}
      <div className="p-6 bg-muted/40 flex flex-col flex-grow">
        <h3 className="text-xl font-bold leading-tight text-foreground transition-colors duration-300 group-hover:text-[#B00000] mb-3">
          {project.title}
        </h3>
        <p className="mb-4 text-sm text-muted-foreground leading-relaxed flex-grow
  transition-colors duration-300
  group-hover:text-foreground">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="inline-flex items-center rounded-full border border-border bg-background
             px-3 py-1 text-xs font-medium text-foreground
             hover:border-[hsl(25,65%,50%)] hover:text-[hsl(25,65%,45%)]
             transition-colors">
              {tag}
            </span>
          ))}
        </div>
        
        <button className="w-full mt-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-ghost-bg text-ghost-text border border-ghost-border rounded-[13px] hover:bg-ghost-bg-hover hover:text-ghost-text-hover transition-all duration-150 font-medium">
          Read More
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
