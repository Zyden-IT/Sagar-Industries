// Products › Section 3 — Featured machines (10 cards).
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { MACHINES } from "@/data/products";
import { Routes } from "@/navigation/NavigationLib";

const FeaturedMachines = () => {
  return (
    <section id="featured" className="section-py bg-soft">
      <div className="container">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">Our Range</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Featured Machines
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="max-w-xl text-secondary">
            Ten machines across our two core categories — built to your
            production requirements.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MACHINES.map((m, i) => (
            <motion.div
              key={m.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
              className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={m.image}
                  alt={m.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-md bg-primary/80 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur">
                  {m.category === "Cutting" ? "Cutting" : "Flexo"}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-5">
                <h3 className="text-[15px]! font-semibold leading-snug sm:text-[16px]!">{m.name}</h3>
                <p className="text-sm text-secondary">{m.short}</p>
                <Link
                  href={Routes.contact.urlPath}
                  className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-semibold text-accent transition-colors hover:gap-3"
                >
                  View Details <ArrowRight size={15} weight="bold" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMachines;
