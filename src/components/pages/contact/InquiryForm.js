// ─────────────────────────────────────────────────────────────────────
// Contact › Inquiry Form — "Tell us what you need".
// Left: eyebrow + heading, description, a 4-stat strip, a WhatsApp assist
// card and a decorative machine image. Right: a form card with icon-prefixed
// fields, machine select, message and trust badges. No backend — on submit
// it builds a prefilled WhatsApp message + confirmation.
// Inputs use `pl-11!` / `py-3.5!` to beat the unlayered global input styles.
// ─────────────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
import Selector from "@/components/common/dropdown/CustomDropdown";
import { isValidForm, validate } from "@/utils/validations/CommonValidator";

const WHATSAPP = "919978311122";

// Field-level rules consumed by our validation utility (utils/validations).
const VALIDATION_RULES = {
  name: [{ type: "require", message: "Please enter your name" }],
  phone: [
    { type: "require", message: "Please enter your phone number" },
    { type: "phone", message: "Please enter a valid phone number" },
  ],
  email: [
    { type: "require", message: "Please enter your email address" },
    { type: "email", message: "Please enter a valid email address" },
  ],
  machine: [{ type: "require", message: "Please select a machine" }],
  message: [{ type: "require", message: "Please enter your message" }],
};


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
  "w-full rounded-[12px] border-[1.5px] border-border bg-soft py-3.5! pl-11! pr-4! text-text-primary outline-none transition focus:border-accent";

const IconField = ({ icon: Icon, children }) => (
  <div className="relative">
    <Icon size={18} className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-text-secondary" />
    {children}
  </div>
);

// Inline validation message shown beneath a field.
const FieldError = ({ message }) =>
  message ? <p className="mt-1.5 text-[12px]! font-medium text-red-500">{message}</p> : null;

const InquiryForm = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    machine: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [validState, setValidState] = useState({ isValid: true, error: {} });

  // Re-validate a field once it already has an error so the message clears as
  // the user corrects it.
  const set = (k) => (e) => {
    const next = { ...form, [k]: e.target.value };
    setForm(next);
    if (validState.error[k]) {
      setValidState(validate(k, next, VALIDATION_RULES, validState));
    }
  };

  // Validate on blur — surfaces the error text as the user leaves a field.
  const onBlur = (k) => () =>
    setValidState(validate(k, form, VALIDATION_RULES, validState));

  // Preselect the machine from the ?machine= query (e.g. from the Selection
  // Guide "Inquire Now" buttons) and scroll the form into view.
  useEffect(() => {
    if (!router.isReady) return;
    const m = router.query.machine;
    if (m && MACHINES.includes(m)) {
      setForm((f) => ({ ...f, machine: m }));
      document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [router.isReady, router.query.machine]);


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

    const result = isValidForm(
      form,
      VALIDATION_RULES,
      validState
    );

    setValidState(result);

    if (!result.isValid) return;

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
              <span className="eyebrow">Request a Quote</span>

              <div>
                <h2 className="text-[30px]! font-bold uppercase leading-[1.05] tracking-[-0.01em] sm:text-[38px]! lg:text-[44px]!">
                  Tell Us What <br className="hidden sm:block" />
                  You <span className="text-accent">Need</span>
                </h2>
                <span className="mt-4 block h-[3px] w-16 rounded-full bg-gradient-to-br from-primary to-secondary" />
              </div>

              <p className="max-w-md text-text-secondary">
                Tell us about your production and the machine you need. We&apos;ll
                reply with the right recommendation and a quotation.
              </p>

              {/* Stats strip */}
              {/* <div className="grid max-w-md grid-cols-2 gap-px overflow-hidden rounded-[14px] border border-border bg-bg sm:grid-cols-4">
                {STATS.map((s) => (
                  <div key={s.l1} className="flex flex-col items-center gap-1.5 bg-card px-3 py-4 text-center">
                    <s.icon size={24} weight="duotone" className="text-accent" />
                    <div className="stats-font text-[18px] font-bold leading-none text-text-primary">{s.value}</div>
                    <div className="text-[11px]! font-bold uppercase leading-tight text-text-primary">{s.l1}</div>
                    <div className="text-[10px]! uppercase leading-tight text-text-secondary">{s.l2}</div>
                  </div>
                ))}
              </div> */}

              {/* WhatsApp assist card */}
              <div className="flex max-w-md items-center gap-4 rounded-[14px] border border-accent/25 bg-accent/10 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-accent shadow-card">
                  <WhatsappLogo size={26} weight="fill" />
                </span>
                <div>
                  <p className="font-bold text-text-primary">Need immediate assistance?</p>
                  <p className="text-[13px]! text-text-secondary">Chat with our experts on WhatsApp</p>
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
            className="rounded-[24px] border border-border bg-card p-6 shadow-[0_30px_60px_rgba(0,0,0,0.1)] sm:p-8"
          >
            {sent ? (
              <div className="flex min-h-[420px] flex-col items-center justify-center gap-4 text-center">
                <CheckCircle size={56} weight="fill" className="text-accent" />
                <h3 className="text-[20px]! font-semibold!">Thank you, {form.name || "there"}!</h3>
                <p className="max-w-xs text-sm text-text-secondary">
                  Your inquiry is ready. Send it straight to our team on WhatsApp
                  for the fastest response.
                </p>
                <a href={waLink} target="_blank" rel="noreferrer" className="btn-orange btn-lg">
                  Send on WhatsApp <WhatsappLogo size={18} weight="fill" />
                </a>
                <button onClick={() => setSent(false)} className="btn text-xs font-semibold uppercase tracking-wide text-text-secondary hover:text-accent">
                  Edit details
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="flex flex-col gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <IconField icon={User}>
                      <input
                        className={fieldCls}
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={set("name")}
                        onBlur={onBlur("name")}
                      />
                    </IconField>
                    <FieldError message={validState.error.name} />
                  </div>
                  <div>
                    <IconField icon={Phone}>
                      <input
                        className={fieldCls}
                        type="tel"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={set("phone")}
                        onBlur={onBlur("phone")}
                      />
                    </IconField>
                    <FieldError message={validState.error.phone} />
                  </div>
                </div>

                <div>
                  <IconField icon={EnvelopeSimple}>
                    <input
                      className={fieldCls}
                      type="email"
                      placeholder="Email address"
                      value={form.email}
                      onChange={set("email")}
                      onBlur={onBlur("email")}
                    />
                  </IconField>
                  <FieldError message={validState.error.email} />
                </div>

                <div>
                  <IconField icon={Stack}>
                    <Selector
                      options={MACHINES.map((m) => ({
                        label: m,
                        value: m,
                      }))}
                      value={
                        form.machine
                          ? {
                            label: form.machine,
                            value: form.machine,
                          }
                          : null
                      }
                      placeholder="Select Machine"
                      className={validState.error.machine ? "error" : ""}
                      // clear the prefixed Stack icon (matches inputs' pl-11)
                      // and drop the orange focus border / glow (keep red error)
                      styles={{
                        valueContainer: (base) => ({ ...base, paddingLeft: "34px" }),
                        control: (base, state) => {
                          const hasError = state.selectProps.className?.includes("error");
                          const borderColor = hasError
                            ? "var(--color-secondary)"
                            : "var(--color-border)";
                          return {
                            ...base,
                            borderColor,
                            boxShadow: "none",
                            "&:hover": { borderColor },
                          };
                        },
                      }}
                      onChange={(selected) => {
                        const value = selected?.value || "";

                        const next = {
                          ...form,
                          machine: value,
                        };

                        setForm(next);

                        if (validState.error.machine) {
                          setValidState(
                            validate(
                              "machine",
                              next,
                              VALIDATION_RULES,
                              validState
                            )
                          );
                        }
                      }}
                    />
                  </IconField>

                  <FieldError message={validState.error.machine} />
                </div>

                <div>
                  <div className="relative">
                    <PencilSimple
                      size={18}
                      className="pointer-events-none absolute left-4 top-4 z-10 text-text-secondary"
                    />
                    <textarea
                      className="w-full rounded-[12px] border-[1.5px] border-border bg-soft py-3.5! pl-11! pr-4! text-text-primary outline-none transition focus:border-accent"
                      rows={5}
                      placeholder="Your message / requirement"
                      value={form.message}
                      onChange={set("message")}
                      onBlur={onBlur("message")}
                    />
                  </div>

                  <FieldError message={validState.error.message} />
                </div>

                <button type="submit" className="btn-orange btn btn-block btn-lg group mt-1">
                  Submit Inquiry
                  <ArrowRight size={18} weight="bold" className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Trust badges */}
                <div className="mt-2 grid grid-cols-3 gap-2 border-t border-border pt-5">
                  {TRUST.map((t) => (
                    <div key={t.title} className="flex items-center gap-2">
                      <t.icon size={20} weight="regular" className="shrink-0 text-accent" />
                      <div className="leading-tight">
                        <div className="text-[12px]! font-bold text-text-primary">{t.title}</div>
                        <div className="text-[11px]! text-text-secondary">{t.sub}</div>
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
