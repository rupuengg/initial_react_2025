import React, { useCallback } from 'react';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { INavigation } from 'entities';
import { NavigationUtils, UrlUtils } from 'utils';

export interface INavMenuLink {
  nav: INavigation;
  parentIndex: number;
  currentIndex: number;
}

export const NavMenuLink: React.FC<INavMenuLink> = ({ nav, parentIndex, currentIndex }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   if (parentIndex > 0) {
  //     const main = document.querySelector(`.sidebar-menu li.active[data-parentindex="${parentIndex}"]`);
  //     // const main = document.querySelector(`.sidebar-menu li[data-parentindex="${parentIndex}"] a.active`);
  //     if (main) {
  //       // main.parentElement?.setAttribute('class', 'active');
  //       const parent = document.querySelector(`.sidebar-menu li[data-currentindex="${parentIndex}"]`);
  //       if (parent) {
  //         const cls = parent.getAttribute('class');
  //         if (!cls?.includes('active')) parent.setAttribute('class', `${cls || ''} active`);
  //       }
  //     }
  //   }
  // }, [isActive]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: INavigation): void => {
      e.preventDefault();
      NavigationUtils().makeParentNodeActive(e.currentTarget.parentElement, parentIndex);
      // document.querySelector('.sidebar-menu li')?.removeAttribute('class');
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(`admin${item.link}`),
        search: `?${searchParams.toString()}`,
      });
    },
    [searchParams, navigate]
  );

  return (
    <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'} parentIndex - ${parentIndex} - currentIndex - ${currentIndex}`} data-CurrentIndex={currentIndex} data-ParentIndex={parentIndex}>
      <NavLink to={`/admin${nav.link}`} onClick={e => handleClick(e, nav)} className={({ isActive }) => `${isActive ? 'link active' : 'link inactive'}`}>
        {nav.title}
      </NavLink>
      {nav.items && nav.items.length > 0 && <ul>{NavigationUtils().makeMenu(nav.items, currentIndex)}</ul>}
    </li>
  );
};
