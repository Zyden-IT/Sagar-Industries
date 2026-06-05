// ─────────────────────────────────────────────────────────────────────
// Products › Machine Comparison — Manual vs Automatic at a glance.
// Minimal, professional layout with two equally-weighted machine columns.
// Each value carries a semantic status — pro (✓ green), con (✗ red),
// neutral (• grey). Responsive: a clean 3-column table on md+, and a
// stacked per-feature card layout on mobile (no horizontal scrolling).
// ─────────────────────────────────────────────────────────────────────

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
  XCircle,
  MinusCircle,
  ListChecks,
  HandTap,
  ChartLineUp,
} from "@phosphor-icons/react";

// status: "pro" | "con" | "neutral"
const ROWS = [
  { icon: UsersThree, feature: "Best for", manual: { t: "Small / medium scale", s: "neutral" }, auto: { t: "High-volume continuous production", s: "neutral" } },
  { icon: ChartBar, feature: "Daily output", manual: { t: "Lower volume", s: "con" }, auto: { t: "High, consistent volume", s: "pro" } },
  { icon: Gear, feature: "Operator effort", manual: { t: "Manual handling & feeding", s: "con" }, auto: { t: "Automated feed, less effort", s: "pro" } },
  { icon: Gauge, feature: "Speed", manual: { t: "Controlled / moderate", s: "neutral" }, auto: { t: "High & uniform", s: "pro" } },
  { icon: Crosshair, feature: "Cutting accuracy", manual: { t: "Good, operator-dependent", s: "neutral" }, auto: { t: "High & repeatable", s: "pro" } },
  { icon: ShieldCheck, feature: "Delicate materials", manual: { t: "Excellent control", s: "pro" }, auto: { t: "Good", s: "neutral" } },
  { icon: CurrencyInr, feature: "Investment", manual: { t: "Lower", s: "pro" }, auto: { t: "Higher", s: "con" } },
  { icon: Calculator, feature: "Cost per sheet at scale", manual: { t: "Higher", s: "con" }, auto: { t: "Lower", s: "pro" } },
];

const STATUS = {
  pro: { Icon: CheckCircle, color: "#16A34A", text: "text-text-primary" },
  con: { Icon: XCircle, color: "#DC2626", text: "text-text-secondary" },
  neutral: { Icon: MinusCircle, color: "#9CA3AF", text: "text-text-secondary" },
};

// Icon + value text — shared by the table cells and the mobile cards.
const StatusValue = ({ data, className = "" }) => {
  const { Icon, color, text } = STATUS[data.s] ?? STATUS.neutral;
  return (
    <span className={`flex items-start gap-2 text-sm ${className}`}>
      <Icon size={18} weight="fill" className="mt-px shrink-0" style={{ color }} />
      <span className={`font-medium ${text}`}>{data.t}</span>
    </span>
  );
};

const HEAD = "px-5 py-4 text-xs font-bold uppercase tracking-wide text-text-primary";

const MachineComparison = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Quick Comparison</span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[34px]!">
            Manual vs Automatic <span className="text-accent">at a Glance</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Compare manual and automatic paper cutting machines to pick the
            right fit for your output.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 max-w-5xl"
        >
          {/* ── Table (md and up) ─────────────────────────────────── */}
          <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
            <div className="grid grid-cols-[1.2fr_1fr_1fr]">
              {/* Header row */}
              <div className={`flex items-center gap-2.5 border-b border-border bg-soft ${HEAD}`}>
                <ListChecks size={18} weight="bold" className="text-accent" />
                <span>Feature</span>
              </div>
              <div className={`flex items-center gap-2.5 border-b border-l border-border bg-soft ${HEAD}`}>
                <HandTap size={18} weight="bold" className="text-accent" />
                <span>Manual Machine</span>
              </div>
              <div className={`flex items-center gap-2.5 border-b border-l border-border bg-soft ${HEAD}`}>
                <ChartLineUp size={18} weight="bold" className="text-accent" />
                <span>Automatic Machine</span>
              </div>

              {/* Body rows */}
              {ROWS.map((r, i) => {
                const borderB = i === ROWS.length - 1 ? "" : "border-b border-border";
                return (
                  <div key={r.feature} className="contents">
                    <div className={`flex items-center gap-3 px-5 py-4 ${borderB}`}>
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <r.icon size={18} weight="bold" />
                      </span>
                      <span className="text-sm font-bold text-text-primary">{r.feature}</span>
                    </div>
                    <div className={`border-l border-border px-5 py-4 ${borderB}`}>
                      <StatusValue data={r.manual} />
                    </div>
                    <div className={`border-l border-border px-5 py-4 ${borderB}`}>
                      <StatusValue data={r.auto} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Cards (mobile) ────────────────────────────────────── */}
          <div className="flex flex-col gap-4 md:hidden">
            {ROWS.map((r) => (
              <div
                key={r.feature}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
              >
                {/* Feature title */}
                <div className="flex items-center gap-3 border-b border-border bg-soft px-4 py-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <r.icon size={18} weight="bold" />
                  </span>
                  <span className="text-sm font-bold text-text-primary">{r.feature}</span>
                </div>
                {/* Manual / Automatic side by side */}
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-2 px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-text-secondary">
                      <HandTap size={14} weight="bold" className="text-accent" /> Manual
                    </span>
                    <StatusValue data={r.manual} />
                  </div>
                  <div className="flex flex-col gap-2 border-l border-border px-4 py-3.5">
                    <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-text-secondary">
                      <ChartLineUp size={14} weight="bold" className="text-accent" /> Automatic
                    </span>
                    <StatusValue data={r.auto} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-text-secondary">
            <span className="flex items-center gap-1.5">
              <CheckCircle size={15} weight="fill" style={{ color: STATUS.pro.color }} /> Advantage
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle size={15} weight="fill" style={{ color: STATUS.con.color }} /> Trade-off
            </span>
            <span className="flex items-center gap-1.5">
              <MinusCircle size={15} weight="fill" style={{ color: STATUS.neutral.color }} /> Neutral
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MachineComparison;
