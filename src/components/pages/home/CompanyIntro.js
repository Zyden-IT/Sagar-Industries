// ─────────────────────────────────────────────────────────────────────
// Home › Company Intro ("Who We Are") — collage + content layout.
// Left:  asymmetric 4-image collage with a rotating circular badge and
//        orange accent blobs/sparkles.
// Right: eyebrow + two-tone heading + paragraph + inline stat row
//        (icon over an aligned number heading) + CTAs.
// Info & colours unchanged — theme tokens only.
// ─────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  animate,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkle,
  Wrench,
  Medal,
  UsersThree,
  MapPin,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import { Routes } from "@/navigation/NavigationLib";

// ── Stats (edit here) ────────────────────────────────────────────────
const STATS = [
  { icon: Wrench, value: 2000, suffix: "+", label: "Machines Installed" },
  { icon: UsersThree, value: 400, suffix: "+", label: "Industrial Clients" },
  { icon: MapPin, text: "Pan India", label: "Support" },
];

// ── Collage images ───────────────────────────────────────────────────
const COLLAGE = [
  { src: "/automatic.png", span: "col-span-3" },
  { src: "/hero15.png", span: "col-span-2" },
  { src: "/machine3.1.png", span: "col-span-2" },
  // extra left/top padding pushes the machine away from the centre badge
  { src: "/flexo2.png", span: "col-span-3", pad: " pt-10" },
];

// Count-up number that animates when scrolled into view
const Counter = ({ value, suffix = "" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, value, mv]);

  return (
    <span
      ref={ref}
      className="stats-font bg-clip-text text-[28px] font-bold leading-none text-transparent lg:text-3xl"
      style={{ backgroundImage: "var(--orange-gradient)" }}
    >
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
};

const fadeIn = (x = 0) => ({
  initial: { opacity: 0, x, y: x === 0 ? 24 : 0 },
  whileInView: { opacity: 1, x: 0, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
});

// Rotating circular badge with an arrow CTA in the middle
const Badge = () => (
  <Link
    href={Routes.products.urlPath}
    aria-label="Explore our machines"
    className="group relative grid h-24 w-24 place-items-center rounded-full bg-card shadow-card ring-1 ring-border sm:h-28 sm:w-28"
  >
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      style={{ willChange: "transform" }}
      className="absolute inset-0 h-full w-full"
    >
      <svg viewBox="0 0 100 100" className="h-full w-full">
        <defs>
          <path id="badgeArc" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
        </defs>
        <text
          className="fill-[var(--color-text-secondary)]"
          style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "1.5px" }}
        >
          <textPath href="#badgeArc" startOffset="0%">
            SAGAR INDUSTRIES • PRECISION •&nbsp;
          </textPath>
        </text>
      </svg>
    </motion.div>
    <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-primary to-secondary text-white shadow-orange transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
      <ArrowUpRightIcon size={20} weight="bold" />
    </span>
  </Link>
);

const CompanyIntro = () => {
  return (
    <section className="section-py relative overflow-hidden bg-soft">
      {/* Blueprint grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 100%)",
        }}
      />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* ── Left — image collage ──────────────────────────────── */}
          <motion.div {...fadeIn(-30)} className="relative mx-auto w-full max-w-[560px]">
            {/* accent blobs */}
            <span aria-hidden className="absolute -left-5 -top-5 -z-0 h-28 w-28 rounded-[42%] bg-gradient-to-br from-primary to-secondary opacity-20 blur-md" />
            <span aria-hidden className="absolute -bottom-6 -right-5 -z-0 h-32 w-32 rounded-[42%] bg-accent/15 blur-lg" />

            <div className="relative grid h-[380px] grid-cols-5 grid-rows-2 gap-3 sm:h-[460px] sm:gap-4">
              {COLLAGE.map((img, i) => (
                <div
                  key={img.src}
                  className={`relative overflow-hidden rounded-3xl bg-white shadow-card ${img.span}`}
                >
                  <Image
                    src={img.src}
                    alt="Sagar Industries team and facility"
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className={`object-contain ${img.pad || "p-2.5"}`}
                  />
                </div>
              ))}

              {/* center badge */}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <Badge />
              </div>
            </div>
          </motion.div>

          {/* ── Right — content ───────────────────────────────────── */}
          <motion.div {...fadeIn(30)} className="relative flex flex-col gap-5">

            <span className="eyebrow">About Us</span>

            <h2 className="">
              Paper &amp; Flexo <span className="text-accent">Machine Manufacturer</span>
            </h2>

            <p className="max-w-xl text-text-secondary">
              Sagar Industries is a trusted manufacturer and exporter of paper
              roll to sheet cutting machines and flexo printing machines, built
              with precision engineering and 5+ years of expertise.
            </p>

            {/* Stats — icon over aligned number heading */}
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-6 sm:flex sm:flex-nowrap sm:divide-x sm:divide-[var(--color-border)]">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col gap-2.5 sm:px-4 sm:first:pl-0 lg:px-5">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/10 text-accent">
                    <s.icon size={20} weight="bold" />
                  </span>
                  {s.value !== undefined ? (
                    <Counter value={s.value} suffix={s.suffix} />
                  ) : (
                    <span
                      className="stats-font bg-clip-text text-2xl font-bold leading-none text-transparent"
                      style={{ backgroundImage: "var(--orange-gradient)" }}
                    >
                      {s.text}
                    </span>
                  )}
                  <p className="text-xs text-text-secondary">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <Link href={Routes.about.urlPath} className="btn-orange btn">
                ABOUT US
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CompanyIntro;
