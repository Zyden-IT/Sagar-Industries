// ─────────────────────────────────────────────────────────────────────
// Shared › CTA Band — the Home "Contact CTA" layout, made reusable.
// Dark gradient card + faded machine image + accent glow; heading, subtitle,
// two buttons and three checkmark trust points. Page CTAs are thin wrappers
// that pass their own copy/links via props.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "@phosphor-icons/react";

const CtaButton = ({ data, variant }) => {
  if (!data) return null;
  const Icon = data.icon || ArrowRight;
  const cls =
    variant === "primary"
      ? "btn-orange btn-lg"
      : "inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-xs font-bold uppercase tracking-[1.4px] text-white! transition hover:bg-white hover:text-[#161000]";
  const content = (
    <>
      {data.label}
      <Icon size={16} weight="bold" />
    </>
  );
  return data.external ? (
    <a href={data.href} target="_blank" rel="noreferrer" className={cls}>
      {content}
    </a>
  ) : (
    <Link href={data.href} className={cls}>
      {content}
    </Link>
  );
};

const CtaBand = ({ heading, subtitle, primary, secondary, trust = [], bg = "bg-bg" }) => (
  <section className={`section-py ${bg}`}>
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
          <Image src="/hero.png" alt="" fill className="object-contain object-right" />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(13,13,13,1), rgba(13,13,13,0) 40%)" }}
          />
        </div>
        {/* Accent glow */}
        <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

        {/* Content */}
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="text-[26px]! font-semibold leading-[1.2] tracking-[-0.01em] text-white! sm:text-[32px]! lg:text-[36px]!">
            {heading}
          </h2>
          {subtitle && <p className="text-white/75">{subtitle}</p>}

          <div className="mt-2 flex flex-wrap items-center justify-center gap-4">
            <CtaButton data={primary} variant="primary" />
            <CtaButton data={secondary} variant="secondary" />
          </div>

          {trust.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
              {trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-2 text-sm text-white/90">
                  <Check size={16} weight="bold" className="text-accent" />
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaBand;
