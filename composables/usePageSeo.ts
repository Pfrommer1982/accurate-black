import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import {
  SITE_DEFAULT_IMAGE,
  SITE_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
} from '~/utils/siteSeo'

type PageSeoOptions = {
  path?: MaybeRefOrGetter<string | undefined>
  type?: MaybeRefOrGetter<'website' | 'article' | 'music.album' | 'profile'>
  robots?: MaybeRefOrGetter<string | undefined>
}

export const usePageSeo = (
  title: MaybeRefOrGetter<string>,
  description?: MaybeRefOrGetter<string | undefined>,
  image?: MaybeRefOrGetter<string | undefined>,
  options: PageSeoOptions = {},
) => {
  const route = useRoute()

  const resolvedTitle = computed(() => toValue(title))
  const resolvedDescription = computed(() => toValue(description) || SITE_DESCRIPTION)
  const resolvedImage = computed(() => toValue(image) || SITE_DEFAULT_IMAGE)
  const resolvedPath = computed(() => {
    const explicit = toValue(options.path)
    if (explicit) return explicit
    return route.path || '/'
  })
  const resolvedUrl = computed(() => absoluteUrl(resolvedPath.value))
  const resolvedType = computed(() => toValue(options.type) || 'website')
  const resolvedRobots = computed(() => toValue(options.robots))

  useSeoMeta({
    title: resolvedTitle,
    ogTitle: () => `${resolvedTitle.value} | ${SITE_NAME}`,
    description: resolvedDescription,
    ogDescription: resolvedDescription,
    ogImage: resolvedImage,
    ogUrl: resolvedUrl,
    ogType: resolvedType,
    ogSiteName: SITE_NAME,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${resolvedTitle.value} | ${SITE_NAME}`,
    twitterDescription: resolvedDescription,
    twitterImage: resolvedImage,
    robots: () => resolvedRobots.value || undefined,
  })

  useHead({
    link: [{ rel: 'canonical', href: resolvedUrl }],
  })
}
