import { IEndpoint } from 'store/states';

export const DataApiPath: { [x: string]: string | IEndpoint } = {
  siteConfig: 'seo',
  contactInfo: 'contact',
  jobSeeker: 'job-seeker',
  menu: 'menus',
  menu_group: 'menugroups',
  mainNavigation: 'main_menu/1',
  sidebarNavigation: 'admin_menu',
  blogs: 'blog',
  menuGroupByType: 'menugroups/by/{type}',
  users: 'users',
  basic_config: 'basic_config',
};
