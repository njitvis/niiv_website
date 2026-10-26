import { loadEntries } from "../lib/content";

export const NEWS_CATEGORIES = [
  "Publication",
  "Award",
  "Challenge",
  "Grant",
  "Milestone",
  "Event",
  "Showcase",
] as const;

export type NewsCategory = (typeof NEWS_CATEGORIES)[number];

export type NewsItem = {
  id: string;
  /** Year and month, "YYYY-MM". */
  date: string;
  category: NewsCategory;
  title: string;
  description?: string;
  link?: string;
};

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2024-11" → "Nov 2024" */
export const formatNewsDate = (date: string) => {
  const [year, month] = date.split("-");
  return `${MONTHS[Number(month) - 1] ?? ""} ${year}`.trim();
};

/**
 * NEWS
 * Each item is one JSON file in src/content/news/ (edited via /admin), newest first.
 * The home page shows the latest few; the News page shows all of them.
 */
export const NEWS: NewsItem[] = loadEntries<Omit<NewsItem, "id">>(
  import.meta.glob("../content/news/*.json", { eager: true }),
).sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
