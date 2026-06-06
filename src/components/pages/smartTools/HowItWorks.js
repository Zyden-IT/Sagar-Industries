// ─────────────────────────────────────────────────────────────────────
// Smart Tools › How It Works — a connected 4-step process flow. Numbered
// icon nodes joined by a connector line + arrows (desktop); stacked on
// mobile. Each step maps to a tool on this page. Pure content (no logic).
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Gauge, ChartLineUp, Wrench, PaperPlaneTilt, CaretRight } from "@phosphor-icons/react";

const STEPS = [
  { icon: Gauge, title: "Plan your capacity", desc: "See real sheets-per-day output before you buy." },
  { icon: ChartLineUp, title: "Check the returns", desc: "Compare manual vs automatic and the payback." },
  { icon: Wrench, title: "Size & cost it", desc: "Get motor power, reel yield and cost per sheet." },
  { icon: PaperPlaneTilt, title: "Build a spec & enquire", desc: "Send your spec for an exact quote." },
];

const HowItWorks = () => (
  <section className="section-py bg-bg">
    <div className="container">
      {/* Header */}
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
        <span className="eyebrow">How It Works</span>
        <h2 className="">
          From Numbers to the <span className="text-accent">Right Machine</span>
        </h2>
        <p className="text-text-secondary">Four quick steps — each maps to a tool on this page.</p>
      </div>

      {/* Process flow */}
      <div className="relative mx-auto mt-16 max-w-5xl">
        {/* connector line — dashed (desktop) */}
        <div
          className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-0 border-t-2 border-dashed border-accent/50 md:block"
        />
        {/* arrows between nodes (desktop) */}
        {[25, 50, 75].map((x) => (
          <CaretRight
            key={x}
            size={18}
            weight="bold"
            className="absolute top-8 hidden -translate-x-1/2 -translate-y-1/2 text-accent md:block"
            style={{ left: `${x}%` }}
          />
        ))}

        <div className="grid gap-10 md:grid-cols-4 md:gap-6">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
              className="group relative flex flex-col items-center text-center"
            >
              {/* node */}
              <div className="relative">
                <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-card text-accent shadow-card transition-colors duration-300 group-hover:border-accent">
                  <s.icon size={26} weight="bold" />
                </span>
                <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white shadow-orange">
                  {i + 1}
                </span>
              </div>

              <h3 className="mt-4 text-[15px]! font-bold! leading-tight">{s.title}</h3>
              <p className="mt-1.5 max-w-[200px] text-sm leading-snug text-text-secondary">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default HowItWorks;
