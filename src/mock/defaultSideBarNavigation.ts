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
    title: 'Setting',
    link: '/setting',
    element: undefined,
    scrollTo: '',
    entrypoint: 'siteConfig',
  },
];
