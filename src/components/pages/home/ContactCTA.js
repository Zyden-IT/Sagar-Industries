import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

// Concentric rounded squares — equal opacity per ring so they stack into
// smooth nested bands (brightest at the centre, fading outward).
const Squares = ({ side }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute top-1/2 hidden -translate-y-1/2 md:block ${side === "left" ? "-left-[170px]" : "-right-[170px]"
      }`}
  >
    <div className="relative h-[300px] w-[300px]">
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const size = 380 - i * 62;

        return (
          <div
            key={i}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white"
            style={{ width: size, height: size, opacity: 0.06 }}
          />
        );
      })}
    </div>
  </div>
);

// `bg` should match the section directly above this CTA so they read as one
// block. Defaults to `bg-bg`, which in dark mode is distinct from the footer.
const ContactCTA = ({ bg = "bg-bg" }) => {
  return (
    <section className={`section-pb ${bg}`}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[var(--radius-card)] px-6 py-10 text-center shadow-orange md:px-12 md:py-24"
          style={{ background: "var(--orange-gradient)" }}
        >
          <Squares side="left" />
          <Squares side="right" />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-4">
            <h2 className="text-[24px]! font-bold leading-[1.15] tracking-[-0.01em] text-white! sm:text-[32px]! lg:text-[40px]! xl:whitespace-nowrap">
              Ready to Upgrade Your Production?
            </h2>

            <p className="text-[15px] text-white/85 xl:whitespace-nowrap">
              Get expert guidance and a customized quotation for your machinery
              needs.
            </p>

            <Link
              href={Routes.contact.urlPath}
              className="group mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 !text-[14px] font-semibold uppercase tracking-[1.2px] text-dark shadow-card transition-transform duration-300 hover:-translate-y-0.5"
            >
              Get Free Quote

              <ArrowUpRight
                size={16}
                weight="bold"
                className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;