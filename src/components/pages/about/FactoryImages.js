// ─────────────────────────────────────────────────────────────────────
// About › Factory Images — gallery grid.
// Drop real photos into the IMAGES array (set `src`); until then each tile
// shows a labelled placeholder. Hover zoom + caption overlay.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageSquare } from "@phosphor-icons/react";

// To add a photo: set src to e.g. "/gallery/cutting-machine.jpg" (file in /public)
const IMAGES = [
  { label: "Cutting Machine Assembly", src: "/gallery1.jpg" },
  { label: "Fabrication Unit", src: "/gallery2.jpg" },
  { label: "Flexo Printing Line", src: "/gallery3.jpg" },
  { label: "Quality Testing", src: "/gallery4.jpg" },
  { label: "Material Store", src: "/gallery5.jpg" },
  { label: "Dispatch & Loading", src: "/gallery6.jpg" },
  { label: "Machining Section", src: "/gallery7.jpg" },
  { label: "Welding & Fabrication", src: "/gallery8.jpg" },
  { label: "Roller & Components", src: "/gallery9.jpg" },
  { label: "Finished Machine", src: "/gallery10.jpg" },
  { label: "Control Panel & Wiring", src: "/gallery11.jpg" },
  { label: "Machine Showcase", src: "/Gallery12.jpg"},
];

const stripes = {
  backgroundImage:
    "repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.045) 12px, rgba(0,0,0,0.045) 13px)",
};

const FactoryImages = () => {
  return (
    <section id="facility" className="section-py scroll-mt-20 bg-bg">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <div className="flex flex-col items-start gap-3 lg:items-center">
            <span className="eyebrow">
              Factory Images
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              Inside Our <span className="text-accent">Facility</span>
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="max-w-xl text-text-secondary">
            A look inside the units where our paper cutting and flexo printing
            machines are built, tested and shipped.
          </p>
        </div>

        {/* Gallery */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {IMAGES.map((img, i) => (
            <motion.figure
              key={img.label}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: (i % 4) * 0.08, ease: "easeOut" }}
              className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-border shadow-card `}
            >
              <div className={`relative w-full ${img.feature ? "aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full" : "aspect-[4/3]"}`}>
                {img.src ? (
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full min-h-[150px] w-full flex-col items-center justify-center gap-2 bg-soft" style={stripes}>
                    <ImageSquare size={32} weight="duotone" className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">Photo</span>
                  </div>
                )}
              </div>

              {/* Caption overlay */}
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/70 to-transparent p-4 text-sm font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {img.label}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactoryImages;
