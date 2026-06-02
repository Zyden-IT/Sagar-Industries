// ─────────────────────────────────────────────────────────────────────
// Smart Tools › FAQ — left: searchable, number-selected, one-at-a-time
// question card with prev/next nav; right: faq2 illustration.
// Search filters the list; the number circles + arrows page through the
// matches; the active answer animates in. Edit FAQS to change content.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { MagnifyingGlass, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const FAQS = [
  {
    q: "How do I use these calculators?",
    a: "Enter your project numbers — roll size, volume, material or price — in the fields, and the tool instantly estimates output, cost, power or conversions using standard industry formulas. Everything updates live as you type.",
  },
  {
    q: "How accurate are the results?",
    a: "They're solid engineering estimates based on standard formulas and our machine datasheet (width 25\"–75\", length 25–8800 mm, 2–9 HP motors). For a firm figure on your exact material and run, just confirm with our team.",
  },
  {
    q: "Can I download or share my result?",
    a: "Yes — the Spec Builder lets you download your requirement as a file or send it to us pre-filled on WhatsApp, so quoting is fast and accurate.",
  },
  {
    q: "Do you offer EMI or financing on machines?",
    a: "Most machines qualify for bank and NBFC financing. Use the EMI calculator above to estimate your monthly outgo, then talk to us — we'll help with the paperwork.",
  },
  {
    q: "Can a machine be customised to my material or width?",
    a: "Absolutely. We build to your roll width and cutting length and tune the machine for materials ranging from paper and board to foil, foam, rexine and jute.",
  },
  {
    q: "How do I get an exact quote?",
    a: "Build your spec with the tools above, then tap Get Quote or WhatsApp Us — our engineers will recommend the right configuration with detailed pricing.",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const SmartToolsFaq = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0); // active question index (into FAQS)

  const q = query.trim().toLowerCase();
  const filtered = FAQS.map((f, i) => ({ ...f, i })).filter(
    (f) => !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
  );

  // Keep the active question valid as the filter changes.
  useEffect(() => {
    if (filtered.length && !filtered.some((f) => f.i === active)) {
      setActive(filtered[0].i);
    }
  }, [filtered, active]);

  const pos = filtered.findIndex((f) => f.i === active);
  const safePos = pos < 0 ? 0 : pos;
  const current = filtered[safePos];

  const prev = () => filtered[safePos - 1] && setActive(filtered[safePos - 1].i);
  const next = () => filtered[safePos + 1] && setActive(filtered[safePos + 1].i);

  return (
    <section id="faq" className="section-py overflow-hidden bg-soft">
      <div className="container">
        <div className="grid items-center gap-10 lg:grid-cols-[7fr_3fr]">
          {/* ── Left: FAQ ─────────────────────────────────────────────── */}
          <div>
            <span className="text-xs font-bold uppercase tracking-[3px] text-accent">Got Questions?</span>
            <h2 className="mt-3 text-[30px]! font-bold uppercase leading-[1.05] tracking-[-0.01em] sm:text-[38px]! lg:text-[44px]!">
              Calculator <span className="text-accent">FAQs</span>
            </h2>
            <p className="mt-4 max-w-lg text-secondary">
              Quick answers about using the tools, result accuracy, downloads
              and getting a quote.
            </p>

            {/* Search */}
            <form onSubmit={(e) => e.preventDefault()} className="relative mt-8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search question here"
                className="w-full rounded-full border border-theme bg-card py-4 pl-6 pr-16 text-primary outline-none transition focus:border-accent"
              />
              <span className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-orange-gradient text-white shadow-orange">
                <MagnifyingGlass size={18} weight="bold" />
              </span>
            </form>

            {filtered.length === 0 ? (
              <p className="mt-8 rounded-[var(--radius-card)] border border-theme bg-card p-6 text-secondary shadow-card">
                No questions match &ldquo;{query}&rdquo;. Try a different word.
              </p>
            ) : (
              <>
                {/* Number selector */}
                <div className="mt-7 flex flex-wrap gap-3">
                  {filtered.map((f, i) => {
                    const isActive = f.i === active;
                    return (
                      <button
                        key={f.i}
                        onClick={() => setActive(f.i)}
                        aria-label={`Question ${pad(i + 1)}`}
                        className={`grid h-12 w-12 cursor-pointer place-items-center rounded-full text-sm font-bold transition ${
                          isActive
                            ? "bg-orange-gradient text-white shadow-orange ring-4 ring-accent/20"
                            : "border border-theme bg-card text-primary hover:border-accent"
                        }`}
                      >
                        {pad(i + 1)}
                      </button>
                    );
                  })}
                </div>

                {/* Question card */}
                <div className="relative mt-6 overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card p-6 shadow-card md:p-8">
                  <span
                    className="absolute left-0 top-0 h-1 rounded-r-full bg-orange-gradient transition-all duration-500"
                    style={{ width: `${((safePos + 1) / filtered.length) * 100}%` }}
                  />

                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Question {pad(safePos + 1)} of {pad(filtered.length)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prev}
                        disabled={safePos <= 0}
                        aria-label="Previous question"
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-theme text-primary transition enabled:hover:border-accent disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowLeft size={16} weight="bold" />
                      </button>
                      <button
                        onClick={next}
                        disabled={safePos >= filtered.length - 1}
                        aria-label="Next question"
                        className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-orange-gradient text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <ArrowRight size={16} weight="bold" />
                      </button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <h3 className="mt-5 text-[18px]! font-bold! uppercase leading-snug sm:text-[20px]!">
                        {current.q}
                      </h3>
                      <div className="mt-3 flex gap-3">
                        <span className="mt-2.5 h-[2px] w-6 shrink-0 rounded-full bg-orange-gradient" />
                        <p className="leading-relaxed text-secondary">{current.a}</p>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>

          {/* ── Right: illustration ───────────────────────────────────── */}
          <div className="relative hidden justify-center lg:flex">
            <div className="pointer-events-none absolute inset-0 m-auto h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image
                src="/faq2.png"
                alt="Frequently asked questions"
                width={560}
                height={560}
                className="h-auto w-full max-w-[480px]"
                priority={false}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartToolsFaq;
