import { INavigation } from 'models';

export const defaultSideBarNavigation: INavigation[] = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    element: undefined,
    scrollTo: '',
    entrypoint: 'dashboard',
  },
  {
    title: 'Blogs',
    link: '/blogs',
    element: undefined,
    scrollTo: '',
    entrypoint: 'blogs',
  },
  {
    title: 'Site Config',
    link: '/siteConfig',
    element: undefined,
    scrollTo: '',
    entrypoint: 'siteConfig',
  },
];
