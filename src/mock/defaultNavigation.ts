import { INavigation } from 'models';

export const defaultNavigation: INavigation[] = [
  {
    title: 'Home',
    link: '/home_interior_design_in_noida',
    scrollTo: '',
    items: [],
  },
  {
    title: 'About',
    link: '/about_us',
    scrollTo: '',
    items: [],
  },
  {
    title: 'Services',
    link: '/home_interior_services',
    scrollTo: '',
    items: [
      {
        title: 'All Services',
        link: '/home_interior_services/all_services',
        scrollTo: '',
        items: [],
      },
      {
        title: 'Residences interiors',
        link: '/home_interior_services/residences_services',
        scrollTo: '',
        items: [],
      },
      {
        title: 'Recreation Interiors',
        link: '/home_interior_services/recreation_services',
        scrollTo: '',
        items: [],
      },
      {
        title: 'Modular kitchen',
        link: '/home_interior_services/modular_kitchen_services',
        scrollTo: '',
        items: [],
      },
      {
        title: 'living room interiors',
        link: '/home_interior_services/livingroom_services',
        scrollTo: '',
        items: [],
      },
    ],
  },
  {
    title: 'Projects',
    link: '/project_done_by_us',
    scrollTo: '',
    items: [],
  },
  {
    title: 'Projects',
    link: '/project_done_by_us/:id',
    scrollTo: '',
    items: [],
    isHide: true,
  },
  {
    title: 'Gallery',
    link: '/all_photos',
    scrollTo: '',
    items: [],
  },
  {
    title: 'Contact',
    link: '/contact_us',
    scrollTo: '',
    items: [],
  },
  {
    title: 'Faq',
    link: '/faq',
    scrollTo: '',
    items: [],
  },
];
