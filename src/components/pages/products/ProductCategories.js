// ─────────────────────────────────────────────────────────────────────
// Products › Core Machine Lines — two alternating feature rows.
// Each row has three columns: a product image on a tinted/dotted stage · a
// content block (number badge + title + gradient underline + description +
// tags) · a vertical icon-feature list with a divider. Row 2 is mirrored.
// Brand orange/accent throughout (no green UI), theme tokens only.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Ruler,
  ArrowsOut,
  Lightning,
  Scissors,
  Stack,
  Printer,
  Palette,
  Drop,
  Gauge,
  Gear,
} from "@phosphor-icons/react";

const PRODUCTS = [
  {
    num: "01",
    image: "/hero15.png",
    title: "Paper Roll To Sheet Cutting Machine",
    description:
      "Designed to convert paper rolls/reels into accurate sheets with smooth operation, flexible cutting length, and optional attachments for advanced production needs.",
    tags: ["Manual Machine", "Automatic Machine"],
    features: [
      { icon: Ruler, text: "25 mm to 8800 mm cutting length" },
      { icon: ArrowsOut, text: '25" to 85" machine sizes' },
      { icon: Lightning, text: "2 HP to 9 HP power requirement" },
      { icon: Scissors, text: "Slitting and jogging attachments available" },
      { icon: Stack, text: "Supports multiple industrial materials" },
    ],
  },
  {
    num: "02",
    image: "/flexo3=wb.png",
    title: "Flexo Printing Machine",
    description:
      "Built for clean, efficient, and consistent printing on craft paper and corrugated board with options from single colour to multi-colour configurations.",
    tags: ["Single Colour", "Two Colour", "Three Colour", "Four Colour"],
    features: [
      { icon: Printer, text: "Available in multiple machine sizes" },
      { icon: Palette, text: "Up to 4 colours and more as requirement" },
      { icon: Drop, text: "Uniform ink flow" },
      { icon: Gauge, text: "Quick setup and quick drying" },
      { icon: Gear, text: "Optional AC drive panel" },
    ],
  },
];

const ProductCategories = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">Our Products</span>
          <h2 className="">
            Our Core <span className="text-accent">Machine Lines</span>
          </h2>
          <p className="text-text-secondary">
            Paper roll to sheet cutting and flexo printing machines, built in-house.
          </p>
        </div>

        {/* ── Rows ───────────────────────────────────────────────── */}
        <div className="mt-12 flex flex-col gap-6 lg:gap-8">
          {PRODUCTS.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="grid items-stretch gap-5 overflow-hidden rounded-[24px] border border-border bg-card p-5 shadow-card transition duration-300 hover:border-accent hover:shadow-orange lg:grid-cols-[0.95fr_1.2fr_0.95fr] lg:gap-0 lg:p-0"
              >
                {/* ── Image stage ──────────────────────────────── */}
                <div
                  className={`group relative flex min-h-[220px] items-center justify-center overflow-hidden rounded-[20px] p-6 lg:min-h-[300px] lg:rounded-none ${reverse ? "lg:order-3" : "lg:order-1"
                    }`}
                  style={{
                    background: reverse
                      ? "radial-gradient(120% 100% at 82% 85%, rgba(245,132,42,0.16), transparent 60%), linear-gradient(315deg, rgba(245,132,42,0.08), transparent 70%)"
                      : "radial-gradient(120% 100% at 25% 25%, rgba(245,132,42,0.16), transparent 60%), linear-gradient(135deg, rgba(245,132,42,0.08), transparent 70%)",
                  }}
                >
                  {/* dotted texture */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-60"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle, var(--color-border) 1px, transparent 1px)",
                      backgroundSize: "15px 15px",
                      maskImage: `radial-gradient(ellipse 55% 55% at ${reverse ? "85% 88%" : "12% 12%"}, black, transparent 70%)`,
                      WebkitMaskImage: `radial-gradient(ellipse 55% 55% at ${reverse ? "85% 88%" : "12% 12%"}, black, transparent 70%)`,
                    }}
                  />
                  <div className="relative h-full w-full">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 30vw"
                      className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                {/* ── Content ──────────────────────────────────── */}
                <div className="flex flex-col justify-center gap-3 lg:order-2 lg:p-8">
                  <div className="flex items-center gap-3">
                    <span className="stats-font grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white shadow-orange">
                      {p.num}
                    </span>
                    <h3 className="text-[18px]! font-bold! uppercase leading-tight tracking-[0.01em] sm:text-[21px]!">
                      {p.title}
                    </h3>
                  </div>

                  <span className="block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />

                  <p className="text-[13px] leading-relaxed text-text-secondary">
                    {p.description}
                  </p>

                  <div className="mt-1 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-[11px] font-semibold text-accent"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* ── Feature list ─────────────────────────────── */}
                <div
                  className={`flex flex-col justify-center lg:p-6 ${reverse
                    ? "lg:order-1 lg:border-r lg:border-border"
                    : "lg:order-3 lg:border-l lg:border-border"
                    }`}
                >
                  {p.features.map((f) => (
                    <div
                      key={f.text}
                      className="flex items-center gap-3 border-b border-border/60 py-2.5 last:border-0"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                        <f.icon size={16} weight="bold" />
                      </span>
                      <span className="text-[12px] font-medium leading-snug text-text-primary">
                        {f.text}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
