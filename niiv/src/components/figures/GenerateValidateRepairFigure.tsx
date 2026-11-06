import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { OutputPanel, type TargetKey } from "./GenerateValidateRepairOutputs";

/**
 * Figure 1 of "Generate, Validate, Repair", drawn in HTML so the text stays sharp
 * at any size. Each stage and each validator check opens a popover with the actual
 * output of one run (see GenerateValidateRepairOutputs). Layout rules live under
 * .pipeline-* in index.css.
 */

type StageId = "A" | "B" | "C" | "D";

const COLORS = {
  blue: "#4e79a7",
  orange: "#f28e2b",
  red: "#e15759",
  teal: "#76b7b2",
  green: "#59a14f",
  grey: "#d5d8d7",
  axis: "#c9cfcd",
};

/* ---------- small building blocks ---------- */

const Section = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="mx-[0.75em] mb-[0.75em] rounded-[3px] border border-[#d2d7d5] bg-white px-[0.7em] pb-[0.7em] pt-[0.55em]">
    <p className="mb-[0.5em] text-[0.78em] uppercase tracking-[0.14em] text-[#7c8785]">{label}</p>
    {children}
  </div>
);

/** A box with a coloured bar on its left edge. */
const Bar = ({ color, className = "", children }: { color: string; className?: string; children: ReactNode }) => (
  <div className={`border-l-[0.3em] ${className}`} style={{ borderLeftColor: color }}>
    {children}
  </div>
);

const Dot = ({ filled, color }: { filled: boolean; color: string }) => (
  <span
    aria-hidden="true"
    className="mt-[0.2em] inline-block h-[0.95em] w-[0.95em] shrink-0 rounded-full"
    style={filled ? { backgroundColor: color } : { border: `0.17em solid ${color}` }}
  />
);

const Italic = ({ color, children }: { color: string; children: ReactNode }) => (
  <p className="mb-[0.3em] italic" style={{ color }}>
    {children}
  </p>
);

/* ---------- mini charts ---------- */

const chartFrame = "block h-[3.4em] w-full rounded-[2px] border border-[#d2d7d5] bg-white";

const BarChart = ({ className = chartFrame }: { className?: string }) => (
  <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={className} aria-hidden="true">
    {[COLORS.blue, COLORS.orange, COLORS.red, COLORS.teal].map((fill, i) => (
      <rect key={fill} x={10 + i * 19} y={[38, 26, 16, 6][i]} width={14} height={[14, 26, 36, 46][i]} fill={fill} />
    ))}
    <line x1="6" y1="52.5" x2="94" y2="52.5" stroke={COLORS.axis} vectorEffect="non-scaling-stroke" />
  </svg>
);

const LineChart = () => (
  <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={chartFrame} aria-hidden="true">
    <polyline points="8,44 30,32 52,38 75,14 92,7" fill="none" stroke={COLORS.blue} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    <polyline points="8,49 40,43 70,37 92,24" fill="none" stroke={COLORS.orange} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    <line x1="6" y1="52.5" x2="94" y2="52.5" stroke={COLORS.axis} vectorEffect="non-scaling-stroke" />
  </svg>
);

const StackedChart = () => (
  <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={chartFrame} aria-hidden="true">
    {[0, 1, 2].map((i) => {
      const x = 12 + i * 28;
      const blue = [20, 26, 34][i];
      const top = 52 - blue;
      return (
        <g key={i}>
          <rect x={x} y={top} width={18} height={blue} fill={COLORS.blue} />
          <rect x={x} y={top - 12} width={18} height={12} fill={COLORS.orange} />
          <rect x={x} y={top - 20} width={18} height={8} fill={COLORS.green} />
        </g>
      );
    })}
    <line x1="6" y1="52.5" x2="94" y2="52.5" stroke={COLORS.axis} vectorEffect="non-scaling-stroke" />
  </svg>
);

const RejectedChart = () => (
  <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={chartFrame} aria-hidden="true">
    {[0, 1, 2].map((i) => (
      <rect key={i} x={10 + i * 22} y={26} width={16} height={28} fill={COLORS.grey} />
    ))}
    <line x1="4" y1="4" x2="96" y2="56" stroke={COLORS.red} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
    <line x1="96" y1="4" x2="4" y2="56" stroke={COLORS.red} strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
  </svg>
);

/* ---------- stage contents (values match the run shown in the popovers) ---------- */

const DataExtractor = () => (
  <>
    <Section label="Input">
      <Bar color="#b4bab8" className="border border-l-[0.3em] border-[#e2e6e5] bg-[#fafbfb] px-[0.6em] py-[0.35em]">
        <p className="font-bold leading-snug">IEEE VIS papers 1990-2024 - Main dataset.csv</p>
        <p className="pipeline-mono mt-[0.2em] text-[#7c8785]">Year,Conference,PaperType,…</p>
      </Bar>
    </Section>
    <Section label="Actionable tables">
      <table className="mb-[0.5em] w-full border-collapse border-[0.15em] border-[#8fb0cc] text-left">
        <thead className="bg-[#bcd1e5] text-[#1f3d57]">
          <tr>
            {["year", "track", "papers"].map((heading) => (
              <th key={heading} className="border-b-[0.15em] border-[#8fb0cc] px-[0.4em] py-[0.15em] font-bold">
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-[#eaf2f8]">
          {[
            ["1990", "Vis", "53"],
            ["2007", "InfoVis", "104"],
            ["2024", "Vis", "124"],
          ].map((row) => (
            <tr key={row[0]} className="border-t border-[#c4d9e8] first:border-t-0">
              {row.map((cell, i) => (
                <td key={i} className="border-l border-[#c4d9e8] px-[0.4em] py-[0.1em] first:border-l-0">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {["3,877 source rows · 20 fields retained", "+ derived analysis tables"].map((note) => (
        <Bar
          key={note}
          color={COLORS.blue}
          className="mt-[0.3em] rounded-r-[3px] border border-l-[0.3em] border-[#c4d9e8] bg-[#eaf2f8] px-[0.6em] py-[0.15em]"
        >
          {note}
        </Bar>
      ))}
    </Section>
  </>
);

const PersonaExplorer = () => (
  <>
    <Section label="Personas">
      {[
        { name: "domain expert", focus: "depth, mechanism, exceptions", color: COLORS.blue, text: "#1f3d57", filled: true },
        { name: "curious reader", focus: "orientation, scale, comparison", color: COLORS.orange, text: "#8b5521", filled: false },
      ].map((persona) => (
        <Bar
          key={persona.name}
          color={persona.color}
          className="mb-[0.5em] flex gap-[0.6em] border border-l-[0.3em] border-[#e2e6e5] bg-[#fafbfb] px-[0.6em] py-[0.45em] last:mb-0"
        >
          <Dot filled={persona.filled} color={persona.color} />
          <span>
            <span className="block font-bold" style={{ color: persona.text }}>
              {persona.name}
            </span>
            <span className="text-[#8a9290]">{persona.focus}</span>
          </span>
        </Bar>
      ))}
    </Section>
    <Section label="Questions">
      <Italic color="#3f7a3a">guided — main narrative</Italic>
      <Bar color={COLORS.green} className="mb-[0.6em] space-y-[0.25em] pl-[0.6em]">
        <p className="flex gap-[0.5em]"><Dot filled color={COLORS.blue} />How did paper volume change?</p>
        <p className="flex gap-[0.5em]"><Dot filled={false} color={COLORS.orange} />Which tracks grew fastest?</p>
      </Bar>
      <div className="mb-[0.5em] border-t border-[#e2e6e5]" />
      <Italic color="#8a9290">open — reader explores</Italic>
      <Bar color={COLORS.axis} className="space-y-[0.25em] pl-[0.6em]">
        <p className="flex gap-[0.5em]"><Dot filled color={COLORS.blue} />Which topics co-occur?</p>
        <p className="flex gap-[0.5em]"><Dot filled={false} color={COLORS.orange} />Who collaborates most?</p>
      </Bar>
      <p className="mt-[0.4em] text-[#8a9290]">distinct questions per persona</p>
    </Section>
  </>
);

const Key = ({ children }: { children: ReactNode }) => <span className="text-[#4e79a7]">{children}</span>;
const Str = ({ children }: { children: ReactNode }) => <span className="text-[#4d8f45]">{children}</span>;

const VisualizationGenerator = () => (
  <>
    <Section label="Panel specifications">
      <Bar color={COLORS.blue} className="mb-[0.5em] overflow-hidden border border-l-[0.3em] border-[#e2e6e5] bg-[#fafbfb] px-[0.6em] py-[0.4em]">
        <pre className="pipeline-mono text-[#a8afad]">
          {"{"}<Key>"mark"</Key>:<Str>"bar"</Str>,{"\n"}
          {"  "}<Key>"x"</Key>: {"{"}<Key>"field"</Key>:<Str>"year"</Str>{"}"},{"\n"}
          {"  "}<Key>"y"</Key>: {"{"}<Key>"aggregate"</Key>:<Str>"count"</Str>{"}"},{"\n"}
          {"  "}<Key>"transform"</Key>: [{"{"}<Key>"filter"</Key>:…{"}"}],{"\n"}
          {"  "}<Key>"summary"</Key>:<Str>"3× since 1990"</Str>{"}"}
        </pre>
      </Bar>
      <p className="rounded-[3px] border border-[#e2e6e5] bg-[#f4f5f5] px-[0.6em] py-[0.1em]">all panels + framing, one call</p>
    </Section>
    <Section label="Framed panels">
      <div className="mb-[0.6em] grid grid-cols-3 gap-[0.5em]">
        <BarChart />
        <LineChart />
        <StackedChart />
      </div>
      <div className="mb-[0.4em] grid grid-cols-[1fr_auto_1fr_1fr] items-center gap-[0.5em]">
        <RejectedChart />
        <svg viewBox="0 0 24 10" className="h-[0.8em] w-[1.8em]" aria-hidden="true">
          <line x1="0" y1="5" x2="15" y2="5" stroke="#5f6866" strokeWidth="1.6" strokeDasharray="3 2" />
          <path d="M15 1 L23 5 L15 9 Z" fill="#5f6866" />
        </svg>
        <BarChart />
      </div>
      <p className="text-[#c23b3d]">rejected: encoded fields C and J do not exist</p>
      <p>redrawn from the stated reason</p>
    </Section>
  </>
);

const ReportDesigner = () => (
  <>
    <Section label="Narrative layout">
      <Italic color="#3f7a3a">guided opening</Italic>
      <Bar color={COLORS.blue} className="mb-[0.35em] rounded-r-[3px] border border-l-[0.3em] border-[#c4d9e8] bg-[#f1f6fa] px-[0.6em] py-[0.15em]">
        panel 1 · volume over time
      </Bar>
      <Bar color={COLORS.orange} className="mb-[0.4em] rounded-r-[3px] border border-l-[0.3em] border-[#efcfa8] bg-[#fdf5ec] px-[0.6em] py-[0.15em]">
        panel 2 · growth by track
      </Bar>
      <Italic color="#8a9290">open exploration</Italic>
      <div className="grid grid-cols-2 gap-[0.4em]">
        <Bar color={COLORS.red} className="rounded-r-[3px] border border-l-[0.3em] border-[#f2c6c6] bg-[#fdf2f2] px-[0.6em] py-[0.15em] text-[#5f6866]">
          panel 3
        </Bar>
        <Bar color={COLORS.teal} className="rounded-r-[3px] border border-l-[0.3em] border-[#c2e2df] bg-[#f0f8f7] px-[0.6em] py-[0.15em] text-[#5f6866]">
          panel 4
        </Bar>
      </div>
    </Section>
    <Section label="Report">
      <div className="border-[0.15em] border-[#a8afad] bg-white">
        <div className="flex gap-[0.3em] border-b-[0.15em] border-[#a8afad] bg-[#eceeed] px-[0.5em] py-[0.3em]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-[0.45em] w-[0.45em] rounded-full bg-[#a8afad]" />
          ))}
        </div>
        <div className="px-[0.6em] pb-[0.6em] pt-[0.4em]">
          <p className="font-bold">IEEE VIS, 1990–2024</p>
          <p className="mb-[0.5em] mt-[0.2em] inline-block border border-[#a8afad] px-[0.4em] pr-[2em]">Track ▾</p>
          <div className="grid grid-cols-2 gap-[0.5em]">
            <BarChart />
            <div className="relative">
              <svg viewBox="0 0 100 60" preserveAspectRatio="none" className={chartFrame} aria-hidden="true">
                <polyline points="6,48 24,34 44,40 64,16 92,6" fill="none" stroke={COLORS.blue} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <polyline points="6,52 30,46 50,42 70,32 92,24" fill="none" stroke={COLORS.green} strokeWidth="2" vectorEffect="non-scaling-stroke" />
                <line x1="4" y1="54.5" x2="96" y2="54.5" stroke={COLORS.axis} vectorEffect="non-scaling-stroke" />
              </svg>
              <span className="absolute right-[0.4em] top-[0.15em] rounded-[3px] bg-[#3a3a3a] px-[0.35em] text-[0.8em] text-white">
                2004 · 174
              </span>
            </div>
          </div>
          <div className="mt-[0.6em] h-[0.4em] w-full bg-[#eceeed]" />
          <div className="mt-[0.35em] h-[0.4em] w-2/3 bg-[#eceeed]" />
        </div>
      </div>
    </Section>
  </>
);

const STAGES: {
  id: StageId;
  title: string;
  summary: string;
  checks: [string, string];
  Content: () => ReactNode;
}[] = [
  {
    id: "A",
    title: "Data Extractor",
    summary: "converts input datasets into a set of actionable tables",
    checks: ["Preserves source data", "Verifies analysis coverage"],
    Content: DataExtractor,
  },
  {
    id: "B",
    title: "Persona Explorer",
    summary: "designs questions to facilitate exploration based on two personas",
    checks: ["Ensures question coverage", "Validates data grounding"],
    Content: PersonaExplorer,
  },
  {
    id: "C",
    title: "Visualization Generator",
    summary: "creates and frames a set of panels to address the designed questions",
    checks: ["Rejects invalid charts", "Repairs visual problems"],
    Content: VisualizationGenerator,
  },
  {
    id: "D",
    title: "Report Designer",
    summary: "lays the panels out into a narrative structure",
    checks: ["Tests rendered output", "Verifies interactions"],
    Content: ReportDesigner,
  },
];

/* ---------- popovers: hover (with a short delay), focus, click/tap to pin; Escape or outside click closes ---------- */

const OPEN_DELAY = 180;
const CLOSE_DELAY = 180;

type Popover = { key: TargetKey | null; pinned: boolean };

type Controller = {
  state: Popover;
  figure: RefObject<HTMLDivElement | null>;
  hoverIn: (key: TargetKey) => void;
  hoverOut: () => void;
  open: (key: TargetKey, pinned: boolean) => void;
  close: () => void;
};

const usePopover = (): Controller => {
  const [state, setState] = useState<Popover>({ key: null, pinned: false });
  const figure = useRef<HTMLDivElement>(null);
  const timers = useRef<{ open?: number; close?: number }>({});

  const clearTimers = () => {
    window.clearTimeout(timers.current.open);
    window.clearTimeout(timers.current.close);
  };
  const open = useCallback((key: TargetKey, pinned: boolean) => {
    clearTimers();
    setState({ key, pinned });
  }, []);
  const close = useCallback(() => {
    clearTimers();
    setState({ key: null, pinned: false });
  }, []);
  const hoverIn = useCallback((key: TargetKey) => {
    clearTimers();
    timers.current.open = window.setTimeout(
      () => setState((current) => (current.pinned ? current : { key, pinned: false })),
      OPEN_DELAY,
    );
  }, []);
  const hoverOut = useCallback(() => {
    clearTimers();
    timers.current.close = window.setTimeout(
      () => setState((current) => (current.pinned ? current : { key: null, pinned: false })),
      CLOSE_DELAY,
    );
  }, []);

  useEffect(() => {
    if (!state.key) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const target = figure.current?.querySelector<HTMLElement>(`[data-pipeline-target="${state.key}"]`);
      const focusInside = target?.contains(document.activeElement);
      close();
      if (focusInside) target?.focus();
    };
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!(event.target as Element).closest?.("[data-pipeline-target]")) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [state.key, close]);

  useEffect(() => clearTimers, []);

  return { state, figure, hoverIn, hoverOut, open, close };
};

/** Places the popover inside the figure: about 560 px wide, below the target's header or above the target. */
const PopoverBox = ({
  targetKey,
  anchor,
  controller,
}: {
  targetKey: TargetKey;
  anchor: RefObject<HTMLElement | null>;
  controller: Controller;
}) => {
  const headingId = useId();
  const [style, setStyle] = useState<CSSProperties>({ visibility: "hidden" });

  useLayoutEffect(() => {
    const place = () => {
      const figure = controller.figure.current;
      const target = anchor.current;
      if (!figure || !target) return;
      const f = figure.getBoundingClientRect();
      const t = target.getBoundingClientRect();
      const width = Math.min(560, f.width - 16);
      let left = t.left - f.left;
      if (left + width > f.width - 8) left = t.right - f.left - width;
      left = Math.max(8, Math.min(left, f.width - width - 8));

      const isStage = !targetKey.startsWith("validator-");
      const header = isStage ? (target.firstElementChild?.getBoundingClientRect().height ?? 0) : 0;
      const viewportCap = Math.min(620, window.innerHeight * 0.72);
      const below = f.bottom - (t.top + header) - 8;
      const above = t.top - f.top - 14;
      const next: CSSProperties = { left: left - (t.left - f.left), width };
      if (isStage && (below >= 320 || below >= above)) {
        next.top = header;
        next.maxHeight = Math.min(viewportCap, below);
      } else {
        next.bottom = t.height + 6;
        next.maxHeight = Math.min(viewportCap, above);
      }
      setStyle(next);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [anchor, controller.figure, targetKey]);

  // Clicks and keys inside the popover belong to its own controls, not to the target underneath.
  const stop = (event: MouseEvent | KeyboardEvent) => {
    if (!("key" in event) || event.key !== "Escape") event.stopPropagation();
  };

  return (
    <div
      role="dialog"
      aria-labelledby={headingId}
      onClick={stop}
      onKeyDown={stop}
      style={style}
      className="absolute z-30 cursor-auto overflow-auto rounded-lg border border-[#a8afad] bg-white p-4 text-left text-[0.875rem] leading-normal shadow-2xl"
    >
      <OutputPanel
        target={targetKey}
        pinned={controller.state.pinned}
        headingId={headingId}
        onTogglePin={() => controller.open(targetKey, !controller.state.pinned)}
        onClose={controller.close}
      />
    </div>
  );
};

/** Wires one hover target (a stage card or a validator check) to the shared popover. */
const useTarget = (key: TargetKey, controller: Controller) => {
  const ref = useRef<HTMLElement>(null);
  const active = controller.state.key === key;

  const handlers = {
    "data-pipeline-target": key,
    tabIndex: 0,
    onPointerEnter: (event: PointerEvent) => {
      if (event.pointerType !== "touch") controller.hoverIn(key);
    },
    onPointerLeave: (event: PointerEvent) => {
      if (event.pointerType !== "touch") controller.hoverOut();
    },
    // A click or tap pins the output open; another click on the same target closes it.
    onClick: () => {
      if (active && controller.state.pinned) controller.close();
      else controller.open(key, true);
    },
    // Keyboard focus shows the output; focus from a click is handled by onClick.
    onFocus: (event: FocusEvent<HTMLElement>) => {
      if (event.target === event.currentTarget && event.currentTarget.matches(":focus-visible")) {
        controller.open(key, false);
      }
    },
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (active && !controller.state.pinned && !event.currentTarget.contains(event.relatedTarget as Node)) {
        controller.close();
      }
    },
    onKeyDown: (event: KeyboardEvent) => {
      if (event.target !== event.currentTarget) return;
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        controller.open(key, !(active && controller.state.pinned));
      }
    },
  };

  const popover = active ? <PopoverBox targetKey={key} anchor={ref} controller={controller} /> : null;
  return { ref, active, handlers, popover };
};

/* ---------- stage cards and validator checks ---------- */

const StageHeader = ({ id, title, titleId }: { id: StageId; title: string; titleId: string }) => (
  <div className="flex items-center justify-between gap-[0.5em] rounded-t-[5px] bg-[#5f6866] px-[0.75em] py-[0.45em] text-white">
    <h3 id={titleId} className="text-[1.2em] font-bold leading-tight">
      {title}
    </h3>
    <span
      aria-hidden="true"
      className="flex h-[1.7em] w-[1.7em] shrink-0 items-center justify-center rounded-full bg-white font-bold text-[#5f6866]"
    >
      {id}
    </span>
  </div>
);

const Stage = ({ stage, controller }: { stage: (typeof STAGES)[number]; controller: Controller }) => {
  const titleId = useId();
  const { ref, active, handlers, popover } = useTarget(stage.id, controller);

  return (
    <article
      ref={ref}
      aria-labelledby={titleId}
      {...handlers}
      className={`pipeline-stage cursor-pointer rounded-[6px] border-[0.15em] bg-[#f4f5f5] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] focus-visible:ring-offset-2 ${
        active ? "border-[#5f6866]" : "border-[#b4bab8]"
      } ${popover ? "z-20" : ""}`}
    >
      <StageHeader id={stage.id} title={stage.title} titleId={titleId} />
      <p className="mx-[0.75em] my-[0.6em] italic leading-snug text-[#6e7674]">{stage.summary}</p>
      <stage.Content />
      {popover}
    </article>
  );
};

const ValidatorCheck = ({ stage, controller }: { stage: (typeof STAGES)[number]; controller: Controller }) => {
  const { ref, active, handlers, popover } = useTarget(`validator-${stage.id}`, controller);
  return (
    <div
      ref={ref as RefObject<HTMLDivElement>}
      aria-label={`Validator, stage ${stage.id} · ${stage.title}: ${stage.checks.join(", ")}`}
      {...handlers}
      className={`pipeline-check relative cursor-pointer rounded-[4px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CC0000] ${
        active ? "bg-white" : "hover:bg-white/70"
      } ${popover ? "z-20" : ""}`}
    >
      <p className="mb-[0.15em] text-[0.82em] tracking-[0.04em] text-[#8a9290]">
        Stage {stage.id} · {stage.title}
      </p>
      <ul>
        {stage.checks.map((check) => (
          <li key={check} className="flex gap-[0.45em]">
            <span aria-hidden="true" className="text-[0.6em] leading-[2.2] text-[#5f6866]">▸</span>
            {check}
          </li>
        ))}
      </ul>
      {popover}
    </div>
  );
};

const Arrow = () => (
  <div className="pipeline-arrow" aria-hidden="true">
    <svg viewBox="0 0 24 16" className="h-[1em] w-[1.6em]">
      <line x1="0" y1="8" x2="13" y2="8" stroke="#3a3a3a" strokeWidth="2" />
      <path d="M12 2 L23 8 L12 14 Z" fill="#3a3a3a" />
    </svg>
  </div>
);

const GenerateValidateRepairFigure = () => {
  const controller = usePopover();

  return (
    <div ref={controller.figure} className="pipeline-figure relative">
      <p className="mb-3 font-sans text-xs text-gray-500">
        Hover over a stage or a validator check to see its actual output from one run (IEEE VIS publications,
        1990–2024). Click or tap to pin it open.
      </p>
      <div className="pipeline-grid">
        {STAGES.map((stage, index) => (
          <div key={stage.id} className="contents">
            {index > 0 && <Arrow />}
            <Stage stage={stage} controller={controller} />
          </div>
        ))}

        {STAGES.map((stage, index) => (
          <div
            key={stage.id}
            aria-hidden="true"
            className="pipeline-connector mx-auto w-0 border-l-2 border-dashed border-[#8a9290]"
            style={{ "--pipeline-col": index * 2 + 1 } as CSSProperties}
          />
        ))}

        <section
          aria-label="Validator, runs at every stage"
          className="pipeline-validator rounded-[6px] border-[0.15em] border-[#8f9aa0] bg-[#f4f5f5] px-[0.9em] pb-[0.6em] pt-[0.5em]"
        >
          <p className="mb-[0.4em] border-b border-[#d2d7d5] pb-[0.3em]">
            <span className="mr-[0.8em] text-[1.1em] font-bold text-[#36474f]">Validator</span>
            <span className="italic text-[#6e7674]">runs at every stage</span>
          </p>
          <div className="pipeline-checks">
            {STAGES.map((stage) => (
              <ValidatorCheck key={stage.id} stage={stage} controller={controller} />
            ))}
          </div>
        </section>

        <p className="pipeline-note text-center text-[#6e7674]">
          a failure at any stage returns to the model as a repair instruction, and every stage keeps a valid result to
          fall back to
        </p>
      </div>
    </div>
  );
};

export default GenerateValidateRepairFigure;
