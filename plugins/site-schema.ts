import { siteGraphSchema } from '~/utils/siteSeo'

export default defineNuxtPlugin(() => {
  useHead({
    link: [
      {
        rel: 'alternate',
        type: 'text/plain',
        href: '/llms.txt',
        title: 'LLM instructions',
      },
    ],
    script: [
      {
        key: 'site-graph-jsonld',
        type: 'application/ld+json',
        children: JSON.stringify(siteGraphSchema()),
      },
    ],
  })
})
