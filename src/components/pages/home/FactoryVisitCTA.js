// ─────────────────────────────────────────────────────────────────────
// Home › Factory Visit CTA — split section: copy + photo montage with a
// pulsing "Virtual Tour" play button, checklist and dual CTAs. Theme colours.
// ─────────────────────────────────────────────────────────────────────

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, CheckCircle, CalendarCheck, ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const PERKS = [
  "Watch your machine run live",
  "Meet our engineering team",
  "Tour the full manufacturing facility",
];

const FactoryVisitCTA = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — copy ───────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col gap-5"
          >
            <span className="eyebrow">Factory Visit</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
              See Our Machines in Action
            </h2>
            <p className="max-w-md text-text-secondary">
              The best way to choose a machine is to see it run. Visit our
              Ahmedabad facility for a live demo — or take a virtual tour from
              wherever you are.
            </p>

            <ul className="flex flex-col gap-3">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-3 text-text-primary">
                  <CheckCircle size={22} weight="fill" className="shrink-0 text-accent" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-2 flex flex-wrap items-center gap-4">
              <Link href={Routes.contact.urlPath} className="btn-orange btn-lg">
                <CalendarCheck size={18} weight="bold" /> Book a Factory Visit
              </Link>
              <Link href={Routes.about.urlPath} className="btn-outline btn-lg">
                Virtual Tour <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>

          {/* ── Right — photo montage ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* accent shape behind */}
            <div className="absolute -right-5 -top-5 hidden h-32 w-32 rounded-2xl bg-gradient-to-br from-primary to-secondary opacity-90 shadow-orange sm:block" />

            {/* main image + play */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-card)] shadow-card">
              <Image
                src="/gallery2.jpg"
                alt="Sagar Industries factory"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/30" />
              {/* play button */}
              <div className="absolute inset-0 grid place-items-center">
                <Link
                  href={Routes.about.urlPath}
                  aria-label="Virtual tour"
                  className="relative grid h-16 w-16 place-items-center rounded-full bg-white text-accent shadow-lg transition hover:scale-105"
                >
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                  <Play size={26} weight="fill" className="relative ml-0.5" />
                </Link>
              </div>
            </div>

            {/* overlapping secondary image */}
            <div className="absolute -bottom-8 -left-6 hidden w-44 overflow-hidden rounded-xl border-4 border-card shadow-card sm:block">
              <div className="relative aspect-[4/3]">
                <Image src="/gallery7.jpg" alt="Machine detail" fill sizes="180px" className="object-cover" />
              </div>
            </div>

            {/* floating badge */}
            <div className="absolute -bottom-6 right-4 hidden rounded-2xl bg-card px-5 py-4 shadow-card sm:block">
              <span className="stats-font block text-2xl font-bold text-accent">Mon–Sat</span>
              <span className="text-xs text-text-secondary">Visitors Welcome</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FactoryVisitCTA;
