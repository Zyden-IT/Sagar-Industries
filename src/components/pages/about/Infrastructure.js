// ─────────────────────────────────────────────────────────────────────
// About › Infrastructure — facility areas card grid + capacity stats.
// Theme colours, staggered fade-up.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Factory, Gear, Gauge, PencilRuler, Stack, Truck } from "@phosphor-icons/react";

// Facility areas (icon + name + short sub).
const AREAS = [
  { icon: PencilRuler, label: "Design & Engineering", sub: "CAD machine design" },
  { icon: Factory, label: "Fabrication Unit", sub: "Cutting & welding" },
  { icon: Gear, label: "Machining & Assembly", sub: "Precision machining" },
  { icon: Gauge, label: "Testing & QC Zone", sub: "Quality testing" },
  { icon: Stack, label: "Raw Material Store", sub: "Graded inventory" },
  { icon: Truck, label: "Dispatch & Loading", sub: "Pack & dispatch" },
];

const STATS = [
  { value: "15,000+", label: "sq. ft. facility" },
  { value: "6", label: "dedicated units" },
  { value: "30+", label: "skilled staff" },
];

const Infrastructure = () => {
  return (
    <section className="section-py bg-theme">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
              Infrastructure
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              A Facility Built for Precision
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="max-w-xl text-secondary">
            Every stage of machine-building happens across dedicated, well-equipped
            units within our manufacturing facility.
          </p>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-10 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-10 gap-y-4 rounded-[var(--radius-card)] border border-theme bg-card px-8 py-6 shadow-card">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div
                className="stats-font bg-clip-text text-2xl font-bold text-transparent lg:text-3xl"
                style={{ backgroundImage: "var(--orange-gradient)" }}
              >
                {s.value}
              </div>
              <div className="text-sm text-secondary">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Facility areas — card grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map((a, i) => (
            <motion.div
              key={a.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08, ease: "easeOut" }}
              className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-theme bg-card p-5 shadow-card transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-orange"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
                <a.icon size={24} weight="bold" />
              </span>
              <div>
                <h3 className="text-[15px]! font-bold! leading-tight">{a.label}</h3>
                <p className="mt-1 text-[13px]! leading-snug text-secondary">{a.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Infrastructure;
