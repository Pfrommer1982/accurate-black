import { toValue } from 'vue';
import type { MaybeRefOrGetter } from 'vue';

export const usePageSeo = (
  title: MaybeRefOrGetter<string>,
  description?: MaybeRefOrGetter<string>,
  image?: MaybeRefOrGetter<string>
) => {
  const defaultDescription = 'Deep. Dark. Authentic. Profound. We delve into the depths of electronic music. This is where the beats are felt, not just heard. We are Accurate Black.';
  const defaultImage = 'https://www.accurateblack.nl/public/img/accurate-black.png';

  useSeoMeta({
    title: () => `${toValue(title)}`,
    ogTitle: () => `${toValue(title)} | Accurate Black`,
    description: () => toValue(description) || defaultDescription,
    ogDescription: () => toValue(description) || defaultDescription,
    ogImage: () => toValue(image) || defaultImage,
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${toValue(title)} | Accurate Black`,
    twitterDescription: () => toValue(description) || defaultDescription,
    twitterImage: () => toValue(image) || defaultImage,
  });
};
