// Content entries live as one JSON file each under src/content/ and are edited
// through the CMS at /admin. The CMS can write empty strings/objects for fields
// left blank, so strip those before the data reaches the pages.

const isEmpty = (value: unknown) =>
  value === "" ||
  value === null ||
  (typeof value === "object" && !Array.isArray(value) && Object.keys(value as object).length === 0);

function clean(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(clean).filter((item) => !isEmpty(item));
  if (value && typeof value === "object") {
    const entries = Object.entries(value)
      .map(([key, child]) => [key, clean(child)] as const)
      .filter(([, child]) => !isEmpty(child));
    return Object.fromEntries(entries);
  }
  return typeof value === "string" ? value.trim() : value;
}

/** Turns an import.meta.glob result into entries, using the file name as `id`. */
export function loadEntries<T>(modules: Record<string, unknown>): (T & { id: string })[] {
  return Object.entries(modules).map(([path, module]) => {
    const id = path.split("/").pop()!.replace(/\.json$/, "");
    const data = (module as { default?: unknown }).default ?? module;
    return { ...(clean(data) as T), id };
  });
}
