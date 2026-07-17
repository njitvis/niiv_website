import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowRight, Mail, Globe, Linkedin, Copy, Check } from "lucide-react";
import { PEOPLE } from "../data/people";

type Person = (typeof PEOPLE)[number] & {
  affiliation?: string; // optional line (safe even if not in your data yet)
};

const GithubMark = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 64 64"
    {...props}
  >
    <circle cx="32" cy="32" r="30" fill="currentColor" />
    <g
      transform="translate(16, 16) scale(1.3)"
      stroke="#ffffff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </g>
  </svg>
);

const People = () => {
  const allMembers = PEOPLE as Person[];

  return (
    <div className="min-h-screen bg-background">
      {/* Top accent line */}
      <div className="bg-white bg-grid bg-vignette">
        <div className="h-px bg-[#CC0000]/90" />
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Our Team</h1>

            {/* orange micro-accent */}
            <div className="mb-4 h-px w-12 rounded-full bg-[hsl(25,65%,50%)]/60" />

            <p className="text-lg text-gray-600">
              Meet the researchers advancing intelligible AI and visualization
            </p>
          </div>

          {/* All Members Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-fr">
            {allMembers.map((member) => (
              <PersonCard key={member.name} member={member} />
            ))}
          </div>

          {/* Join Us Section (academic minimal) */}
          <div className="mt-12 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="p-8 text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900">Join Our Lab</h2>
              <div className="mx-auto mb-4 h-px w-12 rounded-full bg-[hsl(25,65%,50%)]/55" />
              <p className="mb-6 text-gray-600">
                We're actively recruiting passionate researchers interested in AI transparency,
                explainability, and visual analytics.
              </p>
              <Link
                to="/contact"
                className="
                  group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md
                  font-medium transition-colors
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
                  bg-[#CC0000] text-white hover:bg-[#CC0000]/90
                  shadow-sm hover:shadow-md h-11 px-8 text-base
                "
              >
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function PersonCard({ member }: { member: Person }) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    if (!member.email) return;
    try {
      await navigator.clipboard.writeText(member.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 900);
    } catch {
      window.location.href = `mailto:${member.email}`;
    }
  };

  return (
    <div
      className="
        group flex flex-col justify-between overflow-hidden rounded-xl
        border border-gray-200 bg-white shadow-sm
        transition hover:-translate-y-0.5 hover:shadow-md hover:border-gray-300
        motion-reduce:transform-none
      "
    >


      {/* Header */}
      <div className="flex flex-col items-center text-center p-6 space-y-3">
        {/* Avatar */}
        <div
          className="
            relative h-24 w-24 rounded-full overflow-hidden bg-white
            ring-1 ring-gray-200 transition-transform duration-300
            group-hover:scale-[1.02] motion-reduce:transform-none
          "
        >
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-[#CC0000] text-white text-2xl font-bold">
              {member.initials}
            </span>
          )}
        </div>

        {/* Name + Role + Affiliation */}
        <div className="max-w-[15rem]">
          <h3 className="text-lg font-semibold text-gray-900 leading-tight">
            {member.name}
          </h3>

          <p className="mt-1 text-sm font-medium text-[#CC0000]">{member.role}</p>

          {member.affiliation && (
            <p className="mt-1 text-sm text-gray-600">{member.affiliation}</p>
          )}

          <div className="mx-auto mt-3 h-px w-10 rounded-full bg-transparent group-hover:bg-[hsl(25,65%,50%)]/45 transition-colors" />
        </div>
      </div>

      <div className="border-t border-gray-100" />

      {/* Actions */}
      {/* Actions */}
<div className="p-5 pt-4">
  {/* Row 1: Email button (left) + icons (right) */}
  <div className="flex items-center justify-between gap-3">
    {member.email ? (
      <div className="relative group/emailTip shrink-0">
        <a
          href={`mailto:${member.email}`}
          className="
            inline-flex items-center justify-center gap-2 h-9 px-3 rounded-md
            border border-gray-200 bg-white text-sm font-medium text-gray-800
            transition-colors
            hover:border-[#CC0000]/30 hover:text-[#CC0000]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
          "
        >
          <Mail className="h-4 w-4" />
          Email
        </a>

        {/* Tooltip (desktop hover/focus) */}
        <div
          role="tooltip"
          className="
            pointer-events-none absolute left-0 top-full mt-2 z-20
            w-max max-w-[260px]
            rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-700 shadow-sm
            opacity-0 translate-y-1 transition
            group-hover/emailTip:opacity-100 group-hover/emailTip:translate-y-0
            group-focus-within/emailTip:opacity-100 group-focus-within/emailTip:translate-y-0
            hidden md:block
          "
        >
          {member.email}
        </div>

        {/* Tooltip arrow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute left-4 top-full mt-1.5 z-20
            h-2 w-2 rotate-45 bg-white border-l border-t border-gray-200
            opacity-0 translate-y-1 transition
            group-hover/emailTip:opacity-100 group-hover/emailTip:translate-y-0
            group-focus-within/emailTip:opacity-100 group-focus-within/emailTip:translate-y-0
            hidden md:block
          "
        />
      </div>
    ) : (
      <span />
    )}

    {/* Icons stay on one line */}
    <div className="flex items-center gap-2 shrink-0">
      {member.website && (
        <a
          href={member.website}
          target="_blank"
          rel="noopener noreferrer"
          title="Website"
          className="
            inline-flex items-center justify-center h-9 w-9 rounded-md
            border border-gray-200 bg-white text-gray-500
            transition-colors
            hover:border-[#2563EB]/25 hover:text-[#2563EB]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
          "
        >
          <Globe className="h-4 w-4" />
        </a>
      )}

      {member.github && (
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className="
            inline-flex items-center justify-center h-9 w-9 rounded-md
            border border-gray-200 bg-white text-gray-500
            transition-colors
            hover:border-gray-300 hover:text-[#111827]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
          "
        >
          <GithubMark className="h-5 w-5" />
        </a>
      )}

      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className="
            inline-flex items-center justify-center h-9 w-9 rounded-md
            border border-gray-200 bg-white text-gray-500
            transition-colors
            hover:border-[#0A66C2]/25 hover:text-[#0A66C2]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
          "
        >
          <Linkedin className="h-4 w-4" />
        </a>
      )}
    </div>
  </div>

  {/* Row 2: click-to-copy email bar */}
  {member.email && (
    <button
      type="button"
      onClick={copyEmail}
      className="
        group mt-3 w-full
        inline-flex items-center justify-between gap-3
        rounded-md border border-gray-200 bg-gray-50 px-3 py-2
        text-xs text-gray-700
        transition-colors
        hover:border-gray-300 hover:bg-gray-100
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2
      "
      aria-label={`Copy ${member.name}'s email`}
    >
      <span className="truncate">{member.email}</span>

      <span className="shrink-0 text-gray-500 transition-colors group-hover:text-gray-700">
        {copied ? (
          <Check className="h-4 w-4 text-green-600" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </span>
    </button>
  )}
</div>

    </div>
  );
}

export default People;
