// ─────────────────────────────────────────────────────────────────────
// Site-wide SEO config — Bhavyam Metals
// Update this file once per environment / brand change.
// Per-page meta lives in `src/config/pageSeo.js`.
// ─────────────────────────────────────────────────────────────────────

export const SITE = {
    name: 'Bhavyam Metals',
    shortName: 'Bhavyam',
    url: 'https://www.bhavyammetals.com', // ← update to production domain before deploy
    defaultTitle:
        'Bhavyam Metals — Premium TMT Bars, Structural Steel & Industrial Steel Supplier',
    defaultDescription:
        'Trusted steel supplier in Gujarat, India. Premium TMT bars (Fe 415, Fe 500, Fe 550, Fe 550D, CRS), structural steel, MS pipes & industrial steel for construction, infrastructure & manufacturing projects.',
    defaultOgImage: '/og/bhavyam-default.jpg',
    locale: 'en_IN',
    email: 'info@bhavyammetals.com',
    phone: '+919999999999',
    address: {
        street: 'Bhavyam Metals, Bhuyangdev',
        locality: 'Ahmedabad',
        region: 'Gujarat',
        postalCode: '380061',
        country: 'IN',
    },
    founded: '2010',
    social: {
        linkedin: 'https://www.linkedin.com/company/bhavyam-metals',
        facebook: 'https://www.facebook.com/bhavyammetals',
        instagram: 'https://www.instagram.com/bhavyammetals',
        youtube: 'https://www.youtube.com/@bhavyammetals',
    },
    themeColor: '#FF6B1A',
}

// ─── JSON-LD schema helpers ──────────────────────────────────────────

export const organizationSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE.url}/#organization`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/Zyden-logo.png`,
    description: SITE.defaultDescription,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: SITE.founded,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
    },
    sameAs: Object.values(SITE.social),
})

export const websiteSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    description: SITE.defaultDescription,
    publisher: { '@id': `${SITE.url}/#organization` },
    potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE.url}/products?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
    },
})

export const localBusinessSchema = () => ({
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE.url}/#local`,
    name: SITE.name,
    image: `${SITE.url}/Zyden-logo.png`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.locality,
        addressRegion: SITE.address.region,
        postalCode: SITE.address.postalCode,
        addressCountry: SITE.address.country,
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '09:30',
            closes: '19:00',
        },
    ],
    priceRange: '$$',
})

export const breadcrumbSchema = (items) => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.name,
        item: `${SITE.url}${item.path}`,
    })),
})

export const productSchema = (product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image?.startsWith('http')
        ? product.image
        : `${SITE.url}${product.image || SITE.defaultOgImage}`,
    brand: { '@type': 'Brand', name: SITE.name },
    category: product.category,
    sku: product.sku,
    offers: product.priceRange
        ? {
              '@type': 'AggregateOffer',
              priceCurrency: 'INR',
              lowPrice: product.priceRange.low,
              highPrice: product.priceRange.high,
              availability: 'https://schema.org/InStock',
              seller: { '@id': `${SITE.url}/#organization` },
          }
        : undefined,
})

export const faqSchema = (faqs) => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
        },
    })),
})

export const articleSchema = (post) => {
    const isAbsolute = post.featuredImage?.src?.startsWith('http')
    const image = post.featuredImage?.src
        ? isAbsolute
            ? post.featuredImage.src
            : `${SITE.url}${post.featuredImage.src}`
        : `${SITE.url}${SITE.defaultOgImage}`

    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.subtitle,
        image,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: { '@type': 'Person', name: post.author?.name || SITE.name },
        publisher: { '@id': `${SITE.url}/#organization` },
    }
}
