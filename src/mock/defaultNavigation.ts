import { INavigation } from 'models';
import { E_Board_Type } from 'enums';

export const defaultNavigation: INavigation[] = [
  {
    title: 'Home',
    link: '/home_interior_design_in_noida',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
  {
    title: 'About',
    link: '/about_us',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
  {
    title: 'Services',
    link: '/home_interior_services',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [
      {
        title: 'All Services',
        link: '/home_interior_services/all_services',
        type: E_Board_Type.PAGE,
        scrollTo: '',
        items: [],
      },
      {
        title: 'Residences interiors',
        link: '/home_interior_services/residences_services',
        type: E_Board_Type.PAGE,
        scrollTo: '',
        items: [],
      },
      {
        title: 'Recreation Interiors',
        link: '/home_interior_services/recreation_services',
        type: E_Board_Type.PAGE,
        scrollTo: '',
        items: [],
      },
      {
        title: 'Modular kitchen',
        link: '/home_interior_services/modular_kitchen_services',
        type: E_Board_Type.PAGE,
        scrollTo: '',
        items: [],
      },
      {
        title: 'living room interiors',
        link: '/home_interior_services/livingroom_services',
        type: E_Board_Type.PAGE,
        scrollTo: '',
        items: [],
      },
    ],
  },
  {
    title: 'Projects',
    link: '/project_done_by_us',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
  {
    title: 'Projects',
    link: '/project_done_by_us/:id',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
    isHide: true,
  },
  {
    title: 'Gallery',
    link: '/all_photos',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
  {
    title: 'Contact',
    link: '/contact_us',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
  {
    title: 'Faq',
    link: '/faq',
    type: E_Board_Type.PAGE,
    scrollTo: '',
    items: [],
  },
];
