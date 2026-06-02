// ─────────────────────────────────────────────────────────────────────
// About › Manufacturing Strength — two-column: capability list + image.
// Theme colours, on-scroll fade-in.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { Wrench, UsersThree, Cube, ShieldCheck, Gauge } from "@phosphor-icons/react";

const STRENGTHS = [
  { icon: Wrench, title: "In-House Fabrication", desc: "Design, cutting, welding and assembly — all under one roof for full quality control." },
  { icon: UsersThree, title: "Skilled Workforce", desc: "Experienced engineers and technicians with deep machine-building expertise." },
  { icon: Cube, title: "Quality Raw Materials", desc: "Graded steel, branded motors, drives and components in every build." },
  { icon: ShieldCheck, title: "Precision Assembly & Testing", desc: "Every machine is assembled to spec and performance-tested before dispatch." },
];

const fadeIn = (x = 0) => ({
  initial: { opacity: 0, x, y: x === 0 ? 24 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
});

const ManufacturingStrength = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <motion.div {...fadeIn(-30)} className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-accent">
                Manufacturing Strength
              </span>
              <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
                Engineered End-to-End, In-House
              </h2>
              <p className="max-w-md text-secondary">
                From raw steel to a finished, tested machine — we control every
                stage of production to deliver consistent quality and reliable
                performance.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {STRENGTHS.map((s) => (
                <div key={s.title} className="flex items-start gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                    <s.icon size={22} weight="bold" />
                  </span>
                  <div>
                    <h3 className="text-[16px]! font-semibold sm:text-[17px]!">{s.title}</h3>
                    <p className="mt-1 text-sm text-secondary">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Image + capacity badge */}
          <motion.div {...fadeIn(30)} className="relative">
            <div className="absolute -right-4 -top-4 hidden h-28 w-28 rounded-xl border-2 border-accent/40 sm:block" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1200&q=80"
                alt="Sagar Industries manufacturing"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 hidden rounded-2xl bg-accent px-6 py-5 text-white shadow-orange sm:block">
              <span className="stats-font block text-3xl font-bold leading-none">100%</span>
              <span className="text-sm text-white/90">In-house build</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ManufacturingStrength;
