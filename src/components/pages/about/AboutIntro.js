// ─────────────────────────────────────────────────────────────────────
// About › About Intro — split hero + feature cards.
// Top: left overlapping 2-image collage · right eyebrow + heading +
// paragraphs. Below: a row of 3 feature cards (title + icon + text).
// Theme colours throughout.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { Factory, Blueprint, Wrench } from "@phosphor-icons/react";

const CARDS = [
  {
    icon: Factory,
    title: "Industry Expertise",
    text: "With years of experience in machine manufacturing, we understand the evolving needs of paper converting, printing, and packaging industries.",
  },
  {
    icon: Blueprint,
    title: "Precision Engineering",
    text: "Every machine is designed with a focus on durability, accuracy, and consistent performance to ensure maximum production efficiency.",
  },
  {
    icon: Wrench,
    title: "Custom Solutions",
    text: "We provide machine configurations tailored to your production requirements, helping businesses achieve greater flexibility and output.",
  },
];

const fade = (x = 0) => ({
  initial: { opacity: 0, x, y: x === 0 ? 24 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: "easeOut" },
});

const AboutIntro = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* ── Top: collage + copy ────────────────────────────────── */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — overlapping image collage */}
          <motion.div {...fade(-30)} className="relative pb-16 sm:pb-20 lg:pb-10">
            {/* main image */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-card lg:w-[88%]">
              <Image
                src="/gallery8.jpg"
                alt="Sagar Industries manufacturing facility"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            </div>

            {/* overlapping image */}
            <div
              className="absolute bottom-0 right-0 h-[58%] w-[52%] overflow-hidden rounded-2xl border-4 shadow-card sm:w-[48%] sm:border-[6px] lg:-bottom-4"
              style={{ borderColor: "var(--color-card)" }}
            >
              <Image
                src="/gallery9.jpg"
                alt="Sagar Industries machine operation"
                fill
                sizes="(max-width: 1024px) 50vw, 22vw"
                className="object-cover"
              />
            </div>

            {/* small accent square behind */}
            <span
              aria-hidden
              className="absolute -left-4 -top-4 -z-10 hidden h-24 w-24 rounded-xl bg-gradient-to-br from-primary to-secondary opacity-20 blur-md lg:block"
            />
          </motion.div>

          {/* Right — copy */}
          <motion.div {...fade(30)} className="flex flex-col gap-5">
            <span className="eyebrow">About Us</span>

            <h2 className="text-[26px]! font-bold leading-[1.15] tracking-[-0.01em] sm:text-[32px]! lg:text-[40px]!">
              Trusted Manufacturer of Paper Cutting &amp; Flexo Printing Machines
            </h2>

            <p className="max-w-xl text-text-secondary">
              Sagar Industries specializes in manufacturing advanced Paper Reel
              to Sheet Cutting Machines and Flexo Printing Machines engineered
              for performance, reliability, and long-term value. From packaging
              and corrugated board production to commercial printing and paper
              processing, our machines help businesses streamline operations and
              achieve superior results.
            </p>
            <p className="max-w-xl text-text-secondary">
              Built with precision and backed by industry expertise, every
              machine reflects our commitment to innovation, quality, and
              customer success.
            </p>
          </motion.div>
        </div>

        {/* ── Feature cards ──────────────────────────────────────── */}
        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:mt-20">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
              className="group rounded-[var(--radius-card)] border border-border bg-card p-7 shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="max-w-[70%] text-[18px]! font-bold! leading-snug sm:text-[20px]!">
                  {c.title}
                </h3>
                <c.icon
                  size={42}
                  weight="light"
                  className="shrink-0 text-accent transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <span className="mt-5 block h-[3px] w-10 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{c.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
