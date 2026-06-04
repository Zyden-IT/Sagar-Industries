// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Machine Recommender (standalone section).
// Single all-fields form (material, roll width, sheet length, volume) →
// a Manual vs Automatic recommendation, scored from production fit.
//
// Logic ported from the standalone capacity recommender:
//   • Blank / non-positive inputs  → blocking ERRORS (stop, ask to fix).
//   • Out-of-datasheet-range inputs → non-blocking WARNINGS (still scores).
//   • Score > 0 → Automatic, otherwise Manual (a tie resolves to Manual).
// Edit SPEC / MATERIALS / DELICATE below to tune.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Robot, Gear, Warning } from "@phosphor-icons/react";

const num = (v) => parseFloat(v); // NaN when blank/invalid — handled by !(n > 0)

// Datasheet limits — drive the out-of-range warnings (not the score).
const SPEC = { widthMin: 25, widthMax: 75, lengthMin: 25, lengthMax: 8800 };

// 8 materials. `label` is what the user sees, `key` is the internal value,
// `name` is how the material is phrased inside a reason.
const MATERIALS = [
  { key: "paper", name: "Paper", label: "Paper (14–1000 GSM)" },
  { key: "aluminium", name: "Aluminium Foil", label: "Aluminium Foil" },
  { key: "non-woven", name: "Non-Woven Fabric", label: "Non-Woven Fabric" },
  { key: "jute", name: "Jute", label: "Jute" },
  { key: "wood-veneer", name: "Wood Veneer", label: "Wood Veneer" },
  { key: "rexine", name: "Rexine", label: "Rexine" },
  { key: "sponge", name: "Sponge Sheet", label: "Sponge Sheet" },
  { key: "epe-foam", name: "EPE Foam Sheet", label: "EPE Foam Sheet" },
];
const NAME = Object.fromEntries(MATERIALS.map((m) => [m.key, m.name]));

// Delicate materials nudge the verdict toward Manual handling.
const DELICATE = ["wood-veneer", "sponge", "epe-foam", "rexine"];

const selectCls =
  "w-full rounded-[10px] border-[1.5px] border-border bg-soft px-4 py-3 text-text-primary outline-none transition focus:border-accent";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-text-primary">{label}</label>
    {children}
  </div>
);

const MachineRecommender = () => {
  const [material, setMaterial] = useState("paper");
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [volume, setVolume] = useState("");
  const [res, setRes] = useState(null);

  const calculate = (e) => {
    e.preventDefault();
    const w = num(width), l = num(length), v = num(volume);

    // ── Validation → blocking errors ──────────────────────────────────
    const errors = [];
    if (!(w > 0)) errors.push("Please enter a valid roll width.");
    if (!(l > 0)) errors.push("Please enter a valid sheet length.");
    if (!(v > 0)) errors.push("Please enter a valid production volume.");
    if (errors.length) return setRes({ errors });

    // ── Out-of-range → non-blocking warnings ──────────────────────────
    const warnings = [];
    if (w < SPEC.widthMin || w > SPEC.widthMax)
      warnings.push(`Roll width is outside our standard ${SPEC.widthMin}"–${SPEC.widthMax}" range — a custom-size machine may be required.`);
    if (l < SPEC.lengthMin || l > SPEC.lengthMax)
      warnings.push(`Sheet length is outside the ${SPEC.lengthMin}–${SPEC.lengthMax} mm cutting range — please confirm with our team.`);

    // ── Scoring ───────────────────────────────────────────────────────
    let score = 0;
    const reasons = [];

    // Volume — the primary driver.
    if (v >= 6000) { score += 3; reasons.push("High production volume strongly favours an automatic line."); }
    else if (v >= 2500) { score += 1; reasons.push("Medium-high volume leans towards an automated machine."); }
    else { score -= 2; reasons.push("Lower daily volume is well served by a manual machine."); }

    // Roll width.
    if (w >= 55) { score += 1; reasons.push("Wide rolls feed more easily on an automatic machine."); }
    else if (w <= 36) { score -= 1; reasons.push("Narrow rolls are well suited to a manual machine."); }

    // Sheet length × volume.
    if (l <= 300 && v >= 2500) { score += 1; reasons.push("Short sheets at volume mean many cut cycles — automation helps."); }
    else if (l >= 4000) { score -= 1; reasons.push("Long sheets are low-cycle and handle fine on a manual machine."); }

    // Material delicacy.
    if (DELICATE.includes(material)) { score -= 1; reasons.push(`${NAME[material]} is delicate and handled more gently on a manual machine.`); }

    const isAuto = score > 0;
    const meter = Math.max(8, Math.min(92, 50 + score * 12));
    setRes({
      isAuto,
      meter,
      reasons,
      warnings,
      machine: isAuto ? "Automatic Machine" : "Manual Machine",
      tagline: isAuto
        ? "Best for consistent, high-volume production with minimal manual effort."
        : "A cost-effective, reliable choice for your production needs.",
    });
  };

  return (
    <section id="recommender" className="section-py scroll-mt-20 bg-bg">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Machine Recommender</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Find Your Best-Fit Machine
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Tell us your material, size and volume — we&apos;ll recommend a
            manual or automatic machine for your production.
          </p>
        </div>

        {/* Grid: form + result */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2"
        >
          {/* ── Form ──────────────────────────────────────────────────── */}
          <form
            onSubmit={calculate}
            className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card md:p-7"
          >
            <Field label="Material Type">
              <select className={selectCls} value={material} onChange={(e) => setMaterial(e.target.value)}>
                {MATERIALS.map((m) => (
                  <option key={m.key} value={m.key}>{m.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Roll Width (inches)">
              <input type="number" min="1" step="0.5" placeholder={`e.g. 45  (range ${SPEC.widthMin}"–${SPEC.widthMax}")`} value={width} onChange={(e) => setWidth(e.target.value)} />
            </Field>
            <Field label="Required Sheet Length (mm)">
              <input type="number" min="1" step="1" placeholder={`e.g. 600  (range ${SPEC.lengthMin}–${SPEC.lengthMax} mm)`} value={length} onChange={(e) => setLength(e.target.value)} />
            </Field>
            <Field label="Production Volume (sheets / day)">
              <input type="number" min="1" step="1" placeholder="e.g. 4000" value={volume} onChange={(e) => setVolume(e.target.value)} />
            </Field>
            <button type="submit" className="btn btn-orange btn-block mt-1 cursor-pointer">
              Calculate Recommendation
            </button>
          </form>

          {/* ── Result ────────────────────────────────────────────────── */}
          <div className="rounded-[var(--radius-card)] bg-primary p-6 text-white md:p-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {/* Empty state */}
              {!res ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center"
                >
                  <Gear size={40} weight="duotone" className="text-white/40" />
                  <span className="max-w-xs text-sm text-white/60">
                    Fill in the form and calculate to see your recommended machine.
                  </span>
                </motion.div>
              ) : res.errors ? (
                /* Error state */
                <motion.div
                  key="errors"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex h-full min-h-[300px] flex-col justify-center gap-4"
                >
                  <div className="flex items-center gap-2 text-[#FFB4A0]">
                    <Warning size={20} weight="fill" />
                    <span className="text-sm font-bold uppercase tracking-wide">Please complete the form</span>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {res.errors.map((er) => (
                      <li key={er} className="text-sm text-white/80">{er}</li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                /* Result state */
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div>
                    <span className="text-xs uppercase tracking-wide text-white/50">Recommended Machine</span>
                    <h3 className={`mt-1 text-2xl font-bold ${res.isAuto ? "text-accent" : "text-white"}`}>
                      {res.machine}
                    </h3>
                    <p className="mt-1 text-sm text-white/70">{res.tagline}</p>
                  </div>

                  {/* Meter */}
                  <div>
                    <div className="mb-1 flex justify-between text-xs text-white/60">
                      <span>Manual</span><span>Automatic</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${res.isAuto ? "bg-gradient-to-br from-primary to-secondary" : "bg-white/60"}`}
                        style={{ width: `${res.meter}%` }}
                      />
                    </div>
                  </div>

                  {/* Reasons */}
                  <ul className="flex flex-col gap-2">
                    {res.reasons.map((r) => (
                      <li key={r} className="flex items-start gap-2 text-sm text-white/80">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {r}
                      </li>
                    ))}
                  </ul>

                  {/* Warnings */}
                  {res.warnings.length > 0 && (
                    <div className="rounded-[10px] border border-[#FFB4A0]/30 bg-[#FFB4A0]/10 p-4">
                      <div className="mb-2 flex items-center gap-2 text-[#FFB4A0]">
                        <Warning size={16} weight="fill" />
                        <span className="text-xs font-bold uppercase tracking-wide">Please note</span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        {res.warnings.map((w) => (
                          <span key={w} className="text-xs text-white/75">{w}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <a href="/contact#inquiry" className="btn-orange btn-block mt-1 text-center">
                    Request a Quote
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MachineRecommender;
