// src/data/publications.ts

// Base type used by the Publications page
export type Pub = {
  id: string;                // stable slug/id
  year: number;
  title: string;
  authors: string;           // or string[]
  venue: string;
  tags: string[];
  type?: "conf" | "journal" | "thesis" | "preprint";
  award?: string;
  abstract?: string;         // used by the collapsible abstract
  links?: {
    pdf?: string;            // e.g., "/papers/2025/revise.pdf"
    arxiv?: string;
    doi?: string;
    code?: string;           // GitHub, etc. (kept in data; UI may hide)
    website?: string;
  };
  bibtex?: string;           // optional BibTeX text (kept in data)
};

// Helpful: quick slug helper (for your own use when adding entries)
// const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/**
 * PUBLICATIONS
 * - Keep newest first (descending by year).
 * - For each entry, prefer links.pdf; fallback to arxiv/doi in the UI.
 */
export const PUBLICATIONS: Pub[] = [
  // =========================
  // 2025
  // =========================
  {
    id: "revise-incremental-recourse",
    year: 2025,
    title: "ReVise: A Human-AI Interface for Incremental Algorithmic Recourse",
    authors: "Bhattacharjee, Kaustav; Jun Yuan; Aritra Dasgupta",
    venue: "IEEE VIS 2025",
    tags: ["Explainable AI", "HCI", "Visualization"],
    type: "conf",
    abstract:
      "ReVise is a human–AI interface supporting incremental recourse. Users iteratively steer model-facing actions while preserving feasibility and minimizing intervention cost.",
    links: {
      pdf: "/papers/2025/revise.pdf",
      arxiv: "https://arxiv.org/abs/xxxx.xxxxx",
      doi: "https://doi.org/10.xxxx/xxxxx",
      code: "https://github.com/org/revise",
    },
    bibtex: `@inproceedings{bhattacharjee2025revise,
  title={ReVise: A Human-AI Interface for Incremental Algorithmic Recourse},
  author={Bhattacharjee, Kaustav and Yuan, Jun and Dasgupta, Aritra},
  booktitle={IEEE VIS},
  year={2025}
}`
  },
  {
    id: "trust-net-load-forecasting",
    year: 2025,
    title: "Who should I trust? A Visual Analytics Approach for Comparing Net Load Forecasting Models",
    authors: "Bhattacharjee, Kaustav; Soumya Kundu; Indrasis Chakraborty; Aritra Dasgupta",
    venue: "IEEE PES Grid Edge 2025",
    tags: ["Visual Analytics", "Energy Systems"],
    type: "conf",
    abstract:
      "A visual analytics workflow to compare net load forecasting models under drift and regime change, supporting practitioner trust and deployment decisions.",
    links: {
      pdf: "/papers/2025/trust-net-load.pdf",
      // arxiv: "",
      // doi: "",
    },
    bibtex: `@inproceedings{bhattacharjee2025trust,
  title={Who should I trust? A Visual Analytics Approach for Comparing Net Load Forecasting Models},
  author={Bhattacharjee, Kaustav and Kundu, Soumya and Chakraborty, Indrasis and Dasgupta, Aritra},
  booktitle={IEEE PES Grid Edge},
  year={2025}
}`
  },

  // =========================
  // 2024
  // =========================
  {
    id: "yuan-2024-dissertation",
    year: 2024,
    title: "Visual Analytic Techniques for Interpretable Algorithmic Ranking Systems",
    authors: "Yuan, Jun",
    venue: "Ph.D. Dissertation, NJIT",
    tags: ["PhD Dissertation", "Ranking", "Visualization"],
    type: "thesis",
    abstract:
      "Techniques for interpreting, auditing, and explaining ranking systems via interactive visualization and human-in-the-loop analysis.",
    links: {
      pdf: "/papers/2024/dissertation-yuan.pdf",
    },
  },

//   ------- QUICK-ADD SLOTS (fill from your screenshot list) -------
//   Tip: Copy one of these objects, paste, and edit fields.

//   2024 — example placeholders
  {
    id: "interactive-uncertainty-workflows",
    year: 2024,
    title: "Interactive Visualization Workflows for Mitigating Analytical Uncertainty",
    authors: "Bhattacharjee, Kaustav",
    venue: "Dissertations & Theses, New Jersey Institute of Technology, 2024",
    tags: ["Uncertainty", "Visualization"],
    type: "thesis",
    links: { pdf: "/papers/2024/interactive-uncertainty.pdf" }
  },

//   =========================
//   2023
//   =========================
  {
    id: "simple-scoring-function-to-fool-shap",
    year: 2023,
    title: "A Simple Scoring Function to Fool SHAP: Stealing from the One Above.",
    authors: "Yuan, Jun; Aritra Dasgupta",
    venue: "NeurIPS 2023 Workshop on XAI in Action",
    tags: ["XAI", "Robustness"],
    type: "conf",
    links: {
      pdf: "/papers/2023/fool-shap.pdf",
      doi: "https://doi.org/xx.xxxx/xxxxx"
    }
  },

  {
    id: "trivea-transparent-ranking-interpretation",
    year: 2023,
    title: "TRIVEA: Transparent Ranking Interpretation using Visual Explanation of black-box Algorithmic rankers.",
    authors: "Yuan Jun; Kaustav Bhattacharjee; Akm Zahirul Islam; Aritra Dasgupta",
    venue: "Visual Computer (2023)",
    tags: ["Ranking", "Interpretability"],
    type: "journal",
    links: {
      // pdf: "",
      doi: "https://doi.org/10.1007/s00371-023-03055-x"
    }
  },

//   =========================
//   2022
//   =========================
  {
    id: "privee-visual-privacy-inspection",
    year: 2022,
    title: "PRIVEE: A Visual Analytic Workflow for Proactive Privacy Risk Inspection of Open Data.",
    authors: "Bhattacharjee, Kaustav; Akm Islam; Jaideep Vaidya; Aritra Dasgupta",
    venue: "IEEE VizSec 2022",
    tags: ["Privacy", "Visualization"],
    type: "conf",
    links: {
      // pdf: "",
      doi: "https://doi.org/10.1109/VizSec56996.2022.9941431"
    }
  },

//   =========================
//   2021
//   =========================
  {
    id: "conceptualizing-visual-analytic-interventions-content-moderation",
    year: 2021,
    title: "Conceptualizing Visual Analytic Interventions for Content Moderation.",
    authors: "Vaidya, Sahaj; Jie Cai; Soumyadeep Basu; Azadeh Naderi; Donghee Yvette Wohn; Aritra Dasgupta",
    venue: "IEEE VIS 2021",
    tags: ["Content Moderation", "Visualization"],
    type: "conf",
    links: { pdf: "/papers/2021/content-moderation.pdf" }
  },

//   =========================
//   2020
//   =========================
  {
    id: "know-what-to-look-for-fact-evidence-reasoning",
    year: 2020,
    title: "Knowing what to look for: A Fact-Evidence Reasoning Framework for Decoding Communicative Visualization.",
    authors: "Vaidya, Sahaj; Aritra Dasgupta",
    venue: "IEEE VIS 2020",
    tags: ["Reasoning", "Visualization"],
    type: "conf",
    links: { pdf: "/papers/2020/fact-evidence.pdf" }
  },

//   =========================
//   2019
//   =========================
  {
    id: "guess-me-if-you-can-uncertainty-model",
    year: 2019,
    title: "Guess Me If You Can: A Visual Uncertainty Model for Transparent Evaluation of Disclosure Risks in Privacy-Preserving Data Visualization.",
    authors: "Dasgupta, Aritra; Robert Kosara; Min Chen",
    venue: "VizSec 2019",
    tags: ["Uncertainty", "Privacy"],
    type: "conf",
    links: {
      // pdf: "",
      doi: "https://doi.org/10.1109/VizSec48167.2019.9161608"
    }
  },

//   =========================
//   2018
//   =========================
  {
    id: "human-factors-streaming-data-analysis",
    year: 2018,
    title: "Human factors in streaming data analysis: Challenges and opportunities for information visualization.",
    authors: "Dasgupta, Aritra; Dustin L. Arendt; Lyndsey R. Franklin; Pak Chung Wong; Kristin A. Cook",
    venue: "Computer Graphics Forum, vol. 37, no. 1, 2018",
    tags: ["Streaming Data", "Visualization"],
    type: "journal",
    links: {
      // pdf: "",
      doi: "https://doi.org/10.1111/cgf.13264"
    }
  },
];
