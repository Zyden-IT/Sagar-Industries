// ─────────────────────────────────────────────────────────────────────
// Products › Machine Comparison — Manual vs Automatic at a glance.
// 3-column table: Feature (dark header) | Manual (highlighted orange column)
// | Automatic (dark header). Each row has a feature icon and check marks;
// orange checks for Manual, green for Automatic, with a few coloured winners.
// A recommender CTA bar closes the section.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { motion } from "framer-motion";
import {
  UsersThree,
  ChartBar,
  Gear,
  Gauge,
  Crosshair,
  ShieldCheck,
  CurrencyInr,
  Calculator,
  CheckCircle,
  ListChecks,
  HandTap,
  ChartLineUp,
  Sparkle,
  ArrowRight,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const GREEN = "#16A34A";

// tone: "green" | "accent" | undefined (default → manual=orange / auto=green check, dark text)
const ROWS = [
  { icon: UsersThree, feature: "Best for", manual: { t: "Small / medium scale" }, auto: { t: "High-volume continuous production" } },
  { icon: ChartBar, feature: "Daily output", manual: { t: "Lower volume" }, auto: { t: "High, consistent volume" } },
  { icon: Gear, feature: "Operator effort", manual: { t: "Manual handling & feeding" }, auto: { t: "Automated feed, less effort" } },
  { icon: Gauge, feature: "Speed", manual: { t: "Controlled / moderate" }, auto: { t: "High & uniform" } },
  { icon: Crosshair, feature: "Cutting accuracy", manual: { t: "Good, operator-dependent" }, auto: { t: "High & repeatable" } },
  { icon: ShieldCheck, feature: "Delicate materials", manual: { t: "Excellent control", tone: "green" }, auto: { t: "Good" } },
  { icon: CurrencyInr, feature: "Investment", manual: { t: "Lower", tone: "accent" }, auto: { t: "Higher", tone: "accent" } },
  { icon: Calculator, feature: "Cost per sheet at scale", manual: { t: "Higher", tone: "accent" }, auto: { t: "Lower", tone: "green" } },
];

const toneText = (tone, side) =>
  tone === "green" ? "" : tone === "accent" ? "text-accent" : "text-text-primary";
const toneStyle = (tone) => (tone === "green" ? { color: GREEN } : undefined);
const checkColor = (tone, side) =>
  tone === "green" ? GREEN : tone === "accent" ? "#ff6a0d" : side === "manual" ? "#ff6a0d" : GREEN;

const ValueCell = ({ data, side, highlight, borderB }) => (
  <div
    className={`flex items-center gap-2.5 px-5 py-4 text-sm ${borderB} ${
      highlight ? "border-x border-border bg-card" : "bg-card"
    }`}
  >
    <CheckCircle size={18} weight="fill" className="shrink-0" style={{ color: checkColor(data.tone, side) }} />
    <span className={`font-medium ${toneText(data.tone, side)}`} style={toneStyle(data.tone)}>
      {data.t}
    </span>
  </div>
);

const MachineComparison = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Quick Comparison</span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! md:whitespace-nowrap lg:text-[34px]!">
            Manual vs Automatic <span className="text-accent">at a Glance</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Compare manual and automatic paper cutting machines to pick the
            right fit for your output.
          </p>
        </div>

        {/* ── Table ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 max-w-5xl overflow-x-auto"
        >
          <div className="min-w-[680px] overflow-hidden rounded-2xl border border-border shadow-card">
            <div className="grid grid-cols-[1.2fr_1fr_1fr]">
              {/* Header row */}
              <div className="flex items-center gap-2.5 bg-primary px-5 py-4 text-white">
                <ListChecks size={20} weight="bold" className="text-accent" />
                <span className="font-bold uppercase tracking-wide">Feature</span>
              </div>
              <div className="flex items-center gap-2.5 bg-gradient-to-br from-primary to-secondary px-5 py-4 text-white">
                <HandTap size={20} weight="bold" />
                <span className="font-bold uppercase tracking-wide">Manual Machine</span>
              </div>
              <div className="flex items-center gap-2.5 bg-primary px-5 py-4 text-white">
                <ChartLineUp size={20} weight="bold" className="text-accent" />
                <span className="font-bold uppercase tracking-wide">Automatic Machine</span>
              </div>

              {/* Body rows */}
              {ROWS.map((r, i) => {
                const borderB = i === ROWS.length - 1 ? "" : "border-b border-border";
                return (
                  <div key={r.feature} className="contents">
                    {/* Feature cell */}
                    <div className={`flex items-center gap-3 bg-card px-5 py-4 ${borderB}`}>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <r.icon size={18} weight="bold" />
                      </span>
                      <span className="text-sm font-bold text-text-primary">{r.feature}</span>
                    </div>
                    {/* Manual cell (highlighted column) */}
                    <ValueCell data={r.manual} side="manual" highlight borderB={borderB} />
                    {/* Automatic cell */}
                    <div className={`flex items-center gap-2.5 bg-card px-5 py-4 text-sm ${borderB}`}>
                      <CheckCircle size={18} weight="fill" className="shrink-0" style={{ color: checkColor(r.auto.tone, "auto") }} />
                      <span className={`font-medium ${toneText(r.auto.tone, "auto")}`} style={toneStyle(r.auto.tone)}>
                        {r.auto.t}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ── Recommender CTA bar ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 flex max-w-5xl flex-col items-center justify-between gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card sm:flex-row sm:px-7"
        >
          <div className="flex items-center gap-4 text-center sm:text-left">
            <span className="hidden h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent sm:grid">
              <Sparkle size={24} weight="bold" />
            </span>
            <div>
              <h3 className="text-[15px]! font-bold! leading-tight sm:text-[16px]!">Not sure which fits?</h3>
              <p className="mt-0.5 text-sm text-text-secondary">
                Get a personalized recommendation from our experts.
              </p>
            </div>
          </div>
          <Link
            href="#recommender"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-primary to-secondary px-6 py-3.5 text-[12px] font-bold uppercase tracking-wide text-white! shadow-orange transition hover:scale-105"
          >
            Use the Machine Recommender
            <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default MachineComparison;
