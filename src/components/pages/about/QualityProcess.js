// ─────────────────────────────────────────────────────────────────────
// About › Quality Process — 6-stage QC flow as a hexagon zigzag timeline.
// Desktop (lg+): single row, odd stages (1/3/5) raised, even stages (2/4/6)
// dropped, joined by a dashed accent connector. Numbered icon badge + hexagon
// photo per stage. Below lg: a simple stacked card grid (no zigzag).
// Photos live in /public (gallery1–6.jpg) — swap for real process shots.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MagnifyingGlass,
  Gear,
  Wrench,
  Gauge,
  SealCheck,
  Truck,
} from "@phosphor-icons/react";

// Pointy-top hexagon mask for the photo tiles.
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

const STEPS = [
  {
    icon: MagnifyingGlass,
    title: "Raw Material Inspection",
    desc: "Incoming steel and components are checked for grade and quality.",
    img: "/gallery1.jpg",
  },
  {
    icon: Gear,
    title: "Precision Manufacturing",
    desc: "Parts are cut, machined and fabricated to exact tolerances.",
    img: "/gallery2.jpg",
  },
  {
    icon: Wrench,
    title: "Assembly & Calibration",
    desc: "Machines are assembled and calibrated for accurate operation.",
    img: "/gallery3.jpg",
  },
  {
    icon: Gauge,
    title: "Quality Testing",
    desc: "Performance, safety and output are tested under load.",
    img: "/gallery4.jpg",
  },
  {
    icon: SealCheck,
    title: "Final Inspection",
    desc: "A thorough final check against the agreed specifications.",
    img: "/gallery5.jpg",
  },
  {
    icon: Truck,
    title: "Packaging & Dispatch",
    desc: "Safe packing and on-time dispatch to your site.",
    img: "/gallery6.jpg",
  },
];

// Icon badge — light circle, accent ring, orange icon.
const Badge = ({ icon: Icon }) => (
  <span className="grid h-[72px] w-[72px] place-items-center rounded-full border border-theme bg-card text-accent shadow-card transition-transform duration-300 group-hover:scale-105">
    <Icon size={30} weight="regular" />
  </span>
);

// Hexagon photo tile.
const Hexagon = ({ src, alt }) => (
  <div className="relative aspect-[0.9] w-full overflow-hidden drop-shadow-[0_12px_24px_rgba(0,0,0,0.18)]">
    <div className="absolute inset-0" style={{ clipPath: HEX }}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 50vw, 200px"
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
  </div>
);

const QualityProcess = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
              Quality Process
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Built to <span className="text-accent">Exacting Standards</span>
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="max-w-xl text-secondary">
            Every machine passes through a disciplined, six-stage quality process
            — from raw material to dispatch.
          </p>
        </div>

        {/* ── Desktop: hexagon zigzag timeline ───────────────────────── */}
        <div className="relative mt-16 hidden items-start justify-between gap-3 lg:flex">
          {/* dashed zigzag connector: 1→2→3→4→5→6 through every badge centre.
             Badge centres sit at x = (i+0.5)/6 of width → 100,300,…,1100 in the
             1200-wide viewBox; raised badges at y=36, dropped at y=140. */}
          <svg
            className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[160px] w-full"
            viewBox="0 0 1200 160"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polyline
              points="100,36 300,140 500,36 700,140 900,36 1100,140"
              fill="none"
              stroke="#FF6B1A"
              strokeOpacity="0.35"
              strokeWidth="2"
              strokeDasharray="7 7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {STEPS.map((s, i) => {
            const dropped = i % 2 === 1; // even stages (2/4/6) sit lower
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className={`group relative z-10 flex flex-1 flex-col items-center px-1 text-center ${
                  dropped ? "mt-[104px]" : ""
                }`}
              >
                <Badge icon={s.icon} />
                <span className="stats-font mt-4 text-3xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-[15px]! font-semibold! normal-case! leading-snug tracking-normal!">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-[13px]! leading-relaxed text-secondary">
                  {s.desc}
                </p>
                <div className="mt-5 w-[170px]">
                  <Hexagon src={s.img} alt={s.title} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Tablet / mobile: stacked cards ─────────────────────────── */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:hidden">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: "easeOut" }}
              className="group flex items-center gap-5 rounded-[var(--radius-card)] border border-theme bg-card p-5 shadow-card transition duration-300 hover:border-accent hover:shadow-orange"
            >
              <div className="w-[110px] shrink-0">
                <Hexagon src={s.img} alt={s.title} />
              </div>
              <div>
                <span className="stats-font text-2xl font-bold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-[16px]! font-semibold! normal-case! leading-snug tracking-normal!">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-sm text-secondary">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityProcess;
