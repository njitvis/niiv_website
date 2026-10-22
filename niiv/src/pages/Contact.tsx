import { useEffect, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
} from "lucide-react";

const CONTACT_EMAIL = "aritra.dasgupta@njit.edu";

const ADDRESS_LINES = [
  "New Jersey Institute of Technology",
  "Guttenberg Information Technologies Center (GITC)",
  "Suite 5500",
  "University Heights,",
  "Newark, New Jersey 07102",
];

const ADDRESS_TEXT = ADDRESS_LINES.join("\n");
const MAP_QUERY = encodeURIComponent(
  "Guttenberg Information Technologies Center, New Jersey Institute of Technology, Newark, New Jersey 07102",
);
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;

const HIRING_CRITERIA = [
  "Strong programming background in languages such as Python or JavaScript",
  "Foundation in computational and statistical methods",
  "GRE Quantitative score of 163 or higher",
  "Keen interest in human-centered data science",
  "Passion for research, experimentation, and exploration",
];

const RESEARCH_TOPICS = [
  {
    funder: "NSF",
    text: "Design and evaluate interactive explanation methods that combine explainable AI and visualization for algorithmic rankers.",
  },
  {
    funder: "NSF",
    text: "Develop and evaluate transparent data-driven solutions for hiring AI in collaboration with organizational psychologists and AI researchers.",
  },
  {
    funder: "DOE",
    text: "Develop human-machine teaming tools for secure cyber-physical systems such as the electric grid.",
  },
  {
    text: "Analyze how visual communication methods can support evidence-based human reasoning.",
  },
  {
    text: "Study human-AI interfaces for improving crisis information communication.",
  },
  {
    text: "Explore text and visual interfaces that combine generative AI with interactive visualization for sensemaking of complex information.",
  },
];

const copyText = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const copied = document.execCommand("copy");
    textArea.remove();
    return copied;
  }
};

const Contact = () => {
  const [addressCopied, setAddressCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Contact | NIIV Lab";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const copyAddress = async () => {
    const copied = await copyText(ADDRESS_TEXT);
    setAddressCopied(copied);
    window.setTimeout(() => setAddressCopied(false), 1600);
  };

  const copyEmail = async () => {
    const copied = await copyText(CONTACT_EMAIL);
    setEmailCopied(copied);
    window.setTimeout(() => setEmailCopied(false), 1600);
  };

  return (
    <div className="bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <header className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                  Contact
                </h1>
                <p className="reading-copy mt-5 text-gray-700">
                  Reach out about research collaborations, prospective
                  students, or the lab&apos;s work.
                </p>
              </header>

              <section aria-labelledby="lab-inquiries-heading">
                <p
                  id="lab-inquiries-heading"
                  className="text-sm font-semibold text-gray-600"
                >
                  Lab inquiries
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Email the lab
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    {emailCopied ? (
                      <Check
                        className="h-4 w-4 text-green-700"
                        aria-hidden="true"
                      />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                    {emailCopied ? "Email copied" : "Copy email"}
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-500">{CONTACT_EMAIL}</p>
              </section>
            </div>
          </div>
        </section>

        <section className="pb-14 pt-6 sm:pb-20 sm:pt-8">
          <div className="site-shell">
            <section
              className="overflow-hidden rounded-lg border border-gray-200/90 border-l-4 border-l-[#CC0000] bg-white/80 px-6 py-8 backdrop-blur-sm sm:px-8 sm:py-10"
              aria-labelledby="prospective-students-heading"
            >
              <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
                <div className="lg:col-span-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#CC0000]/[0.08] text-[#B00000]">
                    <Briefcase className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2
                    id="prospective-students-heading"
                    className="mt-5 text-2xl font-semibold text-gray-950"
                  >
                    Prospective students
                  </h2>
                  <p className="reading-copy mt-3 text-gray-700">
                    We welcome inquiries from prospective Ph.D. students
                    interested in intelligible AI, visual analytics, and
                    human-centered data science.
                  </p>
                  <p className="reading-copy mt-3 text-gray-700">
                    Include your CV and a concise description of your research
                    interests when you contact the lab.
                  </p>
                </div>

                <div className="border-t border-gray-200/80 pt-7 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  <h3 className="text-lg font-semibold text-gray-950">
                    What we look for
                  </h3>
                  <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {HIRING_CRITERIA.map((criterion) => (
                      <li
                        key={criterion}
                        className="flex gap-3 text-sm leading-6 text-gray-700"
                      >
                        <span
                          className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#CC0000]"
                          aria-hidden="true"
                        />
                        <span>{criterion}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={`mailto:${CONTACT_EMAIL}?subject=Prospective%20Ph.D.%20Student%20-%20NIIV%20Lab`}
                    className="group mt-7 inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    Email about opportunities
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </section>

            <section
              className="mt-10"
              aria-labelledby="research-topics-heading"
            >
              <div className="max-w-3xl">
                <h2
                  id="research-topics-heading"
                  className="text-2xl font-semibold text-gray-950"
                >
                  Research topics
                </h2>
                <p className="reading-copy mt-3 text-gray-700">
                  Current directions include transparent AI, visual analytics,
                  human-machine teaming, and interfaces for complex
                  sensemaking.
                </p>
              </div>

              <ul className="compact-cards-grid mt-6 gap-4">
                {RESEARCH_TOPICS.map((topic) => (
                  <li
                    key={topic.text}
                    className="flex min-h-40 flex-col rounded-lg border border-gray-200/90 bg-white/80 p-5 backdrop-blur-sm"
                  >
                    {topic.funder && (
                      <span className="mb-4 inline-flex self-start rounded-full border border-[#CC0000]/15 bg-[#CC0000]/[0.06] px-2.5 py-1 text-xs font-semibold text-[#B00000]">
                        Funded by {topic.funder}
                      </span>
                    )}
                    <p className="reading-copy text-gray-700">
                      {topic.text}
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            <section
              className="mt-10 overflow-hidden rounded-lg border border-gray-200/90 bg-white/80 shadow-sm backdrop-blur-sm supports-[backdrop-filter]:bg-white/70"
              aria-labelledby="location-heading"
            >
              <div className="grid lg:grid-cols-5">
                <div className="flex flex-col bg-[#CC0000]/[0.035] p-6 sm:p-8 lg:col-span-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#CC0000]/10 text-[#B00000]">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>

                  <h2
                    id="location-heading"
                    className="mt-5 text-2xl font-semibold text-gray-950"
                  >
                    Our location
                  </h2>
                  <p className="reading-copy mt-2 text-gray-700">
                    The lab is located in GITC on the NJIT campus in Newark.
                  </p>

                  <div
                    className="mt-6 border-l-2 border-[#CC0000] pl-4 text-sm font-semibold leading-7 text-gray-900"
                    aria-label="NIIV Lab address"
                  >
                    {ADDRESS_LINES.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap gap-2">
                    <a
                      href={DIRECTIONS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    >
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                      Get directions
                    </a>
                    <button
                      type="button"
                      onClick={copyAddress}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-400 hover:text-gray-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    >
                      {addressCopied ? (
                        <Check
                          className="h-4 w-4 text-green-700"
                          aria-hidden="true"
                        />
                      ) : (
                        <Copy className="h-4 w-4" aria-hidden="true" />
                      )}
                      {addressCopied ? "Address copied" : "Copy address"}
                    </button>
                  </div>
                </div>

                <div className="min-h-80 border-t border-gray-200/80 bg-gray-100 lg:col-span-3 lg:min-h-[26.875rem] lg:border-l lg:border-t-0">
                  <iframe
                    title="Map of Guttenberg Information Technologies Center at NJIT"
                    src={MAP_EMBED_URL}
                    className="h-full min-h-80 w-full border-0 lg:min-h-[26.875rem]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
