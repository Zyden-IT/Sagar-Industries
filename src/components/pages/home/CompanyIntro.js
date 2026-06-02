// ─────────────────────────────────────────────────────────────────────
// Home › Company Intro ("Who We Are") — premium industrial section.
// Top:  two columns — left image (+ accents + CTAs), right text content.
// Below: full-width row of 4 animated stat cards.
// All colours from the project theme. Subtle blueprint-grid background.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { ArrowRight, Wrench, Medal, UsersThree, MapPin } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

// ── Stats (edit here) ────────────────────────────────────────────────
const STATS = [
  { icon: Wrench, value: 500, suffix: "+", label: "Machines Installed" },
  { icon: Medal, value: 20, suffix: "+", label: "Years Experience" },
  { icon: UsersThree, value: 100, suffix: "+", label: "Industrial Clients" },
  { icon: MapPin, text: "Pan India", label: "Support" },
];

// Count-up number that animates when scrolled into view
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span
      ref={ref}
      className="stats-font bg-clip-text text-3xl font-bold text-transparent lg:text-4xl"
      style={{ backgroundImage: "var(--orange-gradient)" }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const fadeIn = (x = 0) => ({
  initial: { opacity: 0, x, y: x === 0 ? 24 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
});

const CompanyIntro = () => {
  return (
    <section className="section-py relative overflow-hidden bg-theme">
      {/* Blueprint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* ── Top: two columns ────────────────────────────────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — image + accents + CTAs */}
          <motion.div {...fadeIn(-30)} className="flex flex-col gap-7">
            <div className="relative">
              {/* accent square outline (top-left) */}
              <div className="absolute -left-4 -top-4 hidden h-28 w-28 rounded-xl border-2 border-accent/40 sm:block" />
              {/* solid gradient square (bottom-right) */}
              <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-xl bg-orange-gradient opacity-90 shadow-orange sm:block" />

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-card">
                <Image
                  src="/company-intro.png"
                  alt="Sagar Industries manufacturing facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* CTAs — moved to the left, under the image */}
            <div className="flex flex-wrap items-center gap-4">
              <Link href={Routes.products.urlPath} className="btn-primary btn-lg">
                Explore Our Machines
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link href={Routes.contact.urlPath} className="btn-outline btn-lg">
                Request a Quote
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* Right — content */}
          <motion.div {...fadeIn(30)} className="flex flex-col gap-5">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-accent">
              Who We Are
            </span>

            <div className="flex gap-4">
              <span className="w-1 shrink-0 self-stretch rounded-full bg-orange-gradient" />
              <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
                Engineering Excellence Behind Every Machine
              </h2>
            </div>

            <p className="max-w-xl text-secondary">
              Sagar Industries is a trusted manufacturer and exporter of Paper
              Reel to Sheet Cutting Machines and Flexo Printing Machines. From
              our facility in Ahmedabad, we combine precision engineering,
              quality materials and decades of expertise to build machinery that
              keeps paper, packaging and printing businesses running worldwide.
            </p>
          </motion.div>
        </div>

        {/* ── Stats — full-width single row ───────────────────────── */}
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:mt-20 lg:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
            >
              {/* top accent bar — grows on hover */}
              <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-orange-gradient transition-transform duration-300 group-hover:scale-x-100" />

              <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                <s.icon size={24} weight="bold" />
              </span>

              {s.value !== undefined ? (
                <Counter value={s.value} suffix={s.suffix} />
              ) : (
                <span
                  className="stats-font bg-clip-text text-2xl font-bold text-transparent lg:text-3xl"
                  style={{ backgroundImage: "var(--orange-gradient)" }}
                >
                  {s.text}
                </span>
              )}

              <p className="mt-1 text-sm text-secondary">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
