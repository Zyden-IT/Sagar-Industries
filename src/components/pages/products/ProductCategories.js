// ─────────────────────────────────────────────────────────────────────
// Products › Product Categories Overview — the two core machine lines as cards.
// Centered header + 2 cards (badge, image placeholder, title, desc, tags,
// checkmarked feature list, "View Specifications" CTA). Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const PRODUCTS = [
  {
    badge: "Bestseller",
    badgeClass: "bg-accent text-white",
    image: "/product1.png",
    title: "Paper Roll To Sheet Cutting Machine",
    description:
      "Designed to convert paper rolls/reels into accurate sheets with smooth operation, flexible cutting length, and optional attachments for advanced production needs.",
    tags: ["Manual Machine", "Automatic Machine"],
    features: [
      "25 mm to 8800 mm cutting length",
      '25" to 75" and more machine sizes',
      "2 HP to 9 HP power requirement",
      "Slitting and jogging attachments available",
      "Supports multiple industrial materials",
    ],
  },
  {
    badge: "Multi-Colour",
    badgeClass: "bg-accent text-white",
    image: "/product2.png",
    title: "Flexo Printing Machine",
    description:
      "Built for clean, efficient, and consistent printing on craft paper and corrugated board with options from single colour to multi-colour configurations.",
    tags: ["Single Colour", "Two Colour", "Three Colour", "Four Colour"],
    features: [
      "Available in multiple machine sizes",
      "Up to 4 colours and more as requirement",
      "Uniform ink flow",
      "Quick setup and quick drying",
      "Optional AC drive panel",
    ],
  },
];

const ProductCategories = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="eyebrow">
              Our Products
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Our Core <span className="text-accent">Machine Lines</span>
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Paper roll to sheet cutting and flexo printing machines, built in-house.
          </p>
        </div>

        {/* ── Cards ──────────────────────────────────────────────── */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {PRODUCTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-orange"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-soft">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className={`absolute left-5 top-5 z-10 rounded-md px-3 py-1 text-[11px] font-bold uppercase tracking-wide ${p.badgeClass}`}
                >
                  {p.badge}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col gap-4 p-6">
                <h3 className="text-[18px]! font-semibold leading-snug sm:text-[20px]!">
                  {p.title}
                </h3>

                <p className="text-sm text-text-secondary">{p.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-text-secondary"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <ul className="flex flex-col">
                  {p.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-3 border-b border-border py-2.5 text-sm text-text-primary last:border-0"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        className="shrink-0 text-accent"
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={Routes.products.urlPath}
                  className="btn-orange btn-block mt-auto"
                >
                  View Specifications
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
