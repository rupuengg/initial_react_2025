import { INavigation } from 'models';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Blogs, Dashboard } from 'components';

export const Sidebar = () => {
  const sideBarNavs: INavigation[] = [
    { title: 'Dashboard', link: '/admin/dashboard', element: React.createElement(Dashboard), scrollTo: '' },
    { title: 'Blogs', link: '/admin/blogs', element: React.createElement(Blogs), scrollTo: '' },
    { title: 'Setting', link: '/admin/setting', element: React.createElement(Dashboard), scrollTo: '' },
  ];

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <NavLink to={item.link} className={({ isActive }) => (isActive ? 'link active' : 'link inactive')}>
          {item.title}
        </NavLink>
        {item.items && item.items.length > 0 && <ul>{makeMenu(item.items, index)}</ul>}
      </li>
    ));
  };

  return <ul className='sidebar-menu'>{makeMenu(sideBarNavs, 0)}</ul>;
};
