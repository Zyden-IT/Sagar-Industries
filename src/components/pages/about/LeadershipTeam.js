// ─────────────────────────────────────────────────────────────────────
// About › Team — hub & spoke layout. A central circular machine photo with
// a tagline card, four team cards around it (icon + underlined title +
// description + photo), joined to the hub by accent connector nubs.
// Desktop (lg+): 3-column grid (cards | hub | cards). Below lg: hub on top,
// then a 2-col card grid (no connectors). Photos live in /public.
// ─────────────────────────────────────────────────────────────────────

import Image from "next/image";
import { motion } from "framer-motion";
import { UsersThree, Gear, MagnifyingGlass, Headset } from "@phosphor-icons/react";

const TEAMS = [
  {
    icon: UsersThree,
    title: "Production Team",
    desc: "Skilled operators and fabricators who build every machine to specification.",
    img: "/gallery8.jpg",
    side: "left",
  },
  {
    icon: Gear,
    title: "Engineering Team",
    desc: "Designers and engineers who develop, customize and improve our machinery.",
    img: "/gallery11.jpg",
    side: "right",
  },
  {
    icon: MagnifyingGlass,
    title: "Quality Team",
    desc: "Inspectors who test and verify every machine against strict standards.",
    img: "/gallery4.jpg",
    side: "left",
  },
  {
    icon: Headset,
    title: "Support Team",
    desc: "After-sales experts handling installation, service and spare parts.",
    img: "/gallery6.jpg",
    side: "right",
  },
];

// Accent line + dots linking a card to the central hub (desktop only).
const Connector = ({ side }) => (
  <span
    className={`absolute top-1/2 hidden -translate-y-1/2 items-center lg:flex ${
      side === "left"
        ? "right-0 translate-x-full flex-row"
        : "left-0 -translate-x-full flex-row-reverse"
    }`}
  >
    <span className="h-2 w-2 rounded-full bg-accent" />
    <span className="h-[2px] w-12 bg-accent/50" />
    <span className="h-2.5 w-2.5 rounded-full border-2 border-accent bg-card" />
  </span>
);

const TeamCard = ({ team, withConnector, index }) => {
  const Icon = team.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-[var(--radius-card)] border border-theme bg-card shadow-card transition duration-300 hover:border-accent hover:shadow-orange"
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-300 group-hover:scale-110">
            <Icon size={26} weight="regular" />
          </span>
          <div className="flex-1">
            <h3 className="text-[15px]! font-semibold! leading-snug">{team.title}</h3>
            <span className="mt-2 block h-[3px] w-9 rounded-full bg-orange-gradient" />
            <p className="mt-2.5 text-[13px]! leading-relaxed text-secondary">
              {team.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="relative h-[130px] w-full">
        <Image
          src={team.img}
          alt={team.title}
          fill
          sizes="(max-width: 1024px) 100vw, 320px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {withConnector && <Connector side={team.side} />}
    </motion.div>
  );
};

// Central hub: circular machine photo + tagline card.
const Hub = ({ circleClass }) => (
  <div className="flex flex-col items-center gap-6">
    <div
      className={`relative aspect-square overflow-hidden rounded-full border-[6px] border-white shadow-[0_0_0_2px_#FF6B1A,0_20px_45px_rgba(0,0,0,0.18)] ${circleClass}`}
    >
      <Image
        src="/gallery10.jpg"
        alt="Sagar Industries machine on the shop floor"
        fill
        sizes="360px"
        className="object-cover"
      />
    </div>
    <div className="flex items-center gap-3 rounded-2xl border border-theme bg-card px-5 py-3 shadow-card">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <UsersThree size={22} weight="regular" />
      </span>
      <div className="text-left leading-tight">
        <p className="text-[13px]! font-bold! text-primary">
          One Team. One Standard.
        </p>
        <p className="text-[13px]! font-bold! text-accent">Every Machine.</p>
      </div>
    </div>
  </div>
);

const LeadershipTeam = () => {
  const left = TEAMS.filter((t) => t.side === "left");
  const right = TEAMS.filter((t) => t.side === "right");

  return (
    <section className="section-py bg-soft">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold uppercase tracking-[2px] text-accent">
              Our Team
            </span>
            <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[32px]!">
              The People Behind Every Machine
            </h2>
          </div>
          <span className="h-[3px] w-16 rounded-full bg-orange-gradient" />
          <p className="max-w-xl text-secondary">
            A dedicated team across production, engineering, quality and support
            works together to deliver machines you can rely on.
          </p>
        </div>

        {/* ── Desktop: hub & spoke ───────────────────────────────────── */}
        <div className="mt-14 hidden items-center gap-x-12 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)_minmax(0,1fr)]">
          <div className="flex flex-col gap-10">
            {left.map((t, i) => (
              <TeamCard key={t.title} team={t} index={i} withConnector />
            ))}
          </div>

          <Hub circleClass="w-full max-w-[360px]" />

          <div className="flex flex-col gap-10">
            {right.map((t, i) => (
              <TeamCard key={t.title} team={t} index={i} withConnector />
            ))}
          </div>
        </div>

        {/* ── Tablet / mobile: hub on top, then card grid ────────────── */}
        <div className="mt-12 lg:hidden">
          <div className="mb-10 flex justify-center">
            <Hub circleClass="w-[240px]" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {TEAMS.map((t, i) => (
              <TeamCard key={t.title} team={t} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
