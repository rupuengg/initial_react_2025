import React from 'react';

export interface INavigation {
  title: string;
  link: string;
  element: React.JSX.Element;
  scrollTo: string;
  items?: INavigation[];
}
