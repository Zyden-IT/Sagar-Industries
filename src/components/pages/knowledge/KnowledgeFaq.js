// ─────────────────────────────────────────────────────────────────────
// Knowledge › FAQ — split "explorer" layout (elegant + distinct from the
// home accordion). Left: a numbered, selectable question list. Right: an
// animated answer panel with a large watermark number and a contact CTA.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Question, CaretRight, CaretDown, ChatCircleDots, ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const FAQS = [
  { q: "What machines do you manufacture?", a: "We manufacture Paper Roll To Sheet Cutting Machines and Flexo Printing Machines — available in manual, semi-automatic and automatic variants." },
  { q: "Can machines be customized to my requirements?", a: "Yes. We build machines to your required size, capacity, speed and the materials you run, rather than a one-size-fits-all approach." },
  { q: "Do you provide installation and training?", a: "Absolutely. We handle installation at your site, train your operators, and provide ongoing technical support." },
  { q: "Do you export your machines?", a: "Yes, we are a manufacturer and exporter, supplying machines to clients across India and overseas." },
  { q: "What is the typical delivery time?", a: "Lead time depends on the machine and customization. We share a confirmed delivery timeline along with your quotation." },
  { q: "Do you supply spare parts and support?", a: "Yes — we provide genuine spare parts and responsive technical support for the full life of the machine." },
];

const pad = (n) => String(n).padStart(2, "0");

const KnowledgeFaq = () => {
  const [active, setActive] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(0);
  const f = FAQS[active];

  return (
    <section id="faq" className="section-py scroll-mt-20 bg-bg">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">FAQ</span>
          <h2 className="">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <p className="text-text-secondary">
            Pick a question to see the answer — or reach out and we&apos;ll help
            with anything else.
          </p>
        </div>

        {/* Mobile: accordion — answer expands directly beneath each question */}
        <div className="mx-auto mt-8 flex max-w-2xl flex-col gap-2.5 sm:mt-10 lg:hidden">
          {FAQS.map((it, i) => {
            const on = i === mobileOpen;
            return (
              <div
                key={it.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${on ? "border-accent bg-card shadow-card" : "border-border bg-card"
                  }`}
              >
                <button
                  onClick={() => setMobileOpen(on ? -1 : i)}
                  aria-expanded={on}
                  className="btn flex w-full cursor-pointer items-center gap-3 whitespace-normal px-3.5 py-3.5 text-left transition sm:gap-4 sm:px-4 sm:py-4"
                >
                  <span className="stats-font w-6 shrink-0 text-center text-base font-bold leading-none text-accent sm:w-7 sm:text-lg">
                    {pad(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-normal break-words text-[13px] font-semibold leading-snug text-text-primary sm:text-sm">{it.q}</span>
                  <CaretDown
                    size={16}
                    weight="bold"
                    className={`shrink-0 text-accent transition-transform duration-300 ${on ? "rotate-180" : ""}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 pb-4 pl-[3.125rem] sm:px-4 sm:pb-5 sm:pl-[3.75rem]">
                        <span className="block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{it.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* contact CTA (mobile) */}
          <div className="mt-4 flex flex-col gap-4 rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                <ChatCircleDots size={22} weight="bold" />
              </span>
              <div>
                <div className="text-[15px]! font-semibold text-text-primary">Still have questions?</div>
                <div className="text-sm text-text-secondary">Talk to our team for details and quotes.</div>
              </div>
            </div>
            <Link href={Routes.contact.urlPath} className="btn-orange w-full justify-center">
              Contact Us <ArrowRight size={16} weight="bold" />
            </Link>
          </div>
        </div>

        {/* Desktop: split explorer */}
        <div className="mx-auto mt-8 hidden max-w-5xl grid-cols-1 gap-5 sm:mt-10 lg:mt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-8">
          {/* Question list */}
          <div className="flex flex-col gap-2.5">
            {FAQS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.q}
                  onClick={() => setActive(i)}
                  className={`btn group flex cursor-pointer items-center gap-3 whitespace-normal rounded-2xl border px-3.5 py-3.5 text-left transition duration-300 sm:gap-4 sm:px-4 sm:py-4 ${on
                    ? "border-transparent bg-gradient-to-br from-primary to-secondary text-white shadow-orange"
                    : "border-border bg-card text-text-primary hover:border-accent"
                    }`}
                >
                  <span className={`stats-font w-6 shrink-0 text-center text-base font-bold leading-none sm:w-7 sm:text-lg ${on ? "text-white/90" : "text-accent"}`}>
                    {pad(i + 1)}
                  </span>
                  <span className="min-w-0 flex-1 whitespace-normal break-words text-[13px] font-semibold leading-snug sm:text-sm">{it.q}</span>
                  <CaretRight
                    size={16}
                    weight="bold"
                    className={`shrink-0 transition-transform duration-300 ${on ? "translate-x-0.5 text-white" : "text-accent opacity-0 group-hover:opacity-100"
                      }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Answer panel */}
          <div className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-5 shadow-card sm:p-7 md:p-9">
            {/* watermark number */}
            {/* <span className="stats-font pointer-events-none absolute right-5 top-5 select-none text-[44px] font-bold leading-none text-accent/15">
              {pad(active + 1)}
            </span> */}

            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <span className="eyebrow">
                    Answer {pad(active + 1)}
                  </span>
                  <h3 className="mt-2 text-[17px]! font-bold! leading-snug sm:text-[22px]!">{f.q}</h3>
                  <span className="mt-3 block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">{f.a}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* contact CTA */}
            <div className="mt-7 flex flex-col gap-4 border-t border-border pt-6 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <ChatCircleDots size={22} weight="bold" />
                </span>
                <div>
                  <div className="text-[15px]! font-semibold text-text-primary">Still have questions?</div>
                  <div className="text-sm text-text-secondary">Talk to our team for details and quotes.</div>
                </div>
              </div>
              <Link href={Routes.contact.urlPath} className="btn-orange w-full justify-center sm:w-auto sm:shrink-0">
                Contact Us <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeFaq;
