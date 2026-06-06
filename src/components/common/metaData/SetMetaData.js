import Head from 'next/head'
import { useRouter } from 'next/router'
import { SITE } from '@/utils/seo'
// theme-color now follows the brand token from SITE.themeColor

/**
 * Centralised <Head> wrapper.
 * Props:
 *   title?: string                — page title (rendered as `Title | Site Name`)
 *   description?: string          — meta description (~150 chars)
 *   ogImage?: string              — absolute or relative path; falls back to default
 *   ogType?: string               — "website" | "article", default "website"
 *   noindex?: boolean             — set true to add robots noindex,nofollow
 *   canonicalUrl?: string         — explicit override; otherwise derived from router.asPath
 *   jsonLd?: object | object[]    — one or more schema.org graphs (JSON-LD)
 */
export default function SetMetaData({
    title,
    description,
    ogImage,
    ogType = 'website',
    noindex = false,
    canonicalUrl,
    jsonLd,
}) {
    const router = useRouter()
    const path = (router?.asPath || '/').split('?')[0]
    const canonical = canonicalUrl || `${SITE.url}${path === '/' ? '' : path}`
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle
    const desc = description || SITE.defaultDescription
    const isAbsoluteImg = ogImage?.startsWith('http')
    const image = ogImage
        ? isAbsoluteImg
            ? ogImage
            : `${SITE.url}${ogImage}`
        : `${SITE.url}${SITE.defaultOgImage}`

    const schemas = jsonLd
        ? Array.isArray(jsonLd)
            ? jsonLd
            : [jsonLd]
        : []

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name='description' content={desc} />
            <link rel='canonical' href={canonical} />

            {/* Robots */}
            {noindex ? (
                <meta name='robots' content='noindex,nofollow' />
            ) : (
                <meta
                    name='robots'
                    content='index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
                />
            )}

            {/* Open Graph */}
            <meta property='og:title' content={fullTitle} />
            <meta property='og:description' content={desc} />
            <meta property='og:image' content={image} />
            <meta property='og:url' content={canonical} />
            <meta property='og:type' content={ogType} />
            <meta property='og:site_name' content={SITE.name} />
            <meta property='og:locale' content={SITE.locale} />

            {/* Twitter Card (used by X, LinkedIn, Slack, Discord, etc. for previews) */}
            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:title' content={fullTitle} />
            <meta name='twitter:description' content={desc} />
            <meta name='twitter:image' content={image} />

            {/* Theme + brand */}
            <meta name='theme-color' content={SITE.themeColor} />
            <meta name='application-name' content={SITE.shortName} />

            {/* JSON-LD */}
            {schemas.map((schema, i) => (
                <script
                    key={i}
                    type='application/ld+json'
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}
        </Head>
    )
}
