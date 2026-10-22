import { loadEntries } from "../lib/content";

export type PersonGroup = "faculty" | "phd" | "alumni" | "former";

export type Person = {
  name: string;
  role: string;
  group: PersonGroup;
  priority: number;
  initials: string;
  affiliation?: string;
  period?: string;
  note?: string;
  email?: string;
  image?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  scholar?: string;
};

export type PreviousResearchAssistant = {
  name: string;
  program: "M.S. Data Science" | "B.S. IT/CS/DS";
};

// Each person is one JSON file in src/content/people/ (edited via /admin).
const GROUP_PRIORITY: Record<PersonGroup, number> = {
  faculty: 1,
  phd: 2,
  alumni: 3,
  former: 4,
};

const getInitials = (name: string) =>
  name
    .split(/s+/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .filter((_, index, parts) => index === 0 || index === parts.length - 1)
    .join("");

type PersonEntry = Omit<Person, "priority" | "initials"> & { initials?: string };

export const PEOPLE: Person[] = loadEntries<PersonEntry>(
  import.meta.glob("../content/people/*.json", { eager: true }),
)
  .map((person) => ({
    ...person,
    priority: GROUP_PRIORITY[person.group] ?? 5,
    initials: person.initials ?? getInitials(person.name),
  }))
  .sort((a, b) => a.priority - b.priority || a.name.localeCompare(b.name));

const PROGRAM_ORDER: PreviousResearchAssistant["program"][] = [
  "M.S. Data Science",
  "B.S. IT/CS/DS",
];

export const PREVIOUS_RESEARCH_ASSISTANTS: PreviousResearchAssistant[] = loadEntries<PreviousResearchAssistant>(
  import.meta.glob("../content/research-assistants/*.json", { eager: true }),
)
  .map(({ name, program }) => ({ name, program }))
  .sort(
    (a, b) =>
      PROGRAM_ORDER.indexOf(a.program) - PROGRAM_ORDER.indexOf(b.program) ||
      a.name.localeCompare(b.name),
  );

export const getFeaturedPeople = (count = 4) =>
  PEOPLE.filter((person) => person.group === "faculty" || person.group === "phd").slice(
    0,
    count,
  );

export const getPersonAnchor = (name: string) =>
  `person-${name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")}`;

export const getPeopleByRole = (role: string) =>
  PEOPLE.filter((person) =>
    person.role.toLowerCase().includes(role.toLowerCase()),
  );
