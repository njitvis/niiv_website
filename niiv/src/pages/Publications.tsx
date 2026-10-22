import { useEffect, useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import HighlightedText from "../components/HighlightedText";
import LinkButton from "../components/LinkButton";
import { paperHref, PUBLICATIONS, type Pub } from "../data/publications";
import { secondaryButtonClassName } from "../lib/buttons";
import { getPaperLinks } from "../lib/paperLinks";

type LocalPub = Pub & { abstract?: string };

type PublicationSearchSection = {
  key: string;
  label: string;
  text: string;
  values?: string[];
  aliases?: string[];
};

type PublicationSearchMatch = {
  sections: PublicationSearchSection[];
  matchedTags: string[];
};

const ITEMS_PER_PAGE = 6;

const normalizeSearchText = (value: string) =>
  value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const getPublicationSearchSections = (
  publication: Pub,
): PublicationSearchSection[] => {
  const shortYear = String(publication.year).slice(-2);
  const tags = publication.tags ?? [];
  const venueYearAliases = tags.flatMap((tag) => [
    `${tag} ${publication.year}`,
    `${tag} ${shortYear}`,
    `${tag}${shortYear}`,
  ]);

  const typeLabels: Record<NonNullable<Pub["type"]>, string> = {
    conf: "Conference",
    journal: "Journal",
    thesis: "Thesis",
    preprint: "Preprint",
  };

  return [
    { key: "title", label: "Title", text: publication.title },
    { key: "authors", label: "Authors", text: publication.authors },
    { key: "venue", label: "Venue", text: publication.venue },
    {
      key: "tags",
      label: "Tags",
      text: tags.join(", "),
      values: tags,
      aliases: venueYearAliases,
    },
    {
      key: "year",
      label: "Year",
      text: String(publication.year),
      aliases: [shortYear],
    },
    {
      key: "type",
      label: "Type",
      text: publication.type ? typeLabels[publication.type] : "",
      aliases: publication.type ? [publication.type] : [],
    },
    {
      key: "award",
      label: "Award",
      text: publication.award ?? "",
    },
    {
      key: "abstract",
      label: "Abstract",
      text: publication.abstract ?? "",
    },
  ].filter((section) => section.text.length > 0);
};

const normalizedSectionText = (section: PublicationSearchSection) =>
  normalizeSearchText([section.text, ...(section.aliases ?? [])].join(" "));

const sectionMatchesAnyTerm = (
  section: PublicationSearchSection,
  terms: string[],
) => {
  const searchable = normalizedSectionText(section);
  const compactSearchable = searchable.replace(/\s+/g, "");

  return terms.some(
    (term) => searchable.includes(term) || compactSearchable.includes(term),
  );
};

const publicationContainsEveryTerm = (
  sections: PublicationSearchSection[],
  terms: string[],
) => {
  const searchable = sections.map(normalizedSectionText).join(" ");
  const compactSearchable = searchable.replace(/\s+/g, "");

  return terms.every(
    (term) => searchable.includes(term) || compactSearchable.includes(term),
  );
};

const matchingSectionValues = (
  section: PublicationSearchSection,
  terms: string[],
) => {
  const matchingValues = (section.values ?? [section.text]).filter((value) => {
    const searchable = normalizeSearchText(value);
    const compactSearchable = searchable.replace(/\s+/g, "");

    return terms.some(
      (term) => searchable.includes(term) || compactSearchable.includes(term),
    );
  });

  return matchingValues.length > 0 ? matchingValues : [section.text];
};

const buildPublicationMatch = (
  publication: Pub,
  terms: string[],
): PublicationSearchMatch | undefined => {
  if (terms.length === 0) return undefined;

  const sections = getPublicationSearchSections(publication);
  const matchedSections = sections
    .filter((section) => sectionMatchesAnyTerm(section, terms))
    .map((section) => ({
      ...section,
      text: matchingSectionValues(section, terms).slice(0, 3).join("; "),
    }));
  const tagSection = sections.find((section) => section.key === "tags");

  return {
    sections: matchedSections,
    matchedTags: tagSection
      ? matchingSectionValues(tagSection, terms).filter((tag) =>
          (publication.tags ?? []).includes(tag),
        )
      : [],
  };
};

const Publications = () => {
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchOpen, setSearchOpen] = useState(false);
  const [yearMenuOpen, setYearMenuOpen] = useState(false);
  const searchTerms = useMemo(
    () => normalizeSearchText(query).split(" ").filter(Boolean),
    [query],
  );

  const publicationYears = useMemo(() => {
    const publicationYears = Array.from(
      new Set(PUBLICATIONS.map((publication) => publication.year)),
    ).sort((a, b) => b - a);

    return publicationYears.map(String);
  }, []);

  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter(
      (publication) =>
        selectedYears.length === 0 ||
        selectedYears.includes(String(publication.year)),
    )
      .sort((a, b) => b.year - a.year)
      .map((publication) => ({ publication, match: undefined }));
  }, [selectedYears]);

  const publicationSearchResults = useMemo(() => {
    if (searchTerms.length === 0) return [];

    return filteredPublications
      .map(({ publication }) => ({
        publication,
        match: buildPublicationMatch(publication, searchTerms),
        isMatch: publicationContainsEveryTerm(
          getPublicationSearchSections(publication),
          searchTerms,
        ),
      }))
      .filter(({ isMatch }) => isMatch)
      .map(({ publication, match }) => ({ publication, match }));
  }, [filteredPublications, searchTerms]);

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

  const toggleYear = (nextYear: string) => {
    setSelectedYears((currentYears) =>
      currentYears.includes(nextYear)
        ? currentYears.filter((year) => year !== nextYear)
        : publicationYears.filter(
            (year) => year === nextYear || currentYears.includes(year),
          ),
    );
    setPage(1);
  };

  const updateQuery = (nextQuery: string) => {
    setQuery(nextQuery);
  };

  const clearFilters = () => {
    setQuery("");
    setSelectedYears([]);
    setSearchOpen(false);
    setYearMenuOpen(false);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-14">
              <header className="max-w-3xl">
                <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">
                  Publications
                </h1>
                <p className="reading-copy mt-5 text-gray-700">
                  Explore our peer-reviewed work in visualization,
                  intelligible AI, privacy, and human-centered data science.
                </p>
              </header>

              <section aria-label="Publication search">
                <div
                  className="relative w-full"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setSearchOpen(false);
                    }
                  }}
                >
                  <div className="relative">
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
                      onChange={(event) => {
                        updateQuery(event.target.value);
                        setSearchOpen(true);
                      }}
                      onFocus={() => setSearchOpen(true)}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setSearchOpen(false);
                      }}
                      placeholder="Search titles, authors, venues, topics, or years"
                      aria-expanded={searchOpen && searchTerms.length > 0}
                      aria-controls="publication-live-results"
                      autoComplete="off"
                      className="search-input h-12 w-full rounded-md border border-gray-300 bg-white pl-10 pr-11 text-sm text-gray-950 placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {
                          updateQuery("");
                          setSearchOpen(false);
                        }}
                        aria-label="Clear publication search"
                        title="Clear search"
                        className="absolute right-1.5 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    )}
                  </div>

                  {searchOpen && searchTerms.length > 0 && (
                    <div
                      id="publication-live-results"
                      className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
                    >
                      {publicationSearchResults.length > 0 ? (
                        <div className="max-h-96 overflow-y-auto" role="list">
                          {publicationSearchResults.map(
                            ({ publication, match }) => (
                              <PublicationSearchResultRow
                                key={publication.id}
                                publication={publication}
                                match={match}
                                terms={searchTerms}
                                onChoose={(publicationId) => {
                                  setSearchOpen(false);
                                  const publicationIndex =
                                    filteredPublications.findIndex(
                                      ({ publication: resultPublication }) =>
                                        resultPublication.id === publicationId,
                                    );

                                  if (publicationIndex >= 0) {
                                    setPage(
                                      Math.floor(
                                        publicationIndex / ITEMS_PER_PAGE,
                                      ) + 1,
                                    );
                                  }

                                  window.setTimeout(() => {
                                    document
                                      .getElementById(
                                        `publication-${publicationId}`,
                                      )
                                      ?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                  }, 0);
                                }}
                              />
                            ),
                          )}
                        </div>
                      ) : (
                        <p className="px-4 py-5 text-sm text-gray-600">
                          No matching publications
                        </p>
                      )}

                    </div>
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
                  {selectedYears.length === 1
                    ? ` from ${selectedYears[0]}`
                    : selectedYears.length > 1
                      ? ` across ${selectedYears.length} selected years`
                      : ""}
                </p>
              </section>
            </div>
          </div>
        </section>

        <section
          id="publication-results"
          className="scroll-mt-24 pb-14 pt-6 sm:pb-20 sm:pt-8"
        >
          <div className="site-shell">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  Year
                </span>
                <div
                  className="relative"
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) {
                      setYearMenuOpen(false);
                    }
                  }}
                >
                  <button
                    id="publication-year"
                    type="button"
                    onClick={() => setYearMenuOpen((open) => !open)}
                    aria-haspopup="menu"
                    aria-expanded={yearMenuOpen}
                    className="inline-flex h-10 min-w-36 items-center justify-between gap-3 rounded-md border border-gray-300 bg-white/80 px-3 text-sm text-gray-900 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    <span>
                      {selectedYears.length === 0
                        ? "Any year"
                        : selectedYears.length === 1
                          ? selectedYears[0]
                          : `${selectedYears.length} years`}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-gray-500 transition-transform ${yearMenuOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>

                  {yearMenuOpen && (
                    <div
                      className="absolute left-0 top-[calc(100%+0.5rem)] z-20 w-56 overflow-hidden rounded-md border border-gray-200 bg-white shadow-xl"
                      role="menu"
                      aria-label="Select publication years"
                    >
                      <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2.5">
                        <span className="text-xs font-semibold uppercase text-gray-500">
                          Select years
                        </span>
                        {selectedYears.length > 0 && (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedYears([]);
                              setPage(1);
                            }}
                            className="text-xs font-semibold text-[#B00000] hover:text-[#8F0000] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="max-h-64 overflow-y-auto p-1.5">
                        {publicationYears.map((optionYear) => (
                          <label
                            key={optionYear}
                            className="flex cursor-pointer items-center gap-3 rounded-md px-2.5 py-2 text-sm text-gray-800 hover:bg-[#F8F9FA]"
                          >
                            <input
                              type="checkbox"
                              checked={selectedYears.includes(optionYear)}
                              onChange={() => toggleYear(optionYear)}
                              className="h-4 w-4 rounded border-gray-300 accent-[#CC0000] focus-visible:ring-2 focus-visible:ring-[#CC0000]"
                            />
                            <span>{optionYear}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {(query || selectedYears.length > 0) && (
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
                {currentPublications.map(({ publication }) => (
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

                <div className="flex flex-wrap items-center justify-center gap-1">
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

type PublicationSearchResultRowProps = {
  publication: Pub;
  match?: PublicationSearchMatch;
  terms: string[];
  onChoose: (publicationId: string) => void;
};

const PublicationSearchResultRow = ({
  publication,
  match,
  terms,
  onChoose,
}: PublicationSearchResultRowProps) => {
  const matchedSections = (match?.sections ?? [])
    .filter((section) => section.key !== "title")
    .slice(0, 2);
  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-semibold leading-5 text-gray-950">
          <HighlightedText text={publication.title} terms={terms} />
        </p>
        <span className="shrink-0 text-xs font-semibold text-gray-500">
          <HighlightedText text={String(publication.year)} terms={terms} />
        </span>
      </div>
      <div className="mt-1 space-y-0.5">
        {matchedSections.map((section) => (
          <p
            key={section.key}
            className="line-clamp-1 text-xs leading-5 text-gray-600"
          >
            <span className="font-semibold text-gray-800">
              {section.label}:{" "}
            </span>
            <HighlightedText text={section.text} terms={terms} />
          </p>
        ))}
      </div>
    </>
  );
  const rowClassName =
    "block w-full border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-[#F8F9FA] focus-visible:bg-[#F8F9FA] focus-visible:outline-none";

  return (
    <button
      type="button"
      onClick={() => onChoose(publication.id)}
      className={rowClassName}
      role="listitem"
    >
      {content}
    </button>
  );
};

type PublicationCardProps = {
  publication: LocalPub;
  match?: PublicationSearchMatch;
  matchTerms?: string[];
};

const PublicationCard = ({
  publication,
  match,
  matchTerms = [],
}: PublicationCardProps) => {
  const [abstractOpen, setAbstractOpen] = useState(false);
  const matchedTagSet = new Set(match?.matchedTags ?? []);
  const visibleMatchSections = match?.sections.slice(0, 4) ?? [];
  const yearMatched = match?.sections.some((section) => section.key === "year");
  const awardMatched = match?.sections.some((section) => section.key === "award");

  return (
    <article
      id={`publication-${publication.id}`}
      className="scroll-mt-24 overflow-hidden rounded-lg border border-gray-200/90 bg-white/80 shadow-sm backdrop-blur-sm transition duration-200 hover:border-gray-300 supports-[backdrop-filter]:bg-white/70"
    >
      <div className="p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={
              yearMatched
                ? "rounded-full border border-[#CC0000]/35 bg-[#CC0000]/10 px-3 py-1 text-xs font-semibold text-[#8F0000]"
                : "rounded-full border border-gray-200/90 bg-[#F8F9FA] px-3 py-1 text-xs font-semibold text-gray-800"
            }
          >
            <HighlightedText
              text={String(publication.year)}
              terms={matchTerms}
            />
          </span>
          {(publication.tags ?? []).map((tag) => (
            <span
              key={tag}
              className={
                matchedTagSet.has(tag)
                  ? "rounded-full border border-[#CC0000]/35 bg-[#CC0000]/10 px-3 py-1 text-xs font-semibold text-[#8F0000]"
                  : "rounded-full border border-gray-200/90 bg-white/70 px-3 py-1 text-xs font-medium text-gray-700"
              }
            >
              <HighlightedText text={tag} terms={matchTerms} />
            </span>
          ))}
          {publication.award && (
            <span
              className={
                awardMatched
                  ? "rounded-full border border-[#CC0000]/35 bg-[#CC0000]/10 px-3 py-1 text-xs font-semibold text-[#8F0000]"
                  : "rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-900"
              }
            >
              <HighlightedText text={publication.award} terms={matchTerms} />
            </span>
          )}
        </div>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold leading-snug text-gray-950">
              <Link
                to={paperHref(publication.id)}
                className="transition-colors hover:text-[#B00000] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
              >
                <HighlightedText text={publication.title} terms={matchTerms} />
              </Link>
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-700">
              <HighlightedText text={publication.authors} terms={matchTerms} />
            </p>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              <HighlightedText text={publication.venue} terms={matchTerms} />
            </p>

            {visibleMatchSections.length > 0 && (
              <div className="mt-5 rounded-md border border-[#CC0000]/15 bg-[#CC0000]/[0.04] p-3">
                <p className="text-xs font-semibold uppercase text-[#B00000]">
                  Matches
                </p>
                <div className="mt-2 grid gap-2">
                  {visibleMatchSections.map((section) => (
                    <p
                      key={section.key}
                      className="line-clamp-2 text-xs leading-5 text-gray-600"
                    >
                      <span className="font-semibold text-gray-950">
                        {section.label}:{" "}
                      </span>
                      <HighlightedText text={section.text} terms={matchTerms} />
                    </p>
                  ))}
                </div>
              </div>
            )}

            {publication.abstract && abstractOpen && (
              <div className="mt-5 rounded-md border border-gray-200/80 bg-[#F8F9FA]/80 p-4">
                <h3 className="text-xs font-semibold uppercase text-gray-500">
                  Abstract
                </h3>
                <p className="reading-copy mt-2 text-gray-700">
                  <HighlightedText
                    text={publication.abstract}
                    terms={matchTerms}
                  />
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
                className={secondaryButtonClassName}
              >
                {abstractOpen ? (
                  <ChevronUp className="h-4 w-4" aria-hidden="true" />
                ) : (
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                )}
                {abstractOpen ? "Hide abstract" : "Abstract"}
              </button>
            )}
            {getPaperLinks(publication).map((link) => (
              <LinkButton key={link.href} href={link.href} label={link.label} icon={link.icon} primary={link.primary} />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};

export default Publications;
