// ─────────────────────────────────────────────────────────────────────
// Home › Why Choose Us — editorial hairline-grid layout.
// Original centered header, then a 6-cell hairline-bordered grid. Each cell:
// a small accent icon + spec tag, a bold title, a muted description, and an
// accent underline that draws in on hover. Theme-token driven (light/dark).
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  Factory,
  Gauge,
  Gear,
  Headset,
  SlidersHorizontal,
  Coins,
} from "@phosphor-icons/react";

const REASONS = [
  {
    icon: Factory,
    num: "01",
    tag: "Design · Fabrication · Assembly",
    title: "In-house engineering",
    description:
      "Every machine is designed, fabricated and assembled under our own roof — no outsourced black boxes, no compromise on quality.",
  },
  {
    icon: Gauge,
    num: "02",
    tag: "Full-load tested",
    title: "Built to run, not to sell",
    description:
      "Each machine is run-tested at full load before it leaves the floor. Dependable, run-after-run performance is the spec.",
  },
  {
    icon: Gear,
    num: "03",
    tag: "Trusted brands",
    title: "Quality components",
    description:
      "Reliable drives, bearings and controls from proven brands. We over-spec where it matters so your line keeps running.",
  },
  {
    icon: Headset,
    num: "04",
    tag: "Pan India · Exports",
    title: "Lifetime partnership",
    description:
      "Installation, training, spare parts and responsive technical support — long after your machine is on the floor.",
  },
  {
    icon: SlidersHorizontal,
    num: "05",
    tag: "Made to order",
    title: "Tailored configurations",
    description:
      "Cutting length, colour stations, speed and automation — configured to your production line, not pulled from a catalogue.",
  },
  {
    icon: Coins,
    num: "06",
    tag: "Low TCO · Uptime",
    title: "Honest economics",
    description:
      "Efficient power draw, fewer wear parts and predictable maintenance windows — engineered for total cost of ownership.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose lg:py-[80px] md:py-[60px] py-[40px] bg-soft">
      <div className="container">
        {/* ── Header ─────────────────────────────────────────────── */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Why Choose Us</span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[36px]!">
            Engineering You Can <span className="text-accent">Rely On</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Decades of manufacturing expertise behind every machine we build for
            the paper, packaging and printing industries.
          </p>
        </div>

        {/* ── Hairline grid ──────────────────────────────────────── */}
        <div className="mt-14 overflow-hidden rounded-[var(--radius-card)] border-l border-t border-border lg:mt-16">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {REASONS.map((r, i) => (
              <motion.article
                key={r.num}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1, ease: "easeOut" }}
                className="group bg-bglight relative flex flex-col border-b border-r border-border p-6 transition-colors duration-300 hover:bg-bgdark lg:p-8"
              >
                {/* top row — icon + spec tag */}
                <div className="flex items-start justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                    <r.icon size={20} weight="bold" />
                  </span>
                  <span className="text-right text-[10px] font-medium uppercase tracking-[0.18em] text-text-secondary/70">
                    {r.tag}
                  </span>
                </div>

                {/* title + description, pushed toward the lower half */}
                <div className="mt-auto pt-10">
                  <h3 className="text-[19px]! font-bold! leading-snug text-text-primary">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {r.description}
                  </p>
                </div>

                {/* accent underline drawing in on hover */}
                <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-br from-primary to-secondary transition-all duration-300 group-hover:w-full" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
