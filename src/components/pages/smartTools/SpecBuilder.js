// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Spec Builder (standalone section) — download + WhatsApp.
// Pick machine + type, add size / material / notes → a clean spec summary
// the visitor can download as .txt or send to us prefilled on WhatsApp.
// Type options follow the chosen machine (cutting variants vs colour
// variants). Blank fields render as "—". JSX escapes user text for us, so
// no manual escapeHtml is needed.
// Edit WHATSAPP / MACHINES / TYPES below.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardText, DownloadSimple, WhatsappLogo } from "@phosphor-icons/react";

const WHATSAPP = "919978311122";

const MACHINES = [
  "Paper Roll To Sheet Cutting Machine",
  "Flexo Printing Machine",
];

// Type options depend on the selected machine.
const TYPES = {
  "Paper Roll To Sheet Cutting Machine": ["Manual", "Semi Automatic", "Automatic", "High Speed", "Heavy Duty"],
  "Flexo Printing Machine": ["Single Colour", "Two Colour", "Three Colour", "Four Colour", "Multi Colour"],
};

const selectCls =
  "w-full rounded-[10px] border-[1.5px] border-theme bg-soft px-4 py-3 text-primary outline-none transition focus:border-accent";

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-primary">{label}</label>
    {children}
  </div>
);

const SpecBuilder = () => {
  const [machine, setMachine] = useState(MACHINES[0]);
  const [type, setType] = useState(TYPES[MACHINES[0]][0]);
  const [size, setSize] = useState("");
  const [material, setMaterial] = useState("");
  const [notes, setNotes] = useState("");
  const [built, setBuilt] = useState(null);

  // Switching machine resets the type to that machine's first valid option.
  const onMachine = (m) => {
    setMachine(m);
    setType(TYPES[m][0]);
  };

  const build = (e) => {
    e.preventDefault();
    const rows = [
      ["Machine", machine || "—"],
      ["Type", type || "—"],
      ["Machine Size", size.trim() || "—"],
      ["Material", material.trim() || "—"],
      ["Extra Requirements", notes.trim() || "—"],
    ];
    const text =
      "SAGAR INDUSTRIES — MACHINE SPEC REQUEST\n" +
      "----------------------------------------\n" +
      rows.map(([l, v]) => `${l}: ${v}`).join("\n");
    setBuilt({ rows, text });
  };

  const download = () => {
    const blob = new Blob([built.text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sagar-industries-spec.txt";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const waHref = built
    ? `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(built.text)}`
    : "#";

  return (
    <section id="spec" className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-accent">
            <ClipboardText size={16} weight="bold" /> Spec Builder
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Build Your Machine Spec
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            Put together your requirement in seconds — download it as a file or
            send it to us on WhatsApp for a fast quote.
          </p>
        </div>

        {/* Grid: form + summary */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2"
        >
          {/* Form */}
          <form
            onSubmit={build}
            className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-theme bg-card p-6 shadow-card md:p-7"
          >
            <Field label="Machine">
              <select className={selectCls} value={machine} onChange={(e) => onMachine(e.target.value)}>
                {MACHINES.map((m) => <option key={m}>{m}</option>)}
              </select>
            </Field>
            <Field label="Type">
              <select className={selectCls} value={type} onChange={(e) => setType(e.target.value)}>
                {TYPES[machine].map((t) => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field label="Machine Size / Width">
              <input type="text" placeholder='e.g. 55"' value={size} onChange={(e) => setSize(e.target.value)} />
            </Field>
            <Field label="Material">
              <input type="text" placeholder="e.g. Kraft paper 120 GSM" value={material} onChange={(e) => setMaterial(e.target.value)} />
            </Field>
            <Field label="Extra Requirements">
              <textarea rows={3} placeholder="Any specific requirement…" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            <button type="submit" className="btn-orange btn-block mt-1 cursor-pointer">
              Build My Spec
            </button>
          </form>

          {/* Summary */}
          <div className="rounded-[var(--radius-card)] bg-primary p-6 text-white md:p-7" aria-live="polite">
            <AnimatePresence mode="wait">
              {!built ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 text-center"
                >
                  <ClipboardText size={40} weight="duotone" className="text-white/40" />
                  <span className="max-w-xs text-sm text-white/60">
                    Fill in your requirement and build the spec to download or share it.
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="summary"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-5"
                >
                  <div className="text-xs uppercase tracking-wide text-white/50">Your Spec Summary</div>
                  <ul className="flex flex-col">
                    {built.rows.map(([label, value]) => (
                      <li key={label} className="flex items-start justify-between gap-4 border-b border-white/10 py-3 last:border-0">
                        <span className="shrink-0 text-sm text-white/60">{label}</span>
                        <strong className="text-right font-semibold text-white">{value}</strong>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-3">
                    <button onClick={download} className="inline-flex items-center gap-2 rounded-full bg-orange-gradient px-5 py-3 text-xs font-bold uppercase tracking-wide text-white">
                      <DownloadSimple size={16} weight="bold" /> Download .txt
                    </button>
                    <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-3 text-xs font-bold uppercase tracking-wide text-white! transition hover:bg-white hover:text-[#161000]">
                      <WhatsappLogo size={16} weight="fill" /> Send on WhatsApp
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SpecBuilder;
