// ─────────────────────────────────────────────────────────────────────
// Home › Contact CTA — dark industrial closing call-to-action.
// Dark gradient background + faded machine image + accent glow.
// Heading, subtitle, two CTAs, and three checkmark trust points.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const TRUST = [
  "Manufacturer & Exporter",
  "Custom Machine Solutions",
  "After-Sales Support",
];

const ContactCTA = () => {
  return (
    <section className="section-py bg-theme">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[var(--radius-card)] px-6 py-14 text-center md:px-12 md:py-20"
          style={{ background: "var(--hero-gradient)" }}
        >
          {/* Faded machine image */}
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-[0.08] lg:block">
            <Image
              src="/hero.png"
              alt=""
              fill
              className="object-contain object-right"
            />
            {/* fade the image into the dark background */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, rgba(13,13,13,1), rgba(13,13,13,0) 40%)",
              }}
            />
          </div>
          {/* Accent glow */}
          <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

          {/* Content */}
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="text-[26px]! font-semibold leading-[1.2] tracking-[-0.01em] text-white! sm:text-[32px]! lg:text-[36px]!">
              Ready to Upgrade Your Production?
            </h2>
            <p className="text-white/75">
              Get expert guidance &amp; a customized quotation for your machinery
              needs.
            </p>

            {/* Buttons */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
              <Link href={Routes.contact.urlPath} className="btn-primary btn-lg">
                Get Free Quote
                <ArrowRight size={16} weight="bold" />
              </Link>
              <Link
                href={Routes.contact.urlPath}
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-xs font-bold uppercase tracking-[1.4px] text-white! transition hover:bg-white hover:text-[#1A1A1A]"
              >
                Book Factory Visit
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {TRUST.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 text-sm text-white/90"
                >
                  <Check size={16} weight="bold" className="text-accent" />
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
