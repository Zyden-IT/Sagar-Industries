// ─────────────────────────────────────────────────────────────────────
// About › Customer Journey — winding "road" process map.
// Desktop: an SVG road (asphalt + dashed centre line) snaking through 3 rows,
// with circular icon markers, a flag at the start and a trophy at the end,
// and a title/description under each step. Mobile: vertical list.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import {
  ChatsCircle,
  Lightbulb,
  FileText,
  Buildings,
  Gear,
  ShieldCheck,
  Truck,
  Headset,
  Flag,
  Trophy,
} from "@phosphor-icons/react";

// Positions in % match the SVG road below (viewBox 1200 x 880).
const STEPS = [
  { icon: ChatsCircle, title: "Requirement Discussion", desc: "We understand your needs and machine requirements.", x: "23.33%", y: "13.64%" },
  { icon: Lightbulb, title: "Machine Recommendation", desc: "We recommend the most suitable machine solution.", x: "46.67%", y: "13.64%" },
  { icon: FileText, title: "Quotation & Approval", desc: "Detailed specifications, pricing and options.", x: "70%", y: "13.64%" },
  { icon: Buildings, title: "Factory Visit / Demo", desc: "Visit our facility or schedule a live demo.", x: "68.33%", y: "45.45%" },
  { icon: Gear, title: "Machine Manufacturing", desc: "Built with quality components and precision.", x: "45%", y: "45.45%" },
  { icon: ShieldCheck, title: "Quality Testing", desc: "Strict quality and performance testing.", x: "23.33%", y: "45.45%" },
  { icon: Truck, title: "Delivery & Installation", desc: "Safe delivery, setup and operator guidance.", x: "40%", y: "77.27%" },
  { icon: Headset, title: "After-Sales Support", desc: "Ongoing technical support and spares.", x: "68.33%", y: "77.27%" },
];

const ROAD =
  "M 120 120 L 940 120 C 1080 120 1080 400 940 400 L 260 400 C 120 400 120 680 260 680 L 1080 680";

const CustomerJourney = () => {
  return (
    <section className="section-py bg-bgdark">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Customer Journey</span>
          <h2 className="">
            From Requirement to <span className="text-accent">Installation</span>
          </h2>
          <p className="text-text-secondary">
            A simple, transparent process — follow the road from your first
            enquiry to a machine running on your floor.
          </p>
        </div>

        {/* ── Desktop: winding road ──────────────────────────────── */}
        <div className="relative mt-8 hidden aspect-[1200/880] w-full lg:block">
          <svg viewBox="0 0 1200 880" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {/* asphalt */}
            <path d={ROAD} fill="none" stroke="#4B4B4B" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            {/* dashed centre line */}
            <path d={ROAD} fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeDasharray="16 24" />
          </svg>

          {/* Flag (start) */}
          <span className="absolute z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange" style={{ left: "10%", top: "13.64%" }}>
            <Flag size={20} weight="fill" />
          </span>
          {/* Trophy (end) */}
          <span className="absolute z-10 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange" style={{ left: "90%", top: "77.27%" }}>
            <Trophy size={20} weight="fill" />
          </span>

          {/* Step markers */}
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "backOut" }}
              className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: s.x, top: s.y }}
            >
              <div className="grid h-16 w-16 place-items-center rounded-full bg-card text-accent shadow-[0_6px_18px_rgba(0,0,0,0.15)] ring-1 ring-border transition-transform duration-300 group-hover:scale-110">
                <s.icon size={26} weight="bold" />
              </div>
              <div className="absolute left-1/2 top-[74px] w-48 -translate-x-1/2 text-center">
                <h3 className="text-[13px]! font-bold! uppercase leading-tight">{s.title}</h3>
                <p className="mt-1 text-[12px]! leading-snug text-text-secondary">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Mobile: vertical list ──────────────────────────────── */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute left-7 top-2 h-[95%] w-0.5 bg-[var(--color-border)]" />
          <div className="flex flex-col gap-7">
            {STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative flex items-start gap-5"
              >
                <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full bg-card text-accent shadow-card ring-1 ring-border">
                  <s.icon size={24} weight="bold" />
                </span>
                <div className="pt-1">
                  <h3 className="text-[15px]! font-semibold leading-snug">{s.title}</h3>
                  <p className="mt-1 text-sm text-text-secondary">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerJourney;
