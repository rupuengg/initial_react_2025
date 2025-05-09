import React from 'react';
import { INavigation } from 'entities';
import { NavMenuLink } from 'components';

export const NavigationUtils = () => {
  return {
    makeMenu: (items: INavigation[], parentIndex: number = 0) => {
      return items?.map((item, index) => {
        return React.createElement(NavMenuLink, { key: index, nav: { ...item }, parentIndex: parentIndex, currentIndex: index });
      });
    },
    makeParentNodeActive: (main: Element | null, parentIndex: number) => {
      const cb = (li: Element, pIndex: number) => {
        if (li) {
          li.setAttribute('class', 'active');
          if (pIndex > 0) {
            const main: any = li;
            const cls: string = main ? main?.parentNode?.getAttribute('class') || '' : '';
            if (!cls.includes('sidebar-menu')) {
              const nextLi = main.parentNode.parentNode;
              const index = nextLi.getAttribute('data-parentindex') || 0;
              cb(nextLi, Number(index));
            }
          }
        }
      };
      if (main) {
        document.querySelectorAll('.sidebar-menu li.active').forEach(item => {
          item.removeAttribute('class');
        });
        cb(main, parentIndex);
      }
    },
  };
};
