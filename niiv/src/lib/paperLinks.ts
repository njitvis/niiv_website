import {
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  Link as LinkIcon,
  MonitorPlay,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import type { Pub } from "../data/publications";

export type PaperLink = { label: string; href: string; icon: LucideIcon; primary?: boolean };

/** A paper's links in a fixed order, each with its label and icon; the main one is marked primary. */
export const getPaperLinks = (publication: Pub): PaperLink[] => {
  const links = publication.links ?? {};
  const code = links.code;
  const candidates: (PaperLink | null)[] = [
    links.pdf ? { label: "Paper", href: links.pdf, icon: FileText } : null,
    links.arxiv ? { label: "arXiv", href: links.arxiv, icon: BookOpen } : null,
    links.doi ? { label: "DOI", href: links.doi, icon: LinkIcon } : null,
    links.website ? { label: "Website", href: links.website, icon: ExternalLink } : null,
    code ? { label: /github\.com/i.test(code) ? "GitHub" : "Code", href: code, icon: Github } : null,
    links.demo ? { label: "Demo", href: links.demo, icon: MonitorPlay } : null,
    links.poster ? { label: "Poster", href: links.poster, icon: Presentation } : null,
  ];
  const present = candidates.filter((link): link is PaperLink => link !== null);
  // The first way to read the paper (Paper, arXiv, DOI or website) is the main button.
  if (present[0] && ["Paper", "arXiv", "DOI", "Website"].includes(present[0].label)) present[0].primary = true;
  return present;
};

/** The paper's BibTeX, or a simple entry built from its details when none is stored. */
export const getBibtex = (publication: Pub) => {
  if (publication.bibtex?.trim()) return publication.bibtex.trim();
  const firstAuthor = publication.authors.split(/,| and /)[0].trim().split(/\s+/).pop() ?? "niiv";
  const firstWord = publication.title.toLowerCase().match(/[a-z]+/)?.[0] ?? "paper";
  const key = `${firstAuthor.toLowerCase().replace(/[^a-z]/g, "")}${publication.year}${firstWord}`;
  const authors = publication.authors.replace(/,\s*and\s+/g, " and ").replace(/,\s*/g, " and ");
  const kind = publication.type === "journal" ? "article" : publication.type === "thesis" ? "phdthesis" : "inproceedings";
  const venueField = publication.type === "journal" ? "journal" : publication.type === "thesis" ? "school" : "booktitle";
  return [
    `@${kind}{${key},`,
    `  title = {${publication.title}},`,
    `  author = {${authors}},`,
    `  ${venueField} = {${publication.venue}},`,
    `  year = {${publication.year}}`,
    `}`,
  ].join("\n");
};
