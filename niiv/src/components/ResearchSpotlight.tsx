import { ArrowRight } from "lucide-react";
import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { SPOTLIGHT } from "../data/spotlight";
import LinkButton from "./LinkButton";

const ResearchSpotlight = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  if (SPOTLIGHT.length === 0) return null;

  // Arrow keys move between items (up/down in the side index, left/right as tabs).
  const handleTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = SPOTLIGHT.length - 1;
    let nextIndex = index;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") nextIndex = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") nextIndex = index === 0 ? last : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = last;
    else return;

    event.preventDefault();
    setSelectedIndex(nextIndex);
    tabs.current[nextIndex]?.focus();
  };

  return (
    <section className="home-spotlight min-w-0 border-t border-gray-200 pt-5" aria-labelledby="research-spotlight-heading">
      <div className="spotlight-heading mb-3 flex flex-wrap items-center justify-between gap-3">
        <h2 id="research-spotlight-heading" className="home-label font-medium uppercase text-[#CC0000]">
          Research Spotlight
        </h2>
        <Link
          to="/research"
          className="group inline-flex items-center gap-2 text-sm font-medium text-[hsl(25,65%,45%)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
        >
          View all research
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>

      <div className="spotlight-layout">
        <div className="spotlight-rail">
        <div className="spotlight-index" role="tablist" aria-label="Research spotlight" aria-orientation="vertical">
          {SPOTLIGHT.map((item, index) => (
            <button
              key={item.id}
              ref={(node) => {
                tabs.current[index] = node;
              }}
              id={`spotlight-tab-${item.id}`}
              type="button"
              role="tab"
              aria-selected={index === selectedIndex}
              aria-controls={`spotlight-panel-${item.id}`}
              aria-label={`${item.title}, ${item.meta}`}
              tabIndex={index === selectedIndex ? 0 : -1}
              className="spotlight-tab"
              onClick={() => setSelectedIndex(index)}
              onKeyDown={(event) => handleTabKey(event, index)}
            >
              {/* The short title expands in place to the full title on hover/focus. */}
              <span className="spotlight-tab-short">{item.shortTitle}</span>
              {item.shortTitle !== item.title && <span className="spotlight-tab-full">{item.title}</span>}
              <span className="spotlight-tab-meta">{item.meta}</span>
            </button>
          ))}
        </div>
          <Link
            to="/publications"
            className="spotlight-rail-link group items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            Browse all publications
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        {SPOTLIGHT.map((item, index) => (
          <div
            key={item.id}
            id={`spotlight-panel-${item.id}`}
            role="tabpanel"
            aria-labelledby={`spotlight-tab-${item.id}`}
            hidden={index !== selectedIndex}
            className="min-w-0"
          >
            {index === selectedIndex && (
              <article className="spotlight-panel rounded-2xl border border-gray-200 bg-white p-5 shadow-lg shadow-black/5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{item.eyebrow}</p>
                <h3 className="spotlight-title mt-2 font-serif font-semibold text-gray-950">
                  <Link
                    to={item.href}
                    className="hover:text-[#B00000] focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                  >
                    {item.title}
                  </Link>
                </h3>

                <figure className="mt-4">
                  <div className="spotlight-media relative overflow-hidden rounded-xl border border-gray-100 bg-white">
                    <img src={item.figure.image} alt={item.figure.alt} className="absolute inset-0 h-full w-full object-contain p-2" />
                  </div>
                  {(item.figure.credit || item.figure.caption) && (
                    <figcaption className="mt-2 text-xs text-gray-600">
                      {item.figure.caption}
                      {item.figure.caption && item.figure.credit && " · "}
                      {item.figure.credit &&
                        (item.figure.source ? (
                          <a
                            href={item.figure.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline underline-offset-4 hover:text-[#B00000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-current"
                          >
                            {item.figure.credit}
                          </a>
                        ) : (
                          item.figure.credit
                        ))}
                    </figcaption>
                  )}
                </figure>

                <p className="spotlight-summary home-copy mt-4 text-gray-800">{item.summary}</p>

                {item.links.length > 0 && (
                  <div className="spotlight-actions mt-4 flex flex-wrap gap-2">
                    {item.links.map((link) => (
                      <LinkButton key={link.href} href={link.href} label={link.label} icon={link.icon} primary={link.primary} />
                    ))}
                  </div>
                )}

                {item.project && (
                  <p className="mt-4 border-t border-gray-200 pt-3 text-sm text-gray-600">
                    Part of{" "}
                    <Link
                      to={`/research/${item.project.slug}`}
                      className="group inline-flex items-center gap-1 font-semibold text-gray-900 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
                    >
                      {item.project.title}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                  </p>
                )}
              </article>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ResearchSpotlight;
