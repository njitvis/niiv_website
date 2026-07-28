import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ExternalLink,
  FileText,
  Link as LinkIcon,
  Search,
  X,
} from "lucide-react";
import { PUBLICATIONS, type Pub } from "../data/publications";

type LocalPub = Pub & { abstract?: string };

const ITEMS_PER_PAGE = 6;

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const searchFieldsFor = (publication: Pub) => {
  const shortYear = String(publication.year).slice(-2);
  const tags = publication.tags ?? [];
  const venueYearAliases = tags.flatMap((tag) => [
    `${tag} ${publication.year}`,
    `${tag} ${shortYear}`,
    `${tag}${shortYear}`,
  ]);

  return [
    publication.title,
    publication.authors,
    publication.venue,
    String(publication.year),
    shortYear,
    publication.type ?? "",
    publication.award ?? "",
    publication.abstract ?? "",
    ...tags,
    ...venueYearAliases,
  ].join(" ");
};

const Publications = () => {
  const [year, setYear] = useState("All");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const years = useMemo(() => {
    const publicationYears = Array.from(
      new Set(PUBLICATIONS.map((publication) => publication.year)),
    ).sort((a, b) => b - a);

    return ["All", ...publicationYears.map(String)];
  }, []);

  const filteredPublications = useMemo(() => {
    const terms = normalizeSearchText(query).split(" ").filter(Boolean);

    return PUBLICATIONS.filter(
      (publication) => year === "All" || String(publication.year) === year,
    )
      .filter((publication) => {
        if (terms.length === 0) return true;

        const searchable = normalizeSearchText(searchFieldsFor(publication));
        const compactSearchable = searchable.replace(/\s+/g, "");

        return terms.every(
          (term) =>
            searchable.includes(term) || compactSearchable.includes(term),
        );
      })
      .sort((a, b) => b.year - a.year);
  }, [query, year]);

  const totalPages =
    Math.ceil(filteredPublications.length / ITEMS_PER_PAGE) || 1;
  const pageStart = (page - 1) * ITEMS_PER_PAGE;
  const currentPublications = filteredPublications.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE,
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "Publications | NIIV Lab";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const updateYear = (nextYear: string) => {
    setYear(nextYear);
    setPage(1);
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
    setPage(1);
  };

  const clearFilters = () => {
    setQuery("");
    setYear("All");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(440px,1.1fr)] lg:items-center lg:gap-14">
              <header className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                  Publications
                </h1>
                <p className="mt-5 text-lg leading-8 text-gray-600">
                  Explore our peer-reviewed work in visualization,
                  intelligible AI, privacy, and human-centered data science.
                </p>
              </header>

              <section aria-label="Publication search">
                <div className="relative w-full">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
                    aria-hidden="true"
                  />
                  <label htmlFor="publication-search" className="sr-only">
                    Search publications
                  </label>
                  <input
                    id="publication-search"
                    type="search"
                    value={query}
                    onChange={(event) => updateQuery(event.target.value)}
                    placeholder="Search titles, authors, venues, topics, or years"
                    className="search-input h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  />
                  {query && (
                    <button
                      type="button"
                      onClick={() => updateQuery("")}
                      aria-label="Clear publication search"
                      title="Clear search"
                      className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                    >
                      <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )}
                </div>

                <p
                  className="mt-4 text-sm text-gray-600 lg:text-right"
                  aria-live="polite"
                >
                  <strong className="font-semibold text-gray-950">
                    {filteredPublications.length}
                  </strong>{" "}
                  {filteredPublications.length === 1
                    ? "publication"
                    : "publications"}
                  {year !== "All" ? ` from ${year}` : ""}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section className="pb-14 pt-6 sm:pb-20 sm:pt-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <label
                  htmlFor="publication-year"
                  className="text-sm font-semibold text-gray-700"
                >
                  Year
                </label>
                <select
                  id="publication-year"
                  value={year}
                  onChange={(event) => updateYear(event.target.value)}
                  className="h-10 min-w-32 rounded-md border border-gray-300 bg-white/80 px-3 text-sm text-gray-900 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  {years.map((optionYear) => (
                    <option key={optionYear} value={optionYear}>
                      {optionYear === "All" ? "All years" : optionYear}
                    </option>
                  ))}
                </select>
              </div>

              {(query || year !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="inline-flex h-10 items-center justify-center rounded-md border border-[#CC0000] bg-[#CC0000] px-4 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>

            {currentPublications.length > 0 ? (
              <div className="space-y-4">
                {currentPublications.map((publication) => (
                  <PublicationCard
                    key={publication.id}
                    publication={publication as LocalPub}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-gray-200/80 bg-white/75 py-20 text-center backdrop-blur-sm">
                <h2 className="text-xl font-semibold text-gray-950">
                  No matching publications
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Try a broader title, author, venue, topic, or year.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex min-h-10 items-center rounded-md border border-[#CC0000] bg-[#CC0000] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  Clear filters
                </button>
              </div>
            )}

            {totalPages > 1 && (
              <nav
                className="mt-8 flex items-center justify-center gap-2"
                aria-label="Publications pagination"
              >
                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => Math.max(1, previous - 1))
                  }
                  disabled={page === 1}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white/80 text-gray-700 transition-colors hover:border-gray-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                <div className="flex items-center gap-1">
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1,
                  ).map((pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      className={[
                        "inline-flex h-10 min-w-10 items-center justify-center rounded-md border px-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2",
                        page === pageNumber
                          ? "border-[#CC0000] bg-[#CC0000] text-white hover:scale-[1.05] hover:border-[#A80000] hover:bg-[#A80000]"
                          : "border-transparent text-gray-600 hover:border-gray-300 hover:bg-white/80 hover:text-gray-950",
                      ].join(" ")}
                      aria-current={page === pageNumber ? "page" : undefined}
                      aria-label={`Page ${pageNumber}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPage((previous) => Math.min(totalPages, previous + 1))
                  }
                  disabled={page === totalPages}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white/80 text-gray-700 transition-colors hover:border-gray-400 hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </nav>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

type PublicationCardProps = {
  publication: LocalPub;
};

const PublicationCard = ({ publication }: PublicationCardProps) => {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const primaryLink =
    publication.links?.pdf ||
    publication.links?.arxiv ||
    publication.links?.doi ||
    publication.links?.website;

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200/90 bg-white/80 shadow-sm backdrop-blur-sm transition duration-200 hover:border-gray-300 supports-[backdrop-filter]:bg-white/70">
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-gray-200/90 bg-[#F8F9FA] px-3 py-1 text-xs font-semibold text-gray-800">
            {publication.year}
          </span>
          {(publication.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gray-200/90 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700"
            >
              {tag}
            </span>
          ))}
          {publication.award && (
            <span className="rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900">
              {publication.award}
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold leading-snug text-gray-950">
              {primaryLink ? (
                <a
                  href={primaryLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-start gap-2 transition-colors hover:text-[#B00000] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                >
                  <span>{publication.title}</span>
                  <ExternalLink
                    className="mt-1 h-3.5 w-3.5 shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                </a>
              ) : (
                publication.title
              )}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-700">
              {publication.authors}
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              {publication.venue}
            </p>

            {publication.abstract && abstractOpen && (
              <div className="mt-5 rounded-md border border-gray-200/80 bg-[#F8F9FA]/80 p-4">
                <h3 className="text-xs font-semibold uppercase text-gray-500">
                  Abstract
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-700">
                  {publication.abstract}
                </p>
              </div>
            )}
          </div>

          <div className="flex shrink-0 flex-wrap items-center gap-2 lg:max-w-72 lg:justify-end">
            {publication.abstract && (
              <button
                type="button"
                onClick={() => setAbstractOpen((open) => !open)}
                aria-expanded={abstractOpen}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-md border border-gray-300 bg-white/80 px-3 text-sm font-semibold text-gray-700 transition-colors hover:border-[#CC0000]/50 hover:bg-white hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
              >
                {abstractOpen ? (
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                )}
                {abstractOpen ? "Hide abstract" : "Abstract"}
              </button>
            )}
            {publication.links?.pdf && (
              <PublicationLink
                href={publication.links.pdf}
                label="Paper"
                icon={FileText}
                primary
              />
            )}
            {publication.links?.arxiv && (
              <PublicationLink
                href={publication.links.arxiv}
                label="arXiv"
                icon={BookOpen}
              />
            )}
            {publication.links?.doi && (
              <PublicationLink
                href={publication.links.doi}
                label="DOI"
                icon={LinkIcon}
              />
            )}
            {publication.links?.website && (
              <PublicationLink
                href={publication.links.website}
                label="Project link"
                icon={ExternalLink}
              />
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

type PublicationLinkProps = {
  href: string;
  label: string;
  icon: typeof FileText;
  primary?: boolean;
};

const PublicationLink = ({
  href,
  label,
  icon: Icon,
  primary = false,
}: PublicationLinkProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={[
      "inline-flex h-10 items-center justify-center gap-1.5 rounded-md border px-3 text-sm font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2",
      primary
        ? "border-[#CC0000] bg-[#CC0000] text-white hover:scale-[1.03] hover:border-[#A80000] hover:bg-[#A80000]"
        : "border-gray-300 bg-white/80 text-gray-700 hover:border-gray-400 hover:bg-white hover:text-gray-950",
    ].join(" ")}
  >
    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
    {label}
  </a>
);

export default Publications;
