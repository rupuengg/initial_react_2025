import { IEndpoint } from 'store/states';

export const DataApiPath: { [x: string]: string | IEndpoint } = {
  siteConfig: 'seo',
  contactInfo: 'contact',
  jobSeeker: 'job-seeker',
  menu: 'menus',
  mainNavigation: 'main_menu/1',
  sidebarNavigation: 'admin_menu',
};
