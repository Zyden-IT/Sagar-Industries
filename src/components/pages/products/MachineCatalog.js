// ─────────────────────────────────────────────────────────────────────
// Products › Machine Catalog — 2 category tabs → machine cards → click a
// card to open a popup modal with the full product description.
// Theme colours. Data from src/data/products.js.
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, MagnifyingGlassPlus, Check, ArrowRight } from "@phosphor-icons/react";
import { MACHINES, KEY_FEATURES, SPECS, MATERIALS, APPLICATIONS } from "@/data/products";
import { Routes } from "@/navigation/NavigationLib";

const TABS = [
  { id: "Cutting", label: "Paper Roll To Sheet Cutting" },
  { id: "Flexo", label: "Flexo Printing" },
];

const MachineCatalog = () => {
  const [tab, setTab] = useState("Cutting");
  const [selected, setSelected] = useState(null);
  const machines = MACHINES.filter((m) => m.category === tab);

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
    <section id="featured" className="section-py bg-theme">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">Our Machines</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Explore Our Range
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="max-w-xl text-secondary">
            Choose a category, then click any machine to view its full details.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {TABS.map((t) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full px-6 py-3 text-sm font-semibold transition ${
                  active
                    ? "bg-orange-gradient text-white shadow-orange"
                    : "border border-theme bg-card text-primary hover:border-accent"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {machines.map((m) => (
              <button
                key={m.slug}
                onClick={() => setSelected(m)}
                className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card text-left shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={m.image}
                    alt={m.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-primary/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wide text-primary">
                      <MagnifyingGlassPlus size={16} weight="bold" /> 
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="text-[15px]! font-semibold leading-snug sm:text-[16px]!">{m.name}</h3>
                  <p className="text-sm text-secondary">{m.short}</p>
                </div>
              </button>
            ))}
          </motion.div>
        </AnimatePresence>
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
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[var(--radius-card)] bg-card shadow-card"
            >
              {/* Close */}
              <button
                onClick={() => setSelected(null)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-primary shadow-card transition hover:bg-accent hover:text-white"
              >
                <X size={18} weight="bold" />
              </button>

              <div className="grid lg:grid-cols-2">
                {/* Image */}
                <div className="relative h-56 lg:h-full lg:min-h-[420px]">
                  <Image src={selected.image} alt={selected.name} fill className="object-cover" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-5 p-6 md:p-8">
                  <div>
                    <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                      {selected.category === "Cutting" ? "Paper Cutting" : "Flexo Printing"}
                    </span>
                    <h3 className="mt-3 text-[20px]! font-semibold leading-snug sm:text-[22px]!">
                      {selected.name}
                    </h3>
                    <p className="mt-2 text-sm text-secondary">{selected.description}</p>
                  </div>

                  {/* Key features */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-primary">Key Features</h4>
                    <ul className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                      {KEY_FEATURES.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-secondary">
                          <Check size={15} weight="bold" className="shrink-0 text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Specs */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-primary">Specifications</h4>
                    <div className="mt-2 flex flex-col">
                      {SPECS.map((s) => (
                        <div key={s.label} className="flex justify-between border-b border-theme py-1.5 text-sm last:border-0">
                          <span className="text-secondary">{s.label}</span>
                          <span className="font-semibold text-primary">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Applications */}
                  <div>
                    <h4 className="text-[13px]! font-bold uppercase tracking-wide text-primary">Applications</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {APPLICATIONS.map((a) => (
                        <span key={a} className="rounded-full bg-soft px-3 py-1 text-xs text-secondary">{a}</span>
                      ))}
                    </div>
                  </div>

                  <Link href={Routes.contact.urlPath} className="btn-primary btn-block mt-1">
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
