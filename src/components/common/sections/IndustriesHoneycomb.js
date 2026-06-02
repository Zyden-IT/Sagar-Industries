// ─────────────────────────────────────────────────────────────────────
// Shared › Industries Honeycomb — a hexagon "honeycomb" of industries.
// Unique shape vs the rest of the site (clip-path hexagons). Desktop:
// interlocking comb (top row over bottom row); mobile: a hex grid. Hover
// fills the cell with the orange gradient.
//
// Reusable: pass `industries`, header copy and `bg` as props. Used on the
// Products page and the Industries page via thin per-page wrappers.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  Package,
  Cube,
  Printer,
  Scroll,
  Stack,
  Tag,
  Notebook,
} from "@phosphor-icons/react";

export const DEFAULT_INDUSTRIES = [
  { icon: Package, label: "Corrugated", sub: "Sheets & boxes" },
  { icon: Cube, label: "Packaging", sub: "All materials" },
  { icon: Printer, label: "Printing", sub: "Flexo & sheets" },
  { icon: Scroll, label: "Paper Processing", sub: "Rolls to sheets" },
  { icon: Stack, label: "Cartons", sub: "Duplex & folding" },
  { icon: Tag, label: "Labels & Stickers", sub: "Adhesive stock" },
  { icon: Notebook, label: "Stationery", sub: "Notebooks & pads" },
];

const HEX = { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };

const Hex = ({ icon: Icon, label, sub, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
    className="group relative h-[184px] w-[160px] transition-transform duration-300 hover:-translate-y-1.5"
  >
    {/* border layer — visible hex border, fills orange on hover */}
    <div className="absolute inset-0 bg-[var(--color-border)] transition-colors duration-300 group-hover:bg-[#FF6B1A]" style={HEX} />
    {/* face */}
    <div
      className="absolute inset-[2px] flex flex-col items-center justify-center gap-2 bg-card px-4 text-center transition-colors duration-300 group-hover:bg-[#FF6B1A]"
      style={HEX}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-white/20 group-hover:text-white">
        <Icon size={22} weight="bold" />
      </span>
      <span className="text-[13px] font-bold leading-tight text-primary transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
      <span className="text-[10px] leading-tight text-secondary transition-colors duration-300 group-hover:text-white/85">
        {sub}
      </span>
    </div>
  </motion.div>
);

// Just the interlocking comb (no section / header) — reusable anywhere.
export const HoneycombGrid = ({ items }) => {
  const split = Math.ceil(items.length / 2);
  const top = items.slice(0, split);
  const bottom = items.slice(split);

  return (
    <>
      {/* Desktop honeycomb */}
      <div className="hidden flex-col items-center md:flex">
        <div className="flex justify-center gap-3">
          {top.map((it, i) => (
            <Hex key={it.label} {...it} index={i} />
          ))}
        </div>
        {bottom.length > 0 && (
          <div className="-mt-11 flex justify-center gap-3">
            {bottom.map((it, i) => (
              <Hex key={it.label} {...it} index={i + top.length} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile hex grid */}
      <div className="grid grid-cols-2 justify-items-center gap-3 sm:grid-cols-3 md:hidden">
        {items.map((it, i) => (
          <Hex key={it.label} {...it} index={i} />
        ))}
      </div>
    </>
  );
};

const IndustriesHoneycomb = ({
  eyebrow = "Industries Served",
  titleLead = "Powering Multiple Industries with",
  titleAccent = "Precision & Performance",
  subtitle = "Our paper cutting and flexo printing machines are trusted by businesses across a wide range of industries.",
  industries = DEFAULT_INDUSTRIES,
  bg = "bg-soft",
}) => {
  return (
    <section className={`section-py relative overflow-hidden ${bg}`}>
      {/* dotted backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[2px] text-accent">
            <span className="h-px w-6 bg-accent" />
            {eyebrow}
            <span className="h-px w-6 bg-accent" />
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
            {titleLead} <span className="text-accent">{titleAccent}</span>
          </h2>
          <p className="text-secondary">{subtitle}</p>
        </div>

        {/* Honeycomb */}
        <div className="mt-14">
          <HoneycombGrid items={industries} />
        </div>
      </div>
    </section>
  );
};

export default IndustriesHoneycomb;
