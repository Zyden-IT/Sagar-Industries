// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Technology Showcase — radial hub intro.
// A central machine photo (with a slowly rotating dashed ring) surrounded by
// six capability cards joined by accent connector lines, plus a benefits bar.
// Desktop (lg+): absolute radial layout. Below lg: stacked image + card grid.
// Animations: ring spin (infinite), staggered card reveal, scale-in hub,
// hover lift. Photos live in /public.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ChartBar,
  Cube,
  MagnifyingGlass,
  Robot,
  ChartLineUp,
  Truck,
  Crosshair,
  ShieldCheck,
  ClockClockwise,
  Medal,
} from "@phosphor-icons/react";

// Six capabilities. `pos` drives the desktop absolute placement + connector.
const FEATURES = [
  {
    icon: ChartBar,
    title: "Production Planning",
    desc: "Real-time planning and scheduling for maximum efficiency.",
    img: "/gallery11.jpg",
    pos: "top",
  },
  {
    icon: Cube,
    title: "CAD Design",
    desc: "Precision engineering with advanced 3D modelling and simulation.",
    img: "/gallery7.jpg",
    pos: "left-top",
  },
  {
    icon: MagnifyingGlass,
    title: "Quality Inspection",
    desc: "Advanced inspection systems ensure every component meets strict standards.",
    img: "/gallery4.jpg",
    pos: "right-top",
  },
  {
    icon: Robot,
    title: "Automation",
    desc: "Smart automation for consistent performance and reduced manual intervention.",
    img: "/gallery8.jpg",
    pos: "left-bottom",
  },
  {
    icon: Truck,
    title: "Dispatch Tracking",
    desc: "Real-time tracking for on-time delivery and complete transparency.",
    img: "/gallery6.jpg",
    pos: "right-bottom",
  },
  {
    icon: ChartLineUp,
    title: "Performance Analytics",
    desc: "Data-driven insights to monitor performance and drive continuous improvement.",
    img: "/gallery9.jpg",
    pos: "bottom",
  },
];

const BENEFITS = [
  { icon: Crosshair, title: "Smarter Tools", sub: "Integrated for better outcomes" },
  { icon: ShieldCheck, title: "Better Accuracy", sub: "Precision in every step" },
  { icon: ClockClockwise, title: "Higher Efficiency", sub: "Optimized processes save time & cost" },
  { icon: Medal, title: "Reliable Results", sub: "Consistent quality you can trust" },
];

// Absolute placement for each card on the desktop radial layout.
const POS = {
  top: "left-1/2 top-0 -translate-x-1/2",
  "left-top": "left-0 top-[120px]",
  "right-top": "right-0 top-[120px]",
  "left-bottom": "left-0 bottom-[120px]",
  "right-bottom": "right-0 bottom-[120px]",
  bottom: "left-1/2 bottom-0 -translate-x-1/2",
};

const FeatureCard = ({ feature, index, absolute }) => {
  const Icon = feature.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={`group rounded-[var(--radius-card)] border border-border bg-card p-4 shadow-card transition-colors duration-300 hover:border-accent hover:shadow-orange ${
        absolute ? `absolute z-20 w-[230px] ${POS[feature.pos]}` : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition-transform duration-300 group-hover:scale-110">
          <Icon size={20} weight="bold" />
        </span>
        <div className="flex-1">
          <h3 className="text-[13px]! font-bold! leading-tight">{feature.title}</h3>
          <p className="mt-1 line-clamp-3 text-[12px]! leading-snug text-text-secondary">{feature.desc}</p>
        </div>
      </div>
      <div className="relative mt-3 h-[72px] w-full overflow-hidden rounded-lg">
        <Image
          src={feature.img}
          alt={feature.title}
          fill
          sizes="230px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
    </motion.div>
  );
};

// Central machine photo with a slowly rotating dashed ring.
const Hub = ({ size }) => (
  <div className={`relative ${size}`}>
    <motion.span
      aria-hidden="true"
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-22px] rounded-full border-2 border-dashed border-accent/35"
    />
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-white shadow-[0_0_0_1px_rgba(255,107,26,0.4),0_25px_50px_rgba(0,0,0,0.18)]"
    >
      <Image
        src="/company-intro.png"
        alt="Sagar Industries machine"
        fill
        sizes="380px"
        className="object-cover"
      />
    </motion.div>
  </div>
);

const TechnologyShowcase = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            Smart Tools
          </span>
          <h2 className="text-[22px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:whitespace-nowrap sm:text-[28px]! lg:text-[34px]!">
            Technology That Powers <span className="text-accent">Every Machine</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Advanced tools. Seamless integration. Smarter manufacturing.
          </p>
        </div>

        {/* ── Desktop: radial hub ────────────────────────────────────── */}
        <div className="relative mx-auto mt-12 hidden h-[780px] max-w-[1060px] lg:block">
          {/* connector lines from hub to each card */}
          <svg
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            viewBox="0 0 1060 780"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            {[
              [530, 390, 530, 200], // top
              [530, 390, 240, 215], // left-top
              [530, 390, 820, 215], // right-top
              [530, 390, 240, 560], // left-bottom
              [530, 390, 820, 560], // right-bottom
              [530, 390, 530, 590], // bottom
            ].map(([x1, y1, x2, y2], i) => (
              <g key={i}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#ff6a0d"
                  strokeOpacity="0.35"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
                <circle cx={x2} cy={y2} r="4" fill="#ff6a0d" />
              </g>
            ))}
          </svg>

          {/* hub */}
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <Hub size="h-[340px] w-[340px]" />
          </div>

          {/* cards */}
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} absolute />
          ))}
        </div>

        {/* ── Tablet / mobile: stacked ───────────────────────────────── */}
        <div className="mt-12 lg:hidden">
          <div className="mb-10 flex justify-center">
            <Hub size="h-[240px] w-[240px]" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <FeatureCard key={f.title} feature={f} index={i} />
            ))}
          </div>
        </div>

        {/* ── Benefits bar ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg shadow-card sm:grid-cols-2 lg:grid-cols-4"
        >
          {BENEFITS.map((b) => (
            <div
              key={b.title}
              className="group flex items-center gap-4 bg-card p-6 transition-colors duration-300 hover:bg-soft"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                <b.icon size={24} weight="regular" />
              </span>
              <div>
                <h3 className="text-[15px]! font-semibold! leading-tight">{b.title}</h3>
                <p className="mt-1 text-[12px]! leading-snug text-text-secondary">{b.sub}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnologyShowcase;
