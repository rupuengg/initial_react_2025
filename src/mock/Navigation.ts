import { INavigation } from 'models';
import { About, Contact, Faq, Gallery, Home, Project, Services } from 'pages';
import React from 'react';

export const defaultNavigation: INavigation[] = [
  {
    title: 'Home',
    link: '/home_interior_design_in_noida',
    element: React.createElement(Home),
    scrollTo: '',
    items: [],
  },
  {
    title: 'About',
    link: '/about_us',
    element: React.createElement(About),
    scrollTo: '',
    items: [],
  },
  {
    title: 'Services',
    link: '/home_interior_services',
    element: React.createElement(Services),
    scrollTo: '',
    items: [
      {
        title: 'All Services',
        link: '/home_interior_services/all',
        element: React.createElement(Services),
        scrollTo: '',
        items: [],
      },
      {
        title: 'Residences interiors',
        link: '/home_interior_services/residences',
        element: React.createElement(Services),
        scrollTo: '',
        items: [],
      },
      {
        title: 'Recreation Interiors',
        link: '/home_interior_services/recreation',
        element: React.createElement(Services),
        scrollTo: '',
        items: [],
      },
      {
        title: 'Modular kitchen',
        link: '/home_interior_services/modularkitchen',
        element: React.createElement(Services),
        scrollTo: '',
        items: [],
      },
      {
        title: 'living room interiors',
        link: '/home_interior_services/livingroom',
        element: React.createElement(Services),
        scrollTo: '',
        items: [],
      },
    ],
  },
  {
    title: 'Projects',
    link: '/project_done_by_us',
    element: React.createElement(Project),
    scrollTo: '',
    items: [],
  },
  {
    title: 'Gallery',
    link: '/all_photos',
    element: React.createElement(Gallery),
    scrollTo: '',
    items: [],
  },
  {
    title: 'Contact',
    link: '/contact_us',
    element: React.createElement(Contact),
    scrollTo: '',
    items: [],
  },
  {
    title: 'Faq',
    link: '/faq',
    element: React.createElement(Faq),
    scrollTo: '',
    items: [],
  },
];
