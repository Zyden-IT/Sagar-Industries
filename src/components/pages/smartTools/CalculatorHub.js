// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Calculator Hub — one tabbed hub with 8 independent tools.
// Each tool = left input form + right dark result panel. All client-side.
//   1 Throughput    2 Cost / Sheet   3 Sheet Yield   4 Power (HP)
//   5 Running Cost  6 Flexo Cost     7 Reel          8 EMI
// (Machine Recommender, Unit Converter, Spec Builder & ROI & Cost each have
// their own sections.)  Edit CONFIG (currency) below.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Scissors,
  Scroll,
  Lightning,
  Palette,
  Bank,
  Gauge,
  Plug,
  Receipt,
  Gear,
  Warning,
} from "@phosphor-icons/react";

const CONFIG = { CURRENCY: "₹" };

const num = (v) => (isNaN(parseFloat(v)) ? 0 : parseFloat(v));
const money = (n) => CONFIG.CURRENCY + Math.round(n).toLocaleString("en-IN");

// ── Shared UI bits ───────────────────────────────────────────────────
const selectCls =
  "w-full cursor-pointer rounded-[10px] border-[1.5px] border-input-border bg-input px-4 py-3 text-text-primary outline-none shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] transition focus:border-accent";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm font-semibold text-text-primary">{label}</span>
    {children}
  </div>
);

const Panel = ({ children }) => (
  <div className="rounded-[var(--radius-card)] bg-card p-6 text-text-primary shadow-card md:p-7">
    {children}
  </div>
);

const Stat = ({ label, value }) => (
  <div className="flex items-center justify-between border-b border-border py-3 last:border-0">
    <span className="text-sm text-text-secondary">{label}</span>
    <span className="font-bold text-text-primary">{value}</span>
  </div>
);

const Empty = ({ children }) => (
  <div className="flex h-full min-h-[260px] flex-col items-center justify-center gap-3 text-center">
    <Gear size={40} weight="duotone" className="text-text-secondary" />
    <span className="max-w-xs text-sm text-text-secondary">{children}</span>
  </div>
);

const Grid = ({ form, result }) => (
  <div className="grid gap-6 lg:grid-cols-2">
    <div className="rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card md:p-7">
      {form}
    </div>
    {result}
  </div>
);

// ── 1. Sheet Yield / Wastage ─────────────────────────────────────────
// Sheets per roll + trim wastage + weights. Roll length, sheet length and
// roll width are required; GSM only drives the weight rows.
function Yield() {
  const [rollLen, setRollLen] = useState(5000); // running metres
  const [sheetLen, setSheetLen] = useState(600); // mm
  const [rollWidth, setRollWidth] = useState(1200); // mm
  const [gsm, setGsm] = useState(120);

  const rollLenM = num(rollLen), sheetMm = num(sheetLen), widthMm = num(rollWidth), g = num(gsm);
  const valid = rollLenM > 0 && sheetMm > 0 && widthMm > 0;

  const rollLenMm = rollLenM * 1000;
  const sheets = sheetMm > 0 ? Math.floor(rollLenMm / sheetMm) : 0;
  const usedMm = sheets * sheetMm;
  const trimMm = rollLenMm - usedMm;
  const wastePct = rollLenMm > 0 ? (trimMm / rollLenMm) * 100 : 0;

  const sheetAreaM2 = (widthMm * sheetMm) / 1e6;   // mm² → m²
  const sheetWeightG = sheetAreaM2 * g;            // GSM = g/m²
  const rollAreaM2 = (widthMm / 1000) * rollLenM;  // full roll area
  const rollWeightKg = (rollAreaM2 * g) / 1000;
  const sheetsPerKg = sheetWeightG > 0 ? 1000 / sheetWeightG : 0;

  const STATS = [
    { label: "Sheets / roll", value: sheets.toLocaleString("en-IN") },
    { label: "Trim wastage", value: `${Math.round(trimMm).toLocaleString("en-IN")} mm · ${wastePct.toFixed(2)} %` },
    { label: "Weight / sheet", value: sheetWeightG > 0 ? `${sheetWeightG.toFixed(1)} g` : "—" },
    { label: "Sheets / kg", value: sheetsPerKg > 0 ? Math.round(sheetsPerKg).toLocaleString("en-IN") : "—" },
    { label: "Roll weight", value: rollWeightKg > 0 ? `${rollWeightKg.toFixed(1)} kg` : "—" },
  ];

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Roll Length (m)"><input type="number" min="1" value={rollLen} onChange={(e) => setRollLen(e.target.value)} /></Field>
          <Field label="Sheet Length (mm)"><input type="number" min="1" value={sheetLen} onChange={(e) => setSheetLen(e.target.value)} /></Field>
          <Field label="Roll Width (mm)"><input type="number" min="1" value={rollWidth} onChange={(e) => setRollWidth(e.target.value)} /></Field>
          <Field label="GSM (for weight)"><input type="number" value={gsm} onChange={(e) => setGsm(e.target.value)} /></Field>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter roll length, sheet length and roll width to see the yield.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Yield per Roll</div>
              <div className="mt-3">
                {STATS.map((s) => <Stat key={s.label} label={s.label} value={s.value} />)}
              </div>
              {wastePct > 2 && (
                <div className="mt-4 rounded-[10px] border border-warning/30 bg-warning/10 p-4">
                  <div className="mb-1.5 flex items-center gap-2 text-warning">
                    <Warning size={16} weight="fill" />
                    <span className="text-xs font-bold uppercase tracking-wide">Note</span>
                  </div>
                  <span className="text-xs text-text-secondary">
                    Trim wastage is over 2% — adjusting the sheet length can fit the roll more evenly and reduce offcut.
                  </span>
                </div>
              )}
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── 2. Power (HP) ────────────────────────────────────────────────────
// Suggests a motor size from material cutting-effort + roll width + speed.
// `effort` scales the heuristic (paper = 1.0 … aluminium = 1.8); result is
// clamped to the 2–9 HP datasheet range.
const POWER_MATERIALS = [
  { key: "paper", name: "Paper", label: "Paper (14–1000 GSM)", effort: 1.0 },
  { key: "aluminium", name: "Aluminium Foil", label: "Aluminium Foil", effort: 1.8 },
  { key: "non-woven", name: "Non-Woven Fabric", label: "Non-Woven Fabric", effort: 1.1 },
  { key: "jute", name: "Jute", label: "Jute", effort: 1.4 },
  { key: "wood-veneer", name: "Wood Veneer", label: "Wood Veneer", effort: 1.5 },
  { key: "rexine", name: "Rexine", label: "Rexine", effort: 1.2 },
  { key: "sponge", name: "Sponge Sheet", label: "Sponge Sheet", effort: 1.05 },
  { key: "epe-foam", name: "EPE Foam Sheet", label: "EPE Foam Sheet", effort: 1.05 },
];

function Power() {
  const [material, setMaterial] = useState("paper");
  const [width, setWidth] = useState(45);
  const [speed, setSpeed] = useState(60);

  const w = num(width), s = num(speed);
  const valid = w > 0 && s > 0;
  const mat = POWER_MATERIALS.find((m) => m.key === material) || POWER_MATERIALS[0];
  const effort = mat.effort;

  const raw = 1.5 + w / 25 + s / 50 + (effort - 1) * 2;
  const hp = Math.min(9, Math.max(2, Math.round(raw)));
  const kw = hp * 0.746;
  const unitsPerHour = hp * 0.746 * 0.6; // kWh/hr at 60% load

  return (
    <Grid
      form={
        <div className="flex flex-col gap-5">
          <Field label="Material Type">
            <select className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
              {POWER_MATERIALS.map((m) => (
                <option key={m.key} value={m.key}>{m.label}</option>
              ))}
            </select>
          </Field>
          <Field label="Roll Width (inches)"><input type="number" min="1" step="0.5" value={width} onChange={(e) => setWidth(e.target.value)} /></Field>
          <Field label="Target Speed (sheets / min)"><input type="number" min="1" value={speed} onChange={(e) => setSpeed(e.target.value)} /></Field>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter a roll width and target speed to size the motor.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Suggested Motor</div>
              <div className="mt-2 text-4xl font-bold text-accent">{hp} HP</div>
              <p className="mt-1 text-sm text-text-secondary">
                For {mat.name} at {w}&quot; roll width and {s} sheets/min.
              </p>
              <div className="mt-4">
                <Stat label="Motor power" value={`${hp} HP · ${kw.toFixed(2)} kW`} />
                <Stat label="Est. consumption" value={`${unitsPerHour.toFixed(2)} units / hr`} />
                <Stat label="Material factor" value={`×${effort}`} />
                <Stat label="Datasheet range" value="2 HP – 9 HP" />
              </div>
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── 3. Flexo Colour Cost ─────────────────────────────────────────────
// Ink-only estimate: 0.9 g per colour at medium coverage, scaled by a
// coverage multiplier, across the run. Cost/piece is fractional so it
// bypasses money() (which rounds to whole rupees).
const COVERAGE = [
  { label: "Light", value: 0.6 },
  { label: "Medium", value: 1 },
  { label: "Heavy", value: 1.6 },
];

function Flexo() {
  const [colours, setColours] = useState(4);
  const [pieces, setPieces] = useState(50000);
  const [coverage, setCoverage] = useState(1);
  const [inkPrice, setInkPrice] = useState(220);

  const c = num(colours), p = num(pieces), cov = num(coverage), price = num(inkPrice);
  const valid = p > 0;

  const gramsPerPiece = 0.9 * c * cov;
  const totalKg = (gramsPerPiece * p) / 1000;
  const totalCost = totalKg * price;
  const perPiece = p > 0 ? totalCost / p : 0;

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Number of Colours">
            <select className={selectCls} value={colours} onChange={(e) => setColours(e.target.value)}>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </Field>
          <Field label="Run Length (pieces)"><input type="number" min="1" value={pieces} onChange={(e) => setPieces(e.target.value)} /></Field>
          <Field label="Ink Coverage">
            <select className={selectCls} value={coverage} onChange={(e) => setCoverage(e.target.value)}>
              {COVERAGE.map((o) => <option key={o.label} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Ink Price (₹ / kg)"><input type="number" min="0" value={inkPrice} onChange={(e) => setInkPrice(e.target.value)} /></Field>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter a run length to estimate the ink cost.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Ink &amp; Cost</div>
              <div className="mt-3">
                <Stat label="Ink / piece" value={`${gramsPerPiece.toFixed(2)} g`} />
                <Stat label="Total ink" value={`${totalKg.toFixed(2)} kg`} />
                <Stat label="Total ink cost" value={money(totalCost)} />
                <Stat label="Cost / piece" value={`${CONFIG.CURRENCY}${perPiece.toFixed(3)}`} />
                <Stat label="Colours" value={c} />
              </div>
              <p className="mt-3 text-xs text-text-secondary">
                Ink-only estimate — excludes plates, substrate and setup.
              </p>
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── 4. Reel Calculator ───────────────────────────────────────────────
// Roll geometry → paper length, roll weight, sheets per roll, thickness.
function Reel() {
  const [od, setOd] = useState(800);
  const [core, setCore] = useState(76);
  const [gsm, setGsm] = useState(120);
  const [width, setWidth] = useState(1200);
  const [sheetLen, setSheetLen] = useState(600);

  const thicknessMm = num(gsm) / 0.8 / 1000; // GSM → µm → mm
  const ring = (Math.PI / 4) * (num(od) ** 2 - num(core) ** 2); // mm² cross-section
  const lengthM = thicknessMm > 0 ? ring / thicknessMm / 1000 : 0;
  const weightKg = (lengthM * (num(width) / 1000) * num(gsm)) / 1000;
  const sheets = num(sheetLen) > 0 ? Math.floor((lengthM * 1000) / num(sheetLen)) : 0;

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Roll Outer Ø (mm)"><input type="number" value={od} onChange={(e) => setOd(e.target.value)} /></Field>
          <Field label="Core Ø (mm)"><input type="number" value={core} onChange={(e) => setCore(e.target.value)} /></Field>
          <Field label="GSM"><input type="number" value={gsm} onChange={(e) => setGsm(e.target.value)} /></Field>
          <Field label="Roll Width (mm)"><input type="number" value={width} onChange={(e) => setWidth(e.target.value)} /></Field>
          <div className="sm:col-span-2">
            <Field label="Sheet Length — for yield (mm)"><input type="number" value={sheetLen} onChange={(e) => setSheetLen(e.target.value)} /></Field>
          </div>
        </div>
      }
      result={
        <Panel>
          <div className="text-xs uppercase tracking-wide text-text-secondary">On the Reel</div>
          <div
            className="stats-font mt-2 bg-clip-text text-3xl font-bold text-transparent"
            style={{ backgroundImage: "var(--orange-gradient)" }}
          >
            {lengthM > 0 ? `${Math.round(lengthM).toLocaleString("en-IN")} m` : "—"}
          </div>
          <div className="mt-3">
            <Stat label="Paper length" value={`${Math.round(lengthM).toLocaleString("en-IN")} m`} />
            <Stat label="Roll weight" value={`${weightKg.toFixed(1)} kg`} />
            <Stat label="Sheets per roll" value={sheets.toLocaleString("en-IN")} />
            <Stat label="Paper thickness" value={`${(thicknessMm * 1000).toFixed(0)} µm`} />
          </div>
        </Panel>
      }
    />
  );
}

// ── 5. EMI Calculator ────────────────────────────────────────────────
// Price − down → loan, then standard reducing-balance EMI over the tenure.
function Emi() {
  const [price, setPrice] = useState(1500000);
  const [down, setDown] = useState(300000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(36);

  const principal = Math.max(0, num(price) - num(down));
  const r = num(rate) / 12 / 100;
  const n = num(tenure);
  const emi = r > 0 ? (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1) : n > 0 ? principal / n : 0;
  const totalPay = emi * n;
  const interest = totalPay - principal;

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Machine Price (₹)"><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} /></Field>
          <Field label="Down Payment (₹)"><input type="number" value={down} onChange={(e) => setDown(e.target.value)} /></Field>
          <Field label="Interest Rate (% p.a.)"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} /></Field>
          <Field label="Tenure (months)"><input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} /></Field>
        </div>
      }
      result={
        <Panel>
          <div className="text-xs uppercase tracking-wide text-text-secondary">Monthly EMI</div>
          <div
            className="stats-font mt-2 bg-clip-text text-4xl font-bold text-transparent"
            style={{ backgroundImage: "var(--orange-gradient)" }}
          >
            {emi > 0 ? money(emi) : "—"}
          </div>
          <div className="mt-4">
            <Stat label="Loan amount" value={money(principal)} />
            <Stat label="Total interest" value={money(interest)} />
            <Stat label="Total payable" value={money(totalPay + num(down))} />
          </div>
        </Panel>
      }
    />
  );
}

// ── 6. Throughput Planner ────────────────────────────────────────────
// Capacity from speed + shift pattern + OEE − downtime. Pure sheets (no ₹);
// answers the "sheets/day" the ROI tool otherwise asks the buyer to guess.
function Throughput() {
  const [speed, setSpeed] = useState(120);
  const [shiftHours, setShiftHours] = useState(8);
  const [shifts, setShifts] = useState(2);
  const [oee, setOee] = useState(75);
  const [downtime, setDowntime] = useState(30);
  const [target, setTarget] = useState(0);

  const sp = num(speed), sh = num(shiftHours), shf = num(shifts);
  const eff = num(oee), dt = num(downtime), tgt = num(target);
  const valid = sp > 0 && shf > 0 && sh > 0;

  const grossMin = shf * sh * 60;
  const effMin = Math.max(0, grossMin - dt);
  const effHours = effMin / 60;
  const sheetsPerDay = sp * effMin * (eff / 100);
  const sheetsPerShift = shf > 0 ? sheetsPerDay / shf : 0;
  const sheetsPerMonth = sheetsPerDay * 26;
  const pctTarget = tgt > 0 ? (sheetsPerDay / tgt) * 100 : 0;
  const headline = Math.round(sheetsPerDay).toLocaleString("en-IN");

  const STATS = [
    { label: "Sheets / shift", value: Math.round(sheetsPerShift).toLocaleString("en-IN") },
    { label: "Sheets / month (26 days)", value: Math.round(sheetsPerMonth).toLocaleString("en-IN") },
    { label: "Effective run time", value: `${effHours.toFixed(1)} hrs/day` },
  ];
  if (tgt > 0) {
    STATS.push({ label: "% of target", value: `${pctTarget.toFixed(0)}%` });
  }
  const shortfall = tgt > 0 && sheetsPerDay < tgt;

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Machine speed (sheets / min)"><input type="number" min="1" value={speed} onChange={(e) => setSpeed(e.target.value)} /></Field>
          <Field label="Shift length (hours)"><input type="number" min="1" max="12" value={shiftHours} onChange={(e) => setShiftHours(e.target.value)} /></Field>
          <Field label="Shifts / day"><input type="number" min="1" max="3" value={shifts} onChange={(e) => setShifts(e.target.value)} /></Field>
          <Field label="Efficiency / OEE (%)"><input type="number" min="1" max="100" value={oee} onChange={(e) => setOee(e.target.value)} /></Field>
          <Field label="Changeover + downtime (min / day)"><input type="number" min="0" value={downtime} onChange={(e) => setDowntime(e.target.value)} /></Field>
          <Field label="Target output (sheets / day, 0 = ignore)"><input type="number" min="0" value={target} onChange={(e) => setTarget(e.target.value)} /></Field>
          <p className="text-xs text-text-secondary sm:col-span-2">OEE accounts for real-world losses (jams, web breaks, slow runs). Adjust every field to your own line.</p>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter machine speed, shift length and shifts to estimate capacity.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Estimated Sheets / Day</div>
              <div className="stats-font mt-2 bg-clip-text text-4xl font-bold text-transparent" style={{ backgroundImage: "var(--orange-gradient)" }}>{headline}</div>
              <div className="mt-3">{STATS.map((s) => <Stat key={s.label} label={s.label} value={s.value} />)}</div>
              {shortfall && (
                <p className="mt-4 flex items-start gap-2 text-xs text-warning">
                  <Warning size={16} weight="fill" className="mt-px shrink-0" />
                  <span>Output is below your target. Add a shift, raise OEE, or cut changeover/downtime to close the gap.</span>
                </p>
              )}
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── 7. Running Cost / Electricity ────────────────────────────────────
// HP → kW → load factor → units/day → ₹. Optional sheets/day adds ₹/1,000.
function RunningCost() {
  const [hp, setHp] = useState(6);
  const [load, setLoad] = useState(60);
  const [hours, setHours] = useState(10);
  const [tariff, setTariff] = useState(8);
  const [days, setDays] = useState(26);
  const [volume, setVolume] = useState(0);

  const h = num(hp), lf = num(load), hrs = num(hours), tar = num(tariff), d = num(days), vol = num(volume);
  const valid = h > 0 && hrs > 0 && tar > 0;

  const ratedKw = h * 0.746;
  const avgKw = ratedKw * (lf / 100);
  const unitsPerDay = avgKw * hrs;
  const rupeesPerDay = unitsPerDay * tar;
  const rupeesPerMonth = rupeesPerDay * d;
  const rupeesPerYear = rupeesPerMonth * 12;
  const per1000 = vol > 0 ? (rupeesPerDay / vol) * 1000 : 0;

  const STATS = [
    { label: "Rated power", value: `${ratedKw.toFixed(2)} kW` },
    { label: "Units / day", value: `${unitsPerDay.toFixed(1)} kWh` },
    { label: "Cost / day", value: money(rupeesPerDay) },
    { label: "Cost / year", value: money(rupeesPerYear) },
  ];
  if (vol > 0) STATS.push({ label: "Power per 1,000 sheets", value: money(per1000) });

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Motor power (HP)"><input type="number" min="1" step="0.5" value={hp} onChange={(e) => setHp(e.target.value)} /></Field>
          <Field label="Load factor (%)"><input type="number" min="1" max="100" value={load} onChange={(e) => setLoad(e.target.value)} /></Field>
          <Field label="Running hours / day"><input type="number" min="1" max="24" value={hours} onChange={(e) => setHours(e.target.value)} /></Field>
          <Field label="Electricity tariff (₹ / unit)"><input type="number" step="0.5" value={tariff} onChange={(e) => setTariff(e.target.value)} /></Field>
          <Field label="Working days / month"><input type="number" min="1" max="31" value={days} onChange={(e) => setDays(e.target.value)} /></Field>
          <Field label="Output volume (sheets / day, optional)"><input type="number" min="0" value={volume} onChange={(e) => setVolume(e.target.value)} /></Field>
          <p className="text-xs text-text-secondary sm:col-span-2">
            Load factor is the average draw versus the motor&apos;s rated HP — most cutting machines sit around 50–70%. Tariff is a flat ₹/unit estimate; your actual bill may include slab rates and demand charges.
          </p>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter motor HP, running hours and tariff to estimate the power bill.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Electricity Cost / Month</div>
              <div
                className="stats-font mt-2 bg-clip-text text-4xl font-bold text-transparent"
                style={{ backgroundImage: "var(--orange-gradient)" }}
              >
                {money(rupeesPerMonth)}
              </div>
              <div className="mt-4">{STATS.map((s) => <Stat key={s.label} label={s.label} value={s.value} />)}</div>
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── 8. Cost per Sheet / Job Quoting ──────────────────────────────────
// Direct + straight-line depreciation → overhead → margin → suggested price.
function CostPerSheet() {
  const [paper, setPaper] = useState(1.2);
  const [ink, setInk] = useState(0.15);
  const [power, setPower] = useState(0.05);
  const [labour, setLabour] = useState(0.2);
  const [overhead, setOverhead] = useState(10);
  const [machinePrice, setMachinePrice] = useState(650000);
  const [machineLife, setMachineLife] = useState(30000000);
  const [qty, setQty] = useState(50000);
  const [margin, setMargin] = useState(20);

  const pa = num(paper), inkC = num(ink), po = num(power), la = num(labour);
  const oh = num(overhead), mp = num(machinePrice), ml = num(machineLife);
  const q = num(qty), mg = num(margin);
  const valid = q > 0;

  const direct = pa + inkC + po + la;
  const depr = ml > 0 ? mp / ml : 0;
  const costPerSheet = (direct + depr) * (1 + oh / 100);
  const pricePerSheet = costPerSheet * (1 + mg / 100);
  const jobCost = costPerSheet * q;
  const jobPrice = pricePerSheet * q;
  const profit = jobPrice - jobCost;

  const STATS = [
    { label: "Cost / sheet", value: `₹${costPerSheet.toFixed(3)}` },
    { label: "Depreciation / sheet", value: `₹${depr.toFixed(3)}` },
    { label: "Total job cost", value: money(jobCost) },
    { label: "Suggested job price", value: money(jobPrice) },
    { label: "Profit on job", value: money(profit) },
  ];

  return (
    <Grid
      form={
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Paper cost (₹ / sheet)"><input type="number" min="0" step="0.01" value={paper} onChange={(e) => setPaper(e.target.value)} /></Field>
          <Field label="Ink cost (₹ / sheet)"><input type="number" min="0" step="0.01" value={ink} onChange={(e) => setInk(e.target.value)} /></Field>
          <Field label="Power cost (₹ / sheet)"><input type="number" min="0" step="0.01" value={power} onChange={(e) => setPower(e.target.value)} /></Field>
          <Field label="Labour cost (₹ / sheet)"><input type="number" min="0" step="0.01" value={labour} onChange={(e) => setLabour(e.target.value)} /></Field>
          <Field label="Overhead (% on direct cost)"><input type="number" min="0" value={overhead} onChange={(e) => setOverhead(e.target.value)} /></Field>
          <Field label="Margin (% on cost)"><input type="number" min="0" value={margin} onChange={(e) => setMargin(e.target.value)} /></Field>
          <Field label="Machine price (₹)"><input type="number" min="0" value={machinePrice} onChange={(e) => setMachinePrice(e.target.value)} /></Field>
          <Field label="Machine life (sheets)"><input type="number" min="1" value={machineLife} onChange={(e) => setMachineLife(e.target.value)} /></Field>
          <Field label="Run quantity (sheets)"><input type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} /></Field>
          <p className="text-xs text-text-secondary sm:col-span-2">Defaults are editable estimates — adjust to your own figures.</p>
        </div>
      }
      result={
        <Panel>
          {!valid ? (
            <Empty>Enter a run quantity to quote the job.</Empty>
          ) : (
            <>
              <div className="text-xs uppercase tracking-wide text-text-secondary">Suggested price / sheet</div>
              <div className="stats-font mt-2 bg-clip-text text-4xl font-bold text-transparent" style={{ backgroundImage: "var(--orange-gradient)" }}>{`₹${pricePerSheet.toFixed(3)}`}</div>
              <div className="mt-3">{STATS.map((s) => <Stat key={s.label} label={s.label} value={s.value} />)}</div>
            </>
          )}
        </Panel>
      }
    />
  );
}

// ── Tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { id: "throughput", label: "Throughput", icon: Gauge, Comp: Throughput },
  // { id: "costsheet", label: "Cost / Sheet", icon: Receipt, Comp: CostPerSheet },
  { id: "runningcost", label: "Running Cost", icon: Plug, Comp: RunningCost },
  // { id: "flexo", label: "Flexo Cost", icon: Palette, Comp: Flexo },
  { id: "reel", label: "Reel Calculator", icon: Scroll, Comp: Reel },
];

const CalculatorHub = () => {
  const [tab, setTab] = useState("throughput");
  // Fall back to the first tab if the active id isn't in TABS (e.g. a tab was
  // commented out while its id lingered in state across a hot reload).
  const Active = (TABS.find((t) => t.id === tab) || TABS[0]).Comp;

  return (
    <section id="calculator" className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">
            Smart Tools
          </span>
          <h2 className="">
            Interactive <span className="text-accent">Engineering Tools</span>
          </h2>
          <p className="text-text-secondary">
            Pick a tool, enter your numbers, get instant answers.
          </p>
        </div>

        {/* Tabs */}
        <div className="hide-scrollbar mt-10 flex gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-center md:overflow-visible">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`btn inline-flex shrink-0 items-center gap-2 rounded-full !px-3 !py-[8px] !text-[13px] font-semibold transition ${active
                  ? "bg-gradient-to-br from-primary to-secondary text-white shadow-orange"
                  : "border border-border bg-card text-text-primary hover:border-accent"
                  }`}
              >
                <t.icon size={18} weight="bold" />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Active tool */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mt-4"
          >
            <Active />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default CalculatorHub;
