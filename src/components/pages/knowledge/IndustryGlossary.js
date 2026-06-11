// ─────────────────────────────────────────────────────────────────────
// Knowledge › Industry Glossary — key paper / packaging / printing terms.
// Compact term cards with a lettered badge + definition. Starter set —
// extend as needed.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";

const TERMS = [
  { term: "GSM", def: "Grams per square metre — the standard measure of paper weight." },
  { term: "Micron", def: "Thickness unit equal to one-thousandth of a millimetre (µm)." },
  { term: "Flexo", def: "Flexographic printing using flexible relief plates and fast-drying inks." },
  { term: "Corrugation", def: "The fluted middle layer that gives board its strength and cushioning." },
  { term: "Roll-to-Sheet", def: "Converting a continuous paper roll into precisely cut flat sheets." },
  { term: "Trim Waste", def: "The leftover material trimmed away during cutting or finishing." },
  { term: "Reel Width", def: "The web width of the paper roll fed into the machine." },
  { term: "Lamination", def: "Bonding layers together to add strength, gloss or moisture resistance." },
];

const IndustryGlossary = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">
            Glossary
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Industry Terms, <span className="text-accent">Decoded</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Key paper, packaging and printing terms explained in plain language.
          </p>
        </div>

        {/* Term cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {TERMS.map((t, i) => (
            <motion.div
              key={t.term}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.08, ease: "easeOut" }}
              className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card transition duration-300 hover:border-accent hover:shadow-orange"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white shadow-orange">
                {t.term.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <h3 className="text-[15px]! font-bold! leading-tight">{t.term}</h3>
                <p className="mt-1.5 text-[13px]! leading-snug text-text-secondary">{t.def}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryGlossary;
