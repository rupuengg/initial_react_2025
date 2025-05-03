import { INavigation } from 'entities';
import { E_Board_Type } from 'enums';

export const defaultNavigation: INavigation[] = [
  {
    id: 1,
    title: 'Home',
    link: '/home_interior_design_in_noida',
    type: E_Board_Type.PAGE,
    items: [],
  },
  {
    id: 2,
    title: 'About',
    link: '/about_us',
    type: E_Board_Type.PAGE,
    items: [],
  },
  {
    id: 3,
    title: 'Services',
    link: '/home_interior_services',
    type: E_Board_Type.PAGE,
    items: [
      {
        id: 4,
        title: 'All Services',
        link: '/home_interior_services/all_services',
        type: E_Board_Type.PAGE,
        items: [],
      },
      {
        id: 5,
        title: 'Residences interiors',
        link: '/home_interior_services/residences_services',
        type: E_Board_Type.PAGE,
        items: [],
      },
      {
        id: 6,
        title: 'Recreation Interiors',
        link: '/home_interior_services/recreation_services',
        type: E_Board_Type.PAGE,
        items: [],
      },
      {
        id: 6,
        title: 'Modular kitchen',
        link: '/home_interior_services/modular_kitchen_services',
        type: E_Board_Type.PAGE,
        items: [],
      },
      {
        id: 7,
        title: 'living room interiors',
        link: '/home_interior_services/livingroom_services',
        type: E_Board_Type.PAGE,
        items: [],
      },
    ],
  },
  {
    id: 8,
    title: 'Projects',
    link: '/project_done_by_us',
    type: E_Board_Type.PAGE,
    items: [],
  },
  {
    id: 9,
    title: 'Projects',
    link: '/project_done_by_us/:id',
    type: E_Board_Type.PAGE,
    items: [],
    isHide: true,
  },
  {
    id: 10,
    title: 'Gallery',
    link: '/all_photos',
    type: E_Board_Type.PAGE,
    items: [],
  },
  {
    id: 11,
    title: 'Contact',
    link: '/contact_us',
    type: E_Board_Type.PAGE,
    items: [],
  },
  {
    id: 12,
    title: 'Faq',
    link: '/faq',
    type: E_Board_Type.PAGE,
    items: [],
  },
];
