// ─────────────────────────────────────────────────────────────────────
// Home › Manufacturing Process — "How We Work" 5-step journey.
// lg: horizontal numbered timeline with a connecting line; mobile: stacked
// cards with a left rail. All colours from the project theme.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  ChatCircleDots,
  Ruler,
  Gear,
  ShieldCheck,
  Truck,
} from "@phosphor-icons/react";

const STEPS = [
  {
    icon: ChatCircleDots,
    title: "Consultation",
    desc: "We understand your production goals, material and output requirements.",
  },
  {
    icon: Ruler,
    title: "Design & Engineering",
    desc: "Our engineers craft a custom machine design tailored to your line.",
  },
  {
    icon: Gear,
    title: "Manufacturing",
    desc: "Precision fabrication and assembly using quality-grade components.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Testing",
    desc: "Every machine is rigorously tested for performance and safety.",
  },
  {
    icon: Truck,
    title: "Delivery & Setup",
    desc: "On-site installation, training and dependable after-sales support.",
  },
];

const ManufacturingProcess = () => {
  return (
    <section className="section-py bg-theme">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
            How We Work
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            From Idea to Installation
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            A proven, end-to-end process that turns your requirement into a
            reliable, production-ready machine.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {/* connecting line between badges (lg only) — inset by half a column
             so it runs from the first badge centre to the last. */}
          <span className="pointer-events-none absolute top-8 left-[10%] right-[10%] hidden h-0 border-t-2 border-dashed border-accent/50 lg:block" />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="relative flex flex-col items-center text-center"
            >
              {/* numbered badge */}
              <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-orange-gradient text-2xl font-bold text-white shadow-orange">
                {i + 1}
              </span>

              {/* card */}
              <div className="mt-5 flex w-full flex-1 flex-col items-center gap-3 rounded-[var(--radius-card)] border border-theme bg-card p-6 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-orange">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-accent-soft text-accent">
                  <s.icon size={24} weight="regular" />
                </span>
                <h3 className="text-[15px]! font-bold! leading-tight">{s.title}</h3>
                <p className="text-[13px]! leading-relaxed text-secondary">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcess;
