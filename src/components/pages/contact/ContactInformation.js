// ─────────────────────────────────────────────────────────────────────
// Contact › Get in Touch — three "angled accent" cards: Call, Email,
// Working Hours. Each card has a clipped top-right corner, a left orange
// accent stripe, an icon tile and (for Call/Email) an action. The border
// follows the cut via a layered clip; the shadow uses drop-shadow so it
// hugs the angled shape.
// ─────────────────────────────────────────────────────────────────────

import { motion } from "framer-motion";
import { Phone, EnvelopeSimple, Clock, ArrowUpRight } from "@phosphor-icons/react";

const PHONE = "+91 99783 11122";
const TEL = "tel:+919978311122";
const EMAIL = "sagarindustries310@gmail.com";

const CARDS = [
  { icon: Phone, label: "Call Us", value: PHONE, href: TEL, action: "Call now" },
  { icon: EnvelopeSimple, label: "Email Us", value: EMAIL, href: `mailto:${EMAIL}`, action: "Send email", break: true },
  { icon: Clock, label: "Working Hours", value: "Mon – Sat\n9:30 AM – 7:00 PM", note: "Sunday closed" },
];

const CUT = { clipPath: "polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0 100%)" };

const ContactInformation = () => {
  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">Contact Us</span>
          <h2 className="">
            Get In <span className="text-accent">Touch</span>
          </h2>
          <p className="mt-1 max-w-xl text-text-secondary">
            Contact our team for machine quotes, specifications and expert
            guidance — we usually reply within a few hours.
          </p>
        </div>

        {/* Angled accent cards */}
        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-3">
          {CARDS.map((c, i) => {
            const Tag = c.href ? "a" : "div";
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="h-full"
              >
                <Tag
                  href={c.href}
                  className="group relative block h-full transition-transform duration-300 hover:-translate-y-1.5 [filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.08))]"
                >
                  {/* border layer (follows the cut) */}
                  <span className="absolute inset-0 bg-bg" style={CUT} />
                  {/* face */}
                  <span className="absolute inset-[1.5px] bg-card" style={CUT} />

                  {/* content */}
                  <div className="relative flex h-full flex-col gap-4 p-7">
                    {/* left accent stripe */}
                    <span className="absolute left-0 top-7 h-11 w-1.5 rounded-r-full bg-gradient-to-br from-primary to-secondary" />

                    <span className="ml-1 grid h-14 w-14 place-items-center rounded-xl bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-gradient-to-br from-primary to-secondary group-hover:text-white">
                      <c.icon size={26} weight="regular" />
                    </span>

                    <div className="ml-1">
                      <p className="eyebrow text-[13px]!">{c.label}</p>
                      <p className={`mt-1 font-bold leading-snug text-text-primary ${c.break ? "break-all text-[15px]" : "whitespace-pre-line"}`}>
                        {c.value}
                      </p>
                      {c.note && <p className="mt-1 text-[12px] text-text-secondary/70">{c.note}</p>}
                    </div>

                    {c.action && (
                      <span className="ml-1 mt-auto inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-accent">
                        {c.action}
                        <ArrowUpRight size={14} weight="bold" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                  </div>
                </Tag>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactInformation;
