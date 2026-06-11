// ─────────────────────────────────────────────────────────────────────
// Solutions › Industries Served — auto-scrolling marquee of industry pills.
// Two rows scrolling opposite directions; pause on hover (see
// `.industries-marquee` in global.css). Edge fades mask the loop seam.
// Solutions-only: Products / Home still use the shared IndustriesHoneycomb.
// ─────────────────────────────────────────────────────────────────────

import {
  Package,
  Cube,
  Printer,
  Scroll,
  Stack,
  Tag,
  Notebook,
  Newspaper,
  BookOpen,
  ShoppingBag,
  Envelope,
  Gift,
  Coffee,
  ForkKnife,
  FirstAid,
  GraduationCap,
  Ticket,
  Factory,
  Article,
  Cards,
  CalendarBlank,
  ImageSquare,
  ShoppingCart,
  Cpu,
  Wine,
  Plant,
  Car,
  Sparkle,
  Confetti,
  Coins,
} from "@phosphor-icons/react";

const INDUSTRIES = [
  { icon: Package, label: "Corrugated", sub: "Sheets & boxes" },
  { icon: Cube, label: "Packaging", sub: "All materials" },
  { icon: Printer, label: "Printing", sub: "Flexo & sheets" },
  { icon: Scroll, label: "Paper Processing", sub: "Rolls to sheets" },
  { icon: Stack, label: "Cartons", sub: "Duplex & folding" },
  { icon: Tag, label: "Labels & Stickers", sub: "Adhesive stock" },
  { icon: Notebook, label: "Stationery", sub: "Notebooks & pads" },
  { icon: Newspaper, label: "Print Media", sub: "News & flyers" },
  { icon: BookOpen, label: "Books & Publishing", sub: "Covers & text" },
  { icon: ShoppingBag, label: "Paper Bags", sub: "Carry & retail" },
  { icon: Envelope, label: "Envelopes", sub: "Mailers & covers" },
  { icon: Gift, label: "Gift Wrap", sub: "Wrapping rolls" },
  { icon: Coffee, label: "Paper Cups", sub: "Cup & lid board" },
  { icon: ForkKnife, label: "Food Packaging", sub: "Food-grade board" },
  { icon: FirstAid, label: "Pharma Packaging", sub: "Cartons & inserts" },
  { icon: GraduationCap, label: "Education", sub: "School supplies" },
  { icon: Ticket, label: "Tickets & Tags", sub: "Cards & passes" },
  { icon: Factory, label: "Paper Mills", sub: "Reel converting" },
  { icon: Article, label: "Magazines", sub: "Periodicals" },
  { icon: Cards, label: "Greeting Cards", sub: "Cards & invites" },
  { icon: CalendarBlank, label: "Calendars & Diaries", sub: "Dated stationery" },
  { icon: ImageSquare, label: "Posters & Banners", sub: "Large format" },
  { icon: ShoppingCart, label: "E-commerce", sub: "Mailer boxes" },
  { icon: Cpu, label: "Electronics", sub: "Protective packs" },
  { icon: Wine, label: "Beverages", sub: "Cartons & labels" },
  { icon: Plant, label: "Agriculture", sub: "Sacks & seed packs" },
  { icon: Car, label: "Automotive", sub: "Filters & manuals" },
  { icon: Sparkle, label: "Cosmetics", sub: "Folding cartons" },
  { icon: Confetti, label: "Events & Weddings", sub: "Invites & favours" },
  { icon: Coins, label: "Security Print", sub: "Vouchers & passes" },
];

const Pill = ({ icon: Icon, label, sub }) => (
  <div className="group flex shrink-0 items-center gap-3 rounded-full border border-border bg-card px-5 py-3 shadow-card transition-colors duration-300 hover:border-accent">
    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/10 text-accent ring-1 ring-accent/20 transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-secondary group-hover:text-white group-hover:ring-transparent">
      <Icon size={20} weight="bold" />
    </span>
    <span className="leading-tight">
      <span className="block text-[14px] font-bold text-text-primary">{label}</span>
      <span className="block text-[11px] text-text-secondary">{sub}</span>
    </span>
  </div>
);

// One marquee row — items duplicated so the -50% loop is seamless.
const Row = ({ items }) => (
  <div className="flex overflow-hidden">
    <div className="industries-marquee flex gap-4 pr-4">
      {[...items, ...items].map((it, i) => (
        <Pill key={`${it.label}-${i}`} {...it} />
      ))}
    </div>
  </div>
);

const IndustriesServed = () => (
  <section className="section-py relative overflow-hidden bg-soft">
    {/* dotted backdrop */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-60"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.045) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    />

    <div className="relative">
      {/* Header */}
      <div className="container">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-3 text-left lg:items-center lg:text-center">
          <span className="eyebrow">At a Glance</span>
          <h2 className="text-[24px]! font-semibold leading-[1.2] tracking-[-0.01em] sm:text-[28px]! lg:text-[34px]!">
            The Sectors We <span className="text-accent">Serve</span>
          </h2>
          <p className="text-text-secondary xl:whitespace-nowrap">
            The industries our paper cutting and flexo printing machines power
            across India and beyond.
          </p>
        </div>
      </div>

      {/* Marquee — full-bleed (outside .container) so pills run edge to edge */}
      <div className="mt-12">
        <Row items={INDUSTRIES} />
      </div>
    </div>
  </section>
);

export default IndustriesServed;
