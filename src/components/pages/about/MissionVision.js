// ─────────────────────────────────────────────────────────────────────
// About › Mission, Vision, Values & Promise — radial "what drives us".
// Desktop (lg+): a central machine with concentric rings, four corner items
// joined by curved orange connectors, and a "One Promise" pill at the base.
// Below lg: a stacked machine + 2-col card grid + the pill.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Eye, Diamond, Handshake, ShieldCheck } from "@phosphor-icons/react";

const ITEMS = [
  {
    icon: Target,
    label: "Mission",
    desc: "To deliver innovative and reliable machines that empower our customers to grow.",
    side: "left",
    pos: "left-0 top-[60px]",
  },
  {
    icon: Eye,
    label: "Vision",
    desc: "To be a global leader in machine manufacturing with a commitment to excellence.",
    side: "right",
    pos: "right-0 top-[60px]",
  },
  {
    icon: Diamond,
    label: "Values",
    desc: "Integrity, innovation, quality and customer satisfaction drive everything we do.",
    side: "left",
    pos: "left-0 bottom-[110px]",
  },
  {
    icon: Handshake,
    label: "Promise",
    desc: "Trusted machines. Stronger partnerships. Sustainable growth.",
    side: "right",
    pos: "right-0 bottom-[110px]",
  },
];

// [path, dotX, dotY] — curved connectors from the centre to each corner item.
const LINKS = [
  ["M 545 275 C 450 215, 370 155, 300 145", 300, 145],
  ["M 555 275 C 650 215, 730 155, 800 145", 800, 145],
  ["M 545 345 C 450 405, 370 460, 300 470", 300, 470],
  ["M 555 345 C 650 405, 730 460, 800 470", 800, 470],
];

const ItemRow = ({ item }) => {
  const left = item.side === "left";
  return (
    <div className={`flex items-start gap-4 ${left ? "" : "flex-row-reverse text-right"}`}>
      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-border bg-card text-accent shadow-card">
        <item.icon size={30} weight="regular" />
      </span>
      <div>
        <h3 className="text-[18px]! font-bold! uppercase tracking-wide">
          Our <span className="text-accent">{item.label}</span>
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-text-secondary">{item.desc}</p>
      </div>
    </div>
  );
};

// Compact, centred card used in the mobile/tablet "2 top · machine · 2 bottom"
// layout — icon on top so two fit comfortably side by side on small screens.
const ItemCard = ({ item, i }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
    className="flex h-full flex-col items-center rounded-[var(--radius-card)] border border-border bg-card p-4 text-center shadow-card"
  >
    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-border bg-soft text-accent shadow-card">
      <item.icon size={24} weight="regular" />
    </span>
    <h3 className="mt-2.5 text-[14px]! font-bold! uppercase tracking-wide">
      Our <span className="text-accent">{item.label}</span>
    </h3>
    <p className="mt-1 text-[12px] leading-relaxed text-text-secondary">{item.desc}</p>
  </motion.div>
);

// One pair of converging spokes for a gap between a card row and the machine.
// Lives in a fixed-height row so the geometry is deterministic and the dots sit
// exactly on the card edge. `from` = which edge the dots touch.
const Connectors = ({ from }) => {
  const cardY = from === "top" ? 0 : 100; // edge that touches the cards
  const hubY = from === "top" ? 100 : 0; // edge that meets the machine
  return (
    <div className="relative h-11 sm:h-12">
      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="25" y1={cardY} x2="50" y2={hubY} stroke="#ff6a0d" strokeWidth="2" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
        <line x1="75" y1={cardY} x2="50" y2={hubY} stroke="#ff6a0d" strokeWidth="2" strokeOpacity="0.55" vectorEffect="non-scaling-stroke" />
      </svg>
      {[25, 75].map((x) => (
        <span
          key={x}
          aria-hidden="true"
          className={`absolute h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-accent shadow-card ${from === "top" ? "top-0 -translate-y-1/2" : "bottom-0 translate-y-1/2"}`}
          style={{ left: `${x}%` }}
        />
      ))}
    </div>
  );
};

const Pill = () => (
  <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 shadow-card">
    <ShieldCheck size={18} weight="fill" className="text-accent" />
    <span className="text-sm font-bold uppercase tracking-wide text-text-primary">One Promise.</span>
    <span className="text-sm font-bold uppercase tracking-wide text-accent">Total Reliability.</span>
  </span>
);

const Machine = ({ className }) => (
  <div className={`relative ${className}`}>
    <Image src="/hero15.png" alt="Sagar Industries machine" fill sizes="440px" className="object-contain" />
  </div>
);

const MissionVision = () => {
  return (
    <section className="relative overflow-hidden bg-soft section-py">
      {/* blueprint grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">What Drives Us</span>
          <h2 className="">
            Our <span className="text-accent">Driving Force</span>
          </h2>
        </div>

        {/* ── Desktop radial ─────────────────────────────────────────── */}
        <div className="relative mx-auto mt-12 hidden h-[620px] max-w-[1100px] lg:block">
          {/* concentric rings */}
          {[540, 410, 290].map((s, i) => (
            <span
              key={s}
              aria-hidden="true"
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${i === 1 ? "border border-dashed border-accent/25" : "border border-border/60"}`}
              style={{ height: s, width: s }}
            />
          ))}

          {/* curved connectors */}
          <svg
            className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
            viewBox="0 0 1100 620"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {LINKS.map(([d, x, y], i) => (
              <g key={i}>
                <path d={d} fill="none" stroke="#ff6a0d" strokeWidth="2.5" vectorEffect="non-scaling-stroke" />
                <circle cx={x} cy={y} r="5" fill="#ff6a0d" />
              </g>
            ))}
            {/* dashed links to the bottom pill */}
            <path d="M 300 500 L 480 585" fill="none" stroke="#C0C5CE" strokeWidth="1.5" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
            <path d="M 800 500 L 620 585" fill="none" stroke="#C0C5CE" strokeWidth="1.5" strokeDasharray="3 6" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* centre machine */}
          <Machine className="absolute left-1/2 top-1/2 z-10 h-[340px] w-[440px] -translate-x-1/2 -translate-y-1/2" />

          {/* four items */}
          {ITEMS.map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className={`absolute z-20 w-[270px] ${item.pos}`}
            >
              <ItemRow item={item} />
            </motion.div>
          ))}

          {/* bottom pill */}
          <div className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2">
            <Pill />
          </div>
        </div>

        {/* ── Mobile / tablet — 2 cards top · machine · 2 cards bottom ── */}
        <div className="mx-auto mt-10 max-w-[560px] lg:hidden">
          {/* top two */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ITEMS.slice(0, 2).map((item, i) => (
              <ItemCard key={item.label} item={item} i={i} />
            ))}
          </div>

          {/* connectors: top cards → machine */}
          <Connectors from="top" />

          {/* centre machine with concentric rings */}
          <div className="relative flex h-[170px] items-center justify-center sm:h-[200px]">
            {[240, 180].map((s, i) => (
              <span
                key={s}
                aria-hidden="true"
                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${i === 0 ? "border border-dashed border-accent/25" : "border border-border/60"}`}
                style={{ height: s, width: s }}
              />
            ))}
            <Machine className="relative h-[200px] w-[300px] sm:h-[200px] sm:w-[300px]" />
          </div>

          {/* connectors: machine → bottom cards */}
          <Connectors from="bottom" />

          {/* bottom two */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {ITEMS.slice(2, 4).map((item, i) => (
              <ItemCard key={item.label} item={item} i={i + 2} />
            ))}
          </div>

          {/* pill */}
          <div className="mt-8 flex justify-center">
            <Pill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
