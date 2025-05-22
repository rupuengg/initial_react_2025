import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { INavigation } from 'entities';
import { useEntrypoint } from 'hooks';
import { NavigationUtils } from 'utils';
import { GlobalActions, IApplicationState, IUseDispatch, useAppDispatch } from 'store';

export const Sidebar = () => {
  const { adminMenuGroup } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const { uriPath, uriEntrypoint } = useEntrypoint();

  const whenMfeOpen = useCallback(
    (mfe: INavigation) => {
      const main = document.querySelector(`.sidebar-menu li a.active`)?.parentElement;
      if (main) NavigationUtils().makeParentNodeActive(main, Number(main.getAttribute('data-parentindex')));
      dispatch(GlobalActions.onOpenMFE(mfe));
    },
    [dispatch]
  );

  useEffect(() => {
    if (uriPath && uriEntrypoint) {
      const isExists = (nav: INavigation) => {
        return nav.entrypoint === uriEntrypoint || nav.route === '/' + uriEntrypoint;
      };

      const searchMenu = (navigation: INavigation[]): INavigation | undefined => {
        for (const nav of navigation) {
          if (isExists(nav)) return nav;

          if (nav.items) {
            const items = JSON.parse(nav.items);
            if (items.length > 0) {
              const result = searchMenu(items);
              if (result) return result;
            }
          }
        }
      };

      const result = searchMenu(adminMenuGroup?.menus || []);
      if (result) whenMfeOpen({ ...result });
    }
  }, [adminMenuGroup?.menus, uriPath, uriEntrypoint, whenMfeOpen]);

  return <ul className='sidebar-menu'>{NavigationUtils().makeMenu(adminMenuGroup?.menus || [], 0)}</ul>;
};
