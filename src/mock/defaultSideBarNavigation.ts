import { INavigation } from 'models';
import { E_Board_Type } from 'enums';

export const defaultSideBarNavigation: INavigation[] = [
  {
    title: 'Dashboard',
    link: '/dashboard',
    type: E_Board_Type.BOARD,
    scrollTo: '',
    entrypoint: 'dashboard',
  },
  {
    title: 'Contacts',
    link: '/contactInfo',
    type: E_Board_Type.TABLE,
    scrollTo: '',
    entrypoint: 'contactInfo',
  },
  {
    title: 'Blogs',
    link: '/blogs',
    type: E_Board_Type.TABLE,
    scrollTo: '',
    entrypoint: 'blogs',
  },
  {
    title: 'Job Seeker',
    link: '/job_seeker',
    type: E_Board_Type.TABLE,
    scrollTo: '',
    entrypoint: 'jobSeeker',
  },
  {
    title: 'Site Config',
    link: '/siteConfig',
    type: E_Board_Type.TABLE,
    scrollTo: '',
    entrypoint: 'siteConfig',
  },
];
