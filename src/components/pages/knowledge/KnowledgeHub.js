// ─────────────────────────────────────────────────────────────────────
// Knowledge › Hub — horizontal slider.
// Resource cards in a swipeable track: 3 per view on desktop, 2 on tablet,
// 1 on mobile, with side arrows and dots. Point each href to its detail /
// listing page as the hub grows.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Question,
  Wrench,
  FileArrowDown,
  Lightbulb,
  Lifebuoy,
  CaretLeft,
  CaretRight,
  ArrowRight,
} from "@phosphor-icons/react";

const RESOURCES = [
  { icon: BookOpen, title: "Buying Guides", desc: "How to choose the right machine — size, capacity, automation and budget.", href: "#guides" },
  { icon: Question, title: "Machine FAQs", desc: "Common questions on our machines, customization, delivery and support.", href: "#faq" },
  { icon: Wrench, title: "Maintenance Tips", desc: "Keep your machine running at peak performance with simple upkeep routines.", href: "#maintenance" },
  { icon: FileArrowDown, title: "Downloads", desc: "Brochures, spec sheets and datasheets for our machine range.", href: "#downloads" },
  { icon: Lightbulb, title: "Best Practices", desc: "Production know-how to improve yield, quality and uptime on the floor.", href: "#guides" },
  { icon: Lifebuoy, title: "Support & Service", desc: "Installation, operator training and after-sales service explained.", href: "/contact" },
];

const pad = (n) => String(n).padStart(2, "0");

const Card = ({ r, n }) => {
  const Icon = r.icon;
  return (
    <Link
      href={r.href}
      className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
    >
      <span className="stats-font absolute right-5 top-4 select-none text-[40px] font-bold leading-none text-accent/10 transition-colors duration-300 group-hover:text-accent/25">
        {pad(n)}
      </span>
      <span className="mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
        <Icon size={28} weight="regular" />
      </span>
      <h3 className="text-[17px]! font-bold! leading-tight transition-colors group-hover:text-accent">{r.title}</h3>
      <p className="mt-2 flex-1 text-sm text-text-secondary">{r.desc}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wide text-accent">
        Explore
        <ArrowRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
};

const KnowledgeHub = () => {
  const total = RESOURCES.length;
  const [perView, setPerView] = useState(3);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, total - perView);
  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setIndex((i) => (i <= 0 ? maxIndex : i - 1));
  const next = () => setIndex((i) => (i >= maxIndex ? 0 : i + 1));

  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">Knowledge</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Knowledge <span className="text-accent">Hub</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Guides, FAQs and resources to help you choose, run and maintain the
            right machine.
          </p>
        </div>

        {/* Slider */}
        <div className="relative mt-12 px-2 sm:px-14">
          {/* arrows */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="btn absolute left-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition hover:scale-110"
          >
            <CaretLeft size={20} weight="bold" />
          </button>
          <button
            onClick={next}
            aria-label="Next"
            className="btn absolute right-0 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition hover:scale-110"
          >
            <CaretRight size={20} weight="bold" />
          </button>

          {/* track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${index * (100 / total)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{ width: `${(total / perView) * 100}%` }}
            >
              {RESOURCES.map((r, i) => (
                <div key={r.title} className="shrink-0 px-3" style={{ width: `${100 / total}%` }}>
                  <Card r={r} n={i + 1} />
                </div>
              ))}
            </motion.div>
          </div>

          {/* dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`btn h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-accent" : "w-2.5 bg-secondary/40 hover:bg-secondary"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHub;
