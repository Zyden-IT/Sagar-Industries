// ─────────────────────────────────────────────────────────────────────
// Per-page SEO metadata — single source of truth.
//
// Add / edit an entry here to control a page's <Head> tags.
// Used by <PageSEO page="<key>" /> — see src/components/common/metaData/PageSEO.js
//
// Schema for each entry (all fields optional except `title` and `description`):
//   title         string  — page title; rendered as `Title | Bhavyam Metals`
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
        title: 'TMT Bars & Structural Steel Supplier',
        description:
            'Bhavyam Metals is a trusted steel supplier in Gujarat, India. We offer TMT bars, structural steel, MS pipes, and industrial steel for building and industry projects. Get a quote within 2 hours.',
        ogImage: '/og/home.jpg',
        jsonLd: [organizationSchema(), websiteSchema(), localBusinessSchema()],
    },

    // ─── About ───────────────────────────────────────────────────────
    about: {
        title: 'About Us — Trusted Steel Supplier',
        description:
            'Family-owned steel supplier in Ahmedabad with over 15 years of experience. We deliver quality steel across India to builders, contractors, and large-scale projects.',
        ogImage: '/og/about.jpg',
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
        title: 'Steel Products — TMT, Beams, Pipes & More',
        description:
            'Explore our complete steel range. TMT bars from leading brands, structural beams, MS plates, MS / GI / SS pipes, fasteners, wire rods, and steel coils for every project size.',
        ogImage: '/og/products.jpg',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
            ]),
        ],
    },

    // ─── Industries ──────────────────────────────────────────────────
    industries: {
        title: 'Industries We Serve in India',
        description:
            'We supply steel to many industries across India — including building construction, bridges and roads, factories, power plants, shipyards, automotive, and prefab buildings.',
        ogImage: '/og/industries.jpg',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Industries', path: '/industries' },
            ]),
        ],
    },

    // ─── Knowledge Hub ───────────────────────────────────────────────
    knowledge: {
        title: 'Steel Knowledge — Grades & Guides',
        description:
            'Learn before you buy. Compare TMT grades, understand steel standards, spot fake TMT, and pick the right steel for earthquake zones — all explained in simple terms.',
        ogImage: '/og/knowledge.jpg',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Knowledge Hub', path: '/knowledge' },
            ]),
        ],
    },

    // ─── Smart Tools ─────────────────────────────────────────────────
    smartTools: {
        title: 'Free Steel Calculators & Tools',
        description:
            'Free online steel calculators for builders and homeowners. Quickly find TMT weight, plate and pipe weight, project cost, bulk discounts, and unit conversions in seconds.',
        ogImage: '/og/smart-tools.jpg',
        jsonLd: [
            breadcrumbSchema([
                { name: 'Home', path: '/' },
                { name: 'Smart Tools', path: '/smartTools' },
            ]),
        ],
    },

    // ─── Contact ─────────────────────────────────────────────────────
    contact: {
        title: 'Contact Us — Get a Steel Quote',
        description:
            'Get in touch with Bhavyam Metals for steel quotes, orders, or expert advice. Office in Ahmedabad. Call, WhatsApp, or send a quote request — we reply within 2 hours on business days.',
        ogImage: '/og/contact.jpg',
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
            'This page does not exist. Visit our steel products, free calculators, or contact us for help.',
        noindex: true,
    },
}

// Convenience export — list of valid page keys
export const PAGE_KEYS = Object.keys(PAGE_SEO)
