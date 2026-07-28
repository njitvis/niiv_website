import { PUBLICATIONS, type Pub } from "./publications";

export type ProjectResource = {
  label: string;
  href: string;
  type: "code" | "demo" | "video" | "website";
};

export type ProjectPublication = {
  publicationId: string;
  summary?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  resources?: ProjectResource[];
};

export type ProjectData = {
  slug: string;
  title: string;
  description: string;
  overview: string;
  image: string;
  imageAlt: string;
  tags: string[];
  publications: ProjectPublication[];
  resources?: ProjectResource[];
};

export type ResolvedProjectPublication = ProjectPublication & {
  publication: Pub;
};

export const projectsData: ProjectData[] = [
  {
    slug: "trivea",
    title: "Explainable AI for Algorithmic Rankers",
    description:
      "Unravel the factors influencing black-box ranking models through visual analytic explanations.",
    overview:
      "Algorithmic rankings shape consequential decisions in education, hiring, lending, and recommendations, while their internal logic is often inaccessible. This research combines explainable AI with visual analytics so stakeholders can examine how attributes influence rankings, test how explanations respond to changing assumptions, and reason about the social consequences of ranked outcomes.",
    image: "/explainableAI.png",
    imageAlt:
      "Diagram of the TRIVEA workflow for interpreting algorithmic rankings",
    tags: ["Explainable AI", "Algorithmic Ranking", "Visual Analytics"],
    publications: [
      {
        publicationId: "revise-incremental-algorithmic-recourse",
      },
      {
        publicationId: "visual-analytic-techniques-interpretable-ranking",
      },
      {
        publicationId: "simple-scoring-function-fool-shap",
        summary:
          "This work shows how adversarial scoring functions can evade SHAP-based unfairness detection without access to the underlying data distribution, exposing an important limitation of current explanation practices.",
      },
      {
        publicationId: "trivea-transparent-ranking-interpretation",
        summary:
          "TRIVEA combines learned ranking models with visual explanations of model fit and attribute influence. It helps people explore global and local ranking behavior without needing direct access to the underlying black-box model.",
        image: "/projects/algorithmic-rankers/trivea-workflow.png",
        imageAlt:
          "TRIVEA visual analytics workflow for transparent ranking interpretation",
        caption: "Visual analytics workflow used in TRIVEA.",
        resources: [
          {
            label: "Code",
            href: "https://github.com/njitvis/trivea",
            type: "code",
          },
          {
            label: "Interactive demo",
            href: "https://njitvis.github.io/trivea/",
            type: "demo",
          },
        ],
      },
      {
        publicationId: "human-in-loop-sensitivity-analysis-rankers",
        summary:
          "A human-in-the-loop workflow transforms Shapley values for ranking models and uses multi-factor simulations to study how explanations change with data distributions, ranker parameters, and rank ranges.",
        image: "/projects/algorithmic-rankers/sensitivity-analysis.png",
        imageAlt:
          "Interface for sensitivity analysis of algorithmic rankers",
        caption:
          "Visual interface for multi-factor sensitivity analysis of rankers.",
        resources: [
          {
            label: "Interactive demo",
            href: "https://hilda23-ranking-shapley.streamlit.app/",
            type: "demo",
          },
        ],
      },
      {
        publicationId: "contextual-transparency-automated-decision-systems",
        summary:
          "Contextual transparency connects social science, engineering, and information design to make automated decision systems understandable for specific professions, processes, and stakeholder groups.",
        image: "/projects/algorithmic-rankers/contextual-transparency.png",
        imageAlt:
          "Diagram showing contextual transparency in an automated recruiting process",
        caption:
          "Contextual transparency applied to automated recruiting systems.",
      },
      {
        publicationId: "rankers-rankees-rankings-pandora-box",
        summary:
          "This position paper calls for principled methods and metrics that connect ranking technologies to their socio-technical context, the agency of affected stakeholders, and the consequences of ranked outcomes.",
        image: "/projects/algorithmic-rankers/socio-technical-ranking.png",
        imageAlt:
          "Socio-technical relationships among rankers, rankees, and rankings",
        caption:
          "A socio-technical view of rankers, rankees, and ranking outcomes.",
      },
    ],
  },
  {
    slug: "ai-decisions",
    title: "Transparent AI-driven Decision Making",
    description:
      "Apply visualization and artificial intelligence techniques to support consequential decision-making.",
    overview:
      "This research studies how people can understand, evaluate, and collaborate with AI systems in consequential settings. The work spans contextual transparency, human-machine teaming, and visual diagnostics for comparing model behavior in domains such as recruiting and energy systems.",
    image: "/transparentAI.png",
    imageAlt:
      "Diagram comparing traditional computing systems with human-AI teaming",
    tags: ["Decision Support", "Human-AI Teaming", "Model Diagnostics"],
    publications: [
      {
        publicationId: "trust-net-load-forecasting-models",
      },
      {
        publicationId:
          "characterizing-interaction-uncertainty-human-machine-teams",
      },
      {
        publicationId: "forte-trust-augmented-net-load-forecasting",
      },
      {
        publicationId: "machine-learning-energy-efficient-buildings",
      },
      {
        publicationId: "contextual-transparency-automated-decision-systems",
        summary:
          "The contextual transparency approach asks what information a particular stakeholder needs in a specific decision process, then designs explanations around that context rather than pursuing a universal form of transparency.",
      },
      {
        publicationId: "beyond-visual-analytics-human-machine-teaming",
        summary:
          "This work examines how tightly coupled human-machine teams can support AI-driven data sensemaking beyond conventional visual analytics workflows.",
      },
    ],
  },
  {
    slug: "privee",
    title: "Privacy-aware Data Discovery",
    description:
      "Develop visual analytic workflows for discovering useful open data while identifying disclosure risks.",
    overview:
      "Open datasets can become privacy risks when seemingly harmless releases are joined with other data. This research develops human-centered visual analytics that help data defenders inspect vulnerable joins, calibrate disclosure risk, and evaluate whether joined datasets provide enough utility to justify their use.",
    image: "/privacyAware.png",
    imageAlt:
      "PRIVEE visualization for evaluating disclosure risk in joined datasets",
    tags: ["Data Privacy", "Open Data", "Risk Inspection"],
    publications: [
      {
        publicationId: "value-linked-data-utility-evaluation",
        summary:
          "VALUE introduces a utility metric and visual analytic workflow for finding joinable datasets, prioritizing them by usefulness, and refining that evaluation through human judgment.",
        image: "/projects/privacy-data-discovery/value-interface.png",
        imageAlt:
          "VALUE interface for inspecting the utility of joining open datasets",
        caption:
          "Inspecting the utility of joined open datasets through VALUE.",
        resources: [
          {
            label: "Presentation",
            href: "https://www.youtube.com/watch?v=76Gxqx_Pj8I",
            type: "video",
          },
        ],
      },
      {
        publicationId: "power-data-defenders-disclosure-risk-calibration",
        summary:
          "A red-team exercise identifies vulnerabilities in the release-and-forget model of open data and motivates proactive monitoring strategies that let data defenders recalibrate privacy risk as new datasets appear.",
        image: "/projects/privacy-data-discovery/disclosure-risks.png",
        imageAlt:
          "Examples of open-data disclosure risks identified through red teaming",
        caption:
          "Disclosure risks that emerge as new open datasets become available.",
      },
      {
        publicationId: "privee-privacy-risk-inspection-open-data",
        summary:
          "PRIVEE is a visual risk-inspection workflow that helps data defenders explore vulnerable joins and interpret disclosure risk at multiple levels of data granularity.",
        image: "/projects/privacy-data-discovery/privee-workflow.png",
        imageAlt:
          "Workflow showing how data defenders use PRIVEE to inspect privacy risk",
        caption:
          "The data-defender workflow and role of interactive visualization in PRIVEE.",
        resources: [
          {
            label: "Presentation",
            href: "https://youtu.be/bcmfsFaL8n4",
            type: "video",
          },
        ],
      },
      {
        publicationId: "privacy-preserving-data-visualization-reflections",
        summary:
          "This state-of-the-art report surveys methods for privacy-preserving visualization and identifies research opportunities across privacy-utility tradeoffs, attack scenarios, stakeholder needs, and interactive access controls.",
        image: "/projects/privacy-data-discovery/privacy-landscape.png",
        imageAlt:
          "Research landscape for privacy-preserving data visualization",
        caption:
          "The research landscape for privacy-preserving data visualization.",
        resources: [
          {
            label: "Presentation",
            href: "https://www.youtube.com/watch?v=CQxs9Hh_1f4",
            type: "video",
          },
        ],
      },
    ],
  },
  {
    slug: "communicative-viz",
    title: "Design and Analysis of Communicative Visualization",
    description:
      "Study how visualizations communicate evidence, change, and uncertainty across data-driven domains.",
    overview:
      "Communicative visualizations do more than display data: they guide attention, establish evidence, and shape how readers reason about a message. This research studies frameworks and visual analytic interventions that help designers and readers understand how visual representations communicate complex or evolving information.",
    image: "/commVis.jpeg",
    imageAlt:
      "Task mapping for the design and analysis of communicative visualization",
    tags: ["Communicative Visualization", "Visual Reasoning", "Human-Centered Design"],
    publications: [
      {
        publicationId: "visual-analytic-interventions-content-moderation",
      },
      {
        publicationId:
          "fact-evidence-reasoning-communicative-visualization",
        summary:
          "The fact-evidence reasoning framework describes how readers identify facts, connect them to visual evidence, and construct meaning from communicative visualizations.",
      },
      {
        publicationId:
          "bridging-computation-visual-communication-change",
      },
    ],
    resources: [
      {
        label: "Outlier 2023 presentation",
        href: "https://www.youtube.com/watch?v=13Fqg6NAypU",
        type: "video",
      },
    ],
  },
];

const publicationById = new Map(
  PUBLICATIONS.map((publication) => [publication.id, publication]),
);

export const getProjectBySlug = (slug: string): ProjectData | undefined =>
  projectsData.find((project) => project.slug === slug);

export const getProjectPublications = (
  project: ProjectData,
): ResolvedProjectPublication[] =>
  project.publications.flatMap((entry) => {
    const publication = publicationById.get(entry.publicationId);
    return publication ? [{ ...entry, publication }] : [];
  });

export const getProjectLatestYear = (project: ProjectData): number | undefined =>
  getProjectPublications(project).reduce<number | undefined>(
    (latest, { publication }) =>
      latest === undefined || publication.year > latest
        ? publication.year
        : latest,
    undefined,
  );
