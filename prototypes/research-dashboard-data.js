// Snapshot for the local dashboard mockup; does not edit website data.
window.NIIV_SEED = {
  "projects": [
    {
      "slug": "trivea",
      "title": "Explainable AI for Algorithmic Rankers",
      "description": "Unravel the factors influencing black-box ranking models through visual analytic explanations.",
      "overview": "Algorithmic rankings shape consequential decisions in education, hiring, lending, and recommendations, while their internal logic is often inaccessible. This research combines explainable AI with visual analytics so stakeholders can examine how attributes influence rankings, test how explanations respond to changing assumptions, and reason about the social consequences of ranked outcomes.",
      "image": "/explainableAI.png",
      "imageAlt": "Diagram of the TRIVEA workflow for interpreting algorithmic rankings",
      "tags": [
        "Explainable AI",
        "Algorithmic Ranking",
        "Visual Analytics"
      ],
      "publications": [
        {
          "publicationId": "revise-incremental-algorithmic-recourse"
        },
        {
          "publicationId": "visual-analytic-techniques-interpretable-ranking"
        },
        {
          "publicationId": "simple-scoring-function-fool-shap",
          "summary": "This work shows how adversarial scoring functions can evade SHAP-based unfairness detection without access to the underlying data distribution, exposing an important limitation of current explanation practices."
        },
        {
          "publicationId": "trivea-transparent-ranking-interpretation",
          "summary": "TRIVEA combines learned ranking models with visual explanations of model fit and attribute influence. It helps people explore global and local ranking behavior without needing direct access to the underlying black-box model.",
          "image": "/projects/algorithmic-rankers/trivea-workflow.png",
          "imageAlt": "TRIVEA visual analytics workflow for transparent ranking interpretation",
          "caption": "Visual analytics workflow used in TRIVEA.",
          "resources": [
            {
              "label": "Code",
              "href": "https://github.com/njitvis/trivea",
              "type": "code"
            },
            {
              "label": "Interactive demo",
              "href": "https://njitvis.github.io/trivea/",
              "type": "demo"
            }
          ]
        },
        {
          "publicationId": "human-in-loop-sensitivity-analysis-rankers",
          "summary": "A human-in-the-loop workflow transforms Shapley values for ranking models and uses multi-factor simulations to study how explanations change with data distributions, ranker parameters, and rank ranges.",
          "image": "/projects/algorithmic-rankers/sensitivity-analysis.png",
          "imageAlt": "Interface for sensitivity analysis of algorithmic rankers",
          "caption": "Visual interface for multi-factor sensitivity analysis of rankers.",
          "resources": [
            {
              "label": "Interactive demo",
              "href": "https://hilda23-ranking-shapley.streamlit.app/",
              "type": "demo"
            }
          ]
        },
        {
          "publicationId": "contextual-transparency-automated-decision-systems",
          "summary": "Contextual transparency connects social science, engineering, and information design to make automated decision systems understandable for specific professions, processes, and stakeholder groups.",
          "image": "/projects/algorithmic-rankers/contextual-transparency.png",
          "imageAlt": "Diagram showing contextual transparency in an automated recruiting process",
          "caption": "Contextual transparency applied to automated recruiting systems."
        },
        {
          "publicationId": "rankers-rankees-rankings-pandora-box",
          "summary": "This position paper calls for principled methods and metrics that connect ranking technologies to their socio-technical context, the agency of affected stakeholders, and the consequences of ranked outcomes.",
          "image": "/projects/algorithmic-rankers/socio-technical-ranking.png",
          "imageAlt": "Socio-technical relationships among rankers, rankees, and rankings",
          "caption": "A socio-technical view of rankers, rankees, and ranking outcomes."
        }
      ],
      "kind": "Research area",
      "status": "Not specified",
      "team": [],
      "collaborators": "",
      "website": "",
      "code": ""
    },
    {
      "slug": "ai-decisions",
      "title": "Transparent AI-driven Decision Making",
      "description": "Apply visualization and artificial intelligence techniques to support consequential decision-making.",
      "overview": "This research studies how people can understand, evaluate, and collaborate with AI systems in consequential settings. The work spans contextual transparency, human-machine teaming, and visual diagnostics for comparing model behavior in domains such as recruiting and energy systems.",
      "image": "/transparentAI.png",
      "imageAlt": "Diagram comparing traditional computing systems with human-AI teaming",
      "tags": [
        "Decision Support",
        "Human-AI Teaming",
        "Model Diagnostics"
      ],
      "publications": [
        {
          "publicationId": "trust-net-load-forecasting-models"
        },
        {
          "publicationId": "characterizing-interaction-uncertainty-human-machine-teams"
        },
        {
          "publicationId": "forte-trust-augmented-net-load-forecasting"
        },
        {
          "publicationId": "machine-learning-energy-efficient-buildings"
        },
        {
          "publicationId": "contextual-transparency-automated-decision-systems",
          "summary": "The contextual transparency approach asks what information a particular stakeholder needs in a specific decision process, then designs explanations around that context rather than pursuing a universal form of transparency."
        },
        {
          "publicationId": "beyond-visual-analytics-human-machine-teaming",
          "summary": "This work examines how tightly coupled human-machine teams can support AI-driven data sensemaking beyond conventional visual analytics workflows."
        }
      ],
      "kind": "Research area",
      "status": "Not specified",
      "team": [],
      "collaborators": "",
      "website": "",
      "code": ""
    },
    {
      "slug": "privee",
      "title": "Privacy-aware Data Discovery",
      "description": "Develop visual analytic workflows for discovering useful open data while identifying disclosure risks.",
      "overview": "Open datasets can become privacy risks when seemingly harmless releases are joined with other data. This research develops human-centered visual analytics that help data defenders inspect vulnerable joins, calibrate disclosure risk, and evaluate whether joined datasets provide enough utility to justify their use.",
      "image": "/privacyAware.png",
      "imageAlt": "PRIVEE visualization for evaluating disclosure risk in joined datasets",
      "tags": [
        "Data Privacy",
        "Open Data",
        "Risk Inspection"
      ],
      "publications": [
        {
          "publicationId": "value-linked-data-utility-evaluation",
          "summary": "VALUE introduces a utility metric and visual analytic workflow for finding joinable datasets, prioritizing them by usefulness, and refining that evaluation through human judgment.",
          "image": "/projects/privacy-data-discovery/value-interface.png",
          "imageAlt": "VALUE interface for inspecting the utility of joining open datasets",
          "caption": "Inspecting the utility of joined open datasets through VALUE.",
          "resources": [
            {
              "label": "Presentation",
              "href": "https://www.youtube.com/watch?v=76Gxqx_Pj8I",
              "type": "video"
            }
          ]
        },
        {
          "publicationId": "power-data-defenders-disclosure-risk-calibration",
          "summary": "A red-team exercise identifies vulnerabilities in the release-and-forget model of open data and motivates proactive monitoring strategies that let data defenders recalibrate privacy risk as new datasets appear.",
          "image": "/projects/privacy-data-discovery/disclosure-risks.png",
          "imageAlt": "Examples of open-data disclosure risks identified through red teaming",
          "caption": "Disclosure risks that emerge as new open datasets become available."
        },
        {
          "publicationId": "privee-privacy-risk-inspection-open-data",
          "summary": "PRIVEE is a visual risk-inspection workflow that helps data defenders explore vulnerable joins and interpret disclosure risk at multiple levels of data granularity.",
          "image": "/projects/privacy-data-discovery/privee-workflow.png",
          "imageAlt": "Workflow showing how data defenders use PRIVEE to inspect privacy risk",
          "caption": "The data-defender workflow and role of interactive visualization in PRIVEE.",
          "resources": [
            {
              "label": "Presentation",
              "href": "https://youtu.be/bcmfsFaL8n4",
              "type": "video"
            }
          ]
        },
        {
          "publicationId": "privacy-preserving-data-visualization-reflections",
          "summary": "This state-of-the-art report surveys methods for privacy-preserving visualization and identifies research opportunities across privacy-utility tradeoffs, attack scenarios, stakeholder needs, and interactive access controls.",
          "image": "/projects/privacy-data-discovery/privacy-landscape.png",
          "imageAlt": "Research landscape for privacy-preserving data visualization",
          "caption": "The research landscape for privacy-preserving data visualization.",
          "resources": [
            {
              "label": "Presentation",
              "href": "https://www.youtube.com/watch?v=CQxs9Hh_1f4",
              "type": "video"
            }
          ]
        }
      ],
      "kind": "Research area",
      "status": "Not specified",
      "team": [],
      "collaborators": "",
      "website": "",
      "code": ""
    },
    {
      "slug": "communicative-viz",
      "title": "Design and Analysis of Communicative Visualization",
      "description": "Study how visualizations communicate evidence, change, and uncertainty across data-driven domains.",
      "overview": "Communicative visualizations do more than display data: they guide attention, establish evidence, and shape how readers reason about a message. This research studies frameworks and visual analytic interventions that help designers and readers understand how visual representations communicate complex or evolving information.",
      "image": "/commVis.jpeg",
      "imageAlt": "Task mapping for the design and analysis of communicative visualization",
      "tags": [
        "Communicative Visualization",
        "Visual Reasoning",
        "Human-Centered Design"
      ],
      "publications": [
        {
          "publicationId": "visual-analytic-interventions-content-moderation"
        },
        {
          "publicationId": "fact-evidence-reasoning-communicative-visualization",
          "summary": "The fact-evidence reasoning framework describes how readers identify facts, connect them to visual evidence, and construct meaning from communicative visualizations."
        },
        {
          "publicationId": "bridging-computation-visual-communication-change"
        }
      ],
      "resources": [
        {
          "label": "Outlier 2023 presentation",
          "href": "https://www.youtube.com/watch?v=13Fqg6NAypU",
          "type": "video"
        }
      ],
      "kind": "Research area",
      "status": "Not specified",
      "team": [],
      "collaborators": "",
      "website": "",
      "code": ""
    }
  ],
  "papers": [
    {
      "id": "revise-incremental-algorithmic-recourse",
      "year": 2025,
      "title": "ReVise: A Human-AI Interface for Incremental Algorithmic Recourse",
      "authors": "Kaustav Bhattacharjee, Jun Yuan, and Aritra Dasgupta",
      "venue": "Proceedings of 2025 IEEE Visualization and Visual Analytics (VIS)",
      "tags": [
        "IEEE VIS"
      ],
      "type": "conf",
      "links": {
        "arxiv": "https://arxiv.org/abs/2508.00002"
      }
    },
    {
      "id": "trust-net-load-forecasting-models",
      "year": 2025,
      "title": "Who should I trust? A Visual Analytics Approach for Comparing Net Load Forecasting Models",
      "authors": "Kaustav Bhattacharjee, Soumya Kundu, Indrasis Chakraborty, and Aritra Dasgupta",
      "venue": "Proceedings of 2025 IEEE PES Grid Edge Technologies Conference & Exposition (Grid Edge)",
      "tags": [
        "IEEE PES Grid Edge"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2025/kaustav_GridEdge25.pdf",
        "doi": "https://doi.org/10.1109/GridEdge61154.2025.10887523"
      }
    },
    {
      "id": "visual-analytic-techniques-interpretable-ranking",
      "year": 2024,
      "title": "Visual Analytic Techniques for Interpretable Algorithmic Ranking Systems",
      "authors": "Jun Yuan",
      "venue": "Dissertations & Theses at New Jersey Institute of Technology",
      "tags": [
        "Dissertation"
      ],
      "type": "thesis",
      "links": {
        "website": "https://digitalcommons.njit.edu/dissertations/1811/"
      }
    },
    {
      "id": "surveying-visual-analytics-human-machine-teaming",
      "year": 2024,
      "title": "Surveying the Role of Visual Analytics in Human-Machine Teaming",
      "authors": "Naga Datha Saikiran Battula",
      "venue": "Dissertations & Theses at New Jersey Institute of Technology",
      "tags": [
        "Thesis"
      ],
      "type": "thesis",
      "links": {
        "website": "https://digitalcommons.njit.edu/theses/2946/"
      }
    },
    {
      "id": "interactive-visualization-workflows-analytical-uncertainty",
      "year": 2024,
      "title": "Interactive Visualization Workflows for Mitigating Analytical Uncertainty",
      "authors": "Kaustav Bhattacharjee",
      "venue": "Dissertations & Theses at New Jersey Institute of Technology",
      "tags": [
        "Dissertation"
      ],
      "type": "thesis",
      "links": {
        "pdf": "/publications/2024/Interactive_Visualization_Workflows_for_Mitigating_Analytical_Uncertainty-Compressed.pdf",
        "website": "https://digitalcommons.njit.edu/dissertations/1802/"
      }
    },
    {
      "id": "interpretable-ml-weather-climate-review",
      "year": 2024,
      "title": "Interpretable machine learning for weather and climate prediction: A review",
      "authors": "Ruyi Yang, Jingyu Hu, Zihao Li, Jianli Mu, Tingzhao Yu, Jiangjiang Xia, Xuhong Li, Aritra Dasgupta, and Haoyi Xiong",
      "venue": "Atmospheric Environment (2024): 120797",
      "tags": [
        "Atmospheric Environment"
      ],
      "type": "journal",
      "links": {
        "doi": "https://doi.org/10.1016/j.atmosenv.2024.120797"
      }
    },
    {
      "id": "sensemaking-socially-mediated-crisis-information",
      "year": 2024,
      "title": "Sensemaking of Socially-Mediated Crisis Information",
      "authors": "Vrushali Koli, Jun Yuan, and Aritra Dasgupta",
      "venue": "Proceedings of the Third Workshop on Bridging Human-Computer Interaction and Natural Language Processing, pp. 74-81",
      "tags": [
        "HCINLP"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2024/vrushali_HCINLP2024.pdf",
        "website": "https://aclanthology.org/2024.hcinlp-1.7/"
      }
    },
    {
      "id": "characterizing-interaction-uncertainty-human-machine-teams",
      "year": 2024,
      "title": "Characterizing Interaction Uncertainty in Human-Machine Teams",
      "authors": "John Wenskovitch, Corey Fallon, Kate Miller, and Aritra Dasgupta",
      "venue": "Proceedings of 2024 IEEE 4th International Conference on Human-Machine Systems (ICHMS), pp. 1-6",
      "tags": [
        "ICHMS"
      ],
      "type": "conf",
      "links": {
        "doi": "https://doi.org/10.1109/ICHMS59971.2024.10555605"
      }
    },
    {
      "id": "forte-trust-augmented-net-load-forecasting",
      "year": 2024,
      "title": "Forte: An Interactive Visual Analytic Tool for Trust-Augmented Net Load Forecasting",
      "authors": "Kaustav Bhattacharjee, Soumya Kundu, Indrasis Chakraborty, and Aritra Dasgupta",
      "venue": "Proceedings of 2024 IEEE Power & Energy Society Innovative Smart Grid Technologies Conference (ISGT), pp. 1-5",
      "tags": [
        "IEEE ISGT"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2024/kaustav_ISGT24.pdf",
        "doi": "https://doi.org/10.1109/ISGT59692.2024.10454191"
      }
    },
    {
      "id": "simple-scoring-function-fool-shap",
      "year": 2023,
      "title": "A Simple Scoring Function to Fool SHAP: Stealing from the One Above",
      "authors": "Jun Yuan and Aritra Dasgupta",
      "venue": "Proceedings of the NeurIPS 2023 Workshop on XAI in Action",
      "tags": [
        "NeurIPS Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "https://openreview.net/pdf?id=iMR4ukkUFU"
      }
    },
    {
      "id": "trivea-transparent-ranking-interpretation",
      "year": 2023,
      "title": "TRIVEA: Transparent Ranking Interpretation using Visual Explanation of black-box Algorithmic rankers",
      "authors": "Jun Yuan, Kaustav Bhattacharjee, Akm Zahirul Islam, and Aritra Dasgupta",
      "venue": "The Visual Computer (2023)",
      "tags": [
        "The Visual Computer"
      ],
      "type": "journal",
      "links": {
        "doi": "https://doi.org/10.1007/s00371-023-03055-x"
      }
    },
    {
      "id": "value-linked-data-utility-evaluation",
      "year": 2023,
      "title": "VALUE: Visual Analytics driven Linked data Utility Evaluation",
      "authors": "Kaustav Bhattacharjee and Aritra Dasgupta",
      "venue": "Proceedings of the Workshop on Human-In-the-Loop Data Analytics (HILDA), ACM",
      "tags": [
        "HILDA"
      ],
      "type": "conf",
      "links": {
        "doi": "https://doi.org/10.1145/3597465.3605225"
      }
    },
    {
      "id": "human-in-loop-sensitivity-analysis-rankers",
      "year": 2023,
      "title": "A Human-in-the-loop Workflow for Multi-Factorial Sensitivity Analysis of Algorithmic Rankers",
      "authors": "Jun Yuan and Aritra Dasgupta",
      "venue": "Proceedings of the Workshop on Human-In-the-Loop Data Analytics (HILDA), ACM",
      "tags": [
        "HILDA"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2023/jun_hilda23.pdf",
        "doi": "https://doi.org/10.1145/3597465.3605221"
      }
    },
    {
      "id": "machine-learning-energy-efficient-buildings",
      "year": 2023,
      "title": "Application of Machine Learning for Energy-Efficient Buildings",
      "authors": "Indrasis Chakraborty, Aritra Dasgupta, Javier Rubio-Herrero, Sai Pushpak Nandanoori, Soumya Kundu, and Vikas Chandan",
      "venue": "Handbook of Smart Energy Systems, Springer, Cham",
      "tags": [
        "Handbook of Smart Energy Systems"
      ],
      "type": "journal",
      "links": {
        "doi": "https://doi.org/10.1007/978-3-030-72322-4_102-1"
      }
    },
    {
      "id": "contextual-transparency-automated-decision-systems",
      "year": 2023,
      "title": "Introducing contextual transparency for automated decision systems",
      "authors": "Mona Sloane, Ian Rene Solano-Kamaiko, Jun Yuan, Aritra Dasgupta, and Julia Stoyanovich",
      "venue": "Nature Machine Intelligence (2023): 1-9",
      "tags": [
        "Nature Machine Intelligence"
      ],
      "type": "journal",
      "links": {
        "website": "https://rdcu.be/c9fD3"
      }
    },
    {
      "id": "power-data-defenders-disclosure-risk-calibration",
      "year": 2023,
      "title": "Power to the Data Defenders: Human-Centered Disclosure Risk Calibration of Open Data",
      "authors": "Kaustav Bhattacharjee and Aritra Dasgupta",
      "venue": "2023 Symposium on Usable Security and Privacy (USEC)",
      "tags": [
        "USEC"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2023/kaustav_usec23.pdf",
        "doi": "https://dx.doi.org/10.14722/usec.2023.237256"
      }
    },
    {
      "id": "privee-privacy-risk-inspection-open-data",
      "year": 2022,
      "title": "PRIVEE: A Visual Analytic Workflow for Proactive Privacy Risk Inspection of Open Data",
      "authors": "Kaustav Bhattacharjee, Akm Islam, Jaideep Vaidya, and Aritra Dasgupta",
      "venue": "2022 IEEE Symposium on Visualization for Cyber Security (VizSec), pp. 1-11",
      "tags": [
        "VizSec"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2022/kaustav_vizsec22.pdf",
        "doi": "https://doi.org/10.1109/VizSec56996.2022.9941431"
      }
    },
    {
      "id": "rankers-rankees-rankings-pandora-box",
      "year": 2022,
      "title": "Rankers, Rankees, & Rankings: Peeking into the Pandora's Box from a Socio-Technical Perspective",
      "authors": "Jun Yuan, Julia Stoyanovich, and Aritra Dasgupta",
      "venue": "Position paper presented at 2022 CHI Workshop on Interrogating Human-Centered Data Science",
      "tags": [
        "CHI Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2022/ranking_HCDSCHI22.pdf"
      }
    },
    {
      "id": "visual-analytic-interventions-content-moderation",
      "year": 2021,
      "title": "Conceptualizing Visual Analytic Interventions for Content Moderation",
      "authors": "Sahaj Vaidya, Jie Cai, Soumyadeep Basu, Azadeh Naderi, Donghee Yvette Wohn, and Aritra Dasgupta",
      "venue": "Proceedings of 2021 IEEE Visualization Conference (VIS)",
      "tags": [
        "IEEE VIS"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2021/sahaj_vis21.pdf"
      }
    },
    {
      "id": "beyond-visual-analytics-human-machine-teaming",
      "year": 2021,
      "title": "Beyond Visual Analytics: Human-Machine Teaming for AI-Driven Data Sensemaking",
      "authors": "John Wenskovitch, Corey Fallon, Kate Miller, and Aritra Dasgupta",
      "venue": "IEEE VIS 2021 Workshop on Trust and Expertise in Visual Analytics",
      "tags": [
        "IEEE VIS Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2021/trex21.pdf"
      }
    },
    {
      "id": "fact-evidence-reasoning-communicative-visualization",
      "year": 2020,
      "title": "Knowing what to look for: A Fact-Evidence Reasoning Framework for Decoding Communicative Visualization",
      "authors": "Sahaj Vaidya and Aritra Dasgupta",
      "venue": "2020 IEEE Visualization Conference (VIS), pp. 231-235",
      "tags": [
        "IEEE VIS"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2020/sahaj_vis20.pdf"
      }
    },
    {
      "id": "urbanforest-data-forest-trees",
      "year": 2020,
      "title": "UrbanForest: Seeing the data forest despite the trees",
      "authors": "Akm Islam and Aritra Dasgupta",
      "venue": "IEEE Visualization Conference (VIS) 2020 Posters",
      "tags": [
        "IEEE VIS Posters"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2020/urbanForest.pdf"
      }
    },
    {
      "id": "privacy-preserving-data-visualization-reflections",
      "year": 2020,
      "title": "Privacy-Preserving Data Visualization: Reflections on the State of the Art and Research Opportunities",
      "authors": "Kaustav Bhattacharjee, Min Chen, and Aritra Dasgupta",
      "venue": "Computer Graphics Forum 39.3 (2020): 675-692",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2020/eurovis20.pdf"
      }
    },
    {
      "id": "color-scales-climate-scientists-performance",
      "year": 2020,
      "title": "The Effect of Color Scales on Climate Scientists' Objective and Subjective Performance in Spatial Data Analysis Tasks",
      "authors": "Aritra Dasgupta, Jorge Poco, Bernice Rogowitz, Kyungsik Han, Enrico Bertini, and Claudio T. Silva",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 26, no. 3 (2018): 1577-1591",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2020/tvcg_2020.pdf",
        "doi": "https://doi.org/10.1109/TVCG.2018.2876539"
      }
    },
    {
      "id": "comparative-visual-cues-competing-models",
      "year": 2020,
      "title": "Separating the Wheat from the Chaff: Comparative Visual Cues for Transparent Diagnostics of Competing Models",
      "authors": "Aritra Dasgupta, Hong Wang, Nancy O'Brien, and Susannah Burrows",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 26.1 (2020): 1043-1053",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2020/infovis19.pdf"
      }
    },
    {
      "id": "visual-uncertainty-disclosure-risks",
      "year": 2019,
      "title": "Guess Me If You Can: A Visual Uncertainty Model for Transparent Evaluation of Disclosure Risks in Privacy-Preserving Data Visualization",
      "authors": "Aritra Dasgupta, Robert Kosara, and Min Chen",
      "venue": "2019 IEEE Symposium on Visualization for Cyber Security (VizSec), pp. 1-10",
      "tags": [
        "VizSec"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2019/vizsec19.pdf",
        "doi": "https://doi.org/10.1109/VizSec48167.2019.9161608"
      }
    },
    {
      "id": "relative-importance-climate-model-fidelity",
      "year": 2018,
      "title": "Characterizing the Relative Importance Assigned to Physical Variables by Climate Scientists When Assessing Atmospheric Climate Model Fidelity",
      "authors": "Susannah M. Burrows, Aritra Dasgupta, Sarah Reehl, Lisa Bramer, Po-Lun Ma, Philip J. Rasch, and Yun Qian",
      "venue": "Advances in Atmospheric Sciences 35.9 (2018): 1101-1113",
      "tags": [
        "Advances in Atmospheric Sciences"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2018/aas18.pdf"
      }
    },
    {
      "id": "bridging-computation-visual-communication-change",
      "year": 2018,
      "title": "Bridging Computation and Visual Communication of Change using Levels of Abstraction",
      "authors": "Aritra Dasgupta, Meg Pirrung, Joe Bruce, Jean Scholtz, Kyungsik Han, and Dustin Arendt",
      "venue": "IEEE VIS Workshop on Visual Communication (2018)",
      "tags": [
        "IEEE VIS Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2018/viscom18.pdf"
      }
    },
    {
      "id": "experts-familiarity-optimality-visualization-design",
      "year": 2018,
      "title": "Experts' Familiarity Versus Optimality of Visualization Design: How Familiarity Affects Perceived and Objective Task Performance",
      "authors": "Aritra Dasgupta",
      "venue": "Cognitive Biases in Visualizations (2018): 75-86",
      "tags": [
        "Book Chapter"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2018/bookchapter18.pdf"
      }
    },
    {
      "id": "exploratory-labeling-assistant",
      "year": 2018,
      "title": "The Exploratory Labeling Assistant: Mixed-Initiative Label Curation with Large Document Collections",
      "authors": "Cristian Felix, Aritra Dasgupta, and Enrico Bertini",
      "venue": "Proceedings of the 31st Annual ACM Symposium on User Interface Software and Technology, pp. 153-164",
      "tags": [
        "UIST"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2018/uist18.pdf",
        "doi": "https://doi.org/10.1145/3242587.3242596"
      }
    },
    {
      "id": "human-factors-streaming-data-analysis",
      "year": 2018,
      "title": "Human factors in streaming data analysis: Challenges and opportunities for information visualization",
      "authors": "Aritra Dasgupta, Dustin L. Arendt, Lyndsey R. Franklin, Pak Chung Wong, and Kristin A. Cook",
      "venue": "Computer Graphics Forum 37.1 (2018): 254-272",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2018/cgf18.pdf",
        "doi": "https://doi.org/10.1111/cgf.13264"
      }
    },
    {
      "id": "familiarity-cognitive-biases-visualization",
      "year": 2017,
      "title": "Towards Understanding Familiarity Related Cognitive Biases in Visualization Design and Usage",
      "authors": "Aritra Dasgupta",
      "venue": "DECISIVe: Workshop on Dealing with Cognitive Biases in Visualizations, IEEE VIS",
      "tags": [
        "IEEE VIS Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2017/decisive17.pdf"
      }
    },
    {
      "id": "workflow-visual-diagnostics-binary-classifiers",
      "year": 2017,
      "title": "A Workflow for Visual Diagnostics of Binary Classifiers Using Instance-Level Explanations",
      "authors": "Josua Krause, Aritra Dasgupta, Jordan Swartz, Yindalon Aphinyanaphongs, and Enrico Bertini",
      "venue": "2017 IEEE Conference on Visual Analytics Science and Technology (VAST)",
      "tags": [
        "IEEE VAST"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2017/vast17.pdf"
      }
    },
    {
      "id": "interpreting-black-box-classifiers-instance-level",
      "year": 2017,
      "title": "Interpreting Black-Box Classifiers Using Instance-Level Visual Explanations",
      "authors": "Paolo Tamagnini, Josua Krause, Aritra Dasgupta, and Enrico Bertini",
      "venue": "Proceedings of the 2nd Workshop on Human-In-the-Loop Data Analytics - HILDA'17",
      "tags": [
        "HILDA"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2017/hilda17.pdf"
      }
    },
    {
      "id": "domain-scientists-visual-analytic-judgments",
      "year": 2017,
      "title": "Empirical Analysis of the Subjective Impressions and Objective Measures of Domain Scientists' Visual Analytic Judgments",
      "authors": "Aritra Dasgupta, Susannah Burrows, Kyungsik Han, and Philip J. Rasch",
      "venue": "Proceedings of the 2017 CHI Conference on Human Factors in Computing Systems",
      "tags": [
        "CHI"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2017/chi17.pdf"
      }
    },
    {
      "id": "familiarity-vs-trust-visual-analytics",
      "year": 2017,
      "title": "Familiarity vs trust: A comparative study of domain scientists' trust in visual analytics and conventional analysis methods",
      "authors": "Aritra Dasgupta, Joon-Yong Lee, Ryan Wilson, Robert Lafrance, Nick Cramer, Kristin Cook, and Samuel H. Payne",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 23.1 (2016): 271-280",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2017/tvcg17.pdf"
      }
    },
    {
      "id": "seekaview-dimensionality-reduction",
      "year": 2016,
      "title": "Seekaview: An intelligent dimensionality reduction strategy for navigating high-dimensional data spaces",
      "authors": "Josua Krause, Aritra Dasgupta, Jean-Daniel Fekete, and Enrico Bertini",
      "venue": "2016 IEEE 6th Symposium on Large Data Analysis and Visualization (LDAV)",
      "tags": [
        "IEEE LDAV"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2016/SeekAView_An_intelligent_dimensionality_reduction_strategy_for_navigating_high-dimensional_data_spaces.pdf"
      }
    },
    {
      "id": "design-criteria-explanatory-visualizations",
      "year": 2016,
      "title": "Reflecting on the Design Criteria for Explanatory Visualizations",
      "authors": "Robert Kosara, Aritra Dasgupta, and Enrico Bertini",
      "venue": "Workshop on Creation, Curation, Critique and Conditioning of Principles and Guidelines in Visualization (C4PGV)",
      "tags": [
        "C4PGV"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2016/Reflecting%20on%20the%20Design%20Criteria%20for%20Explanatory%20Visualizations.pdf"
      }
    },
    {
      "id": "analytical-bottleneck-climate-data",
      "year": 2016,
      "title": "Reducing the analytical bottleneck for domain scientists: Lessons from a climate data visualization case study",
      "authors": "Aritra Dasgupta, Jorge Poco, Enrico Bertini, and Claudio Silva",
      "venue": "Computing in Science & Engineering 18.1 (2016): 92-100",
      "tags": [
        "Computing in Science & Engineering"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2016/Reducing_the_Analytical_Bottleneck_for_Domain_Scientists_Lessons_from_a_Climate_Data_Visualization_Case_Study.pdf"
      }
    },
    {
      "id": "bridging-theory-practice-climate-model-comparison",
      "year": 2015,
      "title": "Bridging theory with practice: An exploratory study of visualization use and design for climate model comparison",
      "authors": "Aritra Dasgupta, Jorge Poco, Yaxing Wei, Robert Cook, Enrico Bertini, and Claudio Silva",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 21.9 (2015): 996-1014",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2015/Bridging_Theory_with_Practice_An_Exploratory_Study_of_Visualization_Use_and_Design_for_Climate_Model_Comparison.pdf"
      }
    },
    {
      "id": "vimtex-geological-data-exploration",
      "year": 2015,
      "title": "VIMTEX: A Visualization Interface for Multivariate, Time-Varying, Geological Data Exploration",
      "authors": "Aritra Dasgupta, Robert Kosara, and Luke Gosink",
      "venue": "Computer Graphics Forum 34.3 (2015)",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2015/VIMTEX%20A%20Visualization%20Interface%20for%20Multivariate,%20Time-Varying,%20Geological%20Data%20Exploration.pdf"
      }
    },
    {
      "id": "visual-reconciliation-climate-modeling",
      "year": 2014,
      "title": "Visual reconciliation of alternative similarity spaces in climate modeling",
      "authors": "Jorge Poco, Aritra Dasgupta, Yaxing Wei, William Hargrove, Christopher R. Schwalm, Deborah N. Huntzinger, Robert Cook, Enrico Bertini, Claudio T. Silva",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 20.12 (2014): 1923-1932",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2014/Visual%20reconciliation%20of%20alternative%20similarity%20spaces%20in%20climate%20modeling.pdf"
      }
    },
    {
      "id": "privacy-preserving-ehr-visualization",
      "year": 2014,
      "title": "Opportunities and challenges for privacy-preserving visualization of electronic health record data",
      "authors": "Aritra Dasgupta, Eamonn Maguire, Abdul-Rahman Alfie, and Min Chen",
      "venue": "IEEE VIS 2014 Workshop on Visualization of Electronic Health Records, vol. 13",
      "tags": [
        "IEEE VIS Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2014/Opportunities%20and%20Challenges%20for%20Privacy-Preserving%20Visualization%20of%20Electronic%20Health%20Record%20Data.pdf"
      }
    },
    {
      "id": "similarityexplorer-climate-data",
      "year": 2014,
      "title": "SimilarityExplorer: A Visual Inter-Comparison Tool for Multifaceted Climate Data",
      "authors": "Jorge Poco, Aritra Dasgupta, Yaxing Wei, William Hargrove, Christopher Schwalm, Robert Cook, Enrico Bertini, and Claudio Silva",
      "venue": "Computer Graphics Forum 33.3 (2014)",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2014/SimilarityExplorer%20A%20Visual%20Inter%E2%80%90Comparison%20Tool%20for%20Multifaceted%20Climate%20Data.pdf"
      }
    },
    {
      "id": "global-net-land-carbon-sink",
      "year": 2013,
      "title": "Global net land carbon sink: results from the Multi-scale Synthesis and Terrestrial Model Intercomparison Project (MsTMIP)",
      "authors": "D. N. Huntzinger, C. R. Schwalm, A. M. Michalak, R. B. Cook, A. R. Jacobson, K. M. Schaefer, Aritra Dasgupta, and J. Poco",
      "venue": "AGU Fall Meeting 2013: B13M-05",
      "tags": [
        "AGU Fall Meeting"
      ],
      "type": "conf"
    },
    {
      "id": "integrate-data-scientific-workflows-brokers",
      "year": 2013,
      "title": "Integrate Data into Scientific Workflows for Terrestrial Biosphere Model Evaluation through Brokers",
      "authors": "Y. Wei, R. B. Cook, F. Du, Aritra Dasgupta, J. Poco, D. N. Huntzinger, C. R. Schwalm, E. Boldrini, M. Santoro, J. Pearlman, F. Pearlman, S. Nativi, and S. Khalsa",
      "venue": "AGU Fall Meeting 2013: IN53E-06",
      "tags": [
        "AGU Fall Meeting"
      ],
      "type": "conf"
    },
    {
      "id": "privacy-utility-privacy-preserving-visualization",
      "year": 2013,
      "title": "Measuring privacy and utility in privacy-preserving visualization",
      "authors": "Aritra Dasgupta, Min Chen, and Robert Kosara",
      "venue": "Computer Graphics Forum 32.8 (2013)",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2013/Measuring%20Privacy%20and%20Utility%20in%20Privacy%E2%80%90Preserving%20Visualization.pdf"
      }
    },
    {
      "id": "visual-complexity-cluster-visualizations",
      "year": 2013,
      "title": "Measuring Visual Complexity of Cluster-Based Visualizations",
      "authors": "Brian Duffy, Aritra Dasgupta, Robert Kosara, S. Walton, and Min Chen",
      "venue": "arXiv preprint arXiv:1302.5824",
      "tags": [
        "arXiv"
      ],
      "type": "preprint",
      "links": {
        "pdf": "/publications/2013/Measuring%20Visual%20Complexity%20of%20Cluster-Based%20Visualizations.pdf",
        "arxiv": "https://arxiv.org/abs/1302.5824"
      }
    },
    {
      "id": "meta-parallel-coordinates",
      "year": 2012,
      "title": "Meta parallel coordinates for visualizing features in large, high-dimensional, time-varying data",
      "authors": "Aritra Dasgupta, Robert Kosara, and Luke Gosink",
      "venue": "IEEE Symposium on Large Data Analysis and Visualization (LDAV)",
      "tags": [
        "IEEE LDAV"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2012/Meta_parallel_coordinates_for_visualizing_features_in_large_high-dimensional_time-varying_data.pdf"
      }
    },
    {
      "id": "tracing-data-visualization-pipeline",
      "year": 2012,
      "title": "The importance of tracing data through the visualization pipeline",
      "authors": "Aritra Dasgupta and Robert Kosara",
      "venue": "Proceedings of the 2012 BELIV Workshop: Beyond Time and Errors-Novel Evaluation Methods for Visualization",
      "tags": [
        "BELIV"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2012/The%20importance%20of%20tracing%20data%20through%20the%20visualization%20pipeline.pdf"
      }
    },
    {
      "id": "visual-uncertainty-parallel-coordinates",
      "year": 2012,
      "title": "Conceptualizing visual uncertainty in parallel coordinates",
      "authors": "Aritra Dasgupta, Min Chen, and Robert Kosara",
      "venue": "Computer Graphics Forum 31.3pt2 (2012)",
      "tags": [
        "CGF"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2012/Conceptualizing%20Visual%20Uncertainty%20in%20Parallel%20Coordinates.pdf"
      }
    },
    {
      "id": "visual-uncertainty-paradigm-dissertation",
      "year": 2012,
      "title": "The visual uncertainty paradigm for controlling screen-space information in visualization",
      "authors": "Aritra Dasgupta",
      "venue": "Dissertation, The University of North Carolina at Charlotte",
      "tags": [
        "Dissertation"
      ],
      "type": "thesis"
    },
    {
      "id": "adaptive-privacy-preserving-parallel-coordinates",
      "year": 2011,
      "title": "Adaptive privacy-preserving visualization using parallel coordinates",
      "authors": "Aritra Dasgupta and Robert Kosara",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 17.12 (2011): 2241-2248",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2011/Adaptive_Privacy-Preserving_Visualization_Using_Parallel_Coordinates.pdf"
      }
    },
    {
      "id": "privacy-preserving-data-visualization-parallel-coordinates",
      "year": 2011,
      "title": "Privacy-preserving data visualization using parallel coordinates",
      "authors": "Aritra Dasgupta and Robert Kosara",
      "venue": "Visualization and Data Analysis 2011, vol. 7868",
      "tags": [
        "Visualization and Data Analysis"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2011/Privacy-preserving%20data%20visualization%20using%20parallel%20coordinates.pdf"
      }
    },
    {
      "id": "pargnostics-screen-space-metrics",
      "year": 2010,
      "title": "Pargnostics: Screen-space metrics for parallel coordinates",
      "authors": "Aritra Dasgupta and Robert Kosara",
      "venue": "IEEE Transactions on Visualization and Computer Graphics 16.6 (2010): 1017-1026",
      "tags": [
        "TVCG"
      ],
      "type": "journal",
      "links": {
        "pdf": "/publications/2010/Pargnostics_Screen-Space_Metrics_for_Parallel_Coordinates.pdf"
      }
    },
    {
      "id": "information-loss-metrics-visualization",
      "year": 2010,
      "title": "The Need for Information Loss Metrics in Visualization",
      "authors": "Aritra Dasgupta and Robert Kosara",
      "venue": "Workshop on The Role of Theory in Information Visualization",
      "tags": [
        "Theory in InfoVis Workshop"
      ],
      "type": "conf",
      "links": {
        "pdf": "/publications/2010/The%20Need%20for%20Information%20Loss%20Metrics%20in%20Visualization.pdf"
      }
    }
  ],
  "people": [
    {
      "name": "Aritra Dasgupta",
      "role": "Associate Professor",
      "group": "faculty",
      "priority": 1,
      "initials": "AD",
      "affiliation": "NJIT",
      "email": "aritra.dasgupta@njit.edu",
      "image": "/people/aritra.jpeg",
      "website": "https://aedeegee.github.io/",
      "linkedin": "https://www.linkedin.com/in/aritradasgupta/"
    },
    {
      "name": "Avina Nakarmi",
      "role": "Ph.D. Student",
      "group": "phd",
      "priority": 2,
      "initials": "AN",
      "affiliation": "NJIT",
      "period": "2025 - Present",
      "email": "an778@njit.edu",
      "image": "/people/avina.jpeg",
      "website": "https://avinanakarmi.github.io/",
      "github": "https://github.com/avinanakarmi",
      "linkedin": "https://www.linkedin.com/in/avina-nakarmi-9b296a294",
      "scholar": "https://scholar.google.com/citations?user=deAxRaEAAAAJ&hl=en"
    },
    {
      "name": "Bayan Divaaniaazar",
      "role": "Ph.D. Student",
      "group": "phd",
      "priority": 2,
      "initials": "BD",
      "affiliation": "NJIT",
      "period": "2024 - Present",
      "website": "https://bayan-divaaniaazar.github.io/",
      "linkedin": "https://www.linkedin.com/in/bayan-divaaniaazar/",
      "github": "https://github.com/bayan-divaaniaazar"
    },
    {
      "name": "Naga Datha Saikiran Battula",
      "role": "Ph.D. Student",
      "group": "phd",
      "priority": 2,
      "initials": "SB",
      "affiliation": "NJIT",
      "period": "2025 - Present",
      "email": "nb547@njit.edu",
      "image": "/people/saikiran.jpeg",
      "website": "https://saikiranbattula.com/",
      "github": "https://github.com/saikiran2002",
      "linkedin": "https://www.linkedin.com/in/naga-datha-saikiran-battula-a62749206/",
      "scholar": "https://scholar.google.com/citations?user=APIs0i4AAAAJ"
    },
    {
      "name": "Vrushali Koli",
      "role": "Ph.D. Candidate",
      "group": "phd",
      "priority": 2,
      "initials": "VK",
      "affiliation": "NJIT",
      "period": "2022 - 2026 (expected)",
      "email": "vk343@njit.edu",
      "image": "/people/vrushali.jpg",
      "website": "https://vkoli.github.io/",
      "linkedin": "https://www.linkedin.com/in/vk801/",
      "github": "https://github.com/vkoli"
    },
    {
      "name": "Jun Yuan",
      "role": "Ph.D. Alumnus",
      "group": "alumni",
      "priority": 3,
      "initials": "JY",
      "period": "2019 - 2024",
      "note": "Postdoctoral Research Associate, Digital Technology for Democracy Lab at UVA",
      "email": "jy448@njit.edu",
      "image": "/people/jun.png",
      "website": "https://jydrew.github.io/"
    },
    {
      "name": "Kaustav Bhattacharjee",
      "role": "Ph.D. Alumnus",
      "group": "alumni",
      "priority": 3,
      "initials": "KB",
      "period": "2019 - 2024",
      "note": "Postdoctoral Research Associate, Optimization and Control Group at PNNL",
      "email": "kb526@njit.edu",
      "image": "/people/kaustav.png",
      "website": "https://kaustavbhattacharjee.com/"
    },
    {
      "name": "Akm Islam",
      "role": "Former Research Assistant",
      "group": "former",
      "priority": 4,
      "initials": "AI",
      "affiliation": "NJIT",
      "email": "akm.islam@njit.edu",
      "image": "/people/akm.jpeg",
      "website": "http://akmislam.com/"
    }
  ]
};
