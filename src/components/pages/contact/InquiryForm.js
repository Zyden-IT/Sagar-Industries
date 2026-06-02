// ─────────────────────────────────────────────────────────────────────
// Contact › Inquiry Form — "Tell us what you need".
// Left: eyebrow + heading, description, a 4-stat strip, a WhatsApp assist
// card and a decorative machine image. Right: a form card with icon-prefixed
// fields, machine select, message and trust badges. No backend — on submit
// it builds a prefilled WhatsApp message + confirmation.
// Inputs use `pl-11!` / `py-3.5!` to beat the unlayered global input styles.
// ─────────────────────────────────────────────────────────────────────

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  PaperPlaneTilt,
  User,
  Phone,
  EnvelopeSimple,
  Stack,
  PencilSimple,
  ArrowRight,
  WhatsappLogo,
  CheckCircle,
  Medal,
  Globe,
  Lightbulb,
  Headset,
  ShieldCheck,
  Clock,
  Receipt,
} from "@phosphor-icons/react";

const WHATSAPP = "919978311122";
const MACHINES = [
  "Paper Roll To Sheet Cutting Machine",
  "Flexo Printing Machine",
  "Not sure — need guidance",
];

const STATS = [
  { icon: Medal, value: "20+", l1: "Years", l2: "Experience" },
  { icon: Globe, value: "500+", l1: "Installations", l2: "Worldwide" },
  { icon: Lightbulb, value: "100%", l1: "Custom Machine", l2: "Solutions" },
  { icon: Headset, value: "PAN INDIA", l1: "Sales & Service", l2: "Support" },
];

const TRUST = [
  { icon: ShieldCheck, title: "100% Privacy", sub: "Assured" },
  { icon: Clock, title: "Quick Response", sub: "Within 24 Hrs" },
  { icon: Receipt, title: "Best Price", sub: "Guarantee" },
];

const fieldCls =
  "w-full rounded-[12px] border-[1.5px] border-theme bg-soft py-3.5! pl-11! pr-4! text-primary outline-none transition focus:border-accent";
const selectCls =
  "w-full rounded-[12px] border-[1.5px] border-theme bg-soft py-3.5! pl-11! pr-10! text-primary outline-none transition focus:border-accent";

const IconField = ({ icon: Icon, children }) => (
  <div className="relative">
    <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-secondary" />
    {children}
  </div>
);

const InquiryForm = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", machine: MACHINES[0], message: "" });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const waText =
    `New inquiry from the website:%0A` +
    `Name: ${form.name}%0A` +
    `Email: ${form.email}%0A` +
    `Phone: ${form.phone}%0A` +
    `Machine: ${form.machine}%0A` +
    `Message: ${form.message}`;
  const waLink = `https://wa.me/${WHATSAPP}?text=${waText}`;

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="inquiry" className="section-py scroll-mt-20 bg-soft">
      <div className="container">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          {/* ── Left: intro ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative"
          >
            {/* decorative machine image */}
            {/* <div className="pointer-events-none absolute -bottom-6 -right-1 top-5 z-0 hidden w-[52%] max-w-sm lg:block">
              <Image src="/hero.png" alt="" width={520} height={380} className="h-auto w-full object-contain" />
            </div> */}

            <div className="relative z-10 flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-md border border-accent/30 bg-accent-soft px-3 py-1.5 text-[11px] font-bold uppercase tracking-[2px] text-accent">
                <PaperPlaneTilt size={14} weight="fill" /> Request a Quote
              </span>

              <div>
                <h2 className="text-[30px]! font-bold uppercase leading-[1.05] tracking-[-0.01em] sm:text-[38px]! lg:text-[44px]!">
                  Tell Us What <br className="hidden sm:block" />
                  You <span className="text-accent">Need</span>
                </h2>
                <span className="mt-4 block h-[3px] w-16 rounded-full bg-orange-gradient" />
              </div>

              <p className="max-w-md text-secondary">
                Share a few details about your production and the machine
                you&apos;re interested in. Our team will get back to you with the
                right recommendation and a quotation.
              </p>

              {/* Stats strip */}
              {/* <div className="grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-theme bg-theme sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.l1} className="flex flex-col items-center gap-1.5 bg-card px-3 py-4 text-center">
                    <s.icon size={24} weight="duotone" className="text-accent" />
                    <div className="stats-font text-[18px] font-bold leading-none text-primary">{s.value}</div>
                    <div className="text-[11px]! font-bold uppercase leading-tight text-primary">{s.l1}</div>
                    <div className="text-[10px]! uppercase leading-tight text-secondary">{s.l2}</div>
                  </div>
                ))}
              </div> */}

              {/* WhatsApp assist card */}
              <div className="flex max-w-md items-center gap-4 rounded-[14px] border border-accent/25 bg-accent-soft/60 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-accent shadow-card">
                  <WhatsappLogo size={26} weight="fill" />
                </span>
                <div>
                  <p className="font-bold text-primary">Need immediate assistance?</p>
                  <p className="text-[13px]! text-secondary">Chat with our experts on WhatsApp</p>
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-accent transition-all hover:gap-2"
                  >
                    Chat on WhatsApp <ArrowRight size={13} weight="bold" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Right: form card ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="rounded-[24px] border border-theme bg-card p-6 shadow-[0_30px_60px_rgba(0,0,0,0.1)] sm:p-8"
          >
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle size={56} weight="fill" className="text-accent" />
                <h3 className="text-[20px]! font-semibold!">Thank you, {form.name || "there"}!</h3>
                <p className="max-w-xs text-sm text-secondary">
                  Your inquiry is ready. Send it straight to our team on WhatsApp
                  for the fastest response.
                </p>
                <a href={waLink} target="_blank" rel="noreferrer" className="btn-primary btn-lg">
                  Send on WhatsApp <WhatsappLogo size={18} weight="fill" />
                </a>
                <button onClick={() => setSent(false)} className="text-xs font-semibold uppercase tracking-wide text-secondary hover:text-accent">
                  Edit details
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <IconField icon={User}>
                    <input className={fieldCls} type="text" required placeholder="Your name" value={form.name} onChange={set("name")} />
                  </IconField>
                  <IconField icon={Phone}>
                    <input className={fieldCls} type="tel" required placeholder="Phone number" value={form.phone} onChange={set("phone")} />
                  </IconField>
                </div>

                <IconField icon={EnvelopeSimple}>
                  <input className={fieldCls} type="email" required placeholder="Email address" value={form.email} onChange={set("email")} />
                </IconField>

                <IconField icon={Stack}>
                  <select className={selectCls} value={form.machine} onChange={set("machine")}>
                    {MACHINES.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </IconField>

                <div className="relative">
                  <PencilSimple size={18} className="pointer-events-none absolute left-4 top-4 z-10 text-secondary" />
                  <textarea
                    className="w-full rounded-[12px] border-[1.5px] border-theme bg-soft py-3.5! pl-11! pr-4! text-primary outline-none transition focus:border-accent"
                    rows={5}
                    placeholder="Your message / requirement"
                    value={form.message}
                    onChange={set("message")}
                  />
                </div>

                <button
                  type="submit"
                  className="group relative mt-1 flex w-full items-center justify-center rounded-[14px] bg-orange-gradient py-4 text-sm font-bold uppercase tracking-[1.5px] text-white shadow-orange transition hover:shadow-[0_18px_40px_rgba(255,107,26,0.45)]"
                >
                  Submit Inquiry
                  <ArrowRight size={20} weight="bold" className="absolute right-6 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Trust badges */}
                <div className="mt-2 grid grid-cols-3 gap-2 border-t border-theme pt-5">
                  {TRUST.map((t) => (
                    <div key={t.title} className="flex items-center gap-2">
                      <t.icon size={20} weight="regular" className="shrink-0 text-accent" />
                      <div className="leading-tight">
                        <div className="text-[12px]! font-bold text-primary">{t.title}</div>
                        <div className="text-[11px]! text-secondary">{t.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InquiryForm;
