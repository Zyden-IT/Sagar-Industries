// ─────────────────────────────────────────────────────────────────────
// Industries › Where Our Machines Are Used — central "vine" of circular
// industry photos in a zig-zag, linked by curved orange connectors with dots.
// Content (number · icon · title · description · application chips · machine)
// branches out to the left for odd steps and to the right for even steps.
// XL+ : the fixed-geometry connected layout (SVG curve + photo circles).
// < XL: a responsive 2-up / 1-up grid of the same content with a circle photo.
// (Pages Router — components are client by default.)
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Newspaper,
  Package,
  Printer,
  Stack,
  Scissors,
  BookOpen,
  ArrowRight,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const MAP = [
  {
    icon: Newspaper,
    img: "/machine-use-1.png",
    industry: "Paper Mills & Traders",
    desc: "Convert jumbo reels into accurately cut reams and sheets at high volume, with clean edges and consistent counts.",
    apps: ["Reel-to-sheet cutting", "Ream cutting", "Bulk sheeting"],
    machine: "Paper Roll To Sheet Cutting Machine",
  },
  {
    icon: Package,
    img: "/machine-use-2.png",
    industry: "Packaging",
    desc: "Produce clean, consistent carton blanks, box liners and wrapping sheets — ready for the next stage of the line.",
    apps: ["Carton blanks", "Box liners", "Wrapping sheets"],
    machine: "Automatic Cutting Machine",
  },
  {
    icon: Printer,
    img: "/machine-use-3.png",
    industry: "Printing Presses",
    desc: "Feed presses with perfectly sized sheets and run crisp single- to multi-colour flexo jobs with accurate registration.",
    apps: ["Pre-print sheeting", "Label stock", "Multi-colour printing"],
    machine: "Flexo Printing Machine",
  },
  {
    icon: Stack,
    img: "/machine-use-4.png",
    industry: "Corrugated Board",
    desc: "Cut heavy liners, boards and flutes with shear slitting and rugged, high-power machines made for industrial loads.",
    apps: ["Liner sheeting", "Board cutting", "Flute prep"],
    machine: "Heavy Duty Cutting Machine",
  },
  {
    icon: Scissors,
    img: "/Machine-use5.png",
    industry: "Converters",
    desc: "Maximize output across slitting, sheeting and lamination prep with high-speed, repeatable accuracy.",
    apps: ["Slitting", "Sheeting", "Lamination prep"],
    machine: "High Speed Cutting Machine",
  },
  {
    icon: BookOpen,
    img: "/machine-use-6.png",
    industry: "Notebook & Stationery",
    desc: "Sheet, rule, prep and cut cover stock precisely for notebooks, pads and stationery — neat, square and ready to bind.",
    apps: ["Sheet cutting", "Ruling prep", "Cover stock"],
    machine: "Manual / Semi-Automatic Machine",
  },
];

const pad = (n) => String(n).padStart(2, "0");

// ── Fixed geometry for the XL connected layout ──────────────────────────
const BLOCK_W = 1120;
const R = 75; // circle radius (D = 150)
const ROW = 200; // vertical centre-to-centre spacing
const LEFT_CX = 480; // left lane centre x
const RIGHT_CX = 640; // right lane centre x
const TOP = 100; // first node centre y
const NODES = MAP.map((m, i) => ({
  ...m,
  i,
  cx: i % 2 === 0 ? LEFT_CX : RIGHT_CX,
  cy: TOP + ROW * i,
}));
const BLOCK_H = NODES[NODES.length - 1].cy + R + 25;

// One S-curve per gap, drawn edge-to-edge: from the bottom of the upper circle
// (cx, cy + R) to the top of the lower circle (cx, cy − R). Vertical tangents
// keep the clean entry/exit AND make the endpoints land exactly on the dots.
const PATH = NODES.slice(0, -1)
  .map((node, i) => {
    const next = NODES[i + 1];
    const y0 = node.cy + R; // bottom edge of upper circle
    const y1 = next.cy - R; // top edge of lower circle
    const midY = (y0 + y1) / 2;
    return `M ${node.cx} ${y0} C ${node.cx} ${midY} ${next.cx} ${midY} ${next.cx} ${y1}`;
  })
  .join(" ");

// Connector dots: where the curve meets each circle (bottom of upper, top of lower).
const DOTS = NODES.slice(0, -1).flatMap((node, i) => [
  { x: node.cx, y: node.cy + R },
  { x: NODES[i + 1].cx, y: NODES[i + 1].cy - R },
]);

// ── Text content — shared by the connected layout and the responsive grid ──
const Content = ({ m, n }) => {
  const Icon = m.icon;
  return (
    <div className="flex gap-4">
      <span className="stats-font text-[34px] font-extrabold leading-none text-accent">{pad(n)}</span>
      <div className="flex-1">
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border bg-card text-accent">
            <Icon size={18} weight="regular" />
          </span>
          <h3 className="text-[18px]! font-bold! uppercase leading-tight tracking-[0.02em]">{m.industry}</h3>
        </div>
        <p className="mt-2.5 text-[16px]! leading-relaxed text-text-secondary">{m.desc}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {m.apps.map((a) => (
            <li key={a} className="rounded-full border border-border bg-soft px-2.5 py-1 text-[11px]! font-medium text-text-secondary">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Circular industry photo with brand ring.
const Circle = ({ m, size = 150 }) => (
  <div
    className="relative shrink-0 overflow-hidden rounded-full ring-[6px] ring-[var(--color-bg)] shadow-card"
    style={{ width: size, height: size }}
  >
    <Image src={m.img} alt={m.industry} fill sizes="200px" className="object-cover" />
    <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-accent/30" />
  </div>
);

const IndustryApplications = () => {
  return (
    <section className="section-py overflow-hidden bg-bg">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Applications</span>
          <h2 className="">
            Where Our <span className="text-accent">Machines</span> Are Used
          </h2>
          <p className="mt-1 text-text-secondary xl:whitespace-nowrap">
            Find your industry, its key applications and the recommended cutting
            or printing machine.
          </p>
        </div>

        {/* ── XL+ : connected zig-zag vine ─────────────────────────────── */}
        <div
          className="relative mx-auto mt-12 hidden xl:block"
          style={{ width: BLOCK_W, height: BLOCK_H }}
        >
          {/* connector curve (behind the circles) — draws itself on scroll */}
          <svg
            className="absolute inset-0 z-0"
            width={BLOCK_W}
            height={BLOCK_H}
            viewBox={`0 0 ${BLOCK_W} ${BLOCK_H}`}
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="vine-stroke" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-primary)" />
                <stop offset="100%" stopColor="var(--color-secondary)" />
              </linearGradient>
            </defs>
            <motion.path
              d={PATH}
              stroke="url(#vine-stroke)"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </svg>

          {/* photo circles — spring-pop in, lift on hover */}
          {NODES.map((node) => (
            <motion.div
              key={node.industry}
              className="absolute z-10"
              style={{ left: node.cx - R, top: node.cy - R }}
              initial={{ scale: 0.4, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ type: "spring", stiffness: 240, damping: 18, delay: node.i * 0.1 }}
              whileHover={{ scale: 1.06 }}
            >
              <Circle m={node} />
            </motion.div>
          ))}

          {/* connector dots (above circles) — fade in after the curve, then pulse */}
          {DOTS.map((dot, i) => (
            <motion.span
              key={i}
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={{ left: dot.x, top: dot.y }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ type: "spring", stiffness: 320, damping: 16, delay: 0.4 + i * 0.05 }}
            >
              <span className="relative grid h-[6px] w-[6px] place-items-center">
                <span className="absolute inset-0 rounded-full bg-accent/40 animate-ping" />
                <span className="relative h-[6px] w-[6px] rounded-full bg-accent ring-2 ring-[var(--color-bg)]" />
              </span>
            </motion.span>
          ))}

          {/* text blocks — slide in from their side (left for odd, right for even) */}
          {NODES.map((node) => {
            const onLeft = node.i % 2 === 0;
            return (
              <div
                key={`t-${node.industry}`}
                className="absolute z-10"
                style={{ left: onLeft ? 0 : 740, width: 380, top: node.cy, transform: "translateY(-50%)" }}
              >
                <motion.div
                  initial={{ opacity: 0, x: onLeft ? -48 : 48 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 + node.i * 0.08 }}
                >
                  <Content m={node} n={node.i + 1} />
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* ── < XL : responsive fallback ───────────────────────────────────
            One clean, centred column for phones, tablets AND laptops — the
            circle sits beside the text (stacked on the smallest phones) with
            full width per card, so nothing gets squeezed. The connected
            zig-zag vine takes over at xl. No cramped 2-up laptop stage.   */}
        <div className="relative mx-auto mt-10 grid max-w-3xl gap-y-10 sm:gap-y-12 xl:hidden">
          {/* Vertical connector spine — the < xl echo of the desktop vine. It
              runs down the centre of the circle lane (circle = 104px → centre
              at 52px) and is hidden behind each opaque photo circle, so it
              reads as a line linking one circle to the next. Hidden on the
              smallest phones, where the circle stacks above the text (no lane). */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 left-[52px] top-[52px] z-0 hidden w-[2.5px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-secondary to-transparent sm:block"
          />
          {MAP.map((m, i) => (
            <motion.div
              key={m.industry}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-start gap-4 sm:flex-row"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="shrink-0"
              >
                <Circle m={m} size={104} />
              </motion.div>
              <div className="w-full flex-1">
                <Content m={m} n={i + 1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryApplications;
