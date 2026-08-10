type ImageKitOptions = {
  width: number
  quality?: number
}

/** Append ImageKit transforms so catalogue art is not shipped at full source size. */
export const withImageKitTransform = (
  url: string | null | undefined,
  options: ImageKitOptions,
): string => {
  if (!url) return ''

  try {
    const parsed = new URL(url)
    if (!parsed.hostname.endsWith('imagekit.io')) return url

    const quality = options.quality ?? 72
    const transform = `w-${Math.round(options.width)},q-${quality},f-auto`
    const existing = parsed.searchParams.get('tr')
    parsed.searchParams.set('tr', existing ? `${existing},${transform}` : transform)
    return parsed.toString()
  } catch {
    return url
  }
}
