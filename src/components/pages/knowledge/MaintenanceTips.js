// ─────────────────────────────────────────────────────────────────────
// Knowledge › Maintenance Tips — preventive-care checklist.
// Two-column: intro on the left, a grid of tip cards on the right.
// Keeps machines running reliably and protects warranty / uptime.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  Drop,
  Scissors,
  Broom,
  Lightning,
  Gauge,
  Wrench,
} from "@phosphor-icons/react";

const TIPS = [
  { icon: Drop, title: "Lubricate Moving Parts", desc: "Oil chains, bearings and guides on schedule to prevent wear." },
  { icon: Scissors, title: "Check Blade & Alignment", desc: "Inspect blade sharpness and alignment for clean, accurate cuts." },
  { icon: Broom, title: "Keep Rollers Clean", desc: "Wipe rollers and sensors to avoid dust build-up and misfeeds." },
  { icon: Lightning, title: "Inspect Electricals", desc: "Check wiring, connections and earthing for safe operation." },
  { icon: Gauge, title: "Respect Load Limits", desc: "Run within rated width, speed and material specs to avoid strain." },
  { icon: Wrench, title: "Schedule Servicing", desc: "Book periodic professional servicing to catch issues early." },
];

const MaintenanceTips = () => {
  return (
    <section id="maintenance" className="section-py scroll-mt-20 bg-soft">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.4fr] lg:gap-14">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="flex flex-col gap-4 text-center lg:text-left"
          >
            <span className="eyebrow mx-auto lg:mx-0">
              Maintenance
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Keep Your Machine in <span className="text-accent">Top Shape</span>
            </h2>
            <span className="mx-auto h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary lg:mx-0" />
            <p className="text-text-secondary">
              A little regular care prevents costly downtime and keeps output
              consistent. Follow this routine to extend your machine&apos;s life.
            </p>
          </motion.div>

          {/* Tip cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {TIPS.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: (i % 2) * 0.1, ease: "easeOut" }}
                className="group flex items-start gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card transition duration-300 hover:border-accent hover:shadow-orange"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110">
                  <t.icon size={22} weight="regular" />
                </span>
                <div>
                  <h3 className="text-[15px]! font-semibold leading-tight">{t.title}</h3>
                  <p className="mt-1.5 text-[13px]! leading-snug text-text-secondary">{t.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceTips;
