// import { ArrowLeft, ExternalLink, FileText, PlayCircle } from "lucide-react";
// import type { ProjectData } from "../data/projectData";
// import { projectsData } from "../data/projectData";
// import RelatedProjects from "./RelatedProjects";

// interface ProjectDetailPanelProps {
//   project: ProjectData | null | undefined;
//   onClose: () => void;
// }

// const ProjectDetailPanel = ({ project, onClose }: ProjectDetailPanelProps) => {
//   if (!project) return null;

//   return (
//     <>
//       {/* Overlay - Full Screen */}
//       <div
//         className="fixed inset-0 bg-black/60 z-40 animate-fade-in backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Panel - Full Screen */}
//       <div className="fixed inset-0 z-50 overflow-y-auto bg-background animate-slide-in-right">
//         {/* Header */}
//         <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-10 shadow-sm">
//           <div className="max-w-7xl mx-auto px-8 lg:px-16 py-4">
//             <button
//               onClick={onClose}
//               className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-2 py-1"
//             >
//               <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
//               <span className="font-medium">Back to Projects</span>
//             </button>
//           </div>
//         </div>

//         {/* Project Title Header - Full Width */}
//         <div className="bg-background border-b border-border">
//           <div className="max-w-7xl mx-auto px-8 lg:px-16 py-16">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
//               {project.title}
//             </h1>
//             <p className="text-lg text-muted-foreground mb-4">
//               {project.conference} · {project.year}
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {project.tags.map((tag) => (
//                 <span
//                   key={tag}
//                   className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm rounded-full font-medium"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Papers Sections - Alternating Backgrounds */}
//         {project.papers.length > 0 ? (
//           <div>
//             {project.papers.map((paper, index) => (
//               <section
//                 key={index}
//                 className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
//               >
//                 <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
//                   <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    
//                     {/* Left: Media */}
//                     {paper.media && (
//                       <div className="lg:sticky lg:top-28">
//                         {paper.mediaType === "video" ? (
//                           <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
//                             <iframe
//                               src={paper.media}
//                               title={paper.title}
//                               className="w-full h-full"
//                               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                               allowFullScreen
//                             />
//                           </div>
//                         ) : (
//                           <img
//                             src={paper.media}
//                             alt={paper.title}
//                             className="w-full rounded-xl shadow-2xl border border-border"
//                           />
//                         )}
//                       </div>
//                     )}

//                     {/* Left: Content */}
//                     <div className="space-y-6">
//                       <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
//                         {paper.subtitle || paper.title}
//                       </h2>
                      
//                       <p className="text-base text-foreground/80 leading-relaxed">
//                         {paper.abstract}
//                       </p>

//                       <p className="text-sm font-medium text-primary">
//                         {paper.venue}
//                       </p>
                      
//                       {/* Links */}
//                       <div className="flex flex-wrap gap-3 pt-4">
//                         {paper.links.paper && (
//                           <a
//                             href={paper.links.paper}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-all font-medium hover:shadow-lg"
//                           >
//                             <FileText className="h-4 w-4" />
//                             Paper
//                           </a>
//                         )}
//                         {paper.links.details && (
//                           <a
//                             href={paper.links.details}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-medium hover:shadow-lg"
//                           >
//                             <ExternalLink className="h-4 w-4" />
//                             Demo
//                           </a>
//                         )}
//                         {paper.links.video && (
//                           <a
//                             href={paper.links.video}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/80 transition-all font-medium hover:shadow-lg"
//                           >
//                             <PlayCircle className="h-4 w-4" />
//                             Video
//                           </a>
//                         )}
//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </section>
//             ))}
//           </div>
//         ) : (
//           <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
//             <div className="text-center py-12">
//               <p className="text-muted-foreground text-lg">
//                 Publications coming soon for this project.
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Related Projects */}
//         <RelatedProjects
//           projects={projectsData}
//           currentProjectSlug={project.slug}
//         />
//       </div>
//     </>
//   );
// };

// export default ProjectDetailPanel;

import { ArrowLeft, ExternalLink, FileText, PlayCircle } from "lucide-react";
import type { ProjectData } from "../data/projectData";
import { projectsData } from "../data/projectData";
import RelatedProjects from "./RelatedProjects";

interface ProjectDetailPanelProps {
  project: ProjectData | null | undefined;
  onClose: () => void;
}

const ProjectDetailPanel = ({ project, onClose }: ProjectDetailPanelProps) => {
  if (!project) return null;

  // const ORANGE = "hsl(25,65%,50%)";
  const OrangePill = ({ children }: { children: React.ReactNode }) => (
    <span className="rounded-full bg-[hsl(25,65%,50%)] px-2 py-0.5 text-[12px] font-medium text-white shadow-sm">
      {children}
    </span>
  );


  return (
    <>
      {/* Overlay - Full Screen */}
      <div
        className="fixed inset-0 bg-black/60 z-40 animate-fade-in backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel - Full Screen */}
      <div className="fixed inset-0 z-50 overflow-y-auto bg-background animate-slide-in-right">
        {/* Header */}
        <div className="sticky top-0 bg-background/95 backdrop-blur-md border-b border-border z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-4">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors group
                         hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
                         focus-visible:ring-offset-2 rounded px-2 py-1"
            >
              <ArrowLeft
                className="h-5 w-5 group-hover:-translate-x-1 transition-transform"
                aria-hidden="true"
              />
              <span className="font-medium">Back to Projects</span>
            </button>
          </div>
        </div>

        {/* Project Title Header */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-14 md:py-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              {project.title}
            </h1>

            {/* subtle orange rule (micro-accent) */}
            <div className="mb-6 h-px w-14 rounded-full bg-[hsl(25,65%,50%)]/60" />

            <p className="text-lg text-muted-foreground mb-5">
              {project.conference} · {project.year}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                // <span
                //   key={tag}
                //   className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-sm rounded-full font-medium
                //              hover:border-[hsl(25,65%,50%)] transition-colors"
                // >
                //   {tag}
                // </span>
                <span key={tag}>
                  <OrangePill>{tag}</OrangePill>
                </span>

              ))}
            </div>
          </div>
        </div>

        {/* Papers Sections */}
        {project.papers.length > 0 ? (
          <div>
            {project.papers.map((paper, index) => (
              <section
                key={index}
                className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
              >
                <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-16 md:py-20">
                  {/* Mobile: content first for readability; Desktop: media left */}
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
                    {/* Content (mobile first) */}
                    <div className="space-y-6 lg:order-2">
                      <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                          {paper.subtitle || paper.title}
                        </h2>

                        {/* subtle orange underline under paper title */}
                        <div className="mt-3 h-px w-12 rounded-full bg-[hsl(25,65%,50%)]/70" />
                      </div>

                      {paper.abstract && (
                        <p className="text-base text-foreground/80 leading-relaxed">
                          {paper.abstract}
                        </p>
                      )}

                      {paper.venue && (
                        <p className="text-sm font-medium text-primary">
                          {paper.venue}
                        </p>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 pt-2">
                        {paper.links?.paper && (
                          <a
                            href={paper.links.paper}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-lg
                                       hover:bg-foreground/90 transition-all font-medium hover:shadow-lg"
                          >
                            <FileText className="h-4 w-4" />
                            Paper
                          </a>
                        )}

                        {paper.links?.details && (
                          <a
                            href={paper.links.details}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-lg
                                       border border-transparent hover:border-[hsl(25,65%,50%)]
                                       hover:bg-secondary/80 transition-all font-medium hover:shadow-lg"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        )}

                        {paper.links?.video && (
                          <a
                            href={paper.links.video}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[hsl(25,65%,50%)] text-white hover:bg-[hsl(25,65%,50%)]/90 rounded-lg
                                       border border-transparent hover:border-[hsl(25,65%,50%)]
                                       hover:bg-[hsl(25,65%,50%)]/80 transition-all font-medium hover:shadow-lg"
                          >
                            <PlayCircle className="h-4 w-4" />
                            Video
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Media (desktop left) */}
                    {paper.media ? (
                      <div className="lg:order-1 lg:sticky lg:top-28">
                        {paper.mediaType === "video" ? (
                          <div className="aspect-video rounded-xl overflow-hidden shadow-2xl border border-border">
                            <iframe
                              src={paper.media}
                              title={paper.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-white">
                            <img
                              src={paper.media}
                              alt={paper.title}
                              className="w-full object-contain"
                            />
                          </div>
                        )}

                        {/* subtle orange accent line below media */}
                        <div className="mt-4 h-px w-10 bg-[hsl(25,65%,50%)]/40 rounded-full" />
                      </div>
                    ) : (
                      // If no media, let content span full width on large screens
                      <div className="hidden lg:block lg:order-1" />
                    )}
                  </div>
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-20">
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Publications coming soon for this project.
              </p>
            </div>
          </div>
        )}

        {/* Related Projects */}
        <RelatedProjects projects={projectsData} currentProjectSlug={project.slug} />
      </div>
    </>
  );
};

export default ProjectDetailPanel;
