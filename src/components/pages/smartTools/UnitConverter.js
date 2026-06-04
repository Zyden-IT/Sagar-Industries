// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Unit Converter (standalone section) — live, two-way.
// Presented as a single machined "engineer's toolkit" panel: bevelled
// corners, corner screws, side accents, a LIVE CONVERTER tab and an
// auto-update badge. Three converter columns:
//   1  inch ↔ mm   (× / ÷ 25.4)
//   2  mm ↔ feet   (÷ / × 304.8)
//   3  GSM → micron (÷ 0.8, paper density — one-way, micron read-only)
// Editing either side of a pair updates the other on every keystroke.
// A reset button restores the defaults.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowsLeftRight,
  ArrowsClockwise,
  CircleNotch,
  Ruler,
  Resize,
  Stack,
} from "@phosphor-icons/react";

const num = (v) => parseFloat(v);
const fmt = (v) => (Number.isFinite(v) ? String(+v.toFixed(3)) : "");

// Bevelled-corner shape shared by the panel + tab.
const bevel = (c) => ({
  clipPath: `polygon(${c}px 0, calc(100% - ${c}px) 0, 100% ${c}px, 100% calc(100% - ${c}px), calc(100% - ${c}px) 100%, ${c}px 100%, 0 calc(100% - ${c}px), 0 ${c}px)`,
});

const inputCls =
  "w-[88px] rounded-[10px] border-[1.5px] border-theme bg-white px-3 py-2.5 text-center text-lg font-bold text-primary outline-none transition focus:border-accent";

// A small machine screw for the panel corners.
const Screw = ({ className }) => (
  <span
    className={`absolute z-20 grid h-4 w-4 place-items-center rounded-full bg-gradient-to-br from-[#e9ebee] to-[#b9bdc4] shadow-[inset_0_1px_1px_rgba(255,255,255,0.8),0_1px_2px_rgba(0,0,0,0.25)] ${className}`}
  >
    <span className="h-[1.5px] w-2 rotate-45 rounded-full bg-[#8b9098]" />
  </span>
);

// Side vent slots (three short bars).
const Vents = ({ className }) => (
  <span className={`absolute z-10 flex flex-col gap-1.5 ${className}`}>
    {[0, 1, 2].map((i) => (
      <span key={i} className="h-[3px] w-6 rounded-full bg-[#c3c7ce]" />
    ))}
  </span>
);

const Side = ({ value, onChange, unit, readOnly }) => (
  <div className="flex flex-col items-center gap-1.5">
    <input
      type="number"
      value={value}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      readOnly={readOnly}
      className={`${inputCls} ${readOnly ? "cursor-default border-accent/60 text-accent" : ""}`}
    />
    <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary">
      {unit}
    </span>
  </div>
);

const Column = ({ icon: Icon, title, children, note, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.45, delay: index * 0.12, ease: "easeOut" }}
    className="flex flex-1 flex-col items-center px-4 py-2 text-center"
  >
    <span className="grid h-16 w-16 place-items-center rounded-full border border-theme bg-white text-accent shadow-[0_6px_14px_rgba(0,0,0,0.08)]">
      <Icon size={30} weight="regular" />
    </span>
    <h3 className="mt-4 text-[13px]! font-bold! tracking-wide">{title}</h3>
    <div className="mt-4">{children}</div>
    {note}
  </motion.div>
);

const UnitConverter = () => {
  const DEFAULTS = { inch: "1", mm: "25.4", mm2: "100", ft: fmt(100 / 304.8), gsm: "120" };
  const [inch, setInch] = useState(DEFAULTS.inch);
  const [mm, setMm] = useState(DEFAULTS.mm);
  const [mm2, setMm2] = useState(DEFAULTS.mm2);
  const [ft, setFt] = useState(DEFAULTS.ft);
  const [gsm, setGsm] = useState(DEFAULTS.gsm);

  const micron = fmt(num(gsm) / 0.8);

  const onInch = (v) => { setInch(v); setMm(fmt(num(v) * 25.4)); };
  const onMm = (v) => { setMm(v); setInch(fmt(num(v) / 25.4)); };
  const onMm2 = (v) => { setMm2(v); setFt(fmt(num(v) / 304.8)); };
  const onFt = (v) => { setFt(v); setMm2(fmt(num(v) * 304.8)); };

  const reset = () => {
    setInch(DEFAULTS.inch); setMm(DEFAULTS.mm);
    setMm2(DEFAULTS.mm2); setFt(DEFAULTS.ft);
    setGsm(DEFAULTS.gsm);
  };

  const Eq = ({ sign }) => (
    <span className="self-center pb-5 text-xl font-bold text-accent">{sign}</span>
  );

  return (
    <section id="converter" className="section-py bg-theme">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-accent">
            <ArrowsLeftRight size={16} weight="bold" /> Engineer&apos;s Toolkit
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
            Quick <span className="text-accent">Unit Converter</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            Convert the units you use every day — type in either box and the
            other updates instantly.
          </p>
        </div>

        {/* Machined panel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="relative mx-auto mt-14 max-w-5xl [filter:drop-shadow(0_24px_45px_rgba(0,0,0,0.14))]"
        >
          {/* LIVE CONVERTER tab */}
          <div
            style={bevel(10)}
            className="absolute -top-5 left-6 z-30 bg-[#cfd3da] p-[1.5px] sm:left-10"
          >
            <div
              style={bevel(10)}
              className="flex items-center gap-2 bg-gradient-to-b from-white to-[#eef0f3] px-4 py-2"
            >
              <CircleNotch size={16} weight="bold" className="animate-spin text-accent" />
              <span className="text-[12px] font-bold uppercase tracking-[1.5px] text-primary">
                Live Converter
              </span>
              <span className="ml-1 h-2 w-2 rounded-full bg-accent" />
            </div>
          </div>

          {/* border layer */}
          <div style={bevel(20)} className="bg-[#cfd3da]">
            {/* panel face */}
            <div
              style={bevel(20)}
              className="relative bg-gradient-to-b from-[#fafbfc] to-[#eceef1] px-6 pb-10 pt-16 sm:px-12"
            >
              {/* corner screws */}
              <Screw className="left-3 top-3" />
              <Screw className="right-3 top-3" />
              <Screw className="bottom-3 left-3" />
              <Screw className="bottom-3 right-3" />

              {/* side accents — orange bars + vents */}
              <span className="absolute left-1.5 top-1/2 z-10 h-16 w-1.5 -translate-y-1/2 rounded-full bg-orange-gradient shadow-orange" />
              <span className="absolute right-1.5 top-1/2 z-10 h-16 w-1.5 -translate-y-1/2 rounded-full bg-orange-gradient shadow-orange" />
              <Vents className="bottom-10 left-3" />
              <Vents className="bottom-10 right-3" />

              {/* top-right: auto update + reset */}
              <div className="absolute right-12 top-6 flex items-center gap-4">
                <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-secondary">
                  <span className="h-2 w-2 rounded-full bg-[#2ECC71]" /> Auto Update
                </span>
                <button
                  onClick={reset}
                  aria-label="Reset converter"
                  className="btn grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-theme bg-white text-secondary transition hover:rotate-180 hover:border-accent hover:text-accent"
                >
                  <ArrowsClockwise size={16} weight="bold" />
                </button>
              </div>

              {/* converter columns */}
              <div className="grid divide-y divide-[#d8dbe0] md:grid-cols-3 md:divide-x md:divide-y-0">
                <Column icon={Ruler} title="INCH ⇄ MILLIMETRE" index={0}>
                  <div className="flex items-start justify-center gap-3">
                    <Side value={inch} onChange={onInch} unit="in" />
                    <Eq sign="=" />
                    <Side value={mm} onChange={onMm} unit="mm" />
                  </div>
                </Column>

                <Column icon={Resize} title="MILLIMETRE ⇄   FEET" index={1}>
                  <div className="flex items-start justify-center gap-3">
                    <Side value={mm2} onChange={onMm2} unit="mm" />
                    <Eq sign="=" />
                    <Side value={ft} onChange={onFt} unit="ft" />
                  </div>
                </Column>

                <Column
                  icon={Stack}
                  title="GSM ⇄ MICRON"
                  index={2}
                  note={
                    <div className="mt-4 rounded-full border border-theme bg-white px-3 py-1 text-[10px] font-medium text-secondary">
                      Density: <span className="text-accent font-semibold">0.8 g/cm³</span>
                    </div>
                  }
                >
                  <div className="flex items-start justify-center gap-3">
                    <Side value={gsm} onChange={setGsm} unit="GSM" />
                    <Eq sign="≈" />
                    <Side value={micron} unit="micron" readOnly />
                  </div>
                </Column>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UnitConverter;
