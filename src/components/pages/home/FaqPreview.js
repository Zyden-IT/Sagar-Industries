// ─────────────────────────────────────────────────────────────────────
// Home › FAQ Preview — two-column: intro + contact CTA / animated accordion.
// One item open at a time, smooth height animation. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CaretDown, ChatCircleDots, ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const FAQS = [
  { q: "What machines do you manufacture?", a: "We manufacture Paper Roll To Sheet Cutting Machines and Flexo Printing Machines — available in manual, semi-automatic and automatic variants." },
  { q: "Can machines be customized to my requirements?", a: "Yes. We build machines to your required size, capacity, speed and the materials you run, rather than a one-size-fits-all approach." },
  { q: "Do you provide installation and training?", a: "Absolutely. We handle installation at your site, train your operators, and provide ongoing technical support." },
  { q: "Do you export your machines?", a: "Yes, we are a manufacturer and exporter, supplying machines to clients across India and overseas." },
  { q: "What is the typical delivery time?", a: "Lead time depends on the machine and customization. We share a confirmed delivery timeline along with your quotation." },
  { q: "Do you supply spare parts and support?", a: "Yes — we provide genuine spare parts and responsive technical support for the full life of the machine." },
];

const FaqPreview = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="section-py bg-bg">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <span className="eyebrow">FAQ</span>
            <h2 className="mt-3 text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Frequently Asked <span className="text-accent">Questions</span>
            </h2>
            <p className="mt-3 max-w-sm text-text-secondary">
              Quick answers to the questions we hear most. Need something else?
              We&apos;re happy to help.
            </p>

            <div className="mt-6 rounded-[var(--radius-card)] border border-border bg-card p-6 shadow-card">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <ChatCircleDots size={24} weight="bold" />
              </span>
              <h3 className="mt-4 text-[16px]! font-semibold">Still have questions?</h3>
              <p className="mt-1 text-sm text-text-secondary">Talk to our team for machine details and quotes.</p>
              <Link href={Routes.contact.urlPath} className="btn-orange mt-4 w-fit">
                Contact Us <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* Accordion */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-3 lg:col-span-3"
          >
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={f.q}
                  className={`overflow-hidden rounded-[var(--radius-card)] border bg-card shadow-card transition-colors ${
                    isOpen ? "border-accent" : "border-border"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="btn flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-text-primary">{f.q}</span>
                    <CaretDown
                      size={18}
                      weight="bold"
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm text-text-secondary">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqPreview;
