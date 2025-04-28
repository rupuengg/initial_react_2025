import { IEndpoint } from 'store/states';

export const DataApiPath: { [x: string]: string | IEndpoint } = {
  siteConfig: 'seo',
  contactInfo: 'contact',
};
