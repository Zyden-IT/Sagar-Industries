// ─────────────────────────────────────────────────────────────────────
// Home › Manufacturing Process — "How We Work" 5-step journey.
// lg: horizontal numbered timeline with a connecting line; mobile: stacked
// cards with a left rail. All colours from the project theme.
// ─────────────────────────────────────────────────────────────────────

import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  ChatCircleDots,
  Ruler,
  Gear,
  ShieldCheck,
  Truck,
  CaretRight,
  CaretDown,
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
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            How We Work
          </span>
          <h2 className="">
            How We <span className="text-accent">Build Your Machine</span>
          </h2>
          <p className="text-text-secondary">
            A proven, in-house process that turns your requirement into a
            reliable, production-ready machine.
          </p>
        </div>

        {/* Steps */}
        <div className="mt-14 lg:mt-16">
          {/* ── Desktop: connected horizontal flow (lg+) ─────────────── */}
          <div className="hidden items-stretch gap-2 xl:flex xl:gap-3">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <Fragment key={s.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                    className="group relative flex min-w-0 flex-1 flex-col gap-4 overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
                  >

                    <span className="relative grid h-12 w-12 place-items-center rounded-full bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                      <s.icon size={24} weight="regular" />
                    </span>

                    <div className="relative">
                      <div className="stats-font text-[11px] font-bold uppercase tracking-[1.5px] text-accent">
                        Step 0{i + 1}
                      </div>
                      <h3 className="mt-1 text-[15px]! font-bold! leading-tight">{s.title}</h3>
                      <p className="mt-2 text-[13px]! leading-relaxed text-text-secondary">
                        {s.desc}
                      </p>
                    </div>

                    {/* accent foot line that fills on hover */}
                    <span className="absolute inset-x-0 bottom-0 h-[3px] w-0 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                  </motion.div>

                  {/* flow arrow */}
                  {!last && (
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.1 + 0.15 }}
                      className="grid shrink-0 place-items-center self-center text-accent"
                    >
                      <CaretRight size={20} weight="bold" />
                    </motion.span>
                  )}
                </Fragment>
              );
            })}
          </div>

          {/* ── Mobile / tablet: stacked flow with down-arrows ───────── */}
          <div className="mx-auto flex max-w-md flex-col xl:hidden">
            {STEPS.map((s, i) => {
              const last = i === STEPS.length - 1;
              return (
                <Fragment key={s.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                    className="group relative flex items-start gap-4 overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card transition duration-300 hover:border-accent hover:shadow-orange"
                  >
                    {/* <span className="stats-font pointer-events-none absolute -right-1 -top-3 select-none text-[60px] font-bold leading-none text-accent/10">
                      {i + 1}
                    </span> */}

                    <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <s.icon size={24} weight="regular" />
                    </span>

                    <div className="relative">
                      <div className="stats-font text-[11px] font-bold uppercase tracking-[1.5px] text-accent">
                        Step 0{i + 1}
                      </div>
                      <h3 className="mt-0.5 text-[15px]! font-bold! leading-tight">{s.title}</h3>
                      <p className="mt-1.5 text-[13px]! leading-relaxed text-text-secondary">
                        {s.desc}
                      </p>
                    </div>
                  </motion.div>

                  {/* down arrow between cards */}
                  {!last && (
                    <span className="grid place-items-center py-2.5 text-accent">
                      <CaretDown size={20} weight="bold" />
                    </span>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingProcess;
