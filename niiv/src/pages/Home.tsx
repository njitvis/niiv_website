import {
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getFeaturedPeople } from "../data/people";

const spotlightImages = [
  "/explainableAI.png",
  "/transparentAI.png",
  "/privacyAware.png",
];

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span
    className="
      inline-flex items-center rounded-full
      border border-[#CC0000]/30
      bg-gradient-to-br from-[#CC0000]/10 to-white/40
      backdrop-blur-md px-3 py-1 text-xs font-medium
      text-[#B00000] shadow-[inset_0_0_1px_rgba(255,255,255,0.3)]
    "
  >
    {children}
  </span>
);

const OrangePill = ({ children }: { children: React.ReactNode }) => (
  <span className="rounded-full bg-[hsl(25,65%,50%)] px-2 py-0.5 text-[9px] font-medium text-white shadow-sm">
    {children}
  </span>
);

const Home = () => {
  const labUpdates = [
    {
      date: "Dec 2024",
      title: "New Publication in IEEE VIS",
      description: "Visual analytics for algorithmic ranking systems",
      tag: "Publication",
    },
    {
      date: "Nov 2024",
      title: "NSF Grant Awarded",
      description: "Explainable AI for healthcare decision-making",
      tag: "Award",
    },
    {
      date: "Oct 2024",
      title: "Best Paper Award",
      description: "Privacy-aware data discovery framework",
      tag: "Paper",
    },
    {
      date: "Sep 2024",
      title: "Keynote at AI Conference",
      description: "Invited talk on transparent AI systems",
      tag: "Talk",
    },
    {
      date: "Aug 2024",
      title: "New Research Collaboration",
      description: "Partnership with industry leader in AI ethics",
      tag: "Award",
    },
    {
      date: "Jul 2024",
      title: "Graduate Student Spotlight",
      description: "Lab members recognized for outstanding research",
      tag: "Publication",
    },
  ];

  const featuredProjects = [
    {
      title: "Explainable AI for Algorithmic Rankers",
      description:
        "Human-in-the-loop workflow for multi-factorial sensitivity analysis of algorithmic ranking systems.",
      image: "/explainableAI.png",
      tags: ["Explainable AI", "Visualization"],
    },
    {
      title: "Transparent AI-driven Decision Making",
      description:
        "Applying visualization and AI for high-consequential decision-making in critical domains.",
      image: "/transparentAI.png",
      tags: ["AI Decisions", "Visual Analytics"],
    },
    {
      title: "Privacy-aware Data Discovery",
      description:
        "PRIVEE: A visual analytic workflow for proactive privacy risk inspection of open data.",
      image: "/privacyAware.png",
      tags: ["Privacy", "Data Science"],
    },
  ];

  // --- Research Spotlight (carousel) ---
  const researchSpotlight = useMemo(
    () => [
      {
        title: "Explainable AI Systems",
        caption: "Making black-box models transparent and interpretable",
        image: spotlightImages[0],
      },
      {
        title: "Visual Analytics for Decisions",
        caption: "Supporting high-stakes decision-making with interactive visualizations",
        image: spotlightImages[1],
      },
      {
        title: "Privacy-Aware Discovery",
        caption: "Protecting sensitive data while enabling meaningful analysis",
        image: spotlightImages[2],
      },
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % researchSpotlight.length);
  }, [researchSpotlight.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + researchSpotlight.length) % researchSpotlight.length);
  }, [researchSpotlight.length]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const teamPreview = getFeaturedPeople(5);

  return (
    <div className="min-h-screen bg-background">
      {/* Landing Section - Our Team | Research Philosophy | Lab Updates */}
      <section className="relative bg-gradient-to-b from-[#ffffff] to-[#fff8f8]">
        {/* Top Red Accent Line */}
        <div className="bg-white bg-grid bg-vignette">
          {/* <div className="relative h-0.5 bg-[#CC0000]">
            <div className="absolute inset-0 bg-[#CC0000] opacity-20 blur-lg h-4 -top-3" />
          </div> */}
          <div className="h-px bg-[#CC0000]/90" />

        </div>

        <div className="mx-auto max-w-[1400px] px-6 py-20 lg:pt-10 lg:pb-18">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-0">
            {/* Center Column */}
            <div className="relative order-1 lg:order-2 lg:col-span-8 lg:px-8 lg:border-x lg:border-[#EAEAEA]">
              {/* Intro */}
              <div className="mb-8">
                <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-[#1a1a1a]">
                  Designing Intelligible Human-AI Collaboration
                </h2>

                <div className="mb-8 animate-fade-in">
                  <blockquote className="relative pl-6 border-l-[3px] border-gray-300">
                    <p className="font-serif text-[15px] italic text-[#333] leading-[1.7]">
                      "The single biggest problem in communication is the illusion that it has taken place."
                    </p>
                    <footer className="mt-2 text-xs font-medium text-[#666]">
                      — George Bernard Shaw
                    </footer>
                  </blockquote>
                </div>

                <div className="animate-fade-in" style={{ animationDelay: "100ms" }}>
                  <h5 className="mb-3 text-xs font-extrabold text-[#CC0000] uppercase tracking-[0.15em]">
                    Who We Are
                  </h5>
                  <p className="font-serif text-[16px] text-[#2a2a2a] leading-[1.75]">
                    We are a group of <span className="font-semibold text-[#1a1a1a]">data toolsmiths</span> who develop
                    and study the role of{" "}
                    <span className="font-semibold text-[#1a1a1a]">visualization techniques</span> as a{" "}
                    <span className="italic font-medium text-[#333]">transparent lens</span> between what is computed
                    from data and what is communicated to the human mind.
                  </p>
                </div>
              </div>

              {/* Spotlight + Vision/Approach */}
              <div className="grid gap-8 lg:grid-cols-12 mt-8">
                {/* Left: Research Spotlight Carousel */}
                <div
                  className="lg:col-span-7 animate-fade-in order-2 lg:order-1"
                  style={{ animationDelay: "200ms" }}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  
                  <span className="inline-block mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#CC0000]">
                    Research Spotlight
                  </span>

                  <div className="group/carousel relative overflow-hidden rounded-2xl bg-[#FAFAFA] shadow-xl ring-1 ring-black/10">
                    <div className="relative aspect-video overflow-hidden">
                      {researchSpotlight.map((item, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 transition-all duration-700 ease-out ${
                            index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-110"
                          }`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain p-2 bg-white transition-transform duration-700 group-hover/carousel:scale-[1.01]"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-80 transition-opacity duration-500 group-hover/carousel:opacity-90" />
                        </div>
                      ))}

                      <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#333] shadow-lg transition-all duration-300 opacity-0 -translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 hover:bg-[hsl(25,65%,50%)] hover:text-white hover:scale-110"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#333] shadow-lg transition-all duration-300 opacity-0 translate-x-2 group-hover/carousel:opacity-100 group-hover/carousel:translate-x-0 hover:bg-[hsl(25,65%,50%)] hover:text-white hover:scale-110"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>

                      <div
                        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
                          isPaused ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Play className="h-6 w-6 text-white ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 bg-gradient-to-b from-[#1E1E1E] to-[#141414]">
                      <h6 className="text-lg font-semibold text-[#F5F5F5] mb-1">
                        {researchSpotlight[currentSlide].title}
                      </h6>
                      <p className="text-sm text-[#A8A8A8] leading-relaxed">
                        {researchSpotlight[currentSlide].caption}
                      </p>

                      <div className="mt-4 flex items-center gap-2">
                        {researchSpotlight.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                              index === currentSlide
                                ? "w-8 bg-gradient-to-r from-[hsl(25,65%,45%)] to-[hsl(25,70%,60%)]"
                                : "w-2 bg-white/20 hover:bg-white/35 hover:scale-125"
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* <div className="mt-4 p-4 bg-[#f9f9f9] rounded-lg border border-[#eaeaea]">
                    <p className="text-sm font-semibold text-[#1a1a1a]">
                      {researchSpotlight[currentSlide].title} —
                    </p>
                    <p className="text-sm text-[#555] mt-1">
                      {researchSpotlight[currentSlide].caption}.
                    </p>
                  </div> */}
                </div>

                {/* Right: Our Vision + Our Approach */}
                <div className="lg:col-span-5 space-y-8 order-1 lg:order-2">
                  <div className="group animate-fade-in" style={{ animationDelay: "300ms" }}>
                    <h5 className="mb-3 text-xs font-extrabold text-[#CC0000] uppercase tracking-[0.15em]">
                      Our Vision
                    </h5>
                    <p className="font-serif text-[15px] text-[#2a2a2a] leading-[1.8]">
                      We operationalize this by <span className="font-semibold text-[#1a1a1a]">visualizing data</span>{" "}
                      with the goal of letting observers{" "}
                      <span className="font-semibold text-[#1a1a1a]">see</span>,{" "}
                      <span className="font-semibold text-[#1a1a1a]">understand</span>, and{" "}
                      <span className="font-semibold text-[#1a1a1a]">trust</span> information generated by{" "}
                      <span className="italic text-[#444]">black-box algorithms</span>.
                    </p>
                  </div>

                  <div className="group animate-fade-in" style={{ animationDelay: "400ms" }}>
                    <h5 className="mb-3 text-xs font-extrabold text-[#CC0000] uppercase tracking-[0.15em]">
                      Our Approach
                    </h5>
                    <p className="font-serif text-[15px] text-[#2a2a2a] leading-[1.8]">
                      By embracing a{" "}
                      <span className="font-semibold text-[#1a1a1a]">human-centered data science approach</span> that
                      culminates in interactive visual analytic interfaces, we preserve the best of both worlds; the{" "}
                      <span className="font-semibold text-[#1a1a1a]">power of computational methods</span> and{" "}
                      <span className="font-semibold text-[#1a1a1a]">human judgment and reasoning</span>.
                    </p>
                  </div>

                  <Link
                    to="/research"
                    className="inline-flex items-center gap-2 text-sm font-medium text-[hsl(25,65%,45%)] hover:underline"
                  >
                    View all research
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Lab Updates */}
            <div className="order-3 mt-8 lg:order-3 lg:mt-0 lg:col-span-2 lg:pl-8">
              <h3 className="mb-6 text-base font-bold text-[#222222] tracking-wide">
                Lab Updates
              </h3>

              {/* Timeline wrapper */}
              <div className="relative">
                <div className="absolute left-2 top-2 bottom-2 w-[2px] rounded-full bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100" />

                <div className="space-y-6">
                  {labUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="group flex gap-3 animate-fade-in"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      {/* Rail column */}
                      <div className="relative w-4 flex-shrink-0">
                        <div className="absolute left-2 top-2 -translate-x-1/3 h-2 w-2 rounded-full bg-gray-400 ring-2 ring-white shadow-sm transition-all duration-300 group-hover:scale-125 group-hover:bg-[hsl(25,65%,50%)]" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="mb-1.5 flex items-center gap-2">
                          <span className="text-xs text-gray-500">{update.date}</span>
                          <OrangePill>{update.tag}</OrangePill>
                        </div>

                        <h4 className="mb-1 cursor-pointer text-sm font-semibold text-black transition-all hover:text-[#CC0000] hover:underline">
                          {update.title}
                        </h4>

                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {update.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>



            {/* Left Column - Our Team */}
            {/* <div className="order-3 mt-8 lg:order-1 lg:mt-0 lg:col-span-2 lg:pr-6 lg:pl-0 -ml-1"> */}
            <div className="order-2 mt-8 lg:order-1 lg:mt-0 lg:col-span-2 lg:pr-4 lg:pl-0 lg:-ml-3">
              <h3 className="mb-5 text-sm font-bold text-[#222222] tracking-wide">Our Team</h3>

              <div className="mb-5 flex flex-col gap-4">
                {teamPreview.map((member: any) => (
                  <div
                    key={member.name}
                    className="group flex items-start gap-3 px-1 py-1 -ml-1 rounded-lg cursor-pointer transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/5 hover:to-transparent hover:shadow-sm"
                  >
                    <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/80 text-white text-[10px] font-bold shadow-sm ring-1 ring-[#DDDDDD] overflow-hidden transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:ring-primary/30">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        member.initials
                      )}
                    </div>

                    <div className="flex-1 transition-transform duration-300 group-hover:translate-x-0.5">
                      <p className="text-xs font-bold text-[#1a1a1a] leading-snug group-hover:text-primary">
                        {member.name}
                      </p>
                      <p className="text-[11px] text-[#555] leading-snug">{member.role}</p>
                      {/* <p className="text-[11px] text-[#777] leading-snug">
                        {member.researchArea || member.research || "Research Focus"}
                      </p> */}

                      <div className="flex items-center gap-2 mt-1">
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            className="text-[#888] hover:text-[#0077b5] transition-colors"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="h-3 w-3" />
                          </a>
                        )}
                        {member.twitter && (
                          <a
                            href={member.twitter}
                            className="text-[#888] hover:text-[#1da1f2] transition-colors"
                            aria-label="Twitter"
                          >
                            <Twitter className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/people"
                className="group inline-flex items-center text-xs font-medium text-gray-600 transition-colors hover:text-primary hover:underline"
              >
                Meet our researchers
                <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video + Description Section
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-5 lg:items-center">
            <div className="lg:col-span-3">
              <div className="group relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50 shadow-xl ring-1 ring-border/50">
                <img src={heroImage} alt="Lab overview" className="h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all group-hover:bg-black/30">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/90 shadow-2xl transition-all group-hover:scale-110 group-hover:bg-primary">
                    <Play className="ml-1 h-8 w-8 fill-white text-white" />
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="rounded-2xl bg-white p-8 shadow-lg border border-gray-200">
                <h2 className="mb-4 text-2xl font-bold text-gray-900">About Our Research</h2>
                <p className="mb-4 text-sm text-gray-600 leading-relaxed">
                  Watch this overview to learn about our cutting-edge research in explainable AI, transparent
                  decision-making systems, and privacy-aware analytics.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Our lab combines visual analytics with AI to create intelligible systems that enhance human
                  understanding and decision-making.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Projects */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Featured Projects</h2>
            <p className="text-gray-600">Explore our latest research in AI explainability and visual analytics</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 group-hover:text-[#CC0000]">
                    {project.title}
                  </h3>

                  <p className="mb-4 flex-1 text-sm text-gray-600 leading-relaxed">{project.description}</p>

                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Tag key={tag}>{tag}</Tag>
                    ))}
                  </div>

                  <Link to="/research" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#CC0000]">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
        <div className="mt-12 border-2 border-[#CC0000] bg-gradient-to-br from-[#CC0000]/5 to-[#CC0000]/10 rounded-lg shadow-sm">
          <div className="p-8 text-center">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">Join Our Lab</h2>
            <p className="mb-6 text-gray-600">
              We're recruiting passionate PhD and MS students interested in AI transparency and visualization
            </p>
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 bg-[#CC0000] text-white hover:bg-[#CC0000]/90 shadow-lg hover:shadow-xl h-11 px-8 text-base"
            >
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
