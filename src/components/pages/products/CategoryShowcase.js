// Products › Section 2 — Category overview (2 cards).
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { CATEGORIES } from "@/data/products";

const CategoryShowcase = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <div className="flex flex-col items-start gap-3 lg:items-center">
            <span className="eyebrow">Categories</span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Cutting & <span className="text-accent">Flexo Printing Machines</span>
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <motion.div
              key={c.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              className="group overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:shadow-orange"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                  {c.count} Machines
                </span>
              </div>
              <div className="flex flex-col gap-3 p-6">
                <h3 className="text-[18px]! font-semibold sm:text-[20px]!">{c.name}</h3>
                <p className="text-sm text-text-secondary">{c.short}</p>
                <Link href="#featured" className="btn-orange btn-block mt-2">
                  Explore Category <ArrowRight size={16} weight="bold" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
