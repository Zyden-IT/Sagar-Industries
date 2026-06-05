// ─────────────────────────────────────────────────────────────────────
// Industries › Intro — sectors Sagar Industries machines serve.
// Horizontal cards: icon + underlined title + description on the left, a
// diagonally-cut photo (with a thin accent edge) on the right.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Newspaper,
  Package,
  Printer,
  Stack,
  Scissors,
  Factory,
} from "@phosphor-icons/react";

// Diagonal clips for the photo + the thin orange accent behind it.
const ACCENT_CLIP = { clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0% 100%)" };
const IMAGE_CLIP = { clipPath: "polygon(27% 0, 100% 0, 100% 100%, 3% 100%)" };

const SECTORS = [
  {
    icon: Newspaper,
    title: "Paper & Pulp",
    desc: "Roll-to-sheet cutting and handling solutions for paper mills and traders of every grade.",
    img: "/gallery1.jpg",
  },
  {
    icon: Package,
    title: "Packaging",
    desc: "Machines that power carton, box and flexible-packaging production lines with maximum efficiency.",
    img: "/gallery8.jpg",
  },
  {
    icon: Printer,
    title: "Printing",
    desc: "Flexo printing machinery for labels, wrappers and multi-colour print jobs.",
    img: "/gallery3.jpg",
  },
  {
    icon: Stack,
    title: "Corrugated Board",
    desc: "Reliable converting equipment for corrugated and board manufacturers.",
    img: "/gallery9.jpg",
  },
  {
    icon: Scissors,
    title: "Converting",
    desc: "Precise cutting, slitting and sheeting solutions for downstream converters.",
    img: "/gallery5.jpg",
  },
  {
    icon: Factory,
    title: "Industrial Manufacturing",
    desc: "Custom-built machines for specialised in-house production requirements.",
    img: "/gallery11.jpg",
  },
];

const Card = ({ sector, index }) => {
  const { icon: Icon, title, desc, img } = sector;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1, ease: "easeOut" }}
      className="group relative flex min-h-[220px] overflow-hidden rounded-[var(--radius-card)] border border-border bg-card shadow-card transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-orange"
    >
      {/* Left — content */}
      <div className="relative z-10 flex w-[58%] flex-col p-6">
        <span className="mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent/10 text-accent shadow-[0_6px_14px_rgba(255,107,26,0.15)] transition-transform duration-300 group-hover:scale-110">
          <Icon size={26} weight="regular" />
        </span>

        <h3 className="text-[16px]! font-bold! leading-tight sm:text-[17px]!">{title}</h3>
        <span className="mt-2 block h-[3px] w-9 rounded-full bg-gradient-to-br from-primary to-secondary" />

        <p className="mt-3 text-[13px]! leading-snug text-text-secondary">{desc}</p>
      </div>

      {/* Right — diagonal photo with accent edge */}
      <div className="absolute right-0 top-0 h-full w-[46%]">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary" style={ACCENT_CLIP} />
        <div className="absolute inset-0 overflow-hidden" style={IMAGE_CLIP}>
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 1024px) 50vw, 220px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </motion.div>
  );
};

const IndustriesIntro = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="eyebrow">Industries</span>
          <h2 className="text-[24px]! font-bold uppercase leading-[1.1] tracking-[-0.01em] sm:text-[30px]! lg:text-[38px]!">
            Industries <span className="text-accent">We Serve</span>
          </h2>
          <span className="h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
          <p className="text-text-secondary">
            Our paper cutting and flexo printing machines power industries from
            paper mills to packaging plants.
          </p>
        </div>

        {/* Sector cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SECTORS.map((s, i) => (
            <Card key={s.title} sector={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesIntro;
