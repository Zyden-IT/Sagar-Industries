// ─────────────────────────────────────────────────────────────────────
// About › Quality Process — 4-step process cards.
// Centered header (eyebrow above heading) + a responsive row of 4 cards,
// each with a numbered ghost index, icon badge, heading and text.
// Theme colours throughout.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Blueprint, Gear, Gauge, Truck } from "@phosphor-icons/react";

const STEPS = [
  {
    icon: Blueprint,
    title: "Design & Engineering",
    text: "Our team develops machine solutions with a focus on efficiency, precision, and industrial performance.",
  },
  {
    icon: Gear,
    title: "Precision Manufacturing",
    text: "High-quality components are fabricated and assembled using modern manufacturing techniques and strict quality standards.",
  },
  {
    icon: Gauge,
    title: "Testing & Quality Inspection",
    text: "Each machine is thoroughly tested for accuracy, safety, and operational reliability before approval.",
  },
  {
    icon: Truck,
    title: "Delivery & Support",
    text: "Machines are securely dispatched and backed by dedicated technical support for smooth installation and operation.",
  },
];

const QualityProcess = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* ── Header (eyebrow above heading) ─────────────────────── */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            Quality Process
          </span>
          <h2 className="">
            Built With <span className="text-accent">Precision &amp; Quality</span>
          </h2>
          <p className="max-w-2xl text-text-secondary">
            Every machine follows a rigorous manufacturing and quality control
            process for reliable performance and long-term durability.
          </p>
        </div>

        {/* ── 4 process cards ────────────────────────────────────── */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
            >
              {/* top accent line — grows on hover */}
              <span className="absolute inset-x-0 top-0 h-[3px] w-0 bg-gradient-to-br from-primary to-secondary transition-all duration-300 group-hover:w-full" />

              {/* icon badge */}
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <s.icon size={26} weight="bold" />
              </span>

              <h3 className="mt-5 text-[17px]! font-bold! leading-snug text-text-primary">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                {s.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QualityProcess;
