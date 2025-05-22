import React from 'react';
import { About } from './About';
import { Contact } from './Contact';
import { CustomBlog } from './CustomBlog';
import { Faq } from './Faq';
import { Gallery } from './Gallery';
import { Home } from './Home';
import { Project } from './Project';
import { Services } from './Services';

export * from './NoMatch';

export interface IPageMapper {
  [x: string]: any;
}

export const pageMapper: IPageMapper = {
  Home: React.createElement(Home),
  About: React.createElement(About),
  Services: React.createElement(Services),
  Project: React.createElement(Project),
  Gallery: React.createElement(Gallery),
  Contact: React.createElement(Contact),
  Faq: React.createElement(Faq),
  CustomBlog: React.createElement(CustomBlog),
};
