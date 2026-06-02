// ─────────────────────────────────────────────────────────────────────
// Knowledge › Featured Guides — article/resource cards.
// Image + category tag + title + excerpt + read time. Starter content —
// point each card's href to its article page as the blog is built.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowRight } from "@phosphor-icons/react";

const GUIDES = [
  {
    tag: "Buying Guide",
    title: "Manual vs Automatic: Which Cutting Machine Fits You?",
    excerpt:
      "Compare cost, speed and labour to decide which roll-to-sheet machine suits your volume.",
    read: "5 min read",
    img: "/gallery1.jpg",
    href: "/contact",
  },
  {
    tag: "Basics",
    title: "Understanding GSM, Micron & Paper Grades",
    excerpt:
      "A plain-language guide to the numbers that define paper weight and thickness.",
    read: "4 min read",
    img: "/gallery5.jpg",
    href: "/contact",
  },
  {
    tag: "Printing",
    title: "How Flexo Printing Works — A Simple Guide",
    excerpt:
      "From plates to inks — the essentials of flexographic printing explained step by step.",
    read: "6 min read",
    img: "/gallery3.jpg",
    href: "/contact",
  },
  {
    tag: "Efficiency",
    title: "Reducing Trim Waste on Roll-to-Sheet Lines",
    excerpt:
      "Practical ways to cut material waste and squeeze more usable sheets from every roll.",
    read: "5 min read",
    img: "/gallery9.jpg",
    href: "/contact",
  },
  {
    tag: "Maintenance",
    title: "Daily & Weekly Machine Maintenance Checklist",
    excerpt:
      "Keep your machine running smoothly with this simple preventive-maintenance routine.",
    read: "3 min read",
    img: "/gallery8.jpg",
    href: "/contact",
  },
  {
    tag: "Engineering",
    title: "Sizing the Right Motor for Your Machine",
    excerpt:
      "How material, width and speed decide the horsepower your machine actually needs.",
    read: "4 min read",
    img: "/gallery11.jpg",
    href: "/contact",
  },
];

const FeaturedGuides = () => {
  return (
    <section id="guides" className="section-py scroll-mt-20 bg-theme">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
            Guides & Articles
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Featured Reads
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            Practical, jargon-free guides on choosing, running and maintaining
            paper, packaging and printing machinery.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GUIDES.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: "easeOut" }}
            >
              <Link
                href={g.href}
                className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={g.img}
                    alt={g.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-orange-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-orange">
                    {g.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px]! font-semibold leading-snug transition-colors group-hover:text-accent">
                    {g.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-secondary">{g.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-theme pt-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-secondary">
                      <Clock size={14} weight="bold" /> {g.read}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-accent">
                      Read <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGuides;
