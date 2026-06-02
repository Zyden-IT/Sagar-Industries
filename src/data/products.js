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
    count: 5,
  },
  {
    slug: "flexo-printing-machines",
    name: "Flexo Printing Machines",
    short:
      "Clean, consistent flexographic printing on paper and board — from single colour to multi-colour configurations.",
    image: "/gallery3.jpg",
    count: 5,
  },
];

export const MACHINES = [
  // ── Paper Roll To Sheet Cutting ──────────────────────────────────
  { slug: "manual-paper-roll-to-sheet-cutting-machine", name: "Manual Paper Roll To Sheet Cutting Machine", category: "Cutting", short: "Reliable, cost-effective cutting for small to medium production.", image: "/gallery1.jpg", description: "An economical manual machine ideal for small to medium production. The operator controls feeding and cutting length to produce accurate, clean sheets with minimal investment." },
  { slug: "semi-automatic-paper-roll-to-sheet-cutting-machine", name: "Semi Automatic Paper Roll To Sheet Cutting Machine", category: "Cutting", short: "Balanced speed and control with assisted feeding.", image: "/gallery2.jpg", description: "Combines manual control with assisted feeding for higher output and reduced operator effort — a perfect step up for growing production requirements." },
  { slug: "automatic-paper-roll-to-sheet-cutting-machine", name: "Automatic Paper Roll To Sheet Cutting Machine", category: "Cutting", short: "Fully automated feeding and cutting for consistent output.", image: "/gallery4.jpg", description: "Fully automated feeding and cutting deliver consistent, high-volume output with minimal operator intervention and repeatable accuracy." },
  { slug: "high-speed-paper-roll-to-sheet-cutting-machine", name: "High Speed Paper Roll To Sheet Cutting Machine", category: "Cutting", short: "Maximum throughput for high-volume continuous production.", image: "/gallery5.jpg", description: "Engineered for maximum throughput, this machine handles continuous, high-volume production while maintaining precise, repeatable cuts." },
  { slug: "heavy-duty-paper-roll-to-sheet-cutting-machine", name: "Heavy Duty Paper Roll To Sheet Cutting Machine", category: "Cutting", short: "Built for thick boards and demanding industrial loads.", image: "/gallery6.jpg", description: "A rugged, high-power machine built to cut thick boards and demanding materials reliably, shift after shift, under heavy industrial loads." },

  // ── Flexo Printing ───────────────────────────────────────────────
  { slug: "single-colour-flexo-printing-machine", name: "Single Colour Flexo Printing Machine", category: "Flexo", short: "Clean single-colour printing for craft paper and board.", image: "/gallery3.jpg", description: "A compact flexo press for clean single-colour printing on craft paper and board, with consistent ink flow and quick setup." },
  { slug: "two-colour-flexo-printing-machine", name: "Two Colour Flexo Printing Machine", category: "Flexo", short: "Two-colour flexo printing with precise registration.", image: "/gallery7.jpg", description: "Two-colour flexographic printing with accurate registration — ideal for packaging, cartons and labels that need a clean, professional finish." },
  { slug: "three-colour-flexo-printing-machine", name: "Three Colour Flexo Printing Machine", category: "Flexo", short: "Vivid three-colour output for packaging and labels.", image: "/gallery8.jpg", description: "Produces vivid three-colour prints with quick setup and reliable drying, suited to medium and large production runs." },
  { slug: "four-colour-flexo-printing-machine", name: "Four Colour Flexo Printing Machine", category: "Flexo", short: "High-quality four-colour printing for detailed designs.", image: "/gallery9.jpg", description: "High-quality four-colour printing for detailed designs and demanding packaging applications, with precise colour registration." },
  { slug: "multi-colour-flexo-printing-machine", name: "Multi Colour Flexo Printing Machine", category: "Flexo", short: "Multi-colour configurations for complex print jobs.", image: "/gallery10.jpg", description: "Flexible multi-colour configurations for complex, high-impact print jobs across a wide range of materials and run sizes." },
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
