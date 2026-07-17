import { useState } from "react";
import { Search } from "lucide-react";
import ProjectDetailPanel from "../components/ProjectDetailPanel";
import ProjectCard from "../components/ProjectCard";
import { getProjectBySlug } from "../data/projectData";

const explainableAI = new URL("/explainableAI.png", import.meta.url).href;
const aiDecisions = new URL("/transparentAI.png", import.meta.url).href;
const privacy = new URL("/privacyAware.png", import.meta.url).href;
const communication = new URL("/commVis.jpeg", import.meta.url).href;

const Research = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProjectSlug, setSelectedProjectSlug] = useState<string | null>(null);

  const selectedProject = selectedProjectSlug ? getProjectBySlug(selectedProjectSlug) : null;

  const projects = [
    {
      id: 1,
      title: "Explainable AI for Algorithmic Rankers",
      category: "explainable-ai",
      year: 2023,
      description: "Unravel factors influencing black-box ranking models through visual analytic explanations.",
      image: explainableAI,
      tags: ["Explainable AI", "Visualization", "Ranking"],
      slug: "trivea",
      papers: [
        {
          title: "TRIVEA",
          subtitle: "Transparent Ranking Interpretation using Visual Explanations of Algorithmic rankers",
          venue: "HILDA23 | HCDS @ CHI22 | NeurIPS23 | VisualComputer23",
          abstract: "Ranking schemes drive many real-world decisions...",
          links: {
            paper: "https://niiv.njitvis.com/assets/publications/2023/jun_vcj23.pdf",
            details: "https://niiv.njitvis.com/projects/algoranker_vcj2023.html",
          },
        },
      ],
    },
    {
      id: 2,
      title: "Transparent AI-driven Decision Making",
      category: "ai-decisions",
      year: 2023,
      description: "Apply visualization and artificial intelligence techniques for high-consequential decision-making.",
      image: aiDecisions,
      tags: ["AI Decisions", "Visual Analytics", "Decision Support"],
      slug: "ai-decisions",
      papers: [],
    },
    {
      id: 3,
      title: "Privacy-aware Data Discovery",
      category: "privacy",
      year: 2023,
      description:
        "Develop visual analytic workflows to discover joinable open datasets that can lead to disclosure of sensitive information.",
      image: privacy,
      tags: ["Privacy", "Data Science", "Visual Analytics"],
      slug: "privee",
      papers: [],
    },
    {
      id: 4,
      title: "Design and Analysis of Communicative Visualization",
      category: "visualization",
      year: 2023,
      description: "Study the role of communicative visualization in data and domain sciences.",
      image: communication,
      tags: ["Visualization", "Communication", "HCI"],
      slug: "communicative-viz",
      papers: [],
    },
  ];

  const categories = [
    { id: "all", label: "All Projects" },
    { id: "explainable-ai", label: "Explainable AI" },
    { id: "ai-decisions", label: "AI Decisions" },
    { id: "privacy", label: "Privacy" },
    { id: "visualization", label: "Communicative Visualization" },
  ];

  const years = ["all", "2023", "2022", "2021"];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === "all" || project.year.toString() === selectedYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Red Accent Line */}
      {/* <div className="relative h-0.5 bg-[#CC0000]">
        <div className="absolute inset-0 bg-[#CC0000] opacity-20 blur-lg h-6 -top-3" />
      </div> */}

      <div className="h-px bg-[#CC0000]/90" />

      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Research Projects</h1>
            <div className="mb-4 h-px w-12 bg-[hsl(25,65%,50%)]/70 rounded-full" />
            <p className="text-lg text-gray-600">
              Explore our research in intelligible AI, visual analytics, and human-centered computing
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 pl-9 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 focus-visible:shadow-[0_0_0_4px_hsla(25,65%,50%,0.12)] disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>

            <div className="flex gap-2">
              <span className="text-sm font-medium text-gray-600 self-center">Year:</span>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 h-9 px-3 text-sm ${
                    selectedYear === year
                      ? "bg-[#CC0000] text-white hover:bg-[#CC0000]/90"
                      : "border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {year === "all" ? "All" : year}
                </button>
              ))}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="mb-8 relative">
            {/* Fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-gray-100 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-gray-100 to-transparent z-10" />

            <div
              className="
                flex items-center gap-2
                overflow-x-auto
                whitespace-nowrap
                rounded-md
                bg-gray-100
                p-1
                text-gray-600
                scrollbar-hide
              "
            >
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    h-9
                    px-4
                    ml-2
                    rounded-sm
                    text-sm
                    font-medium
                    transition-all
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[#CC0000]
                    focus-visible:ring-offset-2
                    ${
                      selectedCategory === cat.id
                        ? "bg-white text-gray-900 shadow-sm border-b-2 border-[hsl(25,65%,50%)]"
                        : "text-gray-600 hover:text-gray-900"
                    }
                  `}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>






          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects
              .filter((p) => selectedCategory === "all" || p.category === selectedCategory)
              .map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onViewDetails={setSelectedProjectSlug}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Project Detail Panel */}
      <ProjectDetailPanel project={selectedProject || null} onClose={() => setSelectedProjectSlug(null)} />
    </div>
  );
};

export default Research;
