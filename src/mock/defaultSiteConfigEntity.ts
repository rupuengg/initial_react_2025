import { ISiteConfigEntity } from 'entities';

export const defaultSiteConfigEntity: ISiteConfigEntity = {
  // SEO
  id: 1,
  route: '',
  title: '',
  description: '',
  keywords: '',

  // OG Configuration
  ogSiteName: '',
  ogUrl: '',
  ogTitle: '',
  ogDescription: '',
  ogType: '',
  ogSeeAlso: '',
  ogLocale: '',
  ogLocaleAlternate1: '',
  ogLocaleAlternate2: '',
  ogUpdatedTime: '',
  // OGImage ogImage: '',

  // OG Image
  ogImageType: '',
  ogImageWidth: '',
  ogImageHeight: '',
  ogImageUrl: '',
  ogImageSecureUrl: '',
  ogImageAlt: '',

  // OG Video
  ogVideoType: '',
  ogVideoWidth: '',
  ogVideoHeight: '',
  ogVideoSecureUrl: '',
};
