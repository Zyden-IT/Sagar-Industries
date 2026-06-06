// ─────────────────────────────────────────────────────────────────────
// Contact › Interactive Map — the map inside a decorative corner-bracket
// frame, with a caption + Get Directions row beneath. No overlay on the
// map. Keyless Google Maps embed (address query).
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { MapPin, NavigationArrow } from "@phosphor-icons/react";

const ADDRESS =
  "301/2, V.K. Estate, Nr. Brahmani Foundry, Gota, Ahmedabad - 382481";
const MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d229.38667746157333!2d72.54128334876617!3d23.090255293835305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83b2809940ed%3A0x1d4a9ae2583d9b95!2sSagar%20Industries!5e0!3m2!1sen!2sin!4v1780723579816!5m2!1sen!2sin";
const DIRECTIONS = "https://maps.app.goo.gl/WgjEM2jFssRzuDwY8";

// L-shaped accent bracket for a corner.
const Bracket = ({ className }) => (
  <span aria-hidden="true" className={`pointer-events-none absolute h-9 w-9 border-accent ${className}`} />
);

const InteractiveMap = () => {
  return (
    <section className="section-py bg-bg">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-col items-center gap-3">
            <span className="eyebrow">Find Us</span>
            <h2 className="">
              Visit Our <span className="text-accent">Facility</span>
            </h2>
          </div>
        </div>

        {/* Bracket-framed map */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative mt-14 px-4 py-4 sm:px-5 sm:py-5"
        >
          {/* corner brackets */}
          <Bracket className="left-0 top-0 rounded-tl-xl border-l-2 border-t-2" />
          <Bracket className="right-0 top-0 rounded-tr-xl border-r-2 border-t-2" />
          <Bracket className="bottom-0 left-0 rounded-bl-xl border-b-2 border-l-2" />
          <Bracket className="bottom-0 right-0 rounded-br-xl border-b-2 border-r-2" />

          {/* map */}
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-border shadow-card">
            <iframe
              title="Sagar Industries location"
              src={MAP_EMBED}
              className="block h-[420px] w-full sm:h-[500px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* caption + directions */}
          <div className="mt-6 flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <MapPin size={24} weight="fill" />
              </span>
              <div>
                <p className="eyebrow">Our Facility</p>
                <h3 className="text-[16px]! font-bold! leading-tight">Sagar Industries</h3>
                <p className="mt-0.5 text-sm text-text-secondary">{ADDRESS}</p>
              </div>
            </div>

            <a href={DIRECTIONS} target="_blank" rel="noreferrer" className="btn-orange btn-lg shrink-0">
              <NavigationArrow size={16} weight="bold" />
              Get Directions
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default InteractiveMap;
