export type Person = {
  name: string;
  role: string;
  email?: string;
  image?: string;
  initials?: string;   // used as fallback if image is missing
  priority: number;    // lower number = higher in list
  website?: string;   
  github?: string;    
  linkedin?: string; 
  affiliation?: string;
};

// Single source of truth
const _PEOPLE: Person[] = [
  {
    name: "Aritra Dasgupta",
    role: "Associate Professor",
    email: "aritra.dasgupta@njit.edu",
    initials: "AD",
    priority: 1,
    affiliation: "NJIT",
    image: "/people/aritra.jpeg",
    website: "https://aedeegee.github.io/",
    linkedin: "https://www.linkedin.com/in/aritradasgupta/"
  },
  {
    name: "Avina Nakarmi",
    role: "PhD Candidate",
    email: "",
    initials: "AN",
    priority: 2,
    affiliation: "NJIT",
    image: "",
    website: "",
  },
  {
    name: "Bayan Divaaniaazar",
    role: "PhD Candidate",
    email: "",
    initials: "BD",
    priority: 2,
    affiliation: "NJIT",
    image: "",
    website: "https://bayan-divaaniaazar.github.io/",
    linkedin: "https://www.linkedin.com/in/bayan-divaaniaazar/",
    github: "https://github.com/bayan-divaaniaazar"
  },
  {
    name: "Vrushali Koli",
    role: "PhD Candidate",
    email: "vk343@njit.edu",
    initials: "VK",
    priority: 2,
    affiliation: "NJIT",
    image: "/people/vrushali.jpg",
    website: "https://vkoli.github.io/",
    linkedin: "https://www.linkedin.com/in/vk801/",
    github: "https://github.com/vkoli"
  },
  {
    name: "Saikiran Battula",
    role: "PhD Candidate",
    email: "",
    initials: "SB",
    priority: 3,
    affiliation: "NJIT",
    image: "",
    website: "",
  },
];

// Sort once here (priority, then name)
export const PEOPLE: Person[] = _PEOPLE
  .slice()
  .sort((a, b) => (a.priority - b.priority) || a.name.localeCompare(b.name));

// Helpers
export const getFeaturedPeople = (n = 4) => PEOPLE.slice(0, n);
export const getPeopleByRole = (role: string) =>
  PEOPLE.filter(p => p.role.toLowerCase().includes(role.toLowerCase()));
