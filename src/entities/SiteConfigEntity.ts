export interface ISiteConfigEntity {
  // SEO
  id: number;
  route: string;
  title: string;
  description: string;
  keywords: string;

  // OG Configuration
  ogSiteName: string;
  ogUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogType: string;
  ogSeeAlso: string;
  ogLocale: string;
  ogLocaleAlternate1: string;
  ogLocaleAlternate2: string;
  ogUpdatedTime: string;
  // OGImage ogImage: string;

  // OG Image
  ogImageType: string;
  ogImageWidth: string;
  ogImageHeight: string;
  ogImageUrl: string;
  ogImageSecureUrl: string;
  ogImageAlt: string;

  // OG Video
  ogVideoType: string;
  ogVideoWidth: string;
  ogVideoHeight: string;
  ogVideoSecureUrl: string;
}
