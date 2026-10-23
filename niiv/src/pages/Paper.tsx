import { ArrowRight, Check, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FigureGallery from "../components/FigureGallery";
import LinkButton from "../components/LinkButton";
import { projectsData } from "../data/projectData";
import {
  getPublicationById,
  getShortTitle,
  paperHref,
  type Pub,
} from "../data/publications";
import { buttonClassName, secondaryButtonClassName } from "../lib/buttons";
import { getBibtex, getPaperLinks } from "../lib/paperLinks";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2";

/** Copies the paper's BibTeX; if the browser blocks copying, shows it to copy by hand. */
const CiteButton = ({ publication }: { publication: Pub }) => {
  const [state, setState] = useState<"idle" | "copied" | "manual">("idle");
  const bibtex = getBibtex(publication);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(bibtex);
      setState("copied");
      window.setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("manual");
    }
  };

  return (
    <>
      <button type="button" onClick={copy} className={secondaryButtonClassName}>
        {state === "copied" ? <Check className="h-4 w-4" aria-hidden="true" /> : <Quote className="h-4 w-4" aria-hidden="true" />}
        {state === "copied" ? "BibTeX copied" : "Cite"}
      </button>
      <span className="sr-only" role="status">
        {state === "copied" ? "BibTeX copied to the clipboard" : ""}
      </span>
      {state === "manual" && (
        <div className="basis-full">
          <label htmlFor="paper-bibtex" className="text-sm font-medium text-gray-700">
            Copy the BibTeX below:
          </label>
          <textarea
            id="paper-bibtex"
            readOnly
            value={bibtex}
            rows={6}
            onFocus={(event) => event.currentTarget.select()}
            className="mt-2 w-full rounded-md border border-gray-300 bg-gray-50 p-3 font-mono text-xs text-gray-800"
          />
        </div>
      )}
    </>
  );
};

const Paper = () => {
  const { paperId = "" } = useParams();
  const publication = getPublicationById(paperId);
  const [abstractOpen, setAbstractOpen] = useState(false);

  useEffect(() => {
    if (!publication) return;
    const previousTitle = document.title;
    document.title = `${getShortTitle(publication)} | NIIV Lab`;
    return () => {
      document.title = previousTitle;
    };
  }, [publication]);

  if (!publication) {
    return (
      <div className="flex min-h-[60vh] items-center bg-[#F8F9FA]">
        <div className="site-shell py-16">
          <h1 className="text-3xl font-bold text-gray-950">Paper not found</h1>
          <p className="reading-copy mt-3 text-gray-700">This paper may have been renamed or removed.</p>
          <Link to="/publications" className={`${buttonClassName} mt-6`}>
            Browse all publications
          </Link>
        </div>
      </div>
    );
  }

  const projects = projectsData.filter((project) =>
    project.publications.some((entry) => entry.publicationId === publication.id),
  );
  const relatedIds = new Set(
    projects.flatMap((project) => project.publications.map((entry) => entry.publicationId)),
  );
  relatedIds.delete(publication.id);
  const related = [...relatedIds]
    .map(getPublicationById)
    .filter((paper): paper is Pub => Boolean(paper))
    .sort((a, b) => b.year - a.year)
    .slice(0, 4);

  // One main text keeps the page light: the description, or else the abstract.
  // When a paper has both, the abstract is tucked under "Read abstract".
  const mainText = publication.description ?? publication.abstract;
  const extraAbstract = publication.description && publication.abstract ? publication.abstract : undefined;
  const figures = publication.figures ?? [];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500">
                <li>
                  <Link to="/" className={`hover:text-[#CC0000] ${focusRing}`}>
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li>
                  <Link to="/publications" className={`hover:text-[#CC0000] ${focusRing}`}>
                    Publications
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="max-w-[16rem] truncate font-medium text-gray-900 sm:max-w-md">
                  {getShortTitle(publication)}
                </li>
              </ol>
            </nav>

            <header className="max-w-5xl">
              {publication.award && (
                <p className="mb-4">
                  <span className="rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-900">
                    {publication.award}
                  </span>
                </p>
              )}
              <h1 className="font-serif text-3xl font-semibold leading-tight text-gray-950 sm:text-4xl lg:text-5xl">
                {publication.title}
              </h1>
              <p className="mt-5 text-base leading-7 text-gray-800">{publication.authors}</p>
              <p className="mt-1 text-base leading-7 text-gray-600">
                {publication.venue}
                {!publication.venue.includes(String(publication.year)) && ` · ${publication.year}`}
              </p>
            </header>

            <div className="mt-7 flex flex-wrap items-start gap-2">
              {getPaperLinks(publication).map((link) => (
                <LinkButton key={link.href} href={link.href} label={link.label} icon={link.icon} primary={link.primary} />
              ))}
              <CiteButton publication={publication} />
            </div>
          </div>
        </section>

        <div className="site-shell grid gap-10 py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-14">
          <div className="min-w-0 space-y-10">
            {figures.length > 0 && <FigureGallery figures={figures} />}

            {mainText && (
              <section aria-labelledby="paper-about">
                <h2 id="paper-about" className="font-serif text-2xl font-semibold text-gray-950">
                  {publication.description ? "Motivation and contributions" : "Abstract"}
                </h2>
                <p className="reading-copy mt-4 whitespace-pre-line text-gray-800">{mainText}</p>
              </section>
            )}

            {extraAbstract && (
              <section>
                <button
                  type="button"
                  onClick={() => setAbstractOpen((open) => !open)}
                  aria-expanded={abstractOpen}
                  aria-controls="paper-abstract"
                  className={`inline-flex items-center gap-2 text-sm font-semibold text-gray-800 hover:text-[#B00000] ${focusRing}`}
                >
                  <ChevronRight
                    className={`h-4 w-4 transition-transform ${abstractOpen ? "rotate-90" : ""}`}
                    aria-hidden="true"
                  />
                  {abstractOpen ? "Hide abstract" : "Read abstract"}
                </button>
                {abstractOpen && (
                  <p id="paper-abstract" className="reading-copy mt-4 whitespace-pre-line border-l-2 border-gray-200 pl-5 text-gray-700">
                    {extraAbstract}
                  </p>
                )}
              </section>
            )}

            {!mainText && figures.length === 0 && (
              <p className="reading-copy text-gray-600">
                More about this paper is coming soon. In the meantime, use the links above to read it.
              </p>
            )}
          </div>

          {(projects.length > 0 || related.length > 0) && (
            <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
              {projects.length > 0 && (
                <section aria-labelledby="paper-projects">
                  <h2 id="paper-projects" className="text-xs font-semibold uppercase tracking-wide text-[#B00000]">
                    Part of
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {projects.map((project) => (
                      <li key={project.slug}>
                        <Link
                          to={`/research/${project.slug}`}
                          className={`group flex items-start justify-between gap-3 rounded-lg border border-gray-200 bg-white p-4 font-semibold leading-snug text-gray-950 transition-colors hover:border-[#CC0000]/50 hover:text-[#B00000] ${focusRing}`}
                        >
                          {project.title}
                          <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {related.length > 0 && (
                <section aria-labelledby="paper-related">
                  <h2 id="paper-related" className="text-xs font-semibold uppercase tracking-wide text-[#B00000]">
                    More from this project
                  </h2>
                  <ul className="mt-3 divide-y divide-gray-200 border-y border-gray-200">
                    {related.map((paper) => (
                      <li key={paper.id}>
                        <Link to={paperHref(paper.id)} className={`group block py-3 ${focusRing}`}>
                          <span className="block font-serif text-lg font-semibold leading-snug text-gray-950 group-hover:text-[#B00000]">
                            {paper.title}
                          </span>
                          <span className="mt-1 block text-xs text-gray-500">
                            {paper.year} · {paper.venue}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </aside>
          )}
        </div>
      </main>
    </div>
  );
};

export default Paper;
