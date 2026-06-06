// ─────────────────────────────────────────────────────────────────────
// Per-page SEO metadata — single source of truth.
//
// Add / edit an entry here to control a page's <Head> tags.
// Used by <PageSEO page="<key>" /> — see src/components/common/metaData/PageSEO.js
//
// Schema for each entry (all fields optional except `title` and `description`):
//   title         string  — page title; rendered as `Title | Sagar Industries`
//   description   string  — meta description (~150 chars)
//   ogImage       string  — absolute URL or path under /public; falls back to SITE.defaultOgImage
//   ogType        string  — "website" | "article" (default "website")
//   noindex       boolean — true to set robots noindex,nofollow
//   canonicalUrl  string  — explicit override (defaults to current path)
//   jsonLd        object|array — Schema.org graphs (helpers in src/utils/seo.js)
// ─────────────────────────────────────────────────────────────────────

import {
    organizationSchema,
    websiteSchema,
    localBusinessSchema,
    breadcrumbSchema,
} from '@/utils/seo'

export const PAGE_SEO = {
    // ─── Home ────────────────────────────────────────────────────────
    home: {
        title: 'Paper Cutting & Flexo Printing Machine Manufacturer',
        description:
            'Sagar Industries manufactures and exports precision paper roll-to-sheet cutting machines and flexo printing machines — cutting length up to 9300 mm, 3–5 HP and up to 4 colours. Built to spec for paper, packaging and printing.',
        ogImage: '/banner.png',
        jsonLd: [organizationSchema(), websiteSchema(), localBusinessSchema()],
    },

    // ─── About ───────────────────────────────────────────────────────
    about: {
        title: 'About Us — Machine Manufacturer & Exporter',
        description:
            'Learn about Sagar Industries — an Ahmedabad-based manufacturer and exporter of paper cutting and flexo printing machines, engineered for accuracy, durability and the packaging, corrugated and printing industries.',
        ogImage: '/company-intro.png',
        jsonLd: [
            organizationSchema(),
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
            ]),
        ],
    },

    // ─── Products ────────────────────────────────────────────────────
    products: {
        title: 'Our Machines — Paper Cutting & Flexo Printing',
        description:
            'Explore our machine range: paper roll-to-sheet cutting machines (manual & automatic) and flexo printing machines up to 4 colours, with cutting lengths up to 9300 mm and custom sizes built to spec.',
        ogImage: '/product1.png',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
            ]),
        ],
    },

    // ─── Solutions (Industries + Smart Tools + Knowledge merged) ──────
    solutions: {
        title: 'Solutions — Industries, Smart Tools & Knowledge',
        description:
            'Explore the industries Sagar Industries serves, use our free smart calculators to plan your investment, and browse buying guides, FAQs and resources — all in one place.',
        ogImage: '/banner1.png',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Solutions', path: '/solutions' },
            ]),
        ],
    },

    // ─── Contact ─────────────────────────────────────────────────────
    contact: {
        title: 'Contact Us — Request a Machine Quote',
        description:
            'Get in touch with Sagar Industries for machine quotes, custom configurations and expert support. Visit our facility in Gota, Ahmedabad, or call, email or send an enquiry — we usually reply within a few hours.',
        ogImage: '/banner2.png',
        jsonLd: [
            localBusinessSchema(),
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Contact', path: '/contact' },
            ]),
        ],
    },

    // ─── 404 ─────────────────────────────────────────────────────────
    notFound: {
        title: 'Page Not Found',
        description:
            'This page does not exist. Browse our paper cutting and flexo printing machines, or contact Sagar Industries for help.',
        noindex: true,
    },
}

// Convenience export — list of valid page keys
export const PAGE_KEYS = Object.keys(PAGE_SEO)
