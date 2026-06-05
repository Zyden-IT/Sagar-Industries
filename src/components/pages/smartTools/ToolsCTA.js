// ─────────────────────────────────────────────────────────────────────
// Smart Tools › Closing CTA band — same layout as the Products page
// QuotationCTA (gradient card + blob), with Smart-Tools copy.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const WA =
  "https://wa.me/919978311122?text=" +
  encodeURIComponent(
    "Hi Sagar Industries, I used the Smart Tools and would like help choosing the right machine."
  );

const ToolsCTA = () => {
  return (
    <section className="section-pb bg-soft">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[var(--radius-card)] px-6 py-14 text-center md:px-12"
          style={{ background: "var(--hero-gradient)" }}
        >
          <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-[24px]! font-semibold leading-[1.2] text-white! sm:text-[30px]!">
              Still Deciding? Talk to an <span className="text-accent">Engineer</span>
            </h2>
            <p className="text-white/75">
              Send us your numbers or your spec and we&apos;ll recommend the right
              machine configuration with detailed specifications and pricing.
            </p>
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link href={Routes.contact.urlPath} className="btn-orange btn-lg">
                Get Quote <ArrowRight size={16} weight="bold" />
              </Link>
              <a
                href={WA}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-xs font-bold uppercase tracking-[1.4px] text-white! transition hover:bg-white hover:text-[#161000]"
              >
                <WhatsappLogo size={18} weight="fill" /> WhatsApp Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ToolsCTA;
