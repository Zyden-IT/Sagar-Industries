// ─────────────────────────────────────────────────────────────────────
// Product data — single source of truth for the Products landing page
// (and the future per-machine detail pages). Edit here to change content.
// Images reference files in /public.
// ─────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  {
    slug: "paper-roll-to-sheet-cutting-machines",
    name: "Paper Roll To Sheet Cutting Machines",
    short:
      "Convert paper reels into precise, ready-to-use sheets — from manual units to high-speed automatic lines.",
    image: "/gallery1.jpg",
    count: 2,
  },
  {
    slug: "flexo-printing-machines",
    name: "Flexo Printing Machines",
    short:
      "Clean, consistent flexographic printing on paper and board — from single colour to multi-colour configurations.",
    image: "/gallery3.jpg",
    count: 4,
  },
];

// Each machine carries a `type` — the sub-category shown as a second-level
// tab in the catalog (Cutting → Automatic / Manual · Flexo → 1–4 Colour).
export const MACHINES = [
  // ── Paper Roll To Sheet Cutting ──────────────────────────────────
  { slug: "manual-paper-roll-to-sheet-cutting-machine", name: "Manual Paper Roll To Sheet Cutting Machine", category: "Cutting", type: "Manual", short: "Reliable, cost-effective cutting for small to medium production.", image: "/automatic-wb.png", description: "An economical manual machine ideal for small to medium production. The operator controls feeding and cutting length to produce accurate, clean sheets with minimal investment." },
  { slug: "automatic-paper-roll-to-sheet-cutting-machine", name: "Automatic Paper Roll To Sheet Cutting Machine", category: "Cutting", type: "Automatic", short: "Fully automated feeding and cutting for consistent output.", image: "/manual-wb.png", description: "Fully automated feeding and cutting deliver consistent, high-volume output with minimal operator intervention and repeatable accuracy." },

  // ── Flexo Printing ───────────────────────────────────────────────
  { slug: "single-colour-flexo-printing-machine", name: "Single Colour Flexo Printing Machine", category: "Flexo", type: "Single Colour", short: "Clean single-colour printing for craft paper and board.", image: "/flexo1--wb.png", description: "A compact flexo press for clean single-colour printing on craft paper and board, with consistent ink flow and quick setup." },
  { slug: "two-colour-flexo-printing-machine", name: "Two Colour Flexo Printing Machine", category: "Flexo", type: "Two Colour", short: "Two-colour flexo printing with precise registration.", image: "/flexo2--wb.png", description: "Two-colour flexographic printing with accurate registration — ideal for packaging, cartons and labels that need a clean, professional finish." },
  { slug: "three-colour-flexo-printing-machine", name: "Three Colour Flexo Printing Machine", category: "Flexo", type: "Three Colour", short: "Vivid three-colour output for packaging and labels.", image: "/flexo3=wb.png", description: "Produces vivid three-colour prints with quick setup and reliable drying, suited to medium and large production runs." },
  { slug: "four-colour-flexo-printing-machine", name: "Four Colour Flexo Printing Machine", category: "Flexo", type: "Four Colour", short: "High-quality four-colour printing for detailed designs.", image: "/flexo4--wb.png", description: "High-quality four-colour printing for detailed designs and demanding packaging applications, with precise colour registration." },
];

// Shared content used across detail pages
export const KEY_FEATURES = [
  "High Precision Performance",
  "Heavy Duty Construction",
  "Low Maintenance",
  "User Friendly Controls",
  "Industrial Grade Components",
];

export const SPECS = [
  { label: "Cutting Length", value: "25 mm – 8800 mm" },
  { label: "Machine Width", value: '25" – 75"' },
  { label: "Power Requirement", value: "2 HP – 9 HP" },
];

export const MATERIALS = [
  "Paper", "Craft Paper", "Corrugated Board", "Aluminium Foil",
  "Foam Sheet", "Wood Sheet", "Rexine", "Jute Material",
];

export const APPLICATIONS = [
  "Packaging Industry",
  "Printing Industry",
  "Paper Processing Industry",
  "Corrugated Industry",
];
