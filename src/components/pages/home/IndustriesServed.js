// ─────────────────────────────────────────────────────────────────────
// Home › Industries Served — split layout.
// Left:  eyebrow + heading + body + stats strip.
// Right: an orbital diagram — a "Powering Industries Worldwide" hub at the
// centre (inside an orange ring), with five sector cards positioned around
// it, each showing a real product photo. Joined by SVG spokes + a dotted
// orbit. Below lg the diagram collapses to a card grid. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { Buildings, Gear, Medal } from "@phosphor-icons/react";

// pos = card anchor (% of orbit box) · pt = matching SVG point (0–100)
// image = product photo from /public (swap the i#.png if the product differs)
const SECTORS = [
  { image: "/i1.png", title: "Packaging", desc: "Smart solutions for modern packaging needs.", pos: { top: "7%", left: "50%" }, pt: { x: 50, y: 9 } },
  { image: "/i2.png", title: "Corrugated Board", desc: "Precision machines for stronger, smarter boards.", pos: { top: "37%", left: "88%" }, pt: { x: 88, y: 37 } },
  { image: "/i3.png", title: "Industrial Materials", desc: "Versatile machines for a wide range of materials.", pos: { top: "88%", left: "76%" }, pt: { x: 76, y: 88 } },
  { image: "/i4.png", title: "Paper Converting", desc: "Efficient converting solutions for paper excellence.", pos: { top: "88%", left: "24%" }, pt: { x: 24, y: 88 } },
  { image: "/i5.png", title: "Commercial Printing", desc: "High-quality printing for every application.", pos: { top: "37%", left: "12%" }, pt: { x: 12, y: 37 } },
];

const STATS = [
  { icon: Buildings, value: "15+", label: "Industries Served" },
  { icon: Gear, value: "500+", label: "Installations" },
  { icon: Medal, value: "20+", label: "Years Experience" },
];

const SectorCard = ({ s }) => (
  <div className="group flex w-full items-center gap-2.5 rounded-2xl border border-border bg-card p-2.5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-orange">
    <span className="relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-xl bg-soft">
      <Image src={s.image} alt={s.title} fill sizes="48px" className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110" />
    </span>
    <div className="min-w-0">
      <div className="text-[8px] font-bold uppercase tracking-[1.5px] text-accent">Sector</div>
      <h3 className="text-[12px]! font-bold! leading-tight text-text-primary">{s.title}</h3>
      <p className="mt-0.5 line-clamp-2 text-[10px]! leading-snug text-text-secondary">{s.desc}</p>
    </div>
  </div>
);

const CenterHub = ({ size = "h-32 w-32 sm:h-40 sm:w-40" }) => (
  <div
    className={`relative grid ${size} place-items-center rounded-full p-[6px]`}
    style={{
      background: "linear-gradient(160deg, #F9A45C 0%, #F5842A 50%, #ED282E 100%)",
      boxShadow: "0 0 60px rgba(245,132,42,0.35), var(--shadow-card)",
    }}
  >
    <div className="grid h-full w-full place-items-center rounded-full bg-card px-4 text-center">
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[2.5px] text-accent sm:text-[11px]">
          Powering
        </div>
        <div className="mt-1.5 text-[16px] font-bold leading-[1.12] text-text-primary sm:text-[19px]">
          Industries
          <br />
          Worldwide
        </div>
        <span className="mx-auto mt-2.5 block h-[2px] w-8 rounded-full bg-gradient-to-br from-primary to-secondary" />
      </div>
    </div>
  </div>
);

const IndustriesServed = () => {
  return (
    <section className="section-py relative bg-bg">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* ── Left — copy + stats ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow">Industries Served</span>

            <h2 className="text-[26px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[32px]! lg:text-[40px]!">
              Powering Industries with{" "}
              <span className="text-accent">Precision &amp; Performance</span>
            </h2>

            <p className="max-w-xl text-text-secondary">
              Our paper cutting and flexo printing machines are trusted by
              businesses across a wide range of industries — engineered to keep
              packaging, printing and paper-processing lines running with
              accuracy and reliability.
            </p>

            {/* stats strip */}
            <div className="mt-2 flex flex-wrap gap-x-8 gap-y-4">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex items-center gap-3 ${i > 0 ? "sm:border-l sm:border-border sm:pl-8" : ""}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <s.icon size={22} weight="bold" />
                  </span>
                  <div>
                    <div className="stats-font text-xl font-bold text-accent lg:text-2xl">{s.value}</div>
                    <div className="text-[12px] text-text-secondary">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — orbital diagram (lg+) ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto hidden aspect-square w-full max-w-[560px] lg:block"
          >
            {/* connector spokes + dotted orbit */}
            <svg
              aria-hidden
              viewBox="0 0 100 100"
              className="absolute inset-0 h-full w-full"
            >
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--color-border)"
                strokeWidth="0.4"
                strokeDasharray="0.5 2.5"
                strokeLinecap="round"
              />
              {SECTORS.map((s) => {
                // Place the dot just outside each card's near edge so the line
                // visibly "ends" at the card. (Card half-size in viewBox units.)
                const dx = s.pt.x - 50;
                const dy = s.pt.y - 50;
                const len = Math.hypot(dx, dy) || 1;
                const ux = dx / len;
                const uy = dy / len;
                const hw = 16.5; // card half-width
                const hh = 6.2; // card half-height
                const t =
                  Math.min(hw / (Math.abs(ux) || 1e-6), hh / (Math.abs(uy) || 1e-6)) + 3.4;
                const dotX = s.pt.x - t * ux;
                const dotY = s.pt.y - t * uy;
                return (
                  <g key={s.title}>
                    <line
                      x1="50"
                      y1="50"
                      x2={dotX}
                      y2={dotY}
                      stroke="var(--color-accent)"
                      strokeWidth="0.25"
                      strokeOpacity="0.45"
                    />
                    {/* white halo keeps the dot visible over the glow / card edge */}
                    <circle cx={dotX} cy={dotY} r="1.5" fill="var(--color-card)" />
                    <circle cx={dotX} cy={dotY} r="1" fill="var(--color-accent)" />
                  </g>
                );
              })}
            </svg>

            {/* sector cards around the ring */}
            {SECTORS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                style={{ top: s.pos.top, left: s.pos.left }}
                className="absolute w-[185px] -translate-x-1/2 -translate-y-1/2"
              >
                <SectorCard s={s} />
              </motion.div>
            ))}

            {/* centre hub */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <CenterHub />
            </div>
          </motion.div>

          {/* ── Right — collapsed grid (below lg) ────────────────── */}
          <div className="lg:hidden">
            <div className="mb-8 flex justify-center">
              <CenterHub size="h-28 w-28" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {SECTORS.map((s) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <SectorCard s={s} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesServed;
