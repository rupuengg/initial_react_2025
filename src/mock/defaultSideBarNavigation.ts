import { INavigation } from 'entities';
import { E_Board_Type } from 'enums';

export const defaultSideBarNavigation: INavigation[] = [
  {
    id: 1,
    title: 'Dashboard',
    link: '/dashboard',
    type: E_Board_Type.BOARD,
    entrypoint: 'dashboard',
  },
  {
    id: 2,
    title: 'Blogs',
    link: '/blogs',
    type: E_Board_Type.TABLE,
    entrypoint: 'blogs',
  },
  {
    id: 3,
    title: 'Contacts',
    link: '/contactInfo',
    type: E_Board_Type.TABLE,
    entrypoint: 'contactInfo',
  },
  {
    id: 4,
    title: 'Job Seeker',
    link: '/job_seeker',
    type: E_Board_Type.TABLE,
    entrypoint: 'jobSeeker',
  },
  {
    id: 5,
    title: 'Menu',
    link: '/menu',
    type: E_Board_Type.TABLE,
    isShowHideSubMenu: true,
    items: [
      {
        id: 5,
        title: 'Menu Items',
        link: '/menu_item',
        type: E_Board_Type.TABLE,
        entrypoint: 'menu',
      },
      {
        id: 5,
        title: 'Menu Group',
        link: '/menu_group',
        type: E_Board_Type.TABLE,
        entrypoint: 'menuItems',
      },
    ],
  },
  {
    id: 6,
    title: 'Site Config',
    link: '/siteConfig',
    type: E_Board_Type.TABLE,
    entrypoint: 'siteConfig',
  },
];
