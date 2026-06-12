// ─────────────────────────────────────────────────────────────────────
// About › Company Story — roller-coaster "journey" timeline.
// Desktop: a wavy track with year markers; hover a year → detail popup.
// Mobile: a clean vertical milestone list. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";

// type: "valley" (low point, popup above) | "peak" (high point, popup below)
const MILES = [
  { year: "2008", title: "Humble Beginnings", desc: "Started as a small workshop in Ahmedabad building paper cutting machines.", x: "10%", y: "66.67%", type: "valley" },
  { year: "2013", title: "Growing Capacity", desc: "Expanded our facility and added Flexo Printing machine manufacturing.", x: "30%", y: "26.67%", type: "peak" },
  { year: "2017", title: "Engineering Depth", desc: "Strengthened in-house design, fabrication and quality testing.", x: "50%", y: "66.67%", type: "valley" },
  { year: "2021", title: "Going Global", desc: "Began exporting our machines to international clients.", x: "70%", y: "26.67%", type: "peak" },
  { year: "Today", title: "Trusted Partner", desc: "2000+ machines installed across paper, packaging & printing.", x: "90%", y: "66.67%", type: "valley" },
];

const TRACK_PATH =
  "M 0 200 L 100 200 C 180 200 220 80 300 80 C 380 80 420 200 500 200 C 580 200 620 80 700 80 C 780 80 820 200 900 200 L 1000 200";
const SUPPORTS = [
  [100, 200], [300, 80], [500, 200], [700, 80], [900, 200],
];

// Four clouds — two left, two right (left/top in %, w in px, o = opacity)
const CLOUDS = [
  { left: "4%", top: "22%", w: 200, o: 0.95 }, // left
  { left: "18%", top: "7%", w: 160, o: 0.95 }, // left
  { left: "75%", top: "7%", w: 160, o: 0.95 }, // right
  { left: "85%", top: "22%", w: 200, o: 0.95 }, // right
];

const CompanyStory = () => {
  return (
    <section className="relative section-py bg-bg">
      {/* Cloud sky background (upper area) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-accent/5 to-transparent" />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          className="pointer-events-none absolute hidden sm:block"
          style={{ left: c.left, top: c.top, width: c.w, opacity: c.o }}
        >
          <div className="relative aspect-[3/2] w-full">
            <Image src="/cloud.png" alt="" fill className="object-contain" />
          </div>
        </div>
      ))}

      <div className="container relative z-10">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">Our Story</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Our Journey <span className="text-accent">So Far</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            From a small Ahmedabad workshop to a trusted machine manufacturer —
            hover a year to see the story.
          </p>
        </div>

        {/* ── Desktop: roller-coaster track ─────────────────────── */}
        <div className="relative mt-16 hidden aspect-[10/3] w-full md:block">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            <defs>
              <linearGradient id="trackGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ff6a0d" />
                <stop offset="100%" stopColor="#d40e14" />
              </linearGradient>
            </defs>
            {/* support beams */}
            {SUPPORTS.map(([x, y]) => (
              <line key={x} x1={x} y1={y} x2={x} y2="300" stroke="var(--color-border)" strokeWidth="2" />
            ))}
            <line x1="0" y1="300" x2="1000" y2="300" stroke="var(--color-border)" strokeWidth="2" />
            {/* track */}
            <path d={TRACK_PATH} fill="none" stroke="url(#trackGrad)" strokeWidth="6" strokeLinecap="round" />
          </svg>

          {/* Markers — a car sits on the track at each year (front faces right) */}
          {MILES.map((m) => (
            <div
              key={m.year}
              className="group absolute z-10"
              style={{ left: m.x, top: m.y }}
            >
              {/* Car, resting on the track */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 transition-transform duration-300 group-hover:-translate-y-1.5">
                <div className="relative h-11 w-[68px] sm:h-14 sm:w-[88px]">
                  <Image src="/car.png" alt="" fill className="object-contain" />
                </div>
              </div>

              {/* Year label (below the track point) */}
              <span className="absolute left-1/2 top-2 -translate-x-1/2 whitespace-nowrap text-sm font-bold text-text-primary transition-opacity duration-200 group-hover:opacity-0">
                {m.year}
              </span>

              {/* Popup (appears above the car on hover) */}
              <div className="pointer-events-none absolute bottom-16 left-1/2 z-30 w-56 -translate-x-1/2 -translate-y-2 rounded-[var(--radius-card)] border border-border bg-card p-4 text-left opacity-0 shadow-card transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <div className="text-xs font-bold text-accent">{m.year}</div>
                <h3 className="mt-0.5 text-[15px]! font-semibold">{m.title}</h3>
                <p className="mt-1 text-sm text-text-secondary">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mobile: vertical list ─────────────────────────────── */}
        <div className="relative mt-12 md:hidden">
          <div className="absolute left-3 top-2 h-full w-px bg-[var(--color-border)]" />
          <div className="flex flex-col gap-8">
            {MILES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-5"
              >
                <span className="relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-primary to-secondary shadow-orange ring-4 ring-[var(--color-bg)]" />
                <div>
                  <span className="stats-font text-lg font-bold text-accent">{m.year}</span>
                  <h3 className="text-[16px]! font-semibold">{m.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{m.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyStory;
