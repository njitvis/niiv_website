import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import type { PaperFigure } from "../data/publications";

const FigureCaption = ({ figure, light = false }: { figure: PaperFigure; light?: boolean }) => {
  if (!figure.caption && !figure.credit) return null;
  return (
    <>
      {figure.caption}
      {figure.caption && figure.credit && " · "}
      {figure.credit &&
        (figure.source ? (
          <a
            href={figure.source}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline underline-offset-4 ${light ? "hover:text-white" : "hover:text-[#B00000]"}`}
          >
            {figure.credit}
          </a>
        ) : (
          figure.credit
        ))}
    </>
  );
};

/**
 * One large figure; with several, arrows and thumbnails to move between them.
 * "View larger" (or clicking the figure) opens it over the page, with a close
 * button; Esc or clicking outside the figure also closes it.
 */
const FigureGallery = ({ figures }: { figures: PaperFigure[] }) => {
  const [index, setIndex] = useState(0);
  const viewer = useRef<HTMLDialogElement>(null);
  if (figures.length === 0) return null;

  const figure = figures[Math.min(index, figures.length - 1)];
  const many = figures.length > 1;
  const go = (step: number) => setIndex((current) => (current + step + figures.length) % figures.length);

  const openViewer = () => viewer.current?.showModal();
  const closeViewer = () => viewer.current?.close();
  const handleViewerClick = (event: MouseEvent<HTMLDialogElement>) => {
    // A click on the dark area around the figure (the dialog itself) closes it.
    if (event.target === event.currentTarget) closeViewer();
  };
  const handleViewerKey = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (!many) return;
    if (event.key === "ArrowRight") go(1);
    else if (event.key === "ArrowLeft") go(-1);
  };

  const arrowClassName =
    "absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-md ring-1 ring-gray-200 transition hover:text-[#B00000] hover:ring-[#CC0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]";

  return (
    <section aria-roledescription="gallery" aria-label="Figures">
      <figure>
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white">
          <button
            type="button"
            onClick={openViewer}
            className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#CC0000]"
            aria-label={`View larger: ${figure.alt}`}
          >
            <img src={figure.image} alt={figure.alt} className="mx-auto max-h-[32rem] w-full object-contain p-3 sm:p-5" />
          </button>
          {many && (
            <>
              <button type="button" onClick={() => go(-1)} className={`${arrowClassName} left-3`} aria-label="Previous figure">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} className={`${arrowClassName} right-3`} aria-label="Next figure">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          )}
        </div>

        <figcaption className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2 text-sm text-gray-600">
          <span className="min-w-0 flex-1">
            {many && (
              <span className="mr-2 font-semibold text-gray-900">
                {index + 1} / {figures.length}
              </span>
            )}
            <FigureCaption figure={figure} />
          </span>
          <button
            type="button"
            onClick={openViewer}
            className="inline-flex shrink-0 items-center gap-1.5 font-medium text-gray-700 hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            View larger
          </button>
        </figcaption>
      </figure>

      {many && (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" aria-label="Choose a figure">
          {figures.map((item, itemIndex) => (
            <button
              key={item.image}
              type="button"
              onClick={() => setIndex(itemIndex)}
              aria-label={`Show figure ${itemIndex + 1}: ${item.alt}`}
              aria-current={itemIndex === index}
              className={`h-16 w-24 shrink-0 overflow-hidden rounded-md border bg-white p-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] ${
                itemIndex === index ? "border-[#CC0000] ring-1 ring-[#CC0000]" : "border-gray-200 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={item.image} alt="" className="h-full w-full object-contain" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={viewer}
        aria-label={`Figure: ${figure.alt}`}
        onClick={handleViewerClick}
        onKeyDown={handleViewerKey}
        className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/85 sm:p-8"
      >
        <div className="pointer-events-none flex h-full flex-col items-center justify-center gap-4">
          <div className="pointer-events-auto relative max-w-full">
            <img
              src={figure.image}
              alt={figure.alt}
              className="max-h-[78vh] max-w-full rounded-lg bg-white object-contain p-3 shadow-2xl sm:p-6"
            />
            <button
              type="button"
              onClick={closeViewer}
              autoFocus
              aria-label="Close"
              className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 shadow-lg ring-1 ring-gray-200 transition hover:text-[#B00000] hover:ring-[#CC0000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div className="pointer-events-auto flex max-w-3xl items-center gap-4 text-center text-sm text-gray-200">
            {many && (
              <button type="button" onClick={() => go(-1)} aria-label="Previous figure" className="rounded-full p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
            <p>
              {many && (
                <span className="mr-2 font-semibold text-white">
                  {index + 1} / {figures.length}
                </span>
              )}
              <FigureCaption figure={figure} light />
            </p>
            {many && (
              <button type="button" onClick={() => go(1)} aria-label="Next figure" className="rounded-full p-2 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default FigureGallery;
