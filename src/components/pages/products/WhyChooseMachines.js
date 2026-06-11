// ─────────────────────────────────────────────────────────────────────
// Products › Why Choose Our Machines — clean 4-card grid.
// Responsive cards (icon badge, big stat, title, desc) with a hover lift
// and accent border/glow. No center image. Theme colours throughout.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Crosshair, Infinity as InfinityIcon, Globe, Headset } from "@phosphor-icons/react";

const ITEMS = [
  { icon: Crosshair, num: "98", suf: "%", title: "Precision Engineering", desc: "Accurate, repeatable performance in every machine we build." },
  { icon: InfinityIcon, num: "∞", suf: "", title: "Customization", desc: "Configured to your size, capacity and material requirements." },
  { icon: Globe, num: "100", suf: "%", title: "Export Ready", desc: "Manufactured to international standards and shipped worldwide." },
  { icon: Headset, num: "24/7", suf: "", title: "After Sales Support", desc: "Installation, training, spares and responsive service anytime." },
];

const Card = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
    className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
  >
    {/* top accent line that grows on hover */}
    <span className="absolute inset-x-0 top-0 h-[3px] w-0 bg-gradient-to-br from-primary to-secondary transition-all duration-300 group-hover:w-full" />

    {/* ghost index */}
    <span className="stats-font pointer-events-none absolute right-4 top-3 select-none text-5xl font-bold leading-none text-text-primary opacity-[0.05] transition-opacity duration-300 group-hover:opacity-10">
      0{index + 1}
    </span>

    {/* icon badge */}
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-105 group-hover:bg-accent group-hover:text-white">
      <item.icon size={28} weight="bold" />
    </span>

    {/* stat */}
    <div className="stats-font mt-6 leading-none">
      <span className="text-5xl font-bold text-accent">{item.num}</span>
      <span className="text-2xl font-bold text-accent">{item.suf}</span>
    </div>

    {/* title + desc */}
    <h3 className="mt-3 text-[15px]! font-bold! uppercase leading-tight text-text-primary">
      {item.title}
    </h3>
    <p className="mt-2 text-[13px]! leading-relaxed text-text-secondary">{item.desc}</p>
  </motion.div>
);

const WhyChooseMachines = () => {
  return (
    <section className="section-py relative overflow-hidden bg-bg">
      {/* blueprint texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 85% 70% at 50% 40%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 85% 70% at 50% 40%, black 25%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <div className="flex flex-col items-start gap-3 lg:items-center">
            <span className="eyebrow">Why Choose Us</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
              Why Choose Our <span className="text-accent">Machines</span>
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Precision-engineered machines from a trusted manufacturer and exporter.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Card key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMachines;
