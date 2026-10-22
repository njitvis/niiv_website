/**
 * Link buttons share one shape and size, in two weights so a row of them stays calm:
 * - primary: black, for the one main action (the paper itself);
 * - secondary: outlined, for everything else (code, demo, poster, cite, abstract…).
 * Filled buttons lift slightly and lighten on hover; outlined ones turn NIIV red. Keyboard focus
 * always shows a ring.
 */
const base =
  "inline-flex h-10 items-center justify-center gap-1.5 rounded-md px-3.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

export const buttonClassName = `${base} bg-gray-950 text-white shadow-sm hover:-translate-y-px hover:bg-gray-800 hover:shadow-md focus-visible:ring-gray-950`;

export const secondaryButtonClassName = `${base} border border-gray-300 bg-white text-gray-900 hover:border-[#CC0000] hover:text-[#B00000] focus-visible:ring-[#CC0000]`;
