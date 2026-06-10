// ─────────────────────────────────────────────────────────────────────
// Smart Tools › ROI & Cost (standalone section).
// Manual vs Automatic running-cost comparison → payback on the extra spend.
// Fully LIVE: cost cards, the RECOMMENDED badge, the payback ring and every
// stat / benefit recompute as the inputs change.
// Assumptions (tune here): 26 working days/month, 1.0 vs 0.6 operators per
// shift, 3 HP vs 6 HP motors, 60% load factor, 8 h shifts.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Calculator,
  FileText,
  Clock,
  User,
  Lightning,
  Gear,
  Package,
  Robot,
  Wallet,
  TrendUp,
  CalendarBlank,
  ChartPie,
  ShieldCheck,
  Headset,
  ArrowRight,
  Info,
} from "@phosphor-icons/react";

const ACCENT = "#ff6a0d";
const num = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));
const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));

// ── Input with a leading icon ────────────────────────────────────────
const IconField = ({ icon: Icon, label, value, onChange, step }) => (
  <div className="flex flex-col gap-2">
    <span className="text-[13px] font-semibold text-text-primary">{label}</span>
    <div className="relative">
      <Icon size={16} weight="bold" className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-accent" />
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-[10px] border-[1.5px] border-border bg-input py-3! pl-10! pr-3! font-semibold text-text-primary outline-none transition focus:border-accent"
      />
    </div>
  </div>
);

// ── Manual / Automatic cost card ─────────────────────────────────────
const CostCard = ({ icon: Icon, title, cost, recommended }) => (
  <div
    className="relative flex-1 overflow-hidden rounded-2xl p-5"
    style={
      recommended
        ? { background: `${ACCENT}1a`, border: `1.5px solid ${ACCENT}` }
        : { background: "var(--color-soft)", border: "1.5px solid var(--color-border)" }
    }
  >
    {recommended && (
      <span className="absolute right-0 top-0 rounded-bl-lg bg-gradient-to-br from-primary to-secondary px-3 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
        Recommended
      </span>
    )}
    <div className="flex items-center gap-3">
      <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${recommended ? "bg-gradient-to-br from-primary to-secondary text-white" : "bg-soft text-text-secondary"}`}>
        <Icon size={22} weight="bold" />
      </span>
      <div>
        <div className={`text-sm font-bold ${recommended ? "text-accent" : "text-text-primary"}`}>{title}</div>
        <div className="text-[11px] text-text-secondary">Cost / month</div>
      </div>
    </div>
    <div className={`mt-3 text-3xl font-bold ${recommended ? "text-accent" : "text-text-primary"}`}>{cost}</div>
  </div>
);

// ── A row in the stat list ───────────────────────────────────────────
const Row = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center gap-3 border-b border-border py-3 last:border-0">
    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-soft text-accent">
      <Icon size={15} weight="bold" />
    </span>
    <span className="flex-1 text-sm text-text-secondary">{label}</span>
    <span className={`font-bold ${accent ? "text-accent" : "text-text-primary"}`}>{value}</span>
  </div>
);

// ── Circular payback ring ────────────────────────────────────────────
const Ring = ({ pct, value, unit }) => {
  const R = 64;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative grid place-items-center">
      <svg width="150" height="150" viewBox="0 0 150 150" className="-rotate-90">
        <circle cx="75" cy="75" r={R} fill="none" stroke="var(--color-border)" strokeWidth="10" />
        <circle
          cx="75" cy="75" r={R} fill="none" stroke="url(#roiRing)" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="roiRing" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FF8A3D" />
            <stop offset="100%" stopColor={ACCENT} />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-bold text-accent">{value}</div>
        <div className="text-[11px] font-bold uppercase tracking-wide text-text-secondary">{unit}</div>
      </div>
    </div>
  );
};

const RoiCost = () => {
  const [volume, setVolume] = useState(4000);
  const [shifts, setShifts] = useState(2);
  const [labour, setLabour] = useState(600);
  const [rate, setRate] = useState(8);
  const [manualPrice, setManualPrice] = useState(350000);
  const [autoPrice, setAutoPrice] = useState(650000);

  const vol = num(volume), sh = num(shifts);

  // ── Cost model ─────────────────────────────────────────────────────
  const DAYS = 26;
  const manualLabourDay = num(labour) * sh * 1.0; // 1 operator / shift
  const autoLabourDay = num(labour) * sh * 0.6;   // lighter supervision
  const hours = sh * 8 * 0.6;                      // running hrs/day @ 60% load
  const manualPowerDay = 3 * 0.746 * hours * num(rate); // ≈3 HP → kW → ₹
  const autoPowerDay = 6 * 0.746 * hours * num(rate);   // ≈6 HP
  const manualMonth = (manualLabourDay + manualPowerDay) * DAYS;
  const autoMonth = (autoLabourDay + autoPowerDay) * DAYS;
  const saving = manualMonth - autoMonth;
  const extraInvest = num(autoPrice) - num(manualPrice);
  const per1000 = (month) => (vol > 0 ? (month / (vol * DAYS)) * 1000 : 0);
  const costReductionPct = manualMonth > 0 ? (saving / manualMonth) * 100 : 0;

  // ── Verdict / payback ──────────────────────────────────────────────
  const autoRecommended = saving > 0;
  const months = saving > 0 && extraInvest > 0 ? extraInvest / saving : null;
  const paybackText =
    months != null
      ? months < 12 ? `${Math.round(months)} Months` : `${(months / 12).toFixed(1)} Years`
      : saving > 0 ? "Instant" : "—";

  let ringValue = "—", ringUnit = "Manual wins";
  if (months != null) {
    if (months < 12) { ringValue = String(Math.round(months)); ringUnit = "Months"; }
    else { ringValue = (months / 12).toFixed(1); ringUnit = "Years"; }
  } else if (saving > 0) {
    ringValue = "0"; ringUnit = "Instant";
  }
  const ringPct = saving > 0 ? clamp(costReductionPct * 3, 8, 100) : 0;

  const tagline =
    saving <= 0
      ? "At this volume and shift pattern, automatic doesn't save enough to justify the extra cost."
      : months != null
        ? "Time for the automatic machine's running-cost savings to repay its extra purchase price."
        : "Automatic costs the same or less to buy — and is cheaper to run.";

  const STATS = [
    { icon: Coins, label: "Monthly saving (Auto)", value: money(saving), accent: true },
    { icon: Wallet, label: "Extra investment (Auto)", value: money(extraInvest) },
    { icon: FileText, label: "Manual — per 1,000 sheets", value: money(per1000(manualMonth)) },
    { icon: FileText, label: "Automatic — per 1,000 sheets", value: money(per1000(autoMonth)) },
  ];

  const BENEFITS = [
    { icon: TrendUp, label: "Save Every Month", value: money(Math.max(0, saving)), sub: "With Automatic" },
    { icon: CalendarBlank, label: "Payback Period", value: paybackText, sub: "To break even" },
    { icon: ChartPie, label: "Cost Reduction", value: costReductionPct > 0 ? `${costReductionPct.toFixed(1)}%` : "—", sub: "Lower running cost" },
    { icon: ShieldCheck, label: "Better Efficiency", value: "Higher Output", sub: "Less labour, more speed" },
  ];

  return (
    <section id="roi" className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">ROI &amp; Cost</span>
          <h2 className="">
            Manual vs <span className="text-accent">Automatic</span> — What Pays Off?
          </h2>
          <p className="mt-2 max-w-2xl text-text-secondary">
            Compare the monthly running cost of a manual and an automatic
            machine, and see how quickly the automatic pays back its extra price.
          </p>
        </div>

        {/* Inputs + comparison */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 lg:grid-cols-5"
        >
          {/* ── YOUR INPUTS ───────────────────────────────────────────── */}
          <div className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card md:p-7 lg:col-span-2">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-orange">
                <Calculator size={22} weight="bold" />
              </span>
              <div>
                <div className="text-base font-bold text-text-primary">Your Inputs</div>
                <div className="text-xs text-text-secondary">Adjust the values to match your production.</div>
              </div>
            </div>

            <div className="mt-6 grid gap-5">
              <IconField icon={FileText} label="Production volume (sheets / day)" value={volume} onChange={setVolume} />
              <IconField icon={Clock} label="Shifts / day" value={shifts} onChange={setShifts} />
              <IconField icon={User} label="Labour (₹ / operator / shift)" value={labour} onChange={setLabour} />
              <IconField icon={Lightning} label="Electricity (₹ / unit)" value={rate} onChange={setRate} step="0.5" />
              <IconField icon={Gear} label="Manual machine price (₹)" value={manualPrice} onChange={setManualPrice} />
              <IconField icon={Package} label="Automatic machine price (₹)" value={autoPrice} onChange={setAutoPrice} />
            </div>

            <p className="mt-5 flex items-center gap-2 text-xs text-text-secondary">
              <Info size={14} weight="bold" /> Defaults are editable estimates — adjust to your own figures.
            </p>
          </div>

          {/* ── COST COMPARISON (dark) ────────────────────────────────── */}
          <div className="rounded-[var(--radius-card)] bg-card p-6 text-text-primary shadow-card md:p-7 lg:col-span-3">
            <div className="text-xs font-bold uppercase tracking-wide text-text-secondary">Cost Comparison</div>

            {/* Manual vs Automatic */}
            <div className="relative mt-4 flex flex-col gap-3 sm:flex-row">
              <CostCard icon={User} title="Manual" cost={money(manualMonth)} recommended={!autoRecommended} />
              <CostCard icon={Robot} title="Automatic" cost={money(autoMonth)} recommended={autoRecommended} />
              <span className="absolute left-1/2 top-1/2 z-10 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-border bg-primary text-[11px] font-bold text-white">
                VS
              </span>
            </div>

            {/* Stats + payback ring */}
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <div>
                {STATS.map((s) => (
                  <Row key={s.label} icon={s.icon} label={s.label} value={s.value} accent={s.accent} />
                ))}
              </div>
              <div
                className="flex flex-col items-center rounded-2xl p-5 text-center"
                style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}40` }}
              >
                <span className="text-[11px] font-bold uppercase tracking-wide text-accent">Payback on Automatic</span>
                <div className="mt-3">
                  <Ring pct={ringPct} value={ringValue} unit={ringUnit} />
                </div>
                <p className="mt-3 text-xs leading-relaxed text-text-secondary">{tagline}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Benefits bar ──────────────────────────────────────────────── */}
        <div className="mx-auto mt-6 grid max-w-6xl gap-px overflow-hidden rounded-[var(--radius-card)] border border-border bg-bg shadow-card sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.label} className="flex items-center gap-4 bg-card p-5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                <b.icon size={22} weight="bold" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wide text-text-secondary">{b.label}</div>
                <div className="text-lg font-bold text-accent">{b.value}</div>
                <div className="text-[11px] text-text-secondary">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA bar ───────────────────────────────────────────────────── */}
        <div className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-center gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card">
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Headset size={20} weight="bold" className="text-accent" /> Need exact pricing for your production?
          </span>
          <a href="/contact#inquiry" className="btn-orange inline-flex items-center gap-2">
            Get Exact Pricing <ArrowRight size={16} weight="bold" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default RoiCost;
