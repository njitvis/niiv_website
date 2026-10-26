import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BookOpen,
  ChevronRight,
  DollarSign,
  ExternalLink,
  GraduationCap,
  Presentation,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { NEWS, NEWS_CATEGORIES, type NewsCategory } from "../data/news";

const CATEGORY_STYLES: Record<NewsCategory, { icon: LucideIcon; className: string }> = {
  Publication: { icon: BookOpen, className: "bg-blue-50 text-blue-700 ring-blue-600/15" },
  Award: { icon: Award, className: "bg-amber-50 text-amber-800 ring-amber-600/20" },
  Challenge: { icon: Trophy, className: "bg-orange-50 text-orange-700 ring-orange-600/15" },
  Grant: { icon: DollarSign, className: "bg-green-50 text-green-700 ring-green-600/15" },
  Milestone: { icon: GraduationCap, className: "bg-red-50 text-[#CC0000] ring-[#CC0000]/15" },
  Event: { icon: Users, className: "bg-purple-50 text-purple-700 ring-purple-600/15" },
  Showcase: { icon: Presentation, className: "bg-sky-50 text-sky-700 ring-sky-600/15" },
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const News = () => {
  const [category, setCategory] = useState<NewsCategory | "All">("All");

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "News | NIIV Lab";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  const categories = NEWS_CATEGORIES.filter((name) => NEWS.some((item) => item.category === name));

  const newsByYear = useMemo(() => {
    const groups = new Map<string, typeof NEWS>();
    for (const item of NEWS) {
      if (category !== "All" && item.category !== category) continue;
      const year = item.date.slice(0, 4);
      groups.set(year, [...(groups.get(year) ?? []), item]);
    }
    return [...groups.entries()];
  }, [category]);

  const filterClassName = (active: boolean) =>
    `rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] ${
      active
        ? "bg-gray-900 text-white ring-gray-900"
        : "bg-white text-gray-700 ring-gray-200 hover:text-[#CC0000] hover:ring-[#CC0000]/40"
    }`;

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <main>
        <section className="border-b border-gray-100 bg-white py-10 sm:py-12">
          <div className="site-shell">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-gray-500">
                <li>
                  <Link
                    to="/"
                    className="hover:text-[#CC0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="font-medium text-gray-900">
                  News
                </li>
              </ol>
            </nav>

            <header className="max-w-3xl">
              <h1 className="text-4xl font-bold text-gray-950 sm:text-5xl">News</h1>
              <p className="reading-copy mt-5 text-gray-700">
                Papers, awards, grants, and milestones from the NIIV Lab.
              </p>
            </header>

            <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter news by category">
              <button
                type="button"
                aria-pressed={category === "All"}
                onClick={() => setCategory("All")}
                className={filterClassName(category === "All")}
              >
                All
              </button>
              {categories.map((name) => (
                <button
                  key={name}
                  type="button"
                  aria-pressed={category === name}
                  onClick={() => setCategory(name)}
                  className={filterClassName(category === name)}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="site-shell py-10 sm:py-14">
          {newsByYear.map(([year, items]) => (
            <section key={year} aria-labelledby={`news-${year}`} className="mb-12 last:mb-0">
              <h2
                id={`news-${year}`}
                className="mb-4 border-b border-gray-200 pb-2 font-serif text-2xl font-semibold text-gray-950"
              >
                {year}
              </h2>

              <ol className="divide-y divide-gray-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
                {items.map((item) => {
                  const style = CATEGORY_STYLES[item.category] ?? CATEGORY_STYLES.Publication;
                  const Icon = style.icon;
                  const month = MONTHS[Number(item.date.slice(5, 7)) - 1];

                  return (
                    <li key={item.id} className="grid gap-x-6 gap-y-2 p-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:p-6">
                      <time
                        dateTime={item.date}
                        className="text-sm font-semibold uppercase tracking-wide text-gray-500 sm:pt-0.5"
                      >
                        {month} {year}
                      </time>

                      <div className="min-w-0">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style.className}`}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {item.category}
                        </span>

                        <h3 className="mt-2 font-serif text-xl font-semibold leading-snug text-gray-950">
                          {item.link ? (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                            >
                              <span className="group-hover:text-[#CC0000] group-hover:underline group-hover:underline-offset-4">
                                {item.title}
                              </span>
                              <ExternalLink
                                className="ml-1.5 inline h-4 w-4 -translate-y-0.5 text-gray-400 group-hover:text-[#CC0000]"
                                aria-label="(opens in a new tab)"
                              />
                            </a>
                          ) : (
                            item.title
                          )}
                        </h3>

                        {item.description && (
                          <p className="reading-copy mt-2 text-gray-700">{item.description}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default News;
