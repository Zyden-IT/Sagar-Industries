// ─────────────────────────────────────────────────────────────────────
// Smart Tools › ROI Calculator — live calculator.
// Inputs (investment, sheets/day, profit/sheet, working days) → computed
// monthly profit, payback period and annual ROI. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import { Coins, TrendUp, ClockCountdown, ChartLineUp } from "@phosphor-icons/react";

const Field = ({ label, value, onChange, min, max, step = 1, prefix, suffix }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-text-primary">{label}</label>
    <div className="flex items-center gap-2">
      {prefix && <span className="text-sm text-text-secondary">{prefix}</span>}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {suffix && <span className="whitespace-nowrap text-sm text-text-secondary">{suffix}</span>}
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

const RoiCalculator = () => {
  const [investment, setInvestment] = useState(1500000);
  const [sheetsPerDay, setSheetsPerDay] = useState(20000);
  const [profitPerSheet, setProfitPerSheet] = useState(0.5);
  const [workingDays, setWorkingDays] = useState(26);

  const monthlySheets = sheetsPerDay * workingDays;
  const monthlyProfit = monthlySheets * profitPerSheet;
  const paybackMonths = monthlyProfit > 0 ? investment / monthlyProfit : 0;
  const annualROI = investment > 0 ? ((monthlyProfit * 12) / investment) * 100 : 0;

  const inr = (n) =>
    "₹" + Math.round(n).toLocaleString("en-IN");

  const RESULTS = [
    { icon: TrendUp, label: "Monthly Profit", value: inr(monthlyProfit) },
    { icon: Coins, label: "Annual Profit", value: inr(monthlyProfit * 12) },
    {
      icon: ClockCountdown,
      label: "Payback Period",
      value: paybackMonths > 0 ? `${paybackMonths.toFixed(1)} months` : "—",
    },
    {
      icon: ChartLineUp,
      label: "Annual ROI",
      value: `${annualROI.toFixed(0)}%`,
    },
  ];

  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            ROI Calculator
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Estimate Your <span className="text-accent">Return on Investment</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Adjust the figures to see your expected profit and how quickly a
            machine pays for itself.
          </p>
        </div>

        {/* Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card md:p-8 lg:grid-cols-2"
        >
          {/* Inputs */}
          <div className="flex flex-col gap-6">
            <Field
              label="Machine Investment"
              value={investment}
              onChange={setInvestment}
              min={300000}
              max={8000000}
              step={50000}
              prefix="₹"
            />
            <Field
              label="Sheets Produced / Day"
              value={sheetsPerDay}
              onChange={setSheetsPerDay}
              min={1000}
              max={100000}
              step={1000}
            />
            <Field
              label="Profit per Sheet"
              value={profitPerSheet}
              onChange={setProfitPerSheet}
              min={0.1}
              max={10}
              step={0.1}
              prefix="₹"
            />
            <Field
              label="Working Days / Month"
              value={workingDays}
              onChange={setWorkingDays}
              min={20}
              max={31}
              step={1}
              suffix="days"
            />
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 self-start">
            {RESULTS.map((r) => (
              <div
                key={r.label}
                className="rounded-[var(--radius-card)] border border-border bg-soft p-5"
              >
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <r.icon size={20} weight="bold" />
                </span>
                <div
                  className="stats-font mt-3 bg-clip-text text-xl font-bold text-transparent lg:text-2xl"
                  style={{ backgroundImage: "var(--orange-gradient)" }}
                >
                  {r.value}
                </div>
                <p className="mt-1 text-xs text-text-secondary">{r.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <p className="mx-auto mt-4 max-w-5xl text-center text-xs text-text-secondary">
          * Estimates only. Actual results depend on material, run time and
          market conditions.
        </p>
      </div>
    </section>
  );
};

export default RoiCalculator;
