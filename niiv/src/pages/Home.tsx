import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getFeaturedPeople, getPersonAnchor } from "../data/people";
import { projectsData } from "../data/projectData";

const LAB_UPDATES = [
  {
    date: "Mar 2026",
    dateTime: "2026-03",
    category: "Showcase",
    title:
      "Saikiran Battula presented human-AI research at NJIT AI Exploration Day",
    href: "https://saikiranbattula.com/AI_exploration_2.jpeg",
  },
  {
    date: "Nov 2024",
    dateTime: "2024-11",
    category: "Milestone",
    title: "Kaustav Bhattacharjee defended his Ph.D. dissertation",
    href: "https://www.linkedin.com/posts/kaustav-bhattacharjee_departmentofdatasciencenjit-activity-7258500643122794496-8Khp",
  },
  {
    date: "Jun 2024",
    dateTime: "2024-06",
    category: "Publication",
    title: "Vrushali Koli's paper was accepted at HCI+NLP",
    href: "https://aclanthology.org/2024.hcinlp-1.7/",
  },
  {
    date: "Apr 2024",
    dateTime: "2024-04",
    category: "Award",
    title: "Kaustav Bhattacharjee won best poster at NYC Privacy Day",
    href: "https://airesponsibly.net/privacy_day/",
  },
  {
    date: "Feb 2024",
    dateTime: "2024-02",
    category: "Publication",
    title: "The lab published at IEEE ISGT North America",
    href: "https://doi.org/10.1109/ISGT59692.2024.10454191",
  },
  {
    date: "Nov 2023",
    dateTime: "2023-11",
    category: "Publication",
    title: "Jun Yuan's paper was accepted at XAI in Action",
    href: "https://xai-in-action.github.io/",
  },
];

const Home = () => {
  const researchSpotlight = useMemo(
    () => [
      {
        title: "Explainable AI Systems",
        caption: "Making black-box models transparent and interpretable",
        image: "/explainableAI.png",
      },
      {
        title: "Visual Analytics for Decisions",
        caption:
          "Supporting high-stakes decision-making with interactive visualizations",
        image: "/transparentAI.png",
      },
      {
        title: "Privacy-Aware Discovery",
        caption:
          "Protecting sensitive data while enabling meaningful analysis",
        image: "/privacyAware.png",
      },
    ],
    [],
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const teamPreview = getFeaturedPeople(5);
  const featuredProjects = projectsData.slice(0, 3);

  const nextSlide = useCallback(() => {
    setCurrentSlide((current) => (current + 1) % researchSpotlight.length);
  }, [researchSpotlight.length]);

  const previousSlide = useCallback(() => {
    setCurrentSlide(
      (current) =>
        (current - 1 + researchSpotlight.length) % researchSpotlight.length,
    );
  }, [researchSpotlight.length]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "NIIV Lab | Intelligible Information Visualization";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = window.setInterval(nextSlide, 4000);
    return () => window.clearInterval(interval);
  }, [isPaused, nextSlide]);

  return (
    <div className="bg-background">
      <main>
        <section className="relative bg-gradient-to-b from-white to-[#fff8f8]">
          <div className="mx-auto max-w-[1400px] px-6 py-20 lg:pb-[4.5rem] lg:pt-10">
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-0">
              <section className="relative order-1 lg:order-2 lg:col-span-8 lg:border-x lg:border-gray-200 lg:px-8">
                <header className="mb-8">
                  <h1 className="mb-6 text-3xl font-extrabold text-[#1a1a1a]">
                    Designing Intelligible Human-AI Collaboration
                  </h1>

                  <blockquote className="border-l-[3px] border-gray-300 pl-6">
                    <p className="font-serif text-[15px] italic leading-[1.7] text-[#333]">
                      &ldquo;The single biggest problem in communication is the
                      illusion that it has taken place.&rdquo;
                    </p>
                    <footer className="mt-2 text-xs font-medium text-[#666]">
                      &mdash; George Bernard Shaw
                    </footer>
                  </blockquote>

                  <div className="mt-8">
                    <h2 className="mb-3 text-xs font-extrabold uppercase text-[#CC0000]">
                      Who We Are
                    </h2>
                    <p className="font-serif text-[16px] leading-[1.75] text-[#2a2a2a]">
                      We are a group of{" "}
                      <span className="font-semibold text-[#1a1a1a]">
                        data toolsmiths
                      </span>{" "}
                      who develop and study the role of{" "}
                      <span className="font-semibold text-[#1a1a1a]">
                        visualization techniques
                      </span>{" "}
                      as a{" "}
                      <span className="italic font-medium text-[#333]">
                        transparent lens
                      </span>{" "}
                      between what is computed from data and what is
                      communicated to the human mind.
                    </p>
                  </div>
                </header>

                <div className="mt-8 grid gap-8 lg:grid-cols-12">
                  <section
                    className="order-2 lg:order-1 lg:col-span-7"
                    aria-labelledby="research-spotlight-heading"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onFocusCapture={() => setIsPaused(true)}
                    onBlurCapture={() => setIsPaused(false)}
                  >
                    <h2
                      id="research-spotlight-heading"
                      className="mb-3 text-[10px] font-bold uppercase text-[#CC0000]"
                    >
                      Research Spotlight
                    </h2>

                    <div className="group/carousel relative overflow-hidden rounded-2xl bg-[#FAFAFA] shadow-xl ring-1 ring-black/10">
                      <div className="relative aspect-video overflow-hidden">
                        {researchSpotlight.map((item, index) => (
                          <div
                            key={item.title}
                            className={`absolute inset-0 transition-all duration-700 ease-out ${
                              index === currentSlide
                                ? "scale-100 opacity-100"
                                : "scale-110 opacity-0"
                            }`}
                          >
                            <img
                              src={item.image}
                              alt={item.title}
                              className="h-full w-full bg-white p-2 object-contain transition-transform duration-700 group-hover/carousel:scale-[1.01]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-80" />
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={previousSlide}
                          className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#333] opacity-100 shadow-lg transition duration-300 hover:scale-110 hover:bg-[hsl(25,65%,50%)] hover:text-white sm:-translate-x-2 sm:opacity-0 sm:group-hover/carousel:translate-x-0 sm:group-hover/carousel:opacity-100"
                          aria-label="Previous research spotlight"
                          title="Previous research spotlight"
                        >
                          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={nextSlide}
                          className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#333] opacity-100 shadow-lg transition duration-300 hover:scale-110 hover:bg-[hsl(25,65%,50%)] hover:text-white sm:translate-x-2 sm:opacity-0 sm:group-hover/carousel:translate-x-0 sm:group-hover/carousel:opacity-100"
                          aria-label="Next research spotlight"
                          title="Next research spotlight"
                        >
                          <ChevronRight className="h-5 w-5" aria-hidden="true" />
                        </button>

                        <div
                          className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                            isPaused ? "opacity-100" : "opacity-0"
                          }`}
                        >
                          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <Play
                              className="ml-1 h-6 w-6 text-white"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-b from-[#1E1E1E] to-[#141414] p-5">
                        <h3 className="mb-1 text-lg font-semibold text-[#F5F5F5]">
                          {researchSpotlight[currentSlide].title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#A8A8A8]">
                          {researchSpotlight[currentSlide].caption}
                        </p>

                        <div
                          className="mt-4 flex items-center gap-2"
                          aria-label="Select research spotlight"
                        >
                          {researchSpotlight.map((item, index) => (
                            <button
                              key={item.title}
                              type="button"
                              onClick={() => setCurrentSlide(index)}
                              aria-label={`Show ${item.title}`}
                              aria-pressed={currentSlide === index}
                              className={`h-2 rounded-full transition-all duration-300 ${
                                currentSlide === index
                                  ? "w-8 bg-[hsl(25,65%,50%)]"
                                  : "w-2 bg-white/20 hover:scale-125 hover:bg-white/35"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>

                  <div className="order-1 space-y-8 lg:order-2 lg:col-span-5">
                    <section aria-labelledby="vision-heading">
                      <h2
                        id="vision-heading"
                        className="mb-3 text-xs font-extrabold uppercase text-[#CC0000]"
                      >
                        Our Vision
                      </h2>
                      <p className="font-serif text-[15px] leading-[1.8] text-[#2a2a2a]">
                        We operationalize this by{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          visualizing data
                        </span>{" "}
                        with the goal of letting observers{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          see
                        </span>
                        ,{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          understand
                        </span>
                        , and{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          trust
                        </span>{" "}
                        information generated by{" "}
                        <span className="italic text-[#444]">
                          black-box algorithms
                        </span>
                        .
                      </p>
                    </section>

                    <section aria-labelledby="approach-heading">
                      <h2
                        id="approach-heading"
                        className="mb-3 text-xs font-extrabold uppercase text-[#CC0000]"
                      >
                        Our Approach
                      </h2>
                      <p className="font-serif text-[15px] leading-[1.8] text-[#2a2a2a]">
                        By embracing a{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          human-centered data science approach
                        </span>{" "}
                        that culminates in interactive visual analytic
                        interfaces, we preserve the best of both worlds: the{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          power of computational methods
                        </span>{" "}
                        and{" "}
                        <span className="font-semibold text-[#1a1a1a]">
                          human judgment and reasoning
                        </span>
                        .
                      </p>
                    </section>

                    <Link
                      to="/research"
                      className="group inline-flex items-center gap-2 text-sm font-medium text-[hsl(25,65%,45%)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    >
                      View all research
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </section>

              <aside className="order-3 mt-8 lg:order-3 lg:col-span-2 lg:mt-0 lg:pl-8">
                <h2 className="mb-6 text-base font-bold text-[#222]">
                  Lab Updates
                </h2>

                <ol className="relative space-y-6">
                  <div
                    className="absolute bottom-2 left-2 top-2 w-px bg-gray-200"
                    aria-hidden="true"
                  />
                  {LAB_UPDATES.map((update) => (
                    <li
                      key={`${update.date}-${update.title}`}
                      className="group relative flex gap-3"
                    >
                      <div className="relative w-4 shrink-0">
                        <span className="absolute left-2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-gray-400 ring-2 ring-white transition duration-200 group-hover:scale-125 group-hover:bg-[#CC0000]" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <time
                            dateTime={update.dateTime}
                            className="text-xs font-semibold text-gray-700"
                          >
                            {update.date}
                          </time>
                          <span className="rounded-full border border-[#C65A28]/20 bg-[#C65A28]/10 px-2 py-0.5 text-[10px] font-semibold text-[#A8431F]">
                            {update.category}
                          </span>
                        </div>
                        <a
                          href={update.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-start gap-1.5 text-sm font-semibold leading-5 text-gray-950 transition-colors hover:text-[#CC0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                        >
                          <span>{update.title}</span>
                          <ExternalLink
                            className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-400"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </li>
                  ))}
                </ol>
              </aside>

              <aside className="order-2 mt-8 lg:order-1 lg:col-span-2 lg:mt-0 lg:-ml-3 lg:pr-4">
                <h2 className="mb-5 text-sm font-bold text-[#222]">
                  Our Team
                </h2>

                <div className="mb-5 flex flex-col gap-4">
                  {teamPreview.map((member) => (
                    <Link
                      key={member.name}
                      to={`/people#${getPersonAnchor(member.name)}`}
                      className="group -ml-2 flex items-center gap-3 rounded-md border-l-2 border-transparent py-1 pl-2 pr-1 transition duration-200 hover:border-[#CC0000] hover:bg-white/70 focus-visible:border-[#CC0000] focus-visible:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]/30"
                    >
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white text-[10px] font-bold text-[#B00000] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-[1.03]">
                        {member.image ? (
                          <img
                            src={member.image}
                            alt={`${member.name} profile`}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover object-top"
                          />
                        ) : (
                          member.initials
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold leading-snug text-[#1a1a1a] group-hover:text-primary">
                          {member.name}
                        </p>
                        <p className="text-[11px] leading-snug text-[#555]">
                          {member.role}
                        </p>
                      </div>
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 -translate-x-1 text-[#B00000] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>

                <Link
                  to="/people"
                  className="group inline-flex items-center text-xs font-medium text-gray-600 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  Meet our researchers
                  <ArrowRight
                    className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </aside>
            </div>
          </div>
        </section>

        <section
          className="border-b border-gray-200 bg-[#F8F9FA] py-12 sm:py-16"
          aria-labelledby="featured-projects-heading"
        >
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2
                  id="featured-projects-heading"
                  className="text-3xl font-bold text-gray-950"
                >
                  Featured Projects
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
                  Explore current work in explainable AI, decision support, and
                  privacy-aware visual analytics.
                </p>
              </div>
              <Link
                to="/research"
                className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-[#B00000] hover:text-[#8F0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 sm:self-auto"
              >
                All research areas
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-gray-200 bg-[#F8F9FA]">
          <div className="container mx-auto px-4 py-10 lg:px-8">
            <div className="flex flex-col gap-6 rounded-lg border border-gray-200 border-l-4 border-l-[#CC0000] bg-white/80 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-950">
                  Interested in joining the lab?
                </h2>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  We welcome students interested in intelligible AI and visual
                  analytics.
                </p>
              </div>
              <Link
                to="/contact"
                className="group inline-flex h-11 items-center justify-center gap-2 self-start rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 sm:self-auto"
              >
                Contact the lab
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
