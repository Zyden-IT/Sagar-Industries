// ─────────────────────────────────────────────────────────────────────
// Home › Facility Preview — a brief "Inside Our Facility" teaser.
// A compact image bento (1 feature + 4 small) with hover zoom + captions,
// and a link to the full facility view on the About page.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

const IMAGES = [
  { src: "/gallery1.jpg", label: "Cutting Machine Assembly", span: "sm:col-span-2 sm:row-span-2" },
  { src: "/gallery3.jpg", label: "Flexo Printing Line" },
  { src: "/gallery4.jpg", label: "Quality Testing" },
  { src: "/gallery8.jpg", label: "Welding & Fabrication" },
  { src: "/gallery10.jpg", label: "Finished Machine" },
];

const FacilityPreview = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Our Facility</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
            Inside Our <span className="text-accent">Manufacturing Facility</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            A quick look inside the units where every machine is built, tested
            and shipped in-house.
          </p>
        </div>

        {/* Image bento */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:auto-rows-[150px]">
          {IMAGES.map((img, i) => (
            <motion.figure
              key={img.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 5) * 0.07, ease: "easeOut" }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] border border-border shadow-card sm:aspect-auto ${
                img.span || ""
              }`}
            >
              <Image
                src={img.src}
                alt={img.label}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <Link href={`${Routes.about.urlPath}#facility`} className="btn-orange btn-lg">
            Explore Our Facility <ArrowRight size={18} weight="bold" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FacilityPreview;
