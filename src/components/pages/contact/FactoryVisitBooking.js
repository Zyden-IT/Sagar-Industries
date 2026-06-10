// ─────────────────────────────────────────────────────────────────────
// Contact › Factory Visit Booking — split panel.
// Left: factory image with a curved, accent-edged right side, an overlaid
// heading and three perk cards. Right: a white "Schedule Your Visit" form
// with icon-prefixed fields. No backend — submit builds a prefilled WhatsApp
// message + confirmation. NOTE: inputs use `pl-11!` to beat the unlayered
// global input padding in global.css.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  WhatsappLogo,
  Factory,
  Gear,
  HardHat,
  CalendarCheck,
  User,
  Phone,
  CalendarBlank,
  Clock,
  PencilSimple,
  ShieldCheck,
  ArrowRight,
} from "@phosphor-icons/react";

const WHATSAPP = "919978311122";

const PERKS = [
  {
    icon: Factory,
    title: "Live Manufacturing",
    desc: "See our advanced machines in real-time operation.",
  },
  {
    icon: Gear,
    title: "Watch Machines Running",
    desc: "Experience precision, speed and performance in action.",
  },
  {
    icon: HardHat,
    title: "Meet Our Engineers",
    desc: "Discuss your requirements with our expert team.",
  },
];

const selectCls =
  "w-full rounded-[12px] border-[1.5px] border-border bg-input py-3.5 pl-11! pr-4 text-text-primary outline-none transition focus:border-accent";
const inputCls =
  "w-full rounded-[12px] border-[1.5px] border-border bg-input py-3.5! pl-11! pr-4! text-text-primary outline-none transition focus:border-accent";

// Field with a leading icon.
const IconField = ({ icon: Icon, children }) => (
  <div className="relative">
    <Icon
      size={18}
      className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-secondary"
    />
    {children}
  </div>
);

const FactoryVisitBooking = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "Morning (10 AM – 1 PM)",
    notes: "",
  });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const waText =
    `Factory visit request:%0A` +
    `Name: ${form.name}%0A` +
    `Phone: ${form.phone}%0A` +
    `Preferred date: ${form.date}%0A` +
    `Preferred time: ${form.time}%0A` +
    `Notes: ${form.notes}`;
  const waLink = `https://wa.me/${WHATSAPP}?text=${waText}`;

  return (
    <section className="section-py bg-soft">
      <div className="container">
        <div className="relative grid overflow-hidden rounded-[32px] shadow-card lg:grid-cols-[1.1fr_1fr] lg:overflow-visible">
          {/* ── Left: image panel ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative min-h-[520px] overflow-hidden rounded-[32px] p-8 sm:p-10 lg:min-h-[640px] lg:rounded-r-[130px] lg:border-r-[3px] lg:border-accent"
          >
            <Image
              src="/gallery3.jpg"
              alt="Inside the Sagar Industries facility"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover"
            />
            {/* legibility overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />

            <div className="relative flex h-full flex-col">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-primary to-secondary px-4 py-2 text-[11px] font-bold uppercase tracking-[2px] text-white shadow-orange">
                <Factory size={15} weight="bold" /> Factory Visit
              </span>

              <h2 className="mt-6 text-[34px]! font-bold! leading-[1.05] text-white! sm:text-[44px]!">
                Book a Visit
                <br />
                to <span className="text-accent">Our Facility</span>
              </h2>
              <span className="mt-4 block h-1 w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />

              {/* Perks — icon + name inline, all three on one line at the bottom.
                 Right padding on lg keeps them clear of the rounded corner. */}
              <ul className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8 lg:flex-nowrap lg:justify-between lg:pr-28">
                {PERKS.map((p, i) => (
                  <motion.li
                    key={p.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.12, ease: "easeOut" }}
                    className="inline-flex items-center gap-2"
                  >
                    <p.icon size={20} weight="bold" className="shrink-0 text-accent" />
                    <span className="whitespace-nowrap text-[12px]! font-bold text-white">
                      {p.title}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* ── Right: form card ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 bg-card p-7 sm:p-9 lg:my-6 lg:-ml-12 lg:rounded-[28px] lg:shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
          >
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle size={56} weight="fill" className="text-accent" />
                <h3 className="text-[20px]! font-semibold!">Visit request ready!</h3>
                <p className="max-w-xs text-sm text-text-secondary">
                  Send it on WhatsApp and we&apos;ll confirm your slot.
                </p>
                <a href={waLink} target="_blank" rel="noreferrer" className="btn-orange btn-lg">
                  Confirm on WhatsApp <WhatsappLogo size={18} weight="fill" />
                </a>
                <button
                  onClick={() => setSent(false)}
                  className="btn text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent"
                >
                  Edit details
                </button>
              </div>
            ) : (
              <>
                {/* form header */}
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                    <CalendarCheck size={24} weight="regular" />
                  </span>
                  <div>
                    <h3 className="text-[20px]! font-bold! leading-tight sm:text-[22px]!">
                      Schedule Your Visit
                    </h3>
                    <span className="mt-2 block h-1 w-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
                    <p className="mt-2 text-[13px]! text-text-secondary">
                      Fill in your details and our team will get in touch with you.
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-6 flex flex-col gap-4"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <IconField icon={User}>
                      <input className={inputCls} type="text" required placeholder="Your name" value={form.name} onChange={set("name")} />
                    </IconField>
                    <IconField icon={Phone}>
                      <input className={inputCls} type="tel" required placeholder="Phone number" value={form.phone} onChange={set("phone")} />
                    </IconField>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <IconField icon={CalendarBlank}>
                      <input className={inputCls} type="date" required value={form.date} onChange={set("date")} />
                    </IconField>
                    <IconField icon={Clock}>
                      <select className={selectCls} value={form.time} onChange={set("time")}>
                        <option>Morning (10 AM – 1 PM)</option>
                        <option>Afternoon (2 PM – 5 PM)</option>
                      </select>
                    </IconField>
                  </div>

                  <div className="relative">
                    <PencilSimple
                      size={18}
                      className="pointer-events-none absolute left-4 top-4 z-10 text-text-secondary"
                    />
                    <textarea
                      className="w-full rounded-[12px] border-[1.5px] border-border bg-input py-3.5! pl-11! pr-4! text-text-primary outline-none transition focus:border-accent"
                      rows={4}
                      placeholder="Anything specific you'd like to see?"
                      value={form.notes}
                      onChange={set("notes")}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn group relative mt-1 flex w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-primary to-secondary py-4 text-sm font-bold uppercase tracking-[1.5px] text-white shadow-orange transition hover:shadow-[0_18px_40px_rgba(255,107,26,0.45)]"
                  >
                    Request Visit
                    <ArrowRight
                      size={20}
                      weight="bold"
                      className="absolute right-6 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button>

                  <div className="mt-1 flex items-center gap-3 rounded-[14px] bg-accent/10 p-4">
                    <ShieldCheck size={26} weight="regular" className="shrink-0 text-accent" />
                    <p className="text-[13px]! leading-snug text-text-secondary">
                      <span className="font-bold text-text-primary">
                        Your information is safe with us.
                      </span>{" "}
                      We respect your privacy.
                    </p>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FactoryVisitBooking;
