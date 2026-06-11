// ─────────────────────────────────────────────────────────────────────
// Products › Machine Range — premium "showcase" layout.
//   Left  (30%): sticky glass filter panel — categories (with icons) and,
//                under the active one, its sub-types.
//   Right (70%): large floating machine image (60%) + info panel (40%) with
//                spec chips, View Details (opens modal) + Get Quote, a machine
//                counter and prev/next navigation. Floating stat cards.
// Same content + functionality as before; data from src/data/products.js.
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  ArrowRight,
  ArrowUpRight,
  CaretLeft,
  CaretRight,
  Scissors,
  Printer,
  Lightning,
  Factory,
  GearSix,
  Crosshair,
  ShieldCheck,
} from "@phosphor-icons/react";
import { MACHINES, KEY_FEATURES, SPECS, APPLICATIONS } from "@/data/products";
import { Routes } from "@/navigation/NavigationLib";

const TABS = [
  { id: "Cutting", label: "Paper Roll To Sheet Cutting", icon: Scissors },
  { id: "Flexo", label: "Flexo Printing", icon: Printer },
];

// Second-level sub-types per category, derived from the data so the order
// follows MACHINES (Cutting → Automatic / Manual · Flexo → 1–4 Colour).
const SUBTYPES = TABS.reduce((acc, t) => {
  acc[t.id] = [
    ...new Set(MACHINES.filter((m) => m.category === t.id).map((m) => m.type)),
  ];
  return acc;
}, {});

const pad = (n) => String(n).padStart(2, "0");

// Floating "trust" badges shown over the machine image (positive insets so
// they sit on the stage edges without ever clipping).
const FLOATING = [
  { icon: Lightning, text: "High Speed", pos: "right-4 top-4" },
  { icon: ShieldCheck, text: "Industrial Grade", pos: "bottom-4 left-4" },
];

const MachineCatalog = () => {
  const [tab, setTab] = useState("Cutting");
  const [subType, setSubType] = useState(SUBTYPES["Cutting"][0]);
  const [selected, setSelected] = useState(null); // machine shown in the modal

  // All machines in the active category, and the currently-showcased one.
  const catMachines = MACHINES.filter((m) => m.category === tab);
  const idx = Math.max(
    0,
    catMachines.findIndex((m) => m.type === subType)
  );
  const active = catMachines[idx] || catMachines[0];

  // Switching the main category resets the sub-type to that category's first.
  const changeTab = (id) => {
    setTab(id);
    setSubType(SUBTYPES[id][0]);
  };

  // Prev / next cycle through the active category's machines.
  const step = (dir) => {
    const len = catMachines.length;
    const next = (idx + dir + len) % len;
    setSubType(catMachines[next].type);
  };

  // Derived, human-readable spec chips for the showcase.
  const isFlexo = active.category === "Flexo";
  const SPEC_CHIPS = [
    {
      icon: Lightning,
      label: "Production",
      value: isFlexo ? "High Speed" : active.type === "Automatic" ? "High Volume" : "Medium Volume",
    },
    { icon: Factory, label: "Machine Type", value: active.type },
    {
      icon: GearSix,
      label: "Automation",
      value: isFlexo ? "Servo Driven" : active.type === "Automatic" ? "Fully Automatic" : "Operator Controlled",
    },
    {
      icon: Crosshair,
      label: "Precision",
      value: isFlexo ? "Sharp Registration" : "Precision Cutting",
    },
  ];

  // Esc to close + lock scroll while modal is open
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => e.key === "Escape" && setSelected(null);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <section id="featured" className="section-py relative overflow-hidden bg-bg">
      {/* Industrial backdrop — blueprint grid + soft orange glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 30%, black 20%, transparent 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />

      <div className="container relative">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">Our Machines</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
            Explore Our <span className="text-accent">Machine Range</span>
          </h2>
          <p className="max-w-xl text-text-secondary">
            Browse our paper cutting and flexo printing machines by category.
          </p>
        </div>

        {/* 30 / 70 split */}
        <div className="mt-8 grid gap-5 lg:gap-6 md:grid-cols-[2fr_3fr] lg:grid-cols-[minmax(0,30%)_minmax(0,70%)]">
          {/* ── LEFT — sticky filter panel ───────────────────────────── */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[24px] border border-border bg-card/80 p-4 shadow-card backdrop-blur-xl sm:p-5">
              <div className="mb-3 flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                  Categories
                </span>
                <span className="stats-font text-xs font-bold text-accent">
                  {MACHINES.length} Machines
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {TABS.map((t) => {
                  const on = t.id === tab;
                  return (
                    <div key={t.id}>
                      <button
                        onClick={() => changeTab(t.id)}
                        className={`group flex w-full cursor-pointer items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 ${on
                          ? "border-transparent bg-gradient-to-br from-primary to-secondary text-white shadow-orange"
                          : "border-border bg-card text-text-primary hover:border-accent"
                          }`}
                      >
                        <span
                          className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-colors duration-300 ${on ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                            }`}
                        >
                          <t.icon size={20} weight="bold" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-bold leading-tight">{t.label}</span>
                          <span className={`block text-[11px] ${on ? "text-white/80" : "text-text-secondary"}`}>
                            {SUBTYPES[t.id].length} variants
                          </span>
                        </span>
                        <CaretRight
                          size={15}
                          weight="bold"
                          className={`shrink-0 rotate-90 transition-transform duration-300 ${on ? "text-white" : "text-accent"}`}
                        />
                      </button>

                      {/* Sub-types — always visible (no collapse) */}
                      <div className="mt-2 flex flex-col gap-1.5 pl-2">
                        {SUBTYPES[t.id].map((st) => {
                          const sOn = t.id === tab && st === subType;
                          return (
                            <button
                              key={st}
                              onClick={() => {
                                setTab(t.id);
                                setSubType(st);
                              }}
                              className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-[13px] font-semibold transition-all duration-200 ${sOn
                                ? "border-accent bg-accent/10 text-accent"
                                : "border-transparent bg-soft text-text-secondary hover:bg-bghover hover:text-text-primary"
                                }`}
                            >
                              <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${sOn ? "bg-accent" : "bg-text-secondary/40"}`} />
                              {st}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* helper / quote nudge */}
              <Link
                href={Routes.contact.urlPath}
                className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-3.5 transition hover:bg-accent/10"
              >
                <span>
                  <span className="block text-[13px] font-bold text-text-primary">Not sure which fits?</span>
                  <span className="block text-[11px] text-text-secondary">Talk to our engineers</span>
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                  <ArrowUpRight size={16} weight="bold" />
                </span>
              </Link>
            </div>
          </aside>

          {/* ── RIGHT — machine showcase ─────────────────────────────── */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="grid gap-5 lg:grid-cols-[3fr_2fr]"
              >
                {/* Image — premium product stage */}
                <div className="relative">
                  <div
                    className="relative flex h-full min-h-[340px] items-center justify-center overflow-hidden rounded-[24px] border border-border shadow-card sm:min-h-[440px]"
                    style={{
                      background:
                        "radial-gradient(120% 80% at 50% 14%, rgba(245,132,42,0.13), transparent 55%), linear-gradient(180deg, var(--color-card) 0%, var(--color-soft) 100%)",
                    }}
                  >
                    {/* blueprint grid texture */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        backgroundImage:
                          "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                        maskImage: "radial-gradient(ellipse 70% 65% at 50% 45%, black 10%, transparent 80%)",
                        WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 45%, black 10%, transparent 80%)",
                      }}
                    />

                    {/* product */}
                    <div className="relative z-[1] h-[82%] w-[90%]">
                      <Image
                        src={active.image}
                        alt={active.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        className="object-contain drop-shadow-[0_26px_34px_rgba(0,0,0,0.22)]"
                        priority
                      />
                    </div>

                    {/* floor reflection */}
                    <div aria-hidden className="pointer-events-none absolute bottom-7 left-1/2 h-5 w-3/5 -translate-x-1/2 rounded-[50%] bg-black/20 blur-xl" />

                    {/* category chip — top-left */}
                    <div className="absolute left-4 top-4 z-10 hidden items-center gap-2 rounded-full border border-border bg-card/90 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary shadow-card backdrop-blur-md xl:inline-flex">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {tab === "Cutting" ? "Paper Cutting" : "Flexo Printing"}
                    </div>

                    {/* floating stat cards */}
                    {FLOATING.map((f) => (
                      <div
                        key={f.text}
                        className={`absolute z-10 hidden items-center gap-2 rounded-2xl border border-border bg-card/90 px-3 py-2 shadow-card backdrop-blur-md sm:flex ${f.pos}`}
                      >
                        <span className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-primary to-secondary text-white">
                          <f.icon size={15} weight="bold" />
                        </span>
                        <span className="text-[12px] font-bold text-text-primary">{f.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Info panel */}
                <div className="flex flex-col rounded-[24px] border border-border bg-card p-6 shadow-card md:p-7">
                  {/* type badge + counter / prev-next on one line */}
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex w-fit items-center rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                      {active.type}
                    </span>
                    <div className="flex items-center gap-2.5">
                      <span className="stats-font text-sm font-bold text-text-primary">
                        <span className="text-accent">{pad(idx + 1)}</span>
                        <span className="text-text-secondary"> / {pad(catMachines.length)}</span>
                      </span>
                      {/* <div className="flex gap-1.5">
                        <button
                          onClick={() => step(-1)}
                          aria-label="Previous machine"
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-border bg-card text-text-primary transition hover:border-accent hover:bg-accent hover:text-white"
                        >
                          <CaretLeft size={15} weight="bold" />
                        </button>
                        <button
                          onClick={() => step(1)}
                          aria-label="Next machine"
                          className="grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-border bg-card text-text-primary transition hover:border-accent hover:bg-accent hover:text-white"
                        >
                          <CaretRight size={15} weight="bold" />
                        </button>
                      </div> */}
                    </div>
                  </div>
                  <h3 className="mt-3 text-[20px]! font-bold! leading-tight sm:text-[23px]!">
                    {active.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                    {active.short}
                  </p>

                  {/* Spec chips */}
                  <div className="mt-5 flex flex-col gap-2.5">
                    {SPEC_CHIPS.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-3 rounded-2xl border border-border bg-soft px-3 py-2.5"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                          <s.icon size={17} weight="bold" />
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
                          {s.label}
                        </span>
                        <span className="ml-auto pl-2 text-right text-[13px] font-bold text-text-primary">
                          {s.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="mt-auto flex flex-col gap-2.5 pt-6 sm:flex-row">
                    <button
                      onClick={() => setSelected(active)}
                      className="btn-orange w-full justify-center whitespace-nowrap"
                    >
                      View Details <ArrowRight size={16} weight="bold" />
                    </button>
                    <Link
                      href={Routes.contact.urlPath}
                      className="flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-text-primary transition hover:border-accent hover:text-accent"
                    >
                      Get Quote
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Modal ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[24px] bg-card shadow-card"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-card/90 text-text-primary shadow-card transition hover:bg-accent hover:text-white"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="flex flex-col">
                {/* Image — upper part */}
                <div className="relative h-64 w-full bg-gradient-to-b from-card to-soft sm:h-80">
                  <Image src={selected.image} alt={selected.name} fill className="object-contain p-6" />
                </div>

                {/* Content — lower part */}
                <div className="flex flex-col gap-5 p-6 md:p-8">
                  <div>
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                      {selected.category === "Cutting" ? "Paper Cutting" : "Flexo Printing"}
                    </span>
                    <h3 className="mt-3 text-[20px]! font-semibold leading-snug sm:text-[22px]!">
                      {selected.name}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">{selected.description}</p>
                  </div>

                  {/* Key features */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-text-primary">Key Features</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {KEY_FEATURES.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                          <Check size={15} weight="bold" className="shrink-0 text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-text-primary">Specifications</h4>
                    <div className="mt-2 flex flex-col">
                      {SPECS.map((s) => (
                        <div key={s.label} className="flex justify-between border-b border-border py-1.5 text-sm last:border-0">
                          <span className="text-text-secondary">{s.label}</span>
                          <span className="font-semibold text-text-primary">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-text-primary">Applications</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {APPLICATIONS.map((a) => (
                        <span key={a} className="rounded-full bg-soft px-3 py-1 text-xs text-text-secondary">{a}</span>
                      ))}
                    </div>
                  </div>

                  <Link href={Routes.contact.urlPath} className="btn-orange btn-block mt-1">
                    Request Quotation <ArrowRight size={16} weight="bold" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default MachineCatalog;
