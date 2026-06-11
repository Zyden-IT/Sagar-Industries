// ─────────────────────────────────────────────────────────────────────
// Industries › Case Studies — industry-wise success stories.
// Filter tabs (All + each industry) over a grid of result-focused cards:
// image + industry tag + title + challenge/result summary + metric chips.
// Cards re-flow smoothly on filter change. Replace copy / images / links
// with real case studies as they're published.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TrendUp, ArrowRight } from "@phosphor-icons/react";

const STUDIES = [
  {
    industry: "Paper & Pulp",
    title: "High-Volume Reel-to-Sheet Upgrade",
    summary:
      "A paper trader struggling with slow bulk sheeting switched to our automatic cutting line.",
    metrics: [
      { value: "+40%", label: "Daily output" },
      { value: "−18%", label: "Trim waste" },
    ],
    img: "/gallery1.jpg",
    href: "/contact",
  },
  {
    industry: "Packaging",
    title: "Carton Plant Automation",
    summary:
      "Manual cutting was bottlenecking carton-blank production for a growing packaging unit.",
    metrics: [
      { value: "2×", label: "Throughput" },
      { value: "14 mo", label: "Payback" },
    ],
    img: "/gallery8.jpg",
    href: "/contact",
  },
  {
    industry: "Printing",
    title: "Multi-Colour Flexo Line",
    summary:
      "A label printer needed consistent registration across a four-colour job at higher speed.",
    metrics: [
      { value: "−25%", label: "Ink waste" },
      { value: "+30%", label: "Speed" },
    ],
    img: "/gallery3.jpg",
    href: "/contact",
  },
  {
    industry: "Corrugated",
    title: "Board Sheeting at Scale",
    summary:
      "A corrugated manufacturer required heavy-duty, accurate cutting for thick board runs.",
    metrics: [
      { value: "+30%", label: "Capacity" },
      { value: "−40%", label: "Downtime" },
    ],
    img: "/gallery9.jpg",
    href: "/contact",
  },
  {
    industry: "Packaging",
    title: "Manual → Automatic Transition",
    summary:
      "Rising labour costs pushed a box maker to move from a manual to an automatic machine.",
    metrics: [
      { value: "−35%", label: "Running cost" },
      { value: "+22%", label: "Output" },
    ],
    img: "/gallery11.jpg",
    href: "/contact",
  },
  {
    industry: "Paper & Pulp",
    title: "Precision Cutting for Premium Grades",
    summary:
      "Delicate, high-value stock demanded tighter cut accuracy with zero damage.",
    metrics: [
      { value: "99.5%", label: "Cut accuracy" },
      { value: "−15%", label: "Rejections" },
    ],
    img: "/gallery5.jpg",
    href: "/contact",
  },
];

const TABS = ["All", "Paper & Pulp", "Packaging", "Printing", "Corrugated"];

const IndustryCaseStudies = () => {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? STUDIES : STUDIES.filter((s) => s.industry === active);

  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">
            Case Studies
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Real <span className="text-accent">Results</span>, Industry by Industry
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            See how our machines lifted output, cut waste and paid back fast
            across industries.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="hide-scrollbar mt-10 flex justify-start gap-2 overflow-x-auto pb-2 sm:justify-center">
          {TABS.map((t) => {
            const on = t === active;
            return (
              <button
                key={t}
                onClick={() => setActive(t)}
                className={`btn shrink-0 cursor-pointer rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  on
                    ? "bg-gradient-to-br from-primary to-secondary text-white shadow-orange"
                    : "border border-border bg-card text-text-primary hover:border-accent"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((s) => (
              <motion.article
                key={s.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-card transition-colors duration-300 hover:border-accent hover:shadow-orange"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-gradient-to-br from-primary to-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-orange">
                    {s.industry}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px]! font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-text-secondary">{s.summary}</p>

                  {/* metric chips */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.metrics.map((m) => (
                      <span
                        key={m.label}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-accent/10 px-2.5 py-1.5 text-accent"
                      >
                        <TrendUp size={14} weight="bold" />
                        <span className="text-[13px] font-bold">{m.value}</span>
                        <span className="text-[11px] font-medium text-text-secondary">{m.label}</span>
                      </span>
                    ))}
                  </div>

                  <Link
                    href={s.href}
                    className="mt-4 inline-flex items-center gap-1 border-t border-border pt-3 text-xs font-bold uppercase tracking-wide text-accent"
                  >
                    Read case study
                    <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default IndustryCaseStudies;
