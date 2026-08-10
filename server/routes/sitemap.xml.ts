import { getArtistIndex } from '~/server/repositories/artistRepository'
import { getReleaseCatalogue } from '~/server/repositories/releaseRepository'
import { absoluteUrl } from '~/utils/siteSeo'

type SitemapEntry = {
  loc: string
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority: string
  lastmod?: string
}

const escapeXml = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const staticEntries = (): SitemapEntry[] => {
  const today = new Date().toISOString().slice(0, 10)
  return [
    { loc: absoluteUrl('/'), changefreq: 'weekly', priority: '1.0', lastmod: today },
    { loc: absoluteUrl('/releases'), changefreq: 'weekly', priority: '0.9', lastmod: today },
    { loc: absoluteUrl('/artists'), changefreq: 'weekly', priority: '0.8', lastmod: today },
    { loc: absoluteUrl('/techtonic'), changefreq: 'weekly', priority: '0.7', lastmod: today },
    { loc: absoluteUrl('/accurate-sessions'), changefreq: 'weekly', priority: '0.7', lastmod: today },
    { loc: absoluteUrl('/about'), changefreq: 'monthly', priority: '0.7', lastmod: today },
    { loc: absoluteUrl('/demo-submission'), changefreq: 'monthly', priority: '0.6', lastmod: today },
    { loc: absoluteUrl('/privacy-policy'), changefreq: 'yearly', priority: '0.2', lastmod: today },
  ]
}

const render = (entries: SitemapEntry[]): string => {
  const body = entries.map((entry) => {
    const lastmod = entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''
    return `  <url>
    <loc>${escapeXml(entry.loc)}</loc>${lastmod}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`
}

export default defineEventHandler(async (event) => {
  const entries = staticEntries()

  try {
    const [releases, artists] = await Promise.all([
      getReleaseCatalogue(),
      getArtistIndex(),
    ])

    for (const release of releases) {
      entries.push({
        loc: absoluteUrl(`/releases/${encodeURIComponent(release.catalogNumber)}`),
        changefreq: 'monthly',
        priority: '0.75',
        lastmod: release.year ? `${release.year}-01-01` : undefined,
      })
    }

    for (const artist of artists) {
      entries.push({
        loc: absoluteUrl(`/artists/${encodeURIComponent(artist.name)}`),
        changefreq: 'monthly',
        priority: '0.65',
      })
    }
  } catch (error) {
    console.error('[sitemap] Failed to enrich dynamic routes', error)
  }

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8')
  setHeader(event, 'Cache-Control', 'public, max-age=3600, s-maxage=3600')
  return render(entries)
})
