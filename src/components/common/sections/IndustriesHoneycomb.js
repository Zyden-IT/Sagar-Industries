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
    className="group relative h-[160px] w-[140px] transition-[transform,filter] duration-300 [filter:drop-shadow(0_10px_18px_rgba(22,16,12,0.12))] hover:-translate-y-2 hover:[filter:drop-shadow(0_16px_26px_rgba(245,132,42,0.40))] sm:h-[184px] sm:w-[160px]"
  >
    {/* border layer — visible hex edge, fills with the brand gradient on hover */}
    <div className="absolute inset-0 bg-[var(--color-border)] transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#F5842A,#ED282E)]" style={HEX} />
    {/* face */}
    <div
      className="absolute inset-[2px] flex flex-col items-center justify-center gap-2 bg-card px-4 text-center transition-all duration-300 group-hover:bg-[linear-gradient(135deg,#F5842A,#ED282E)]"
      style={HEX}
    >
      <span className="grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-white/20 group-hover:text-white group-hover:ring-white/40">
        <Icon size={23} weight="bold" />
      </span>
      <span className="text-[13px] font-bold leading-tight text-text-primary transition-colors duration-300 group-hover:text-white">
        {label}
      </span>
      <span className="text-[10px] leading-tight text-text-secondary transition-colors duration-300 group-hover:text-white/85">
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

      {/* Mobile hex grid — centred wrap so any trailing cell stays balanced */}
      <div className="flex flex-wrap justify-center gap-3 md:hidden">
        {items.map((it, i) => (
          <Hex key={it.label} {...it} index={i} />
        ))}
      </div>
    </>
  );
};

const IndustriesHoneycomb = ({
  eyebrow = "Industries Served",
  titleLead = "Industries We Serve with",
  titleAccent = "Precision Machines",
  subtitle = "Our paper cutting and flexo printing machines are trusted across packaging, printing and paper converting.",
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
        <div className="mx-auto flex max-w-2xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
            {titleLead} <span className="text-accent">{titleAccent}</span>
          </h2>
          <p className="text-text-secondary">{subtitle}</p>
        </div>

        {/* Honeycomb */}
        <div className="relative mt-14">
          {/* soft accent glow behind the comb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[640px] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          <div className="relative">
            <HoneycombGrid items={industries} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesHoneycomb;
