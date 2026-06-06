// ─────────────────────────────────────────────────────────────────────
// Products › Selection Guide — "Which machine is right for you?"
// Two decision cards: icon + accented title, an icon checklist, a "Best For"
// box and an Inquire Now button. Both cards use the orange theme.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Scissors,
  Palette,
  Scroll,
  Stack,
  Crosshair,
  Gear,
  FileText,
  Drop,
  Wind,
  Gauge,
  Medal,
  ArrowRight,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const GUIDES = [
  {
    icon: Scissors,
    machine: "Paper Roll To Sheet Cutting Machine",
    titleLead: "Choose",
    titleAccent: " Paper Roll To Sheet Cutting Machine",
    titleTail: " if…",
    points: [
      { icon: Scroll, text: "You need roll/reel to sheet conversion" },
      { icon: Stack, text: "You work with paper, aluminium, non-woven, jute, rexine, sponge, or foam sheets" },
      { icon: Crosshair, text: "You need accurate cutting length" },
      { icon: Gear, text: "You need manual or automatic cutting options" },
    ],
    bestFor: "Small to large scale sheet conversion with high accuracy.",
  },
  {
    icon: Palette,
    machine: "Flexo Printing Machine",
    titleLead: "Choose ",
    titleAccent: "Flexo Printing Machine",
    titleTail: " if…",
    points: [
      { icon: FileText, text: "You need printing on craft paper or corrugated board" },
      { icon: Drop, text: "You require single to four colour printing" },
      { icon: Wind, text: "You need quick drying and uniform ink flow" },
      { icon: Gauge, text: "You need optional frequency speed control" },
    ],
    bestFor: "High volume printing with consistent quality and speed.",
  },
];

const Guide = ({ g, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
    className="flex flex-col rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange md:p-8"
  >
    {/* Header */}
    <div className="flex items-start gap-4">
      <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
        <g.icon size={28} weight="bold" />
      </span>
      <div>
        <h3 className="text-[16px]! font-bold! uppercase leading-snug sm:text-[18px]!">
          {g.titleLead}
          <span className="text-accent">{g.titleAccent}</span>
          {g.titleTail}
        </h3>
        <span className="mt-2 block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
      </div>
    </div>

    {/* Checklist */}
    <ul className="mt-6 flex flex-col">
      {g.points.map((p) => (
        <li
          key={p.text}
          className="flex items-center gap-3 border-b border-dashed border-border py-3.5 last:border-0"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
            <p.icon size={18} weight="bold" />
          </span>
          <span className="text-sm text-text-secondary">{p.text}</span>
        </li>
      ))}
    </ul>

    {/* Best For */}
    <div className="mt-5 flex items-center gap-4 rounded-2xl bg-accent/10 p-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-card text-accent shadow-card">
        <Medal size={24} weight="fill" />
      </span>
      <div>
        <div className="text-[13px] font-bold text-accent">Best For</div>
        <p className="mt-0.5 text-[13px]! leading-snug text-text-secondary">{g.bestFor}</p>
      </div>
    </div>

    {/* CTA — deep-links to the contact form with this machine preselected */}
    <Link
      href={{
        pathname: Routes.contact.urlPath,
        query: { machine: g.machine },
        hash: "inquiry",
      }}
      className="btn btn-orange mt-5"
    >
      Inquire Now
      <ArrowRight size={16} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  </motion.div>
);

const SelectionGuide = () => {
  return (
    <section className="section-py !pt-6 bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Selection Guide</span>
          <h2 className="uppercase leading-[1.1] tracking-[-0.01em] lg:whitespace-nowrap">
            Which <span className="text-accent">Machine</span> Is Right For You?
          </h2>
          <p className="text-text-secondary lg:whitespace-nowrap">
            Tell us your needs and we&apos;ll match you with the right cutting
            or flexo printing machine.
          </p>
        </div>

        {/* Cards */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {GUIDES.map((g, i) => (
            <Guide key={g.titleAccent} g={g} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectionGuide;
