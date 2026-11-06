import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Popover content for the Generate, Validate, Repair figure: the actual outputs of one
 * run (20260826-043224), curated in public/…/hover-intermediate-outputs. Everything is
 * read from that folder at runtime, so updating the curation needs no code change.
 */

export const OUTPUTS_BASE = "/publications/2026/VisXgenAI/hover-intermediate-outputs";
const asset = (path: string) => `${OUTPUTS_BASE}/${path}`;

export type TargetKey = "A" | "B" | "C" | "D" | "validator-A" | "validator-B" | "validator-C" | "validator-D";

/** Panels left out of the site, even where a linked source file still lists them. */
const HIDDEN_PANELS = new Set(["h3"]);

/* ---------- curated data (hover-content.json) ---------- */

type Question = {
  id: string;
  text: string;
  complexity: string;
  tables: string[];
  answerable_because: string;
};

type Persona = {
  display_name: string;
  featured_question: Question;
  open_question?: Question;
};

type PanelRef = { id: string; title: string; question: string };

type Card = {
  id: "A" | "B" | "C" | "D";
  headline: string;
  copy: string;
  artifact: string;
  content: {
    preview?: { table_id: string; rows: { year: number; count: number }[]; selection_note: string };
    personas?: Persona[];
    preview_image?: string;
    guided?: PanelRef[];
    open?: PanelRef[];
    report_url?: string;
  };
};

type ValidatorEvent = {
  recorded_rejection?: string;
  accepted_output?: string;
  accepted_evidence?: unknown;
  accepted_example?: { panel_id: string; encoding: Record<string, { field: string }> };
  evidence_boundary?: string;
  recorded_result?: { rendered: string[]; failed: string[]; console_errors: string[]; problems: string[] };
  caption?: string;
  source?: { path: string; line?: number };
};

type HoverContent = {
  run_id: string;
  cards: Card[];
  validator: Record<"A" | "B" | "C" | "D", ValidatorEvent>;
};

type GalleryPanel = {
  id: string;
  question: string;
  table: string;
  chart_title: string;
  spec: Record<string, unknown>;
};

type ChartGallery = { charts: GalleryPanel[]; tables: Record<string, unknown[]> };

const cache = new Map<string, Promise<unknown>>();
const fetchJson = <T,>(path: string): Promise<T> => {
  if (!cache.has(path)) {
    cache.set(
      path,
      fetch(asset(path)).then((response) => {
        if (!response.ok) throw new Error(`${path}: ${response.status}`);
        return response.json();
      }),
    );
  }
  return cache.get(path) as Promise<T>;
};

const useJson = <T,>(path: string | null) => {
  const [state, setState] = useState<{ path: string; data?: T; failed?: boolean } | null>(null);
  useEffect(() => {
    if (!path) return;
    let live = true;
    fetchJson<T>(path).then(
      (data) => live && setState({ path, data }),
      () => live && setState({ path, failed: true }),
    );
    return () => {
      live = false;
    };
  }, [path]);
  return state?.path === path ? state : null;
};

/* ---------- Vega, loaded from the bundled report only when a chart is shown ---------- */

type VegaView = { finalize: () => void };
type VegaEmbed = (
  element: HTMLElement,
  spec: unknown,
  options: Record<string, unknown>,
) => Promise<{ view: VegaView }>;

let vegaReady: Promise<VegaEmbed> | null = null;
const loadScript = (src: string) =>
  new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });
const loadVega = () => {
  vegaReady ??= ["vega.min.js", "vega-lite.min.js", "vega-embed.min.js"]
    .reduce((chain, file) => chain.then(() => loadScript(asset(`report/vendor/${file}`))), Promise.resolve())
    .then(() => (window as unknown as { vegaEmbed: VegaEmbed }).vegaEmbed);
  return vegaReady;
};

/** Renders an accepted chart spec with its original data, fitted to the popover (as preview.html does). */
const LiveChart = ({ panel, gallery }: { panel: GalleryPanel; gallery: ChartGallery }) => {
  const target = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let view: VegaView | null = null;
    let live = true;
    const spec = JSON.parse(JSON.stringify(panel.spec)) as Record<string, unknown>;
    spec.data = { values: gallery.tables[panel.table] };
    if (!spec.hconcat && !spec.vconcat && !spec.concat && !spec.facet && !spec.repeat) {
      spec.width = "container";
      spec.autosize = { type: "fit", contains: "padding", resize: true };
    }
    if (Array.isArray(spec.params) && (spec.layer || spec.hconcat || spec.vconcat)) {
      for (const param of spec.params as Record<string, unknown>[]) if (param.bind === "legend") delete param.bind;
    }
    loadVega()
      .then((embed) => embed(target.current!, spec, { actions: false, renderer: "svg", tooltip: true }))
      .then(
        (result) => {
          if (live) view = result.view;
          else result.view.finalize();
        },
        () => live && setFailed(true),
      );
    return () => {
      live = false;
      view?.finalize();
    };
  }, [panel, gallery]);

  if (failed) {
    return (
      <img
        src={asset("images/c-plot-l1.png")}
        alt="Annual IEEE VIS paper counts, 1990 to 2024, as a line chart"
        className="w-full rounded border border-[#e2e6e5]"
      />
    );
  }
  return <div ref={target} className="min-h-[14rem] w-full font-sans" aria-label={`Live chart: ${panel.chart_title}`} />;
};

/* ---------- shared pieces ---------- */

const Stats = ({ items }: { items: [string, string][] }) => (
  <div className="mb-3 flex flex-wrap gap-1.5">
    {items.map(([value, label]) => (
      <span key={label} className="rounded-full border border-[#d2d7d5] bg-[#f4f5f5] px-2.5 py-0.5 text-[0.8em]">
        <b>{value}</b> {label}
      </span>
    ))}
  </div>
);

const Label = ({ children }: { children: ReactNode }) => (
  <p className="mb-1 mt-3 text-[0.75em] uppercase tracking-[0.12em] text-[#7c8785]">{children}</p>
);

const Small = ({ children }: { children: ReactNode }) => <p className="mt-2 text-[0.82em] text-[#6e7674]">{children}</p>;

const Links = ({ items }: { items: [string, string][] }) => (
  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-[#e2e6e5] pt-3 font-sans text-[0.8em]">
    {items.map(([href, label]) => (
      <a
        key={href}
        href={asset(href)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-[#B00000] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
      >
        {label} ↗
      </a>
    ))}
  </div>
);

const Pre = ({ value }: { value: unknown }) => (
  <pre className="pipeline-mono mt-1 max-h-48 overflow-auto rounded border border-[#e2e6e5] bg-[#fafbfb] p-2 text-[#36474f]">
    {JSON.stringify(value, null, 2)}
  </pre>
);

const Details = ({ summary, children }: { summary: string; children: ReactNode }) => (
  <details className="mt-2 text-[0.9em]">
    <summary className="cursor-pointer font-sans text-[0.9em] font-semibold text-[#36474f]">{summary}</summary>
    <div className="mt-1.5">{children}</div>
  </details>
);

const Code = ({ children }: { children: ReactNode }) => (
  <code className="pipeline-mono rounded bg-[#f4f5f5] px-1 text-[0.95em]">{children}</code>
);

/* ---------- stage outputs ---------- */

const ExtractorOutput = ({ card }: { card: Card }) => {
  const preview = card.content.preview!;
  return (
    <>
      <Stats items={[["3,877", "source rows"], ["20", "source fields"], ["11", "output tables"]]} />
      <Label>Annual-count table · selected years</Label>
      <table className="w-full border-collapse border border-[#8fb0cc] text-left">
        <thead className="bg-[#bcd1e5] text-[#1f3d57]">
          <tr>
            <th className="px-2 py-0.5">year</th>
            <th className="px-2 py-0.5">count</th>
          </tr>
        </thead>
        <tbody className="bg-[#eaf2f8]">
          {preview.rows.map((row) => (
            <tr key={row.year} className="border-t border-[#c4d9e8]">
              <td className="px-2 py-0.5">{row.year}</td>
              <td className="px-2 py-0.5">{row.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Small>{preview.selection_note}</Small>
      <Small>
        Table: <Code>{preview.table_id}</Code>
      </Small>
      <Links
        items={[
          ["data/a-annual-counts.exact.json", "Exact annual table"],
          [card.artifact, "Extraction summary"],
        ]}
      />
    </>
  );
};

const PersonaOutput = ({ card }: { card: Card }) => (
  <>
    <Stats items={[["5", "questions"], ["4", "guided"], ["1", "exploratory"]]} />
    <div className="grid gap-3 sm:grid-cols-2">
      {card.content.personas!.map((persona, index) => (
        <div
          key={persona.display_name}
          className="border-l-[0.3em] bg-[#fafbfb] p-2.5"
          style={{ borderLeftColor: index ? "#f28e2b" : "#4e79a7" }}
        >
          <p className="text-[0.75em] uppercase tracking-[0.12em] text-[#7c8785]">{persona.display_name}</p>
          <p className="mt-1 font-bold leading-snug">{persona.featured_question.text}</p>
          <p className="mt-1 text-[0.8em] text-[#6e7674]">
            {persona.featured_question.id} · guided · {persona.featured_question.complexity} complexity
          </p>
          <Details summary="Why this question is answerable">
            <p>{persona.featured_question.answerable_because}</p>
            <p className="mt-1">
              <Code>{persona.featured_question.tables[0]}</Code>
            </p>
          </Details>
          {persona.open_question && !HIDDEN_PANELS.has(persona.open_question.id) && (
            <Details summary="Open-exploration question">
              <p>{persona.open_question.text}</p>
              <p className="mt-1 text-[0.85em] text-[#6e7674]">{persona.open_question.id} · open exploration</p>
            </Details>
          )}
        </div>
      ))}
    </div>
  </>
);

const GeneratorOutput = ({ panelId, onPanelChange }: { panelId: string; onPanelChange: (id: string) => void }) => {
  const gallery = useJson<ChartGallery>("data/c-chart-gallery.json");
  if (!gallery) return <Small>Loading the generated panels…</Small>;
  if (!gallery.data) return <Small>The generated panels could not be loaded.</Small>;
  const charts = gallery.data.charts.filter((chart) => !HIDDEN_PANELS.has(chart.id));
  const panel = charts.find((chart) => chart.id === panelId) ?? charts[0];
  return (
    <>
      <label className="block font-sans text-[0.85em] font-semibold" htmlFor="pipeline-panel-picker">
        Generated panel
      </label>
      <select
        id="pipeline-panel-picker"
        value={panel.id}
        onChange={(event) => onPanelChange(event.target.value)}
        className="mt-1 w-full rounded border border-[#a8afad] bg-white px-2 py-1 font-sans text-[0.85em]"
      >
        {charts.map((chart) => (
          <option key={chart.id} value={chart.id}>
            {chart.id} · {chart.chart_title}
          </option>
        ))}
      </select>
      <p className="mt-2">
        <b>Question:</b> {panel.question}
      </p>
      <div className="mt-2">
        <LiveChart panel={panel} gallery={gallery.data} />
      </div>
      <Small>
        Source table: <Code>{panel.table}</Code>
      </Small>
      <Details summary="Accepted visualization specification">
        <Pre value={panel.spec} />
      </Details>
      <Links
        items={[
          [`report/index.html#chart-${panel.id}`, "Open in the report"],
          ["images/c-panel-l1.png", "Annual-count panel screenshot"],
        ]}
      />
    </>
  );
};

const ReportOutput = ({ card }: { card: Card }) => {
  const content = card.content;
  return (
    <>
      <img
        src={asset(content.preview_image!)}
        alt="Opening of the generated report: IEEE VIS Publications: Growth, Venue Mix, and the Journal Turn"
        loading="lazy"
        className="w-full rounded border border-[#d2d7d5]"
      />
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <Label>Guided sequence</Label>
          <ol className="space-y-1">
            {content.guided!.map((panel) => (
              <li key={panel.id}>
                <Code>{panel.id}</Code> {panel.title}
              </li>
            ))}
          </ol>
        </div>
        <div>
          <Label>Open exploration</Label>
          <ul className="space-y-1">
            {content.open!.filter((panel) => !HIDDEN_PANELS.has(panel.id)).map((panel) => (
              <li key={panel.id}>
                <Code>{panel.id}</Code> {panel.title}
              </li>
            ))}
          </ul>
          <Small>Saved browser check: every chart rendered, no reported problems.</Small>
        </div>
      </div>
      <Links
        items={[
          [content.report_url!, "Open the interactive report"],
          ["images/d-open-exploration.png", "Exploration screenshot"],
        ]}
      />
    </>
  );
};

/* ---------- validator outputs ---------- */

const ValidatorOutput = ({ id, event }: { id: "A" | "B" | "C" | "D"; event: ValidatorEvent }) => {
  const evidenceLinks: [string, string][] = [["evidence/generation-log-excerpts.txt", "Exact log excerpts"]];
  if (id === "D") {
    return (
      <>
        <Stats items={[["All", "charts rendered"], ["0", "failed"], ["0", "console errors"]]} />
        <p>{event.caption}</p>
        <Small>{event.evidence_boundary}</Small>
        <Links items={evidenceLinks} />
      </>
    );
  }
  return (
    <>
      <Label>Recorded rejection</Label>
      <p className="pipeline-mono whitespace-pre-wrap rounded border border-[#f2c6c6] bg-[#fdf2f2] p-2 text-[#8f2a2c]">
        {event.recorded_rejection}
      </p>
      <Label>Accepted output</Label>
      <p className="rounded border border-[#c2e2df] bg-[#f0f8f7] p-2">{event.accepted_output}</p>
      {id === "C" && event.accepted_example ? (
        <>
          <table className="mt-2 w-full border-collapse text-left text-[0.9em]">
            <thead>
              <tr className="border-b border-[#d2d7d5]">
                <th className="py-0.5 pr-2">Channel</th>
                <th className="py-0.5">Accepted field ({event.accepted_example.panel_id})</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(event.accepted_example.encoding).map(([channel, encoding]) => (
                <tr key={channel} className="border-b border-[#eceeed]">
                  <td className="py-0.5 pr-2">{channel}</td>
                  <td className="py-0.5">
                    <Code>{encoding.field}</Code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Small>{event.evidence_boundary}</Small>
        </>
      ) : null}
      {event.source?.line && <Small>Source: generation.log, line {event.source.line}.</Small>}
      <Links items={evidenceLinks} />
    </>
  );
};

/* ---------- popover body ---------- */

export const OutputPanel = ({
  target,
  pinned,
  onTogglePin,
  onClose,
  headingId,
}: {
  target: TargetKey;
  pinned: boolean;
  onTogglePin: () => void;
  onClose: () => void;
  headingId: string;
}) => {
  const content = useJson<HoverContent>("hover-content.json");
  const [panelId, setPanelId] = useState("l1");
  const validator = target.startsWith("validator-");
  const id = target.slice(-1) as "A" | "B" | "C" | "D";

  let heading = "Loading…";
  let caption: string | undefined;
  let body: ReactNode = null;
  if (content?.failed) {
    heading = "Output unavailable";
    body = <Small>The curated outputs could not be loaded.</Small>;
  } else if (content?.data) {
    if (validator) {
      const event = content.data.validator[id];
      heading = id === "D" ? "Recorded browser check" : `Stage ${id}: a rejected attempt and accepted output`;
      body = <ValidatorOutput id={id} event={event} />;
    } else {
      const card = content.data.cards.find((item) => item.id === id)!;
      heading = card.headline;
      caption = card.copy;
      if (id === "A") body = <ExtractorOutput card={card} />;
      if (id === "B") body = <PersonaOutput card={card} />;
      if (id === "C") {
        caption = "Live chart from the accepted specification and its original data. Pick a panel, then hover over its marks or use its controls.";
        body = <GeneratorOutput panelId={panelId} onPanelChange={setPanelId} />;
      }
      if (id === "D") body = <ReportOutput card={card} />;
    }
  }

  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-3 font-sans text-[0.72rem]">
        <span className="font-semibold uppercase tracking-[0.12em] text-[#B00000]">
          {validator ? "Validator" : "Stage"} {id} · actual run output
        </span>
        <span className="flex shrink-0 gap-1.5 whitespace-nowrap">
          <button
            type="button"
            onClick={onTogglePin}
            aria-pressed={pinned}
            className="rounded border border-[#c9cfcd] px-2 py-0.5 font-semibold text-[#36474f] hover:border-[#CC0000] hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
          >
            {pinned ? "Unpin" : "Pin open"}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded border border-[#c9cfcd] px-2 py-0.5 font-semibold text-[#36474f] hover:border-[#CC0000] hover:text-[#B00000] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000]"
          >
            ✕
          </button>
        </span>
      </div>
      <h4 id={headingId} className="text-[1.15em] font-bold leading-snug">
        {heading}
      </h4>
      {caption && <p className="mt-1 text-[#6e7674]">{caption}</p>}
      <div className="mt-3">{body}</div>
    </>
  );
};
