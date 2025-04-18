import { INavigation } from 'models';

export const defaultSideBarNavigation: INavigation[] = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    scrollTo: '',
    items: [],
    entrypoint: 'dashboard',
  },
  {
    title: 'Blogs',
    link: '/blogs',
    scrollTo: '',
    entrypoint: 'blogs',
  },
  {
    title: 'Setting',
    link: '/setting',
    scrollTo: '',
    path: '',
    entrypoint: 'siteConfig',
  },
];
