// ─────────────────────────────────────────────────────────────────────
// Home › Product Showcase — flagship machines as rich feature cards.
// Each machine sits in a large theme card split into two halves:
//   • Visual panel — product image on a tinted panel with a blueprint
//     texture, an orange glow, a ghost index number and a floating spec chip.
//   • Content — icon eyebrow, headline + gradient underline, description,
//     feature pills, a 3-up stat-tile grid and a solid CTA.
// Cards alternate sides. Colours/spacing come from the theme tokens.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Scissors,
  Printer,
  CheckCircle,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const PRODUCTS = [
  {
    num: "01",
    icon: Scissors,
    eyebrow: "Cutting Series",
    image: "/p1.png",
    title: "Paper Roll To Sheet Cutting Machine",
    description:
      "Designed to convert paper rolls and reels into accurate sheets with smooth operation, flexible cutting length, and optional slitting and jogging attachments for advanced, high-volume production needs. Available in two variants — manual and automatic.",
    highlight: { value: "8800 mm", label: "Max Cut Length" },
    features: ["Manual & automatic variants", "Flexible cut length", "Optional slitting"],
    stats: [
      { value: "8800", label: "mm cut length" },
      { value: "2–9", label: "hp power" },
      { value: "75″", label: "max size" },
    ],
  },
  {
    num: "02",
    icon: Printer,
    eyebrow: "Flexo Series",
    image: "/p2.png",
    title: "Flexo Printing Machine",
    description:
      "Built for clean, efficient and consistent printing on craft paper and corrugated board — with uniform ink flow, quick setup and configurations ranging from single colour to multi-colour.",
    highlight: { value: "4+ Colours", label: "Print Stations" },
    features: ["Uniform ink flow", "Quick setup", "Single → multi-colour"],
    stats: [
      { value: "4+", label: "print colours" },
      { value: "AC", label: "drive panel" },
      { value: "Multi", label: "machine sizes" },
    ],
  },
];

const fade = (x = 0) => ({
  initial: { opacity: 0, x, y: x === 0 ? 24 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
});

const ProductShowcase = () => {
  return (
    <section className="section-py relative overflow-hidden bg-bg">
      {/* Ambient orange glow, top-right */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-80 w-80 rounded-full bg-gradient-to-br from-primary to-secondary opacity-[0.07] blur-3xl"
      />

      <div className="container relative">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div {...fade(-30)} className="lg:col-span-8">
            <span className="eyebrow">The Machines</span>
            <h2 className="mt-4 max-w-[640px] ">
              Our Paper Cutting &amp; <span className="text-accent">Flexo Printing Machines</span>
            </h2>
          </motion.div>

          <motion.div {...fade(30)} className="lg:col-span-4 lg:pb-2 lg:text-right">
            <Link
              href={Routes.products.urlPath}
              className="btn-orange btn"
            >
              View all products
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        {/* ── Machine cards (alternating) ────────────────────────── */}
        <div className="mt-8 flex flex-col gap-8 lg:mt-10 lg:gap-12">
          {PRODUCTS.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={p.title}
                {...fade(0)}
                className="group relative grid overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-card transition-all duration-500 hover:border-accent hover:shadow-orange lg:grid-cols-2"
              >
                {/* ── Visual panel ──────────────────────────────── */}
                <div
                  className={`relative flex items-center justify-center overflow-hidden bg-bgdark p-8 sm:p-10 lg:min-h-[460px] ${reverse ? "lg:order-2" : ""
                    }`}
                >
                  {/* Blueprint grid texture */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-50"
                    style={{
                      backgroundImage:
                        "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                      backgroundSize: "38px 38px",
                      maskImage:
                        "radial-gradient(ellipse 80% 70% at 50% 45%, black 25%, transparent 100%)",
                      WebkitMaskImage:
                        "radial-gradient(ellipse 80% 70% at 50% 45%, black 25%, transparent 100%)",
                    }}
                  />
                  {/* Orange glow behind the machine */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary to-secondary opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                  />

                  {/* Product image */}
                  <div className="relative aspect-[4/3] w-full max-w-[480px]">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Floating highlight chip */}
                  <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-xl border border-border bg-card/95 px-4 py-3 shadow-card backdrop-blur">
                    <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent/10 text-accent">
                      <p.icon size={18} weight="bold" />
                    </span>
                    <span className="flex flex-col leading-tight">
                      <span className="stats-font text-[15px] font-bold text-text-primary">
                        {p.highlight.value}
                      </span>
                      <span className="text-[10px] uppercase tracking-[1.2px] text-text-secondary">
                        {p.highlight.label}
                      </span>
                    </span>
                  </div>
                </div>

                {/* ── Content ───────────────────────────────────── */}
                <div
                  className={`flex flex-col justify-center gap-5 p-7 sm:p-9 lg:p-12 ${reverse ? "lg:order-1" : ""
                    }`}
                >
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-accent">
                    <p.icon size={14} weight="bold" />
                    Product {p.num} — {p.eyebrow}
                  </span>

                  <div>
                    <h3 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
                      {p.title}
                    </h3>
                    <span className="mt-4 block h-[3px] w-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  </div>

                  <p className="max-w-md text-[15px] leading-[1.7] text-text-secondary">
                    {p.description}
                  </p>

                  {/* Feature pills */}
                  <div className="flex flex-wrap gap-2">
                    {p.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft px-3 py-1.5 text-[12px] font-medium text-text-primary"
                      >
                        <CheckCircle size={14} weight="fill" className="text-accent" />
                        {f}
                      </span>
                    ))}
                  </div>

                  {/* Stat tiles */}
                  <div className="grid grid-cols-3 gap-3">
                    {p.stats.map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-border bg-soft p-3.5 transition-colors duration-300 group-hover:border-accent/50"
                      >
                        <div className="stats-font text-xl font-bold leading-none text-text-primary sm:text-2xl">
                          {s.value}
                        </div>
                        <div className="mt-1.5 text-[10px] font-medium uppercase tracking-[1.2px] text-text-secondary">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
