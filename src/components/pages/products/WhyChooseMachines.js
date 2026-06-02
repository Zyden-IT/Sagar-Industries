// ─────────────────────────────────────────────────────────────────────
// Products › Why Choose Our Machines — hub layout.
// Central machine on a podium inside a dashed ring, flanked by four
// hexagon stat cards (icon badge + big stat + title + desc) pointing inward.
// Desktop (lg+): radial 3-column. Below lg: stacked card grid. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { Crosshair, Infinity, Globe, Headset, ShieldCheck } from "@phosphor-icons/react";

const ITEMS = [
  { icon: Crosshair, num: "98", suf: "%", title: "Precision Engineering", desc: "Accurate, repeatable performance in every machine we build.", side: "left" },
  { icon: Infinity, num: "∞", suf: "", title: "Customization", desc: "Configured to your size, capacity and material requirements.", side: "left" },
  { icon: Globe, num: "100", suf: "%", title: "Export Ready", desc: "Manufactured to international standards and shipped worldwide.", side: "right" },
  { icon: Headset, num: "24/7", suf: "", title: "After Sales Support", desc: "Installation, training, spares and responsive service anytime.", side: "right" },
];

const HEX_LEFT = "polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)"; // points right
const HEX_RIGHT = "polygon(10% 0%, 100% 0%, 100% 100%, 10% 100%, 0% 50%)"; // points left

const Card = ({ item, index }) => {
  const left = item.side === "left";
  const clip = left ? HEX_LEFT : HEX_RIGHT;
  return (
    <motion.div
      initial={{ opacity: 0, x: left ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative w-full max-w-[340px]"
    >
      {/* icon badge on the outer edge */}
      <span
        className={`absolute top-1/2 z-20 grid h-16 w-16 -translate-y-1/2 place-items-center rounded-full bg-card text-accent shadow-card ring-1 ring-theme transition-transform duration-300 group-hover:scale-105 ${
          left ? "left-0 -translate-x-1/3" : "right-0 translate-x-1/3"
        }`}
      >
        <item.icon size={28} weight="bold" />
      </span>

      {/* orange edge */}
      <div className="p-[2px]" style={{ clipPath: clip, background: "var(--orange-gradient)" }}>
        {/* card body */}
        <div
          className={`bg-card py-5 ${left ? "pl-16 pr-10" : "pl-10 pr-16 text-right"}`}
          style={{ clipPath: clip }}
        >
          <div className="stats-font leading-none">
            <span className="text-4xl font-bold text-accent">{item.num}</span>
            <span className="text-xl font-bold text-accent">{item.suf}</span>
          </div>
          <h3 className="mt-1.5 text-[14px]! font-bold! uppercase leading-tight">
            {item.title}
          </h3>
          <p className="mt-1 line-clamp-3 text-[12px]! leading-snug text-secondary">
            {item.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Hub = () => (
  <div className="relative flex flex-col items-center">
    <div className="relative grid place-items-center">
      {/* dashed ring */}
      <motion.span
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute h-[400px] w-[400px] rounded-full border-2 border-dashed border-accent/30"
      />
      {/* connector dots on the ring */}
      {["-top-1 left-1/2 -translate-x-1/2", "top-1/2 -left-1 -translate-y-1/2", "top-1/2 -right-1 -translate-y-1/2", "-bottom-1 left-1/2 -translate-x-1/2"].map((p) => (
        <span key={p} className={`absolute h-2.5 w-2.5 rounded-full bg-accent ${p}`} style={{ margin: "0" }} />
      ))}
      {/* machine */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative h-[360px] w-[360px]"
      >
        <Image src="/hero.png" alt="Sagar Industries machine" fill className="object-contain" />
      </motion.div>
    </div>

    {/* podium */}
    <div className="-mt-4 h-5 w-64 rounded-[50%] bg-gradient-to-b from-card to-soft shadow-card" />

    {/* one promise pill */}
    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-theme bg-card px-5 py-2.5 text-sm shadow-card">
      <ShieldCheck size={18} weight="fill" className="text-accent" />
      <span className="font-bold text-primary">ONE PROMISE.</span>
      <span className="font-bold text-accent">TOTAL RELIABILITY.</span>
    </div>
  </div>
);

const WhyChooseMachines = () => {
  const left = ITEMS.filter((i) => i.side === "left");
  const right = ITEMS.filter((i) => i.side === "right");

  return (
    <section className="section-py relative overflow-hidden bg-theme">
      {/* blueprint texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 25%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 45%, black 25%, transparent 100%)",
        }}
      />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">Why Choose Us</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
              Why Choose Our Machines
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="text-secondary">
            Built with precision. Trusted worldwide. Designed for your success.
          </p>
        </div>

        {/* ── Desktop: hub layout ────────────────────────────────── */}
        <div className="mt-14 hidden items-center gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="flex flex-col items-end gap-10">
            {left.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </div>

          <Hub />

          <div className="flex flex-col items-start gap-10">
            {right.map((item, i) => (
              <Card key={item.title} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ── Tablet / mobile: stacked ───────────────────────────── */}
        <div className="mt-12 lg:hidden">
          <div className="mb-10 flex justify-center">
            <div className="relative h-[220px] w-[220px]">
              <Image src="/hero.png" alt="Machine" fill className="object-contain" />
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1, ease: "easeOut" }}
                className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-theme bg-card p-5 shadow-card transition hover:border-accent hover:shadow-orange"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                  <item.icon size={26} weight="bold" />
                </span>
                <div>
                  <div className="stats-font text-2xl font-bold text-accent">
                    {item.num}
                    <span className="text-base">{item.suf}</span>
                  </div>
                  <h3 className="text-[14px]! font-bold! uppercase leading-tight">{item.title}</h3>
                  <p className="mt-1 text-[12px]! text-secondary">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMachines;
