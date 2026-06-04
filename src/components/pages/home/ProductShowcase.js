// ─────────────────────────────────────────────────────────────────────
// Home › Product Showcase — alternating feature rows.
// Top: eyebrow + large headline (left) with a supporting line (right).
// Below: each machine as an image↔content split row that alternates
// sides. Content is eyebrow + heading + paragraph only (no links).
// Theme colours throughout.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const PRODUCTS = [
  {
    eyebrow: "Product 01 — Cutting Series",
    image: "/p1.png",
    title: "Paper Roll To Sheet Cutting Machine",
    description:
      "Designed to convert paper rolls and reels into accurate sheets with smooth operation, flexible cutting length, and optional slitting and jogging attachments for advanced, high-volume production needs.",
    stats: [
      { value: "8800", label: "mm cut length" },
      { value: "2–9", label: "hp power" },
      { value: "75″", label: "max size" },
    ],
  },
  {
    eyebrow: "Product 02 — Flexo Series",
    image: "/p2.png",
    title: "Flexo Printing Machine",
    description:
      "Built for clean, efficient and consistent printing on craft paper and corrugated board — with uniform ink flow, quick setup and configurations ranging from single colour to multi-colour.",
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
    <section className="section-py bg-theme">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <motion.div {...fade(-30)} className="lg:col-span-8">
            <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-accent">
              The Machines
            </span>
            <h2 className="mt-3 max-w-[640px] text-[28px]! font-semibold leading-[1.12] tracking-[-0.01em] sm:text-[34px]! lg:text-[42px]!">
              Two flagships. Built for the production lines of tomorrow.
            </h2>
          </motion.div>

          <motion.div {...fade(30)} className="lg:col-span-4 lg:pb-2 lg:text-right">
            <Link
              href={Routes.products.urlPath}
              className="group inline-flex items-center gap-2 text-[14px] font-semibold text-accent transition-colors hover:text-primary"
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

        {/* ── Machine rows (alternating) ─────────────────────────── */}
        <div className="mt-16 flex flex-col gap-16 lg:mt-20 lg:gap-24">
          {PRODUCTS.map((p, i) => {
            const reverse = i % 2 === 1;
            return (
              <div
                key={p.title}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                {/* Image */}
                <motion.div
                  {...fade(reverse ? 40 : -40)}
                  className={`relative overflow-hidden rounded-[var(--radius-card)] border border-theme bg-soft shadow-card ${reverse ? "lg:order-2" : ""
                    }`}
                >
                  <div className="group relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Content — eyebrow + heading + paragraph */}
                <motion.div
                  {...fade(reverse ? -40 : 40)}
                  className={reverse ? "lg:order-1" : ""}
                >
                  <span className="text-[11px] font-bold uppercase tracking-[2.5px] text-accent">
                    {p.eyebrow}
                  </span>
                  <h3 className="mt-3 text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
                    {p.title}
                  </h3>
                  <span className="mt-4 block h-[3px] w-12 rounded-full bg-orange-gradient" />
                  <p className="mt-5 max-w-md text-[15px] leading-[1.7] text-secondary">
                    {p.description}
                  </p>

                  {/* Stats */}
                  <div className="mt-7 flex flex-wrap gap-x-8 gap-y-5 border-t border-theme pt-6 sm:gap-x-10">
                    {p.stats.map((s) => (
                      <div key={s.label}>
                        <div className="stats-font text-2xl font-bold leading-none text-primary sm:text-[28px]">
                          {s.value}
                        </div>
                        <div className="mt-1.5 text-[11px] font-medium uppercase tracking-[1.5px] text-secondary">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Link */}
                  <Link
                    href={Routes.products.urlPath}
                    className="group mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[1.5px] text-primary transition-colors hover:text-accent"
                  >
                    Discover the machine
                    <ArrowRight
                      size={15}
                      weight="bold"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
