// ─────────────────────────────────────────────────────────────────────
// Home › Industries Served — split layout.
// Left:  eyebrow + heading + body + stats strip.
// Right: an orbital diagram — a "Powering Industries Worldwide" hub at the
// centre (inside an orange ring), with five sector cards positioned around
// it, each showing a real product photo. Joined by SVG spokes + a dotted
// orbit. Below lg the diagram collapses to a card grid. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

// pos = card anchor (% of orbit box) · pt = matching SVG point (0–100)
// image = product photo from /public (swap the i#.png if the product differs)
const SECTORS = [
  { image: "/i1.png", title: "Packaging", desc: "Smart solutions for modern packaging needs.", pos: { top: "7%", left: "50%" }, pt: { x: 50, y: 9 } },
  { image: "/i2.png", title: "Corrugated Board", desc: "Precision machines for stronger, smarter boards.", pos: { top: "37%", left: "84%" }, pt: { x: 84, y: 37 } },
  { image: "/i3.png", title: "Industrial Materials", desc: "Versatile machines for a wide range of materials.", pos: { top: "88%", left: "74%" }, pt: { x: 74, y: 88 } },
  { image: "/i4.png", title: "Paper Converting", desc: "Efficient converting solutions for paper excellence.", pos: { top: "88%", left: "26%" }, pt: { x: 26, y: 88 } },
  { image: "/i5.png", title: "Commercial Printing", desc: "High-quality printing for every application.", pos: { top: "37%", left: "16%" }, pt: { x: 16, y: 37 } },
];

// `large` = the roomier variant used in the mobile/tablet grid (more legible
// text + icon). The compact default is used inside the desktop orbit cards.
const SectorCard = ({ s, large = false }) => (
  <div className="group flex h-full w-full items-center gap-3 rounded-2xl border border-border bg-card p-2.5 shadow-card transition duration-300 hover:-translate-y-0.5 hover:border-accent hover:shadow-orange">
    <span
      className={`relative grid shrink-0 place-items-center overflow-hidden rounded-xl bg-soft ${large ? "h-14 w-14" : "h-12 w-12"
        }`}
    >
      <Image src={s.image} alt={s.title} fill sizes={large ? "56px" : "48px"} className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-110" />
    </span>
    <div className="min-w-0">
      <h3 className={`font-bold! leading-tight text-text-primary ${large ? "text-[14px]! sm:text-[15px]!" : "text-[12px]!"}`}>{s.title}</h3>
      <p className={`mt-0.5 leading-snug text-text-secondary ${large ? "text-[12px]!" : "text-[10px]!"}`}>{s.desc}</p>
    </div>
  </div>
);

const CenterHub = ({ size = "h-30 w-30 sm:h-30 sm:w-30" }) => (
  <div
    className={`relative grid ${size} place-items-center rounded-full p-[6px]`}
    style={{
      background: "linear-gradient(160deg, #F9A45C 0%, #F5842A 50%, #ED282E 100%)",
      boxShadow: "0 0 60px rgba(245,132,42,0.35), var(--shadow-card)",
    }}
  >
    <div className="grid h-full w-full place-items-center rounded-full bg-card px-4 text-center">
      <div className="flex flex-col items-center">
        <Image
          src="/SagarIndustries-logo.webp"
          alt="Sagar Industries"
          width={150}
          height={42}
          className="h-auto w-[85%] object-contain"
        />
      </div>
    </div>
  </div>
);

const IndustriesServed = () => {
  return (
    <section className="section-py relative bg-bg">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-6">
          {/* ── Left — copy + stats ──────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow">Industries Served</span>

            <h2 className="">
              Machines for{" "}
              <span className="text-accent">Every Industry</span>
            </h2>

            <p className="max-w-md text-text-secondary">
              Our paper cutting and flexo printing machines power packaging,
              corrugated board, printing and paper converting lines.
            </p>

            <Link
              href={Routes.solutions.urlPath}
              className="btn-orange btn-lg mt-1 w-fit"
            >
              Explore Solutions
              <ArrowRight size={18} weight="bold" />
            </Link>
          </motion.div>

          {/* ── Right — orbital diagram (lg+) ────────────────────── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto hidden aspect-square w-full max-w-[600px] lg:block"
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
                r="40"
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
                const hw = 15.2; // card half-width (≈170px in the 560px box)
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
                className="absolute w-[200px] -translate-x-1/2 -translate-y-1/2"
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
            {/* flex-wrap keeps the trailing card centred instead of orphaned */}
            <div className="flex flex-wrap justify-center gap-3.5 sm:gap-4">
              {SECTORS.map((s) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="w-full sm:w-[calc(50%-0.5rem)]"
                >
                  <SectorCard s={s} large />
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
