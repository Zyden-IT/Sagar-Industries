// ─────────────────────────────────────────────────────────────────────
// Knowledge › FAQ — split "explorer" layout (elegant + distinct from the
// home accordion). Left: a numbered, selectable question list. Right: an
// animated answer panel with a large watermark number and a contact CTA.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Question, CaretRight, ChatCircleDots, ArrowRight } from "@phosphor-icons/react";
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

        {/* Split explorer */}
        <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.25fr] lg:gap-8">
          {/* Question list */}
          <div className="flex flex-col gap-2.5">
            {FAQS.map((it, i) => {
              const on = i === active;
              return (
                <button
                  key={it.q}
                  onClick={() => setActive(i)}
                  className={`btn group flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 text-left transition duration-300 ${on
                    ? "border-transparent bg-gradient-to-br from-primary to-secondary text-white shadow-orange"
                    : "border-border bg-card text-text-primary hover:border-accent"
                    }`}
                >
                  <span className={`stats-font text-lg font-bold ${on ? "text-white/90" : "text-accent"}`}>
                    {pad(i + 1)}
                  </span>
                  <span className="flex-1 text-sm font-semibold leading-snug">{it.q}</span>
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
          <div className="relative flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card md:p-9">
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
                  <h3 className="mt-2 text-[19px]! font-bold! leading-snug sm:text-[22px]!">{f.q}</h3>
                  <span className="mt-3 block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
                  <p className="mt-4 leading-relaxed text-text-secondary">{f.a}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* contact CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                  <ChatCircleDots size={22} weight="bold" />
                </span>
                <div>
                  <div className="text-[15px]! font-semibold text-text-primary">Still have questions?</div>
                  <div className="text-sm text-text-secondary">Talk to our team for details and quotes.</div>
                </div>
              </div>
              <Link href={Routes.contact.urlPath} className="btn-orange shrink-0">
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
