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

const PEOPLE_DATA: Person[] = [
  {
    name: "Aritra Dasgupta",
    role: "Associate Professor",
    group: "faculty",
    priority: 1,
    initials: "AD",
    affiliation: "NJIT",
    email: "aritra.dasgupta@njit.edu",
    image: "/people/aritra.jpeg",
    website: "https://aedeegee.github.io/",
    linkedin: "https://www.linkedin.com/in/aritradasgupta/",
  },
  {
    name: "Avina Nakarmi",
    role: "Ph.D. Student",
    group: "phd",
    priority: 2,
    initials: "AN",
    affiliation: "NJIT",
    period: "2025 - Present",
    email: "an778@njit.edu",
    image: "/people/avina.jpeg",
    website: "https://avinanakarmi.github.io/",
    github: "https://github.com/avinanakarmi",
    linkedin: "https://www.linkedin.com/in/avina-nakarmi-9b296a294",
    scholar:
      "https://scholar.google.com/citations?user=deAxRaEAAAAJ&hl=en",
  },
  {
    name: "Bayan Divaaniaazar",
    role: "Ph.D. Student",
    group: "phd",
    priority: 2,
    initials: "BD",
    affiliation: "NJIT",
    period: "2024 - Present",
    website: "https://bayan-divaaniaazar.github.io/",
    linkedin: "https://www.linkedin.com/in/bayan-divaaniaazar/",
    github: "https://github.com/bayan-divaaniaazar",
  },
  {
    name: "Naga Datha Saikiran Battula",
    role: "Ph.D. Student",
    group: "phd",
    priority: 2,
    initials: "SB",
    affiliation: "NJIT",
    period: "2025 - Present",
    email: "nb547@njit.edu",
    image: "/people/saikiran.jpeg",
    website: "https://saikiranbattula.com/",
    github: "https://github.com/saikiran2002",
    linkedin:
      "https://www.linkedin.com/in/naga-datha-saikiran-battula-a62749206/",
    scholar: "https://scholar.google.com/citations?user=APIs0i4AAAAJ",
  },
  {
    name: "Vrushali Koli",
    role: "Ph.D. Student",
    group: "phd",
    priority: 2,
    initials: "VK",
    affiliation: "NJIT",
    period: "2022 - 2026 (expected)",
    email: "vk343@njit.edu",
    image: "/people/vrushali.jpg",
    website: "https://vkoli.github.io/",
    linkedin: "https://www.linkedin.com/in/vk801/",
    github: "https://github.com/vkoli",
  },
  {
    name: "Jun Yuan",
    role: "Ph.D. Alumnus",
    group: "alumni",
    priority: 3,
    initials: "JY",
    period: "2019 - 2024",
    note: "Postdoctoral Research Associate, Digital Technology for Democracy Lab at UVA",
    email: "jy448@njit.edu",
    image: "/people/jun.png",
    website: "https://jydrew.github.io/",
  },
  {
    name: "Kaustav Bhattacharjee",
    role: "Ph.D. Alumnus",
    group: "alumni",
    priority: 3,
    initials: "KB",
    period: "2019 - 2024",
    note: "Postdoctoral Research Associate, Optimization and Control Group at PNNL",
    email: "kb526@njit.edu",
    image: "/people/kaustav.png",
    website: "https://kaustavbhattacharjee.com/",
  },
  {
    name: "Akm Islam",
    role: "Former Research Assistant",
    group: "former",
    priority: 4,
    initials: "AI",
    affiliation: "NJIT",
    email: "akm.islam@njit.edu",
    image: "/people/akm.jpeg",
    website: "http://akmislam.com/",
  },
];

export const PEOPLE = PEOPLE_DATA.slice().sort(
  (a, b) => a.priority - b.priority || a.name.localeCompare(b.name),
);

export const PREVIOUS_RESEARCH_ASSISTANTS: PreviousResearchAssistant[] = [
  { name: "Parvathy Neelkanta Sharma", program: "M.S. Data Science" },
  { name: "Sasikala Vasudevan", program: "M.S. Data Science" },
  { name: "Likhitha Musku", program: "M.S. Data Science" },
  { name: "Divya Chandana", program: "M.S. Data Science" },
  { name: "Yaohua Zhao", program: "M.S. Data Science" },
  { name: "Gabriel Aguende", program: "B.S. IT/CS/DS" },
  { name: "Tanvirul Islam", program: "B.S. IT/CS/DS" },
  { name: "Parth Merchant", program: "B.S. IT/CS/DS" },
  { name: "Saanvi Chougule", program: "B.S. IT/CS/DS" },
  { name: "Saidarsha Karunakaran", program: "B.S. IT/CS/DS" },
  { name: "Potri Abhisri Barama", program: "B.S. IT/CS/DS" },
  { name: "Conor Fitzpatrick", program: "B.S. IT/CS/DS" },
  { name: "Minh Le", program: "B.S. IT/CS/DS" },
];

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
