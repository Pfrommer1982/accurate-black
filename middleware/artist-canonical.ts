import { artistId } from '~/utils/artistId'

const decodeParam = (value: string): string => {
  try {
    return decodeURIComponent(value).trim()
  } catch {
    return value.trim()
  }
}

export default defineNuxtRouteMiddleware((to) => {
  const raw = decodeParam(String(to.params.artist ?? ''))
  if (!raw) return

  const canonical = artistId(raw)
  if (!canonical || raw === canonical) return

  return navigateTo(`/artists/${encodeURIComponent(canonical)}`, {
    redirectCode: 301,
    replace: true,
  })
})
