// ─────────────────────────────────────────────────────────────────────
// PageSEO — thin lookup wrapper around <SetMetaData>.
//
// Each page renders a single <PageSEO page="<key>" /> at the top of its
// component tree. The key looks up its metadata from src/config/pageSeo.js,
// so all per-page SEO copy lives in one file.
//
// Per-render overrides (e.g. dynamic product/article pages) are allowed:
//   <PageSEO page="products" title="Welspun TMT CRS Fe 550D" />
//
// Returns null if the key is not found, with a dev-mode warning.
// ─────────────────────────────────────────────────────────────────────

import { PAGE_SEO } from '@/config/pageSeo'
import SetMetaData from './SetMetaData'

export default function PageSEO({ page, ...overrides }) {
    const config = PAGE_SEO[page]

    if (!config) {
        if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
            // eslint-disable-next-line no-console
            console.warn(
                `[PageSEO] No entry found for page="${page}". Add it to src/config/pageSeo.js or remove the <PageSEO> tag.`,
            )
        }
        return null
    }

    return <SetMetaData {...config} {...overrides} />
}
