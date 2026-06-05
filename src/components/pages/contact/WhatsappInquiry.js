// ─────────────────────────────────────────────────────────────────────
// Contact › WhatsApp Inquiry — quick-chat CTA card.
// WhatsApp-green button (brand colour); rest on theme.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";

const WA_LINK =
  "https://wa.me/919978311122?text=" +
  encodeURIComponent("Hi Sagar Industries, I'd like to know more about your machines.");

const WhatsappInquiry = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-[var(--radius-card)] border border-border bg-card p-8 text-center shadow-card md:p-10"
        >
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-[#25D366]/10 text-[#25D366]">
            <WhatsappLogo size={36} weight="fill" />
          </span>
          <h2 className="text-[22px]! font-semibold leading-[1.2] sm:text-[26px]!">
            Need a <span className="text-accent">Quick Answer?</span>
          </h2>
          <p className="max-w-md text-text-secondary">
            Message our team on WhatsApp for instant help with machine details,
            pricing or availability.
          </p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-4 text-xs font-bold uppercase tracking-[1.4px] text-white! transition hover:brightness-105"
          >
            <WhatsappLogo size={18} weight="fill" />
            Chat on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsappInquiry;
