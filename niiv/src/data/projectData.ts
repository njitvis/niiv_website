// projectData.ts (or wherever your interfaces live)
export interface Paper {
  title: string;
  subtitle: string;
  venue: string;
  abstract: string;
  media?: string;
  mediaType?: "video" | "image";
  keyFocus?: string;
  links: {
    paper?: string;
    details?: string;
    video?: string;
  };
}

export interface ProjectData {
  slug: string;
  title: string;
  conference: string;
  year: number;
  tags: string[];
  media?: string;
  mediaType: "video" | "image";
  description: string;
  subtitle?: string;
  papers: Paper[];
}


export const projectsData: ProjectData[] = [
  {
  slug: "trivea",
  title: "Explainable AI for Algorithmic Rankers",
  conference: "Multiple Publications 2022–2023",
  year: 2023,
  tags: ["Explainable AI", "Visualization", "Ranking"],
  mediaType: "image",
  description:
    "Unravel factors influencing black-box ranking models through visual analytic explanations.",
  subtitle: "Transparency in ranking interpretation with XAI + visual analytics.", // NEW
  papers: [
    {
      title:
        "A Human-in-the-loop Workflow for Multi-Factorial Sensitivity Analysis of Algorithmic Rankers",
      subtitle:
        "Designing explanations (Shapley transform) + a human-in-the-loop sensitivity analysis workflow.",
      venue: "HILDA 2023",
      keyFocus: "Sensitivity analysis · Shapley transform", // NEW
      abstract:
        "Algorithmic rankers are widely used in hiring, admission, and loan-approval systems, yet are hard to audit or trust without explanations. We (i) transform Shapley values for a linear weighted-sum ranker, and (ii) design a human-in-the-loop sensitivity analysis workflow by simulating data with user-specified distributions and correlations.",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3597465.3605221"
      }
    },
    {
      title:
        "Rankers, Rankees, & Rankings: Peeking into the Pandora’s Box from a Socio-Technical Perspective",
      subtitle:
        "Position paper calling for principled methods and metrics around ranking systems' socio-technical impact.",
      venue: "HCDS @ CHI 2022",
      keyFocus: "Socio-technical lens · Accountability",
      abstract:
        "Algorithmic rankings shape both everyday choices and high-stakes outcomes. We call on HCI, data science, and social science to jointly study how rankings are produced, who has agency to change them, and how to measure socio-technical impact.",
      links: {
        paper: "/publications/2022/ranking_HCDSCHI22.pdf"
      }
    },
    {
      title:
        "A Simple Scoring Function to Fool SHAP: Stealing from the One Above",
      subtitle:
        "A rule that adapts any scoring function to evade SHAP-based unfairness detection without data access.",
      venue: "NeurIPS 2023",
      keyFocus: "Adversarial scoring · SHAP robustness",
      abstract:
        "We show adversarial scoring functions can subvert SHAP-based unfairness detection without access to the data distribution, exposing limitations of current XAI practices for scoring functions.",
      links: {
        paper: "https://openreview.net/pdf?id=iMR4ukkUFU"
      }
    },
    {
      title:
        "TRIVEA: Transparent Ranking Interpretation using Visual Explanation of Black-Box Algorithmic Rankers",
      subtitle:
        "Visual exploration–explanation for model fit and attribute influence across ranking ranges.",
      venue: "Visual Computer 2023",
      keyFocus: "Visual explanations · Model fit",
      abstract:
        "TRIVEA lets stakeholders explore multi-attribute ranking data via model-fit views and XAI-based explanations, enabling transparent reasoning about global and local behavior of opaque ranking models.",
      links: {
        paper: "https://link.springer.com/article/10.1007/s00371-023-03055-x",
        details: "https://niiv.njitvis.com/projects/algoranker_vcj2023.html"
      }
    }
  ]
},
{
    slug: "privee",
    title: "Privacy-aware Data Discovery",
    conference: "Multiple Publications 2020–2023",
    year: 2023,
    tags: ["Privacy", "Data Science", "Visual Analytics"],
    mediaType: "video",
    description:
      "Develop visual analytic workflows to discover joinable open datasets that can lead of disclosure of sensitive information.",
    papers: [
      {
        title: "PRIVEE",
        subtitle: "Privacy Risk Inspection and Evaluation",
        venue: "HILDA 2023",
        abstract:
          "Open data sets containing personal information, are primarily published through a release-and-forget model, where data owners and custodians have little to no cognizance to the privacy risks. We address this gap by developing a visual analytic tool PRIVEE that help data defenders gain awareness about disclosure risks in local, joinable data neighborhoods.",
        // Use embed for iframe:
        media: "https://www.youtube.com/embed/61BmGHceC_s",
        mediaType: "video",
        links: {
          paper:
            "https://niiv.njitvis.com/assets/publications/2022/kaustav_vizsec22.pdf",
          details:
            "https://niiv.njitvis.com/projects/datadiscovery_vizsec2022.html",
          // External watch link:
          video: "https://www.youtube.com/watch?v=61BmGHceC_s",
        },
      },
      {
        title: "Disclosures",
        subtitle: "Disclosures during Red Team Exercise",
        venue: "USEC 2023",
        abstract:
          "This paper highlights some of the vulnerabilities discovered during a red team exercise into the open data ecosystem. We report some examples where sensitive details of data subjects are exposed by joining open datasets.",
        mediaType: "image",
        links: {
          paper:
            "https://niiv.njitvis.com/assets/publications/2023/kaustav_usec23.pdf",
          details:
            "https://niiv.njitvis.com/projects/datadiscovery_usec2023.html",
        },
      },
      {
        title: "Utility Profiling",
        subtitle: "Visual Analytics for Utility-driven Data Discovery",
        venue: "HILDA 2023",
        abstract:
          "We introduce a utility metric to quantify the utility of joined datasets. Our visual analytic workflow helps to identify joinable datasets, prioritize them based on their utility, and inspect the joined dataset.",
        media: "https://www.youtube.com/embed/76Gxqx_Pj8I",
        mediaType: "video",
        links: {
          paper:
            "https://niiv.njitvis.com/assets/publications/2023/kaustav_hilda23.pdf",
          details:
            "https://niiv.njitvis.com/projects/datadiscovery_hilda2023.html",
          video: "https://www.youtube.com/watch?v=76Gxqx_Pj8I",
        },
      },
      {
        title: "STAR",
        subtitle:
          "State-of-the-Art Report on Privacy-Preserving Visualization",
        venue: "EuroVis 2020",
        abstract:
          "In this survey paper, we analyze the methods and techniques used for handling data privacy in visualization. We also reflect on the gaps and future research opportunities in this domain.",
        mediaType: "image",
        links: {
          paper: "https://niiv.njitvis.com/assets/publications/2020/eurovis20.pdf",
          details:
            "https://niiv.njitvis.com/projects/datadiscovery_eurovis_2020.html",
          // fixed: correct "watch?v=" format
          video: "https://www.youtube.com/watch?v=CQxs9Hh_1f4",
        },
      },
    ],
  },
  {
    slug: "ai-decisions",
    title: "Transparent AI-driven Decision Making",
    conference: "Ongoing Research",
    year: 2023,
    tags: ["AI Decisions", "Visual Analytics", "Decision Support"],
    mediaType: "image",
    // If you have a hero image, add it here, e.g.:
    // media: "/images/ai-decisions-hero.jpg",
    description:
      "Apply visualization and artificial intelligence techniques for high-consequential decision-making.",
    papers: [],
  },
  {
    slug: "communicative-viz",
    title: "Design and Analysis of Communicative Visualization",
    conference: "Multiple Publications",
    year: 2023,
    tags: ["Visualization", "Communication", "HCI"],
    mediaType: "image",
    // media: "/images/communicative-viz-hero.jpg",
    description:
      "Study the role of communicative visualization in data and domain sciences.",
    papers: [
      {
        title: "Outlier23 | VIS21 | VIS20 | VisCom18",
        subtitle: "Communicative Visualization Design",
        venue: "Outlier 2023 · VIS 2021 · VIS 2020 · VisCom 2018",
        abstract:
          "Study the role of communicative visualization in data and domain sciences for enhanced understanding.",
        mediaType: "image",
        links: {
          paper: "#",
        },
      },
    ],
  },
];

export const getProjectBySlug = (slug: string): ProjectData | undefined => {
  return projectsData.find((project) => project.slug === slug);
};
