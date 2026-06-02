// ─────────────────────────────────────────────────────────────────────
// Home › Industries Served — radial hub.
// A stats strip, then 3 industry cards on each side of a central machine in
// a dashed ring, with numbered badges, connector spokes and spec callouts.
// Theme colours; central photo + cards are swap-ready.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Package,
  Cube,
  Printer,
  Scroll,
  Stack,
  Tag,
  Buildings,
  Gear,
  Medal,
  Ruler,
  Lightning,
} from "@phosphor-icons/react";

const INDUSTRIES = [
  { n: "01", side: "left", icon: Package, title: "Corrugated Box Manufacturing", desc: "High-precision cutting for corrugated sheets and boxes." },
  { n: "02", side: "right", icon: Cube, title: "Packaging Industry", desc: "Ideal for a wide range of packaging materials and solutions." },
  { n: "03", side: "left", icon: Printer, title: "Printing Industry", desc: "Perfect for flexographic printing on various materials." },
  { n: "04", side: "right", icon: Scroll, title: "Paper Processing Industry", desc: "Efficient cutting and processing of paper rolls and sheets." },
  { n: "05", side: "left", icon: Stack, title: "Carton Manufacturing", desc: "Accurate cutting for duplex boards, cartons and folding boxes." },
  { n: "06", side: "right", icon: Tag, title: "Label & Sticker Industry", desc: "High-speed, precise cutting for labels, stickers and adhesive materials." },
];

const STATS = [
  { icon: Buildings, value: "15+", label: "Industries Served" },
  { icon: Gear, value: "500+", label: "Installations" },
  { icon: Medal, value: "20+", label: "Years Experience" },
];

const SPECS = [
  { icon: Ruler, value: "1300mm – 3500mm", label: "Cutting Width" },
  { icon: Stack, value: "200+ GSM", label: "Paper Range" },
  { icon: Lightning, value: "Precision Driven", label: "Performance" },
];

const Card = ({ item }) => {
  const isLeft = item.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`group relative flex items-center gap-3 rounded-2xl border border-theme bg-card p-3 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-orange ${
        isLeft ? "" : "lg:flex-row-reverse lg:text-right"
      }`}
    >
      {/* number badge (outer end) */}
      <span className="stats-font grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-accent/60 bg-accent-soft text-[13px] font-bold text-accent">
        {item.n}
      </span>

      {/* icon */}
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
        <item.icon size={24} weight="bold" />
      </span>

      {/* text */}
      <div className="min-w-0">
        <h3 className="text-[14px]! font-bold! leading-tight sm:text-[15px]!">{item.title}</h3>
        <p className="mt-1 text-[12px]! leading-snug text-secondary">{item.desc}</p>
      </div>

      {/* connector spoke toward the centre (desktop only) */}
      {isLeft ? (
        <span className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-full items-center lg:flex">
          <span className="h-px w-10 bg-gradient-to-r from-accent/10 to-accent/70" />
          <span className="h-2 w-2 rounded-full bg-accent shadow-orange" />
        </span>
      ) : (
        <span className="absolute left-0 top-1/2 hidden -translate-y-1/2 -translate-x-full items-center lg:flex">
          <span className="h-2 w-2 rounded-full bg-accent shadow-orange" />
          <span className="h-px w-10 bg-gradient-to-l from-accent/10 to-accent/70" />
        </span>
      )}
    </motion.div>
  );
};

const IndustriesServed = () => {
  const left = INDUSTRIES.filter((i) => i.side === "left");
  const right = INDUSTRIES.filter((i) => i.side === "right");

  return (
    <section className="section-py bg-theme">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-accent">
            <span className="h-px w-6 bg-accent" />
            Industries Served
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[38px]!">
            Powering Industries with{" "}
            <span className="text-accent">Precision &amp; Performance</span>
          </h2>
          <p className="text-secondary">
            Our paper cutting and flexo printing machines are trusted by
            businesses across a wide range of industries.
          </p>
        </div>

        {/* ── Stats strip ────────────────────────────────────────── */}
        <div className="mx-auto mt-8 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-[var(--radius-card)] border border-theme bg-card px-8 py-5 shadow-card">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`flex items-center gap-3 ${i > 0 ? "sm:border-l sm:border-theme sm:pl-8" : ""}`}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <s.icon size={22} weight="bold" />
              </span>
              <div>
                <div className="stats-font text-xl font-bold text-accent lg:text-2xl">{s.value}</div>
                <div className="text-[12px] text-secondary">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Radial layout ──────────────────────────────────────── */}
        <div className="mt-12 grid items-center gap-8 lg:grid-cols-[1fr_1.05fr_1fr] lg:gap-4">
          {/* Left cards */}
          <div className="flex flex-col gap-6">
            {left.map((item) => (
              <Card key={item.n} item={item} />
            ))}
          </div>

          {/* Center machine + rings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative order-first flex aspect-square items-center justify-center lg:order-none"
          >
            {/* glow */}
            <span className="pointer-events-none absolute aspect-square w-[420px] rounded-full bg-accent/5 blur-3xl" />
            {/* rotating dashed ring with dots */}
            <motion.span
              aria-hidden="true"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute aspect-square w-[360px] rounded-full border-2 border-dashed border-accent/25 sm:w-[420px]"
            >
              {[0, 90, 180, 270].map((deg) => (
                <span
                  key={deg}
                  className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-orange"
                  style={{ transformOrigin: "center 180px", transform: `rotate(${deg}deg)` }}
                />
              ))}
            </motion.span>
            <span className="pointer-events-none absolute aspect-square w-[300px] rounded-full border border-theme sm:w-[350px]" />

            {/* machine photo in a circle */}
            <div className="relative grid aspect-square w-[280px] place-items-center overflow-hidden rounded-full border-[6px] border-card bg-card shadow-card sm:w-[330px]">
              <Image
                src="/hero.png"
                alt="Sagar Industries machine"
                fill
                sizes="330px"
                className="object-contain p-4"
              />
            </div>

            {/* spec callouts */}
            {/* <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 translate-x-2 flex-col gap-2 sm:flex lg:right-2">
              {SPECS.map((sp) => (
                <span
                  key={sp.label}
                  className="flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-white shadow-card"
                >
                  <sp.icon size={16} weight="bold" className="shrink-0 text-warning" />
                  <span className="leading-tight">
                    <span className="block text-[11px] font-bold">{sp.value}</span>
                    <span className="block text-[9px] uppercase tracking-wide text-white/55">{sp.label}</span>
                  </span>
                </span>
              ))}
            </div> */}
          </motion.div>

          {/* Right cards */}
          <div className="flex flex-col gap-6">
            {right.map((item) => (
              <Card key={item.n} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
