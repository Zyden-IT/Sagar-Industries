// ─────────────────────────────────────────────────────────────────────
// Contact › Download Brochure — dark CTA band with a PDF download.
// Drop the file at public/Sagar-Industries-Brochure.pdf
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { DownloadSimple, FilePdf } from "@phosphor-icons/react";

const DownloadBrochure = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 rounded-[var(--radius-card)] bg-primary p-8 text-center md:flex-row md:justify-between md:p-10 md:text-left"
          style={{ background: "var(--hero-gradient)" }}
        >
          <div className="flex items-center gap-5">
            <span className="hidden h-16 w-16 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent sm:grid">
              <FilePdf size={32} weight="bold" />
            </span>
            <div>
              <h2 className="text-[22px]! font-semibold leading-[1.2] text-white! sm:text-[26px]!">
                Download Our <span className="text-accent">Product Brochure</span>
              </h2>
              <p className="mt-1 max-w-xl text-white/70">
                Full specifications, sizes and options for our machines — in one
                PDF.
              </p>
            </div>
          </div>

          <a
            href="/Sagar-Industries-Brochure.pdf"
            download
            className="btn-orange btn-lg shrink-0"
          >
            <DownloadSimple size={18} weight="bold" />
            Download Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadBrochure;
