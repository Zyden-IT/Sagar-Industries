// ─────────────────────────────────────────────────────────────────────
// About › Impact Stats — dark figures band.
// Full-bleed dark machinery photo with overlay. Left: eyebrow + heading +
// paragraph. Right: three count-up stats (number, label, description).
// Photo lives in /public — swap the src for a real facility shot.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

const STATS = [
  {
    value: 15,
    suffix: "+",
    label: "Years of Experience",
    desc: "Trusted expertise in manufacturing paper cutting and flexo printing machines.",
  },
  {
    value: 500,
    suffix: "+",
    label: "Machines Delivered",
    desc: "Successfully installed machines helping businesses improve production efficiency.",
  },
  {
    value: 100,
    suffix: "+",
    label: "Satisfied Clients",
    desc: "Building lasting partnerships through quality products and dedicated support.",
  },
];

// Count-up number that animates when scrolled into view.
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
      className="stats-font text-[44px] font-bold leading-none text-white sm:text-5xl lg:text-[56px]"
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const ImpactStats = () => {
  return (
    <section className="relative overflow-hidden">
      {/* background photo */}
      <Image
        src="/gallery2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* dark overlay — heavier on the left for text legibility */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,13,13,0.94) 0%, rgba(13,13,13,0.82) 45%, rgba(13,13,13,0.6) 100%)",
        }}
      />

      <div className="container relative">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* ── Left — copy ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow">Our Impact</span>

            <h2 className="text-[28px]! font-bold leading-[1.12] tracking-[-0.01em] text-white! sm:text-[34px]! lg:text-[42px]!">
              Powering Modern Paper Processing &amp; Printing
            </h2>

            <p className="max-w-xl text-[15px] leading-[1.7] text-white/70">
              Sagar Industries delivers precision-engineered machinery designed
              to help manufacturers increase productivity, maintain quality, and
              achieve reliable performance in every production cycle.
            </p>
          </motion.div>

          {/* ── Right — stats ────────────────────────────────────── */}
          <div className="grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              >
                <Counter value={s.value} suffix={s.suffix} />
                <div className="mt-3 text-[15px] font-bold text-white">
                  {s.label}
                </div>
                <span className="mt-3 block h-px w-10 bg-accent" />
                <p className="mt-3 text-[13px] leading-relaxed text-white/55">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
