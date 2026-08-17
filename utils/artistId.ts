/** Stable public artist slug used in URLs, sitemap and canonicals. */
export const artistId = (value: string): string =>
  value
    .trim()
    .toLocaleLowerCase('en')
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'artist'
