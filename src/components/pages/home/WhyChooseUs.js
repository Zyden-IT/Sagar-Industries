// ─────────────────────────────────────────────────────────────────────
// Home › Why Choose Us — cards with a hexagon badge floating over the top
// edge. Centered header, light theme, faint dotted texture. Hover lifts the
// card, fills the accent border and scales the badge. Same content.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  Factory,
  Gear,
  Gauge,
  Globe,
  Headset,
  Truck,
} from "@phosphor-icons/react";

const HEX = { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };

const REASONS = [
  {
    icon: Factory,
    title: "In-House Manufacturing",
    description:
      "Every machine is designed, fabricated and assembled at our own facility for complete quality control.",
  },
  {
    icon: Gear,
    title: "Custom-Built Machines",
    description:
      "Machines configured to your size, capacity and production needs — not one-size-fits-all.",
  },
  {
    icon: Gauge,
    title: "Precision Engineering",
    description:
      "Accurate cutting, uniform printing and reliable performance, run after run.",
  },
  {
    icon: Globe,
    title: "Export Quality",
    description:
      "Built to international standards and shipped to clients across India and overseas.",
  },
  {
    icon: Headset,
    title: "After-Sales Support",
    description:
      "Installation, training, spare parts and responsive technical support whenever you need it.",
  },
  {
    icon: Truck,
    title: "Timely Delivery",
    description:
      "Dependable lead times and on-time dispatch so your production stays on schedule.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="section-py relative overflow-hidden bg-soft">
      {/* faint dotted texture */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container relative">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[3px] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            Why Choose Us
            <span className="h-px w-8 bg-accent/50" />
          </span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[36px]!">
            Engineering You Can <span className="text-accent">Rely On</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            Decades of manufacturing expertise behind every machine we build for
            the paper, packaging and printing industries.
          </p>
        </div>

        {/* ── Cards ──────────────────────────────────────────────── */}
        <div className="mt-20 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((r, i) => (
            <motion.div
              key={r.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: "easeOut" }}
              className="group relative rounded-[var(--radius-card)] border border-theme bg-card px-6 pb-7 pt-12 text-center shadow-card transition duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-orange"
            >
              {/* hexagon badge straddling the top edge */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 [filter:drop-shadow(0_10px_18px_rgba(255,107,26,0.35))]">
                <span
                  className="grid h-16 w-16 place-items-center bg-orange-gradient text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                  style={HEX}
                >
                  <r.icon size={28} weight="bold" />
                </span>
              </span>

              <h3 className="text-[17px]! font-bold! leading-snug sm:text-[18px]!">
                {r.title}
              </h3>
              <span className="mx-auto mt-3 block h-[3px] w-9 rounded-full bg-orange-gradient" />
              <p className="mt-3 text-sm leading-relaxed text-secondary">{r.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
