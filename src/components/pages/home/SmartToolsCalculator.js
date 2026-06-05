// ─────────────────────────────────────────────────────────────────────
// Home › Smart Tools Calculator — a compact, LIVE ROI preview that teases
// the full Smart Tools page. Left: copy + a strip of available tools + CTA.
// Right: a working mini ROI calculator (payback / ROI recompute live).
// All client-side. Colours from the project theme.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  TrendUp,
  ClockCountdown,
  Coins,
  ArrowRight,
  Scissors,
  ArrowsLeftRight,
  Receipt,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

// Other tools available on the Smart Tools page — shown as chips.
const TOOLS = [
  { icon: Calculator, label: "ROI Calculator" },
  { icon: Scissors, label: "Cost / Sheet" },
  { icon: ArrowsLeftRight, label: "Unit Converter" },
  { icon: Receipt, label: "EMI & Running Cost" },
];

const WORKING_DAYS = 26; // fixed assumption to keep the preview compact

const Slider = ({ label, value, onChange, min, max, step, prefix, display }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-semibold text-text-primary">{label}</label>
      <span className="text-sm font-bold text-accent">
        {prefix}
        {display ?? value}
      </span>
    </div>
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      className="accent-[var(--color-accent)]"
    />
  </div>
);

const SmartToolsCalculator = () => {
  const [investment, setInvestment] = useState(1500000);
  const [sheetsPerDay, setSheetsPerDay] = useState(20000);
  const [profitPerSheet, setProfitPerSheet] = useState(0.5);

  const monthlyProfit = sheetsPerDay * WORKING_DAYS * profitPerSheet;
  const paybackMonths = monthlyProfit > 0 ? investment / monthlyProfit : 0;
  const annualROI = investment > 0 ? ((monthlyProfit * 12) / investment) * 100 : 0;

  const inr = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const compactInr = (n) =>
    n >= 100000 ? `₹${(n / 100000).toFixed(1)}L` : inr(n);

  return (
    <section className="section-py bg-soft">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — copy + tools + CTA ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow">Smart Tools</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
              Calculate Your <span className="text-accent">Machine ROI</span> Before You Invest
            </h2>
            <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
            <p className="max-w-md text-text-secondary">
              Use our free smart tools to estimate ROI, running cost and output,
              then choose your machine with confidence.
            </p>

            {/* tool chips */}
            <ul className="flex flex-wrap gap-2.5">
              {TOOLS.map((t) => (
                <li
                  key={t.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-2 text-[13px] font-semibold text-text-primary shadow-card"
                >
                  <t.icon size={16} weight="bold" className="text-accent" />
                  {t.label}
                </li>
              ))}
            </ul>

            <Link
              href={Routes.solutions.urlPath}
              className="btn-orange btn-lg mt-2 w-fit"
            >
              Explore All Smart Tools <ArrowRight size={16} weight="bold" />
            </Link>
          </motion.div>

          {/* ── Right — live mini ROI calculator ──────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-accent/10 text-accent">
                <Calculator size={22} weight="regular" />
              </span>
              <div>
                <h3 className="text-[16px]! font-bold! leading-tight">
                  Quick ROI Estimate
                </h3>
                <p className="text-[12px]! text-text-secondary">
                  Drag the sliders to see live results
                </p>
              </div>
            </div>

            {/* inputs */}
            <div className="mt-6 flex flex-col gap-5">
              <Slider
                label="Machine Investment"
                value={investment}
                onChange={setInvestment}
                min={300000}
                max={8000000}
                step={50000}
                display={compactInr(investment)}
              />
              <Slider
                label="Sheets / Day"
                value={sheetsPerDay}
                onChange={setSheetsPerDay}
                min={1000}
                max={100000}
                step={1000}
                display={sheetsPerDay.toLocaleString("en-IN")}
              />
              <Slider
                label="Profit / Sheet"
                value={profitPerSheet}
                onChange={setProfitPerSheet}
                min={0.1}
                max={10}
                step={0.1}
                prefix="₹"
              />
            </div>

            {/* results */}
            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-6">
              {[
                {
                  icon: ClockCountdown,
                  label: "Payback",
                  value:
                    paybackMonths > 0 ? `${paybackMonths.toFixed(1)} mo` : "—",
                },
                {
                  icon: TrendUp,
                  label: "Annual ROI",
                  value: `${annualROI.toFixed(0)}%`,
                },
                {
                  icon: Coins,
                  label: "Monthly Profit",
                  value: compactInr(monthlyProfit),
                },
              ].map((r) => (
                <div
                  key={r.label}
                  className="rounded-[14px] border border-border bg-soft p-3.5 text-center"
                >
                  <r.icon size={20} weight="bold" className="mx-auto text-accent" />
                  <div
                    className="stats-font mt-2 bg-clip-text text-[17px] font-bold text-transparent"
                    style={{ backgroundImage: "var(--orange-gradient)" }}
                  >
                    {r.value}
                  </div>
                  <p className="mt-0.5 text-[11px]! text-text-secondary">{r.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-center text-[11px]! text-text-secondary">
              * Indicative estimate. Try the full calculator for a detailed
              breakdown.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartToolsCalculator;
