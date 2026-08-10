export default defineNuxtRouteMiddleware((to) => {
  const rawCatalogNumber = String(to.params.acb ?? '').trim()
  const catalogNumber = rawCatalogNumber.toUpperCase()

  if (rawCatalogNumber && rawCatalogNumber !== catalogNumber) {
    return navigateTo(`/releases/${encodeURIComponent(catalogNumber)}`, {
      redirectCode: 301,
      replace: true,
    })
  }
})
