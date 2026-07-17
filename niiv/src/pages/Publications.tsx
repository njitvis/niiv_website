// // src/pages/Publications.tsx
// import { useEffect, useMemo, useRef, useState } from "react";
// import {
//   FileText,
//   BookOpen,
//   Search,
//   ChevronLeft,
//   ChevronRight,
//   ChevronDown,
//   ChevronUp,
//   Link as LinkIcon,
// } from "lucide-react";
// import { PUBLICATIONS, type Pub } from "../data/publications";

// // Allow optional abstract locally without changing your data type file
// type LocalPub = Pub & { abstract?: string };

// const ITEMS_PER_PAGE = 6;

// const Publications = () => {
//   const [year, setYear] = useState<string>("All");
//   const [q, setQ] = useState("");
//   const [page, setPage] = useState(1);

//   // ---- Year rail helpers ----
//   const scrollerRef = useRef<HTMLDivElement>(null);
//   const [canLeft, setCanLeft] = useState(false);
//   const [canRight, setCanRight] = useState(false);
//   const [pulseLeft, setPulseLeft] = useState(false);
//   const [pulseRight, setPulseRight] = useState(false);
//   const [useDropdown, setUseDropdown] = useState(false); // adaptive mode even on desktop

//   const updateEdges = () => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const { scrollLeft, scrollWidth, clientWidth } = el;
//     setCanLeft(scrollLeft > 2);
//     setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
//   };

//   const scrollByAmount = (dx: number) => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     el.scrollBy({ left: dx, behavior: "smooth" });
//     // pulse the edge on click
//     if (dx < 0) { setPulseLeft(true); setTimeout(() => setPulseLeft(false), 300); }
//     else { setPulseRight(true); setTimeout(() => setPulseRight(false), 300); }
//   };

//   // Auto-center the active year chip when year changes
//   useEffect(() => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const btn = el.querySelector<HTMLButtonElement>(`button[data-year="${year}"]`);
//     btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
//   }, [year]);

//   // Track edges + adapt to overflow (ResizeObserver)
//   useEffect(() => {
//     const el = scrollerRef.current;
//     if (!el) return;
//     const onScroll = () => updateEdges();
//     el.addEventListener("scroll", onScroll, { passive: true });

//     const ro = new ResizeObserver(() => {
//       // if content clearly overflows, switch to dropdown
//       const overflow = el.scrollWidth > el.clientWidth * 1.18; // threshold
//       setUseDropdown(overflow);
//       updateEdges();
//     });
//     ro.observe(el);

//     updateEdges();
//     return () => { el.removeEventListener("scroll", onScroll); ro.disconnect(); };
//   }, []);



//   const years = useMemo(() => {
//     const ys = Array.from(new Set(PUBLICATIONS.map((p) => p.year))).sort((a, b) => b - a);
//     return ["All", ...ys.map(String)];
//   }, []);

//   const filtered = useMemo(() => {
//     const query = q.trim().toLowerCase();
//     return PUBLICATIONS
//       .filter((p) => year === "All" || String(p.year) === year)
//       .filter((p) => {
//         if (!query) return true;
//         const inTitle = p.title.toLowerCase().includes(query);
//         const inAuthors = p.authors.toLowerCase().includes(query);
//         const inVenue = p.venue.toLowerCase().includes(query);
//         const inTags = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(query));
//         return inTitle || inAuthors || inVenue || inTags;
//       })
//       .sort((a, b) => b.year - a.year);
//   }, [year, q]);

//   const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
//   const start = (page - 1) * ITEMS_PER_PAGE;
//   const current = filtered.slice(start, start + ITEMS_PER_PAGE);

//   // Keep page within range when filters change
//   useEffect(() => {
//     if (page > totalPages) setPage(totalPages);
//   }, [totalPages, page]);

//   // Scroll to top on page change
//   useEffect(() => {
//     if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [page]);

//   const onYear = (y: string) => {
//     setYear(y);
//     setPage(1);
//   };
//   const onSearch = (s: string) => {
//     setQ(s);
//     setPage(1);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="bg-white bg-grid bg-vignette">
//       {/* <div className="relative h-0.5 bg-[#CC0000]">
//         <div className="absolute inset-0 -top-3 h-6 bg-[#CC0000] opacity-20 blur-lg" />
//       </div> */}
//       <div className="h-px bg-[#CC0000]/90" />
//       </div>

//       <div className="py-16">
//         <div className="container mx-auto px-4 lg:px-8">
//           <div className="mb-12">
//             <h1 className="mb-4 text-4xl font-bold text-gray-900">Publications</h1>
//             <p className="text-lg text-gray-600">Our published research in top venues</p>
//           </div>

//           {/* Search */}
//           <div className="mb-6">
//             <div className="relative max-w-md">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" aria-hidden />
//               <input
//                 value={q}
//                 onChange={(e) => onSearch(e.target.value)}
//                 placeholder="Search publications…"
//                 className="w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:border-transparent"
//                 aria-label="Search publications"
//               />
//             </div>
//           </div>

//           {/* Year filter */}
//           {/* <div className="mb-8">
//             <div
//               role="tablist"
//               aria-label="Filter by year"
//               className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600"
//             >
//               {years.map((y) => (
//                 <button
//                   key={y}
//                   onClick={() => onYear(y)}
//                   role="tab"
//                   aria-selected={year === y}
//                   className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 ${
//                     year === y ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
//                   }`}
//                 >
//                   {y}
//                 </button>
//               ))}
//             </div>
//           </div> */}

//           {/* Year filter (scrollable rail + inline arrows, dropdown on mobile) */}
//           {/* Year filter (smart rail + adaptive dropdown) */}
//           <div className="mb-8">
//             {/* Mobile always uses native select */}
//             <div className="md:hidden">
//               <label className="sr-only" htmlFor="year-select">Filter by year</label>
//               <select
//                 id="year-select"
//                 value={year}
//                 onChange={(e) => onYear(e.target.value)}
//                 className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:border-transparent"
//               >
//                 {years.map((y) => (
//                   <option key={y} value={y}>{y}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Desktop: choose rail or dropdown based on overflow */}
//             <div className="relative hidden md:block">
//               {useDropdown ? (
//                 <div className="max-w-sm">
//                   <label className="sr-only" htmlFor="year-select-desktop">Filter by year</label>
//                   <select
//                     id="year-select-desktop"
//                     value={year}
//                     onChange={(e) => onYear(e.target.value)}
//                     className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#CC0000] focus:border-transparent"
//                   >
//                     {years.map((y) => (
//                       <option key={y} value={y}>{y}</option>
//                     ))}
//                   </select>
//                 </div>
//               ) : (
//                 <div className="relative flex h-12 items-center rounded-md bg-gray-100">
//                   {/* Left fade */}
//                   <span
//                     className={`pointer-events-none absolute left-0 top-0 h-full w-6 rounded-l-md bg-gradient-to-r from-gray-100 to-transparent ${pulseLeft ? "fade-pulse" : ""} ${canLeft ? "" : "opacity-0"}`}
//                   />
//                   {/* Left arrow */}
//                   <button
//                     type="button"
//                     aria-label="Scroll years left"
//                     onClick={() => scrollByAmount(-240)}
//                     disabled={!canLeft}
//                     className="absolute left-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-30"
//                   >
//                     ‹
//                   </button>

//                   {/* Scroll rail */}
//                   <div
//                     ref={scrollerRef}
//                     role="tablist"
//                     aria-label="Filter by year"
//                     className="no-scrollbar mx-10 flex h-10 w-full items-center gap-1 overflow-x-auto px-1"
//                   >
//                     {years.map((y) => (
//                       <button
//                         key={y}
//                         data-year={y}
//                         onClick={() => onYear(y)}
//                         role="tab"
//                         aria-selected={year === y}
//                         className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 ${
//                           year === y ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
//                         }`}
//                       >
//                         {y}
//                       </button>
//                     ))}
//                   </div>

//                   {/* Right arrow */}
//                   <button
//                     type="button"
//                     aria-label="Scroll years right"
//                     onClick={() => scrollByAmount(240)}
//                     disabled={!canRight}
//                     className="absolute right-1 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-30"
//                   >
//                     ›
//                   </button>
//                   {/* Right fade */}
//                   <span
//                     className={`pointer-events-none absolute right-0 top-0 h-full w-6 rounded-r-md bg-gradient-to-l from-gray-100 to-transparent ${pulseRight ? "fade-pulse" : ""} ${canRight ? "" : "opacity-0"}`}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>




//           {/* List */}
//           <div className="space-y-4">
//             {current.map((p) => (
//               <PubCard key={p.id} pub={p as LocalPub} />
//             ))}
//             {current.length === 0 && (
//               <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">No results.</div>
//             )}
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Publications pagination">
//               <button
//                 onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//                 disabled={page === 1}
//                 className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Previous page"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//               </button>

//               <div className="flex items-center gap-1">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
//                   <button
//                     key={n}
//                     onClick={() => setPage(n)}
//                     className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
//                       page === n ? "bg-[#CC0000] text-white" : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
//                     }`}
//                     aria-current={page === n ? "page" : undefined}
//                   >
//                     {n}
//                   </button>
//                 ))}
//               </div>

//               <button
//                 onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
//                 disabled={page === totalPages}
//                 className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//                 aria-label="Next page"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </nav>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// function PubCard({ pub }: { pub: LocalPub }) {
//   const [open, setOpen] = useState(false);

//   // Choose best target for the title link
//   const href = pub.links?.pdf || pub.links?.arxiv || pub.links?.doi || undefined;

//   return (
//     <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-[#CC0000]/40 hover:shadow-lg">
//       <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
//         <div className="flex-1">
//           <div className="mb-2 flex flex-wrap items-center gap-2">
//             <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-900">
//               {pub.year}
//             </span>
//             {(pub.tags ?? []).map((tag) => (
//               <span
//                 key={tag}
//                 className="inline-flex items-center rounded-full border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-gray-900"
//               >
//                 {tag}
//               </span>
//             ))}
//             {pub.award && (
//               <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
//                 🏆 {pub.award}
//               </span>
//             )}
//           </div>

//           {href ? (
//             <h3 className="mb-2 text-lg font-semibold text-gray-900">
//               <a
//                 href={href}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="underline-offset-4 hover:underline hover:text-[#CC0000] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] rounded-sm"
//               >
//                 “{pub.title}”
//               </a>
//             </h3>
//           ) : (
//             <h3 className="mb-2 text-lg font-semibold text-gray-900">“{pub.title}”</h3>
//           )}

//           <p className="mb-2 text-sm text-gray-700">{pub.authors}</p>
//           <p className="text-sm italic text-gray-600">{pub.venue}</p>

//           {pub.abstract && (
//             <div className="mt-2">
//               <button
//                 type="button"
//                 onClick={() => setOpen((v) => !v)}
//                 aria-expanded={open}
//                 className="inline-flex items-center gap-2 text-sm text-gray-800 underline-offset-4 hover:underline hover:text-[#CC0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] rounded-sm"
//               >
//                 {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//                 {open ? "Hide abstract" : "Show abstract"}
//               </button>
//               {open && <div className="mt-2 text-sm leading-relaxed text-gray-700">{pub.abstract}</div>}
//             </div>
//           )}
//         </div>

//         <div className="flex shrink-0 flex-wrap gap-2">
//           {pub.links?.pdf && (
//             <a
//               href={pub.links.pdf}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-2 rounded-md bg-[#CC0000] px-3 py-2 text-sm font-medium text-white hover:bg-[#CC0000]/90"
//             >
//               <FileText className="h-3 w-3" />
//               Paper
//             </a>
//           )}

//           {pub.links?.arxiv && (
//             <a
//               href={pub.links.arxiv}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
//             >
//               <BookOpen className="h-3 w-3" />
//               arXiv
//             </a>
//           )}

//           {pub.links?.doi && (
//             <a
//               href={pub.links.doi}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
//             >
//               <LinkIcon className="h-3 w-3" />
//               DOI
//             </a>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Publications;

// src/pages/Publications.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FileText,
  BookOpen,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  ExternalLink
} from "lucide-react";
import { PUBLICATIONS, type Pub } from "../data/publications";


// Allow optional abstract locally without changing your data type file
type LocalPub = Pub & { abstract?: string };

const ITEMS_PER_PAGE = 6;

// Theme micro-accent (subtle orange)
const ORANGE = "hsl(25,65%,50%)";

const Publications = () => {
  const [year, setYear] = useState<string>("All");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);

  // ---- Year rail helpers ----
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [pulseLeft, setPulseLeft] = useState(false);
  const [pulseRight, setPulseRight] = useState(false);
  const [useDropdown, setUseDropdown] = useState(false); // adaptive mode even on desktop

  const updateEdges = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 2);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 2);
  };

  const scrollByAmount = (dx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
    // pulse the edge on click
    if (dx < 0) {
      setPulseLeft(true);
      setTimeout(() => setPulseLeft(false), 300);
    } else {
      setPulseRight(true);
      setTimeout(() => setPulseRight(false), 300);
    }
  };

  // Auto-center the active year chip when year changes
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const btn = el.querySelector<HTMLButtonElement>(`button[data-year="${year}"]`);
    btn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [year]);

  // Track edges + adapt to overflow (ResizeObserver)
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onScroll = () => updateEdges();
    el.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(() => {
      // if content clearly overflows, switch to dropdown
      const overflow = el.scrollWidth > el.clientWidth * 1.18; // threshold
      setUseDropdown(overflow);
      updateEdges();
    });
    ro.observe(el);

    updateEdges();
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, []);

  const years = useMemo(() => {
    const ys = Array.from(new Set(PUBLICATIONS.map((p) => p.year))).sort((a, b) => b - a);
    return ["All", ...ys.map(String)];
  }, []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return PUBLICATIONS
      .filter((p) => year === "All" || String(p.year) === year)
      .filter((p) => {
        if (!query) return true;
        const inTitle = p.title.toLowerCase().includes(query);
        const inAuthors = p.authors.toLowerCase().includes(query);
        const inVenue = p.venue.toLowerCase().includes(query);
        const inTags = Array.isArray(p.tags) && p.tags.some((t) => t.toLowerCase().includes(query));
        return inTitle || inAuthors || inVenue || inTags;
      })
      .sort((a, b) => b.year - a.year);
  }, [year, q]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;
  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Keep page within range when filters change
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  // Scroll to top on page change
  useEffect(() => {
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const onYear = (y: string) => {
    setYear(y);
    setPage(1);
  };
  const onSearch = (s: string) => {
    setQ(s);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-white bg-grid bg-vignette">
        <div className="h-px bg-[#CC0000]/90" />
      </div>

      <div className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h1 className="mb-4 text-4xl font-bold text-gray-900">Publications</h1>
            {/* subtle orange rule (matches Research) */}
            <div className="mb-4 h-px w-12 rounded-full bg-[hsl(25,65%,50%)]/70" />
            <p className="text-lg text-gray-600">Our published research in top venues</p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                value={q}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search publications…"
                className="
                  w-full rounded-md border border-gray-300 bg-white pl-10 pr-4 py-2 text-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]
                  focus-visible:ring-offset-2 focus-visible:shadow-[0_0_0_4px_hsla(25,65%,50%,0.12)]
                "
                aria-label="Search publications"
              />
            </div>
          </div>

          {/* Year filter (match Research tabs style) */}
          <div className="mb-8">
            {/* Mobile uses native select (clean + reliable) */}
            <div className="md:hidden">
              <label className="sr-only" htmlFor="year-select">
                Filter by year
              </label>
              <select
                id="year-select"
                value={year}
                onChange={(e) => onYear(e.target.value)}
                className="
                  w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]
                  focus-visible:ring-offset-2 focus-visible:shadow-[0_0_0_4px_hsla(25,65%,50%,0.12)]
                "
              >
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: dropdown if overflow is extreme, otherwise rail */}
            <div className="relative hidden md:block">
              {useDropdown ? (
                <div className="max-w-sm">
                  <label className="sr-only" htmlFor="year-select-desktop">
                    Filter by year
                  </label>
                  <select
                    id="year-select-desktop"
                    value={year}
                    onChange={(e) => onYear(e.target.value)}
                    className="
                      w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]
                      focus-visible:ring-offset-2 focus-visible:shadow-[0_0_0_4px_hsla(25,65%,50%,0.12)]
                    "
                  >
                    {years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="relative">
                  {/* Research-style pill tray */}
                  <div className="relative inline-flex h-10 w-full items-center rounded-md bg-gray-100 p-1 text-gray-600">
                    {/* Left fade (scroll hint) */}
                    <span
                      className={[
                        "pointer-events-none absolute left-1 top-1 bottom-1 w-8 rounded-l-md bg-gradient-to-r from-gray-100 to-transparent",
                        pulseLeft ? "opacity-100" : "",
                        canLeft ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />
                    {/* Right fade (scroll hint) */}
                    <span
                      className={[
                        "pointer-events-none absolute right-1 top-1 bottom-1 w-8 rounded-r-md bg-gradient-to-l from-gray-100 to-transparent",
                        pulseRight ? "opacity-100" : "",
                        canRight ? "opacity-100" : "opacity-0",
                      ].join(" ")}
                    />

                    {/* Left arrow */}
                    <button
                      type="button"
                      aria-label="Scroll years left"
                      onClick={() => scrollByAmount(-240)}
                      disabled={!canLeft}
                      className="
                        absolute left-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md
                        border border-gray-300 bg-white text-gray-700 shadow-sm
                        hover:bg-gray-50 disabled:opacity-30
                      "
                    >
                      ‹
                    </button>

                    {/* Scroll rail */}
                    <div
                      ref={scrollerRef}
                      role="tablist"
                      aria-label="Filter by year"
                      className="
                        mx-12 flex h-10 w-full items-center gap-1 overflow-x-auto px-1
                        whitespace-nowrap
                        [scrollbar-width:thin]
                      "
                      style={{
                        // Chrome/Safari scrollbar (subtle but visible)
                        scrollbarColor: `${ORANGE} rgba(0,0,0,0)`,
                      }}
                    >
                      {years.map((y) => (
                        <button
                          key={y}
                          data-year={y}
                          onClick={() => onYear(y)}
                          role="tab"
                          aria-selected={year === y}
                          className={[
                            "inline-flex shrink-0 h-8 items-center justify-center whitespace-nowrap rounded-sm px-3 text-sm font-medium",
                            "ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2",
                            year === y
                              ? "bg-white text-gray-900 shadow-sm border-b-2 border-[hsl(25,65%,50%)]"
                              : "text-gray-600 hover:text-gray-900",
                          ].join(" ")}
                        >
                          {y}
                        </button>
                      ))}
                    </div>

                    {/* Right arrow */}
                    <button
                      type="button"
                      aria-label="Scroll years right"
                      onClick={() => scrollByAmount(240)}
                      disabled={!canRight}
                      className="
                        absolute right-2 z-10 inline-flex h-8 w-8 items-center justify-center rounded-md
                        border border-gray-300 bg-white text-gray-700 shadow-sm
                        hover:bg-gray-50 disabled:opacity-30
                      "
                    >
                      ›
                    </button>
                  </div>

                  {/* tiny helper text */}
                  {/* <p className="mt-2 text-xs text-gray-500">
                    Tip: swipe/scroll horizontally to see more years.
                  </p> */}
                </div>
              )}
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {current.map((p) => (
              <PubCard key={p.id} pub={p as LocalPub} />
            ))}
            {current.length === 0 && (
              <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-500">
                No results.
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Publications pagination">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="
                  inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2
                  text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[hsl(25,65%,50%)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={[
                      "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors",
                      page === n
                        ? "bg-[#CC0000] text-white"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[hsl(25,65%,50%)]",
                    ].join(" ")}
                    aria-current={page === n ? "page" : undefined}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={page === totalPages}
                className="
                  inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2
                  text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-[hsl(25,65%,50%)]
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

function PubCard({ pub }: { pub: LocalPub }) {
  const [open, setOpen] = useState(false);

  const href = pub.links?.pdf || pub.links?.arxiv || pub.links?.doi || undefined;

  return (
    <div
  className="
    group rounded-lg border border-gray-200 bg-white p-6 shadow-sm
    transition-all
    hover:border-[hsl(25,65%,50%)]/30
    hover:shadow-md
  "
>
  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
    <div className="flex-1">
      {/* Meta row */}
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-900">
          {pub.year}
        </span>

        {(pub.tags ?? []).map((tag) => (
          <span
            key={tag}
            className="
              inline-flex items-center rounded-full border border-gray-300 bg-white
              px-2.5 py-0.5 text-xs font-semibold text-gray-900
              hover:border-[hsl(25,65%,50%)]
              hover:text-[hsl(25,65%,50%)]
              transition-colors
            "
          >
            {tag}
          </span>
        ))}

        {pub.award && (
          <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-900">
            🏆 {pub.award}
          </span>
        )}
      </div>

      {/* Title */}
      {href ? (
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="
              group inline-flex items-center gap-1
              underline-offset-4
              hover:underline hover:text-[#CC0000]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#CC0000]
              focus-visible:ring-offset-2
              rounded-sm
            "
          >
            {pub.title}
            <ExternalLink
              className="
                h-3.5 w-3.5
                opacity-0
                transition-opacity duration-200
                group-hover:opacity-60
              "
            />
          </a>

          {/* subtle accent rule */}
          <div className="mt-2 h-px w-10 rounded-full bg-[hsl(25,65%,50%)]/40" />
        </h3>
      ) : (
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          {pub.title}
        </h3>
      )}

      <p className="mb-2 text-sm text-gray-700">{pub.authors}</p>
      <p className="text-sm italic text-gray-600">{pub.venue}</p>

      {/* Abstract */}
      {pub.abstract && (
        <div className="mt-2">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="
              inline-flex items-center gap-2 text-sm text-gray-800
              underline-offset-4
              hover:underline hover:text-[#CC0000]
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-[#CC0000]
              focus-visible:ring-offset-2
              rounded-sm
            "
          >
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {open ? "Hide abstract" : "Show abstract"}
          </button>

          {open && (
            <div className="mt-2 text-sm leading-relaxed text-gray-700">
              {pub.abstract}
            </div>
          )}
        </div>
      )}
    </div>

    {/* Actions */}
    <div className="flex shrink-0 flex-wrap gap-2">
      {pub.links?.pdf && (
        <a
          href={pub.links.pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-2
            rounded-md bg-[#CC0000]
            px-3 py-2 text-sm font-medium text-white
            hover:bg-[#CC0000]/90
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#CC0000]
            focus-visible:ring-offset-2
          "
        >
          <FileText className="h-3 w-3" />
          Paper
        </a>
      )}

      {pub.links?.arxiv && (
        <a
          href={pub.links.arxiv}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-2
            rounded-md border border-gray-300 bg-white
            px-3 py-2 text-sm font-medium text-gray-800
            hover:bg-gray-50
            hover:border-[hsl(25,65%,50%)]
            transition-colors
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#CC0000]
            focus-visible:ring-offset-2
          "
        >
          <BookOpen className="h-3 w-3" />
          arXiv
        </a>
      )}

      {pub.links?.doi && (
        <a
          href={pub.links.doi}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center justify-center gap-2
            rounded-md border border-gray-300 bg-white
            px-3 py-2 text-sm font-medium text-gray-800
            hover:bg-gray-50
            hover:border-[hsl(25,65%,50%)]
            transition-colors
            focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-[#CC0000]
            focus-visible:ring-offset-2
          "
        >
          <LinkIcon className="h-3 w-3" />
          DOI
        </a>
      )}
    </div>
  </div>
</div>
  );
}

export default Publications;
