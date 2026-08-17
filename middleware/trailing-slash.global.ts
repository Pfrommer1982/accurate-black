export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/' || !to.path.endsWith('/')) return

  const nextPath = to.path.replace(/\/+$/, '') || '/'
  const suffix = to.fullPath.slice(to.path.length)
  return navigateTo(`${nextPath}${suffix}`, {
    redirectCode: 301,
    replace: true,
  })
})
