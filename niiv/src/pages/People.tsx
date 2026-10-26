import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Briefcase,
  Check,
  GraduationCap,
  Github,
  Globe,
  Linkedin,
  Mail,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  PEOPLE,
  PREVIOUS_RESEARCH_ASSISTANTS,
  getPersonAnchor,
  type Person,
  type PersonGroup,
  type PreviousResearchAssistant,
} from "../data/people";

type PeopleFilter = "all" | PersonGroup;

const FILTERS: { value: PeopleFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "faculty", label: "Faculty" },
  { value: "phd", label: "Ph.D. Students" },
  { value: "alumni", label: "Alumni" },
  { value: "former", label: "Former Members" },
];

const SECTIONS: { value: PersonGroup; label: string }[] = [
  { value: "faculty", label: "Faculty" },
  { value: "phd", label: "Current Ph.D. Students" },
  { value: "alumni", label: "Ph.D. Alumni" },
  { value: "former", label: "Former Lab Members" },
];

const People = () => {
  const [activeFilter, setActiveFilter] = useState<PeopleFilter>("all");
  const { hash } = useLocation();

  const filteredPeople = useMemo(
    () =>
      PEOPLE.filter(
        (person) =>
          activeFilter === "all" || person.group === activeFilter,
      ),
    [activeFilter],
  );

  const filteredAssistants = useMemo(() => {
    if (activeFilter !== "all" && activeFilter !== "former") return [];

    return PREVIOUS_RESEARCH_ASSISTANTS;
  }, [activeFilter]);

  const resultCount = filteredPeople.length + filteredAssistants.length;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "People | NIIV Lab";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    if (!hash) return;

    const targetId = decodeURIComponent(hash.slice(1));
    const timeout = window.setTimeout(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "auto",
        block: "center",
      });
    }, 100);

    return () => window.clearTimeout(timeout);
  }, [hash]);

  const clearAll = () => setActiveFilter("all");

  return (
    <div className="bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <header className="max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                Our team
              </h1>
              <p className="reading-copy mt-5 text-gray-700">
                Meet the researchers advancing intelligible AI, visualization,
                and human-centered data science.
              </p>
            </header>
          </div>
        </section>

        <section className="pb-14 pt-6 sm:pb-20 sm:pt-8">
          <div className="site-shell">
            <div
              className="mb-8 flex flex-wrap gap-2"
              aria-label="Filter people by role"
            >
              {FILTERS.map((filter) => (
                <button
                  type="button"
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={activeFilter === filter.value}
                  className={[
                    "inline-flex h-10 shrink-0 items-center justify-center rounded-md border px-4 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2",
                    activeFilter === filter.value
                      ? "border-[#CC0000] bg-[#CC0000] text-white hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000]"
                      : "border-gray-300 bg-white/80 text-gray-700 hover:border-gray-400 hover:bg-white hover:text-gray-950",
                  ].join(" ")}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {resultCount > 0 ? (
              <>
                {SECTIONS.map((section) => {
                  const sectionPeople = filteredPeople.filter(
                    (person) => person.group === section.value,
                  );

                  if (sectionPeople.length === 0) return null;

                  return (
                    <section
                      key={section.value}
                      className="mb-10"
                      aria-labelledby={`${section.value}-heading`}
                    >
                      <div className="mb-4 flex items-baseline gap-3">
                        <h2
                          id={`${section.value}-heading`}
                          className="text-2xl font-semibold text-gray-950"
                        >
                          {section.label}
                        </h2>
                        <span className="text-sm text-gray-500">
                          {sectionPeople.length}
                        </span>
                      </div>

                      <div className="cards-grid gap-4">
                        {sectionPeople.map((person) => (
                          <PersonCard key={person.name} person={person} />
                        ))}
                      </div>
                    </section>
                  );
                })}

                {filteredAssistants.length > 0 && (
                  <PreviousAssistants assistants={filteredAssistants} />
                )}
              </>
            ) : (
              <div className="rounded-lg border border-gray-200/80 bg-white/75 py-20 text-center backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-950">
                  No people in this group
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Choose another role to view more team members.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-6 inline-flex h-10 items-center justify-center rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  Show everyone
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="border-t border-gray-200 bg-[#F8F9FA]">
          <div className="site-shell py-10">
            <div className="flex flex-col gap-6 rounded-lg border border-gray-200 border-l-4 border-l-[#CC0000] bg-white/80 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-950">
                  Interested in joining the lab?
                </h2>
                <p className="reading-copy mt-2 text-gray-700">
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

const PersonCard = ({ person }: { person: Person }) => (
  <article
    id={getPersonAnchor(person.name)}
    className="person-card group flex scroll-mt-24 overflow-hidden rounded-lg border border-gray-200/90 bg-white/80 shadow-sm backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-md supports-[backdrop-filter]:bg-white/70"
  >
    <div className="w-[30%] max-w-36 shrink-0 self-start p-3 pr-0 sm:p-4 sm:pr-0">
      <div className="flex h-36 w-full items-center justify-center overflow-hidden rounded-md border border-gray-200/80 bg-[#F8F9FA]">
        {person.image ? (
          <img
            src={person.image}
            alt={`${person.name} profile`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#CC0000]/10 text-xl font-semibold text-[#B00000]">
            {person.initials}
          </span>
        )}
      </div>
    </div>

    <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
      <div>
        <h3 className="text-lg font-semibold leading-snug text-gray-950">
          {person.name}
        </h3>
        <p className="mt-1 text-sm font-semibold text-[#B00000]">
          {person.role}
        </p>
        <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-gray-500">
          {person.affiliation && <span>{person.affiliation}</span>}
          {person.affiliation && person.period && (
            <span aria-hidden="true">·</span>
          )}
          {person.period && <span>{person.period}</span>}
        </div>
      </div>

      {person.note && (
        <p className="reading-copy mt-3 text-gray-700">{person.note}</p>
      )}

      <ProfileLinks person={person} />
    </div>
  </article>
);

const ProfileLinks = ({ person }: { person: Person }) => {
  const [copyState, setCopyState] = useState<
    "idle" | "copied" | "failed"
  >("idle");

  const copyEmail = async () => {
    if (!person.email) return;

    let copied = false;

    try {
      await navigator.clipboard.writeText(person.email);
      copied = true;
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = person.email;
      textArea.style.position = "fixed";
      textArea.style.opacity = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      copied = document.execCommand("copy");
      textArea.remove();
    }

    setCopyState(copied ? "copied" : "failed");
    window.setTimeout(() => setCopyState("idle"), 1600);
  };

  const links = [
    person.website
      ? {
          href: person.website,
          label: `${person.name}'s website`,
          icon: Globe,
        }
      : null,
    person.workWebsite
      ? {
          href: person.workWebsite,
          label: `${person.name}'s work profile`,
          icon: Briefcase,
        }
      : null,
    person.linkedin
      ? {
          href: person.linkedin,
          label: `${person.name} on LinkedIn`,
          icon: Linkedin,
        }
      : null,
    person.github
      ? {
          href: person.github,
          label: `${person.name} on GitHub`,
          icon: Github,
        }
      : null,
    person.scholar
      ? {
          href: person.scholar,
          label: `${person.name} on Google Scholar`,
          icon: GraduationCap,
        }
      : null,
  ].filter(Boolean) as {
    href: string;
    label: string;
    icon: typeof Mail;
  }[];

  if (!person.email && links.length === 0) return null;

  return (
    <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
      {person.email && (
        <div className="group/email relative">
          <button
            type="button"
            onClick={copyEmail}
            aria-label={`Copy ${person.name}'s email address`}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white/80 text-gray-600 transition-colors hover:border-[#CC0000]/50 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            {copyState === "copied" ? (
              <Check className="h-4 w-4 text-green-700" aria-hidden="true" />
            ) : (
              <Mail className="h-4 w-4" aria-hidden="true" />
            )}
          </button>

          <span
            role="tooltip"
            className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-64 rounded-md border border-gray-200 bg-gray-950 px-2.5 py-1.5 text-xs text-white opacity-0 shadow-sm transition-opacity group-hover/email:opacity-100 group-focus-within/email:opacity-100"
          >
            {copyState === "copied"
              ? "Copied"
              : copyState === "failed"
                ? "Copy failed"
                : person.email}
          </span>

          <span className="sr-only" aria-live="polite">
            {copyState === "copied"
              ? `${person.email} copied`
              : copyState === "failed"
                ? `Could not copy ${person.email}`
                : ""}
          </span>
        </div>
      )}

      {links.map(({ href, label, icon: Icon }) => {
        return (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-gray-300 bg-white/80 text-gray-600 transition-colors hover:border-[#CC0000]/50 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
};

const PreviousAssistants = ({
  assistants,
}: {
  assistants: PreviousResearchAssistant[];
}) => {
  const programs: PreviousResearchAssistant["program"][] = [
    "M.S. Data Science",
    "B.S. IT/CS/DS",
  ];

  return (
    <section aria-labelledby="previous-assistants-heading">
      <div className="mb-4 flex items-baseline gap-3">
        <h2
          id="previous-assistants-heading"
          className="text-2xl font-semibold text-gray-950"
        >
          Previous research assistants
        </h2>
        <span className="text-sm text-gray-500">{assistants.length}</span>
      </div>

      <div className="space-y-7">
        {programs.map((program) => {
          const programAssistants = assistants.filter(
            (assistant) => assistant.program === program,
          );

          if (programAssistants.length === 0) return null;

          return (
            <div key={program}>
              <h3 className="mb-3 text-sm font-semibold text-gray-600">
                {program}
              </h3>
              <div className="compact-cards-grid gap-3">
                {programAssistants.map((assistant) => (
                  <article
                    key={assistant.name}
                    className="rounded-lg border border-gray-200/80 bg-white/70 px-4 py-3 backdrop-blur-sm"
                  >
                    <h4 className="text-sm font-semibold leading-5 text-gray-900">
                      {assistant.name}
                    </h4>
                    <p className="mt-1 text-xs text-gray-500">
                      Former research assistant
                    </p>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default People;
