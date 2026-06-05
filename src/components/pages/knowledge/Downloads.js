// ─────────────────────────────────────────────────────────────────────
// Knowledge › Downloads — brochures & spec sheets.
// List of downloadable resources with a type icon + size + download button.
// Replace each `href` with the real PDF path under /public when available.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { FilePdf, DownloadSimple } from "@phosphor-icons/react";

// Files aren't published yet — links route to Contact so visitors can request
// them. Replace each href with the real /public PDF path when available.
const FILES = [
  { title: "Company Brochure", meta: "PDF • 2.4 MB", href: "/contact" },
  { title: "Paper Roll To Sheet Cutting Machine — Spec Sheet", meta: "PDF • 1.1 MB", href: "/contact" },
  { title: "Flexo Printing Machine — Spec Sheet", meta: "PDF • 1.3 MB", href: "/contact" },
  { title: "Machine Maintenance Guide", meta: "PDF • 0.8 MB", href: "/contact" },
];

const Downloads = () => {
  return (
    <section id="downloads" className="section-py scroll-mt-20 bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">
            Downloads
          </span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Brochures & <span className="text-accent">Spec Sheets</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Download our brochures and machine spec sheets to share with your
            team.
          </p>
        </div>

        {/* File list */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
          {FILES.map((f, i) => (
            <motion.a
              key={f.title}
              href={f.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              className="group flex items-center gap-4 rounded-[var(--radius-card)] border border-border bg-card p-4 shadow-card transition duration-300 hover:border-accent hover:shadow-orange sm:p-5"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <FilePdf size={26} weight="regular" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[15px]! font-semibold leading-tight">{f.title}</h3>
                <p className="mt-1 text-[12px]! text-text-secondary">{f.meta}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-primary to-secondary px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-white shadow-orange transition group-hover:scale-105">
                <DownloadSimple size={16} weight="bold" />
                <span className="hidden sm:inline">Download</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Downloads;
