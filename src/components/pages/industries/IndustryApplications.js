// ─────────────────────────────────────────────────────────────────────
// Industries › Where Our Machines Are Used — 6-step horizontal timeline.
// Each step: a hexagon icon node, a numbered badge on a dashed connector,
// then a card with title, description, application chips and the recommended
// machine. Desktop: 6 across with the dashed rail; tablet/mobile: grid, no rail.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Newspaper,
  Package,
  Printer,
  Stack,
  Scissors,
  BookOpen,
  Gear,
  ArrowRight,
} from "@phosphor-icons/react";

const HEX = { clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)" };

const MAP = [
  {
    icon: Newspaper,
    industry: "Paper Mills & Traders",
    desc: "Convert jumbo reels into accurately cut reams and sheets at high volume, with clean edges and consistent counts.",
    apps: ["Reel-to-sheet cutting", "Ream cutting", "Bulk sheeting"],
    machine: "Paper Roll To Sheet Cutting Machine",
  },
  {
    icon: Package,
    industry: "Packaging",
    desc: "Produce clean, consistent carton blanks, box liners and wrapping sheets — ready for the next stage of the line.",
    apps: ["Carton blanks", "Box liners", "Wrapping sheets"],
    machine: "Automatic Cutting Machine",
  },
  {
    icon: Printer,
    industry: "Printing Presses",
    desc: "Feed presses with perfectly sized sheets and run crisp single- to multi-colour flexo jobs with accurate registration.",
    apps: ["Pre-print sheeting", "Label stock", "Multi-colour printing"],
    machine: "Flexo Printing Machine",
  },
  {
    icon: Stack,
    industry: "Corrugated Board",
    desc: "Cut heavy liners, boards and flutes with shear slitting and rugged, high-power machines made for industrial loads.",
    apps: ["Liner sheeting", "Board cutting", "Flute prep"],
    machine: "Heavy Duty Cutting Machine",
  },
  {
    icon: Scissors,
    industry: "Converters",
    desc: "Maximize output across slitting, sheeting and lamination prep with high-speed, repeatable accuracy.",
    apps: ["Slitting", "Sheeting", "Lamination prep"],
    machine: "High Speed Cutting Machine",
  },
  {
    icon: BookOpen,
    industry: "Notebook & Stationery",
    desc: "Sheet, rule, prep and cut cover stock precisely for notebooks, pads and stationery — neat, square and ready to bind.",
    apps: ["Sheet cutting", "Ruling prep", "Cover stock"],
    machine: "Manual / Semi-Automatic Machine",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const Step = ({ m, n }) => {
  const Icon = m.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (n - 1) * 0.08, ease: "easeOut" }}
      className="group relative flex flex-col items-center"
    >
      {/* Hexagon icon node */}
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 bg-accent/40 transition-colors duration-300 group-hover:bg-accent" style={HEX} />
        <div
          className="absolute inset-[1.5px] grid place-items-center bg-card text-accent transition-colors duration-300 group-hover:bg-[#ff6a0d] group-hover:text-white"
          style={HEX}
        >
          <Icon size={26} weight="regular" />
        </div>
      </div>

      {/* Number badge (sits on the dashed rail) */}
      <span className="relative z-10 mt-3 grid h-8 w-8 place-items-center rounded-full bg-orange-gradient text-[12px] font-bold text-white ring-4 ring-[var(--color-bg)]">
        {pad(n)}
      </span>

      {/* Card */}
      <div className="mt-4 flex w-full flex-1 flex-col rounded-[var(--radius-card)] border border-theme bg-card p-5 text-center shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange">
        <h3 className="text-[14px]! font-bold! uppercase leading-tight">{m.industry}</h3>
        <p className="mt-2 text-[12px]! leading-snug text-secondary">{m.desc}</p>

        {/* application chips */}
        <ul className="mt-4 flex flex-col items-center gap-1.5">
          {m.apps.map((a) => (
            <li key={a} className="rounded-full border border-theme bg-soft px-3 py-1 text-[11px]! font-medium text-secondary">
              {a}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const IndustryApplications = () => {
  return (
    <section className="section-py bg-theme">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[2px] text-accent">
            <span className="h-px w-8 bg-accent/50" />
            Applications
            <span className="h-px w-8 bg-accent/50" />
          </span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[36px]!">
            Where Our <span className="text-accent">Machines</span> Are Used
          </h2>
          <span className="flex items-center gap-1.5">
            <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
            <span className="h-[6px] w-[6px] rounded-full bg-accent" />
          </span>
          <p className="mt-1 text-secondary">
            Find your industry and the typical applications we power — along with
            the machine best suited to the job.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative mt-14">
          {/* dashed rail through the number badges (desktop only) */}
          <span className="pointer-events-none absolute left-[8.3%] right-[8.3%] top-[80px] hidden border-t-2 border-dashed border-accent/40 lg:block" />

          <div className="grid items-stretch gap-x-4 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {MAP.map((m, i) => (
              <Step key={m.industry} m={m} n={i + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryApplications;
