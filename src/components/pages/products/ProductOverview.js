// ─────────────────────────────────────────────────────────────────────
// Products › Product Overview — product range structure (org-chart tree).
// Root → 2 machine categories → variants, connected with lines.
// Theme colours: dark root, orange categories, white leaves w/ accent edge.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";

const ROOT = "Sagar Industries Product Range";
const BRANCHES = [
  {
    title: "Paper Roll To Sheet Cutting Machine",
    leaves: ["Manual Machine", "Automatic Machine"],
  },
  {
    title: "Flexo Printing Machine",
    leaves: ["Single Colour", "Two Colour", "Three Colour", "Four Colour"],
  },
];

const line = "bg-[var(--color-border)]";

const ProductOverview = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="eyebrow">
              Product Range
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Sagar Industries Product Structure
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
        </div>

        {/* Tree */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-14 flex flex-col items-center"
        >
          {/* Root */}
          <div className="rounded-xl bg-primary px-7 py-4 text-center font-bold text-white shadow-card">
            {ROOT}
          </div>

          {/* Trunk */}
          <span className={`h-9 w-px ${line}`} />

          {/* Branches */}
          <div className="relative grid w-full gap-10 sm:grid-cols-2 lg:gap-20">
            {/* Horizontal split connector (desktop) */}
            <span className={`absolute left-1/4 right-1/4 top-0 hidden h-px sm:block ${line}`} />

            {BRANCHES.map((b) => (
              <div key={b.title} className="flex flex-col items-center">
                {/* vertical stub from the split bar */}
                <span className={`hidden h-9 w-px sm:block ${line}`} />

                {/* Category */}
                <div className="rounded-xl bg-gradient-to-br from-primary to-secondary px-6 py-3.5 text-center font-bold text-white shadow-orange">
                  {b.title}
                </div>

                {/* connector to leaves */}
                <span className={`h-7 w-px ${line}`} />

                {/* Leaves */}
                <div className="flex w-full max-w-[280px] flex-col gap-3">
                  {b.leaves.map((leaf) => (
                    <div
                      key={leaf}
                      className="rounded-lg border border-l-4 border-border border-l-accent bg-card px-5 py-3 text-center font-semibold text-text-primary shadow-card transition duration-300 hover:-translate-y-0.5 hover:shadow-orange"
                    >
                      {leaf}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductOverview;
