import { defaultEntityStatusDataEntity } from 'mock';
import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { IEntityStatusDataEntity, INavigation } from 'entities';
import { E_Data_Load_Status } from 'enums';
import { useEntrypoint } from 'hooks';
import { NavigationUtils } from 'utils';
import { GlobalActions, IApplicationState, IUseDispatch, getSidebarNavination, useAppDispatch } from 'store';

export const Sidebar = () => {
  const { sidebarNavigations } = useSelector((state: IApplicationState) => state.global);
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const dispatch: IUseDispatch = useAppDispatch();
  const { uriPath, uriEntrypoint } = useEntrypoint();

  useEffect(() => {
    if (startRef.current.sidebarNavigation === E_Data_Load_Status.PENDING) {
      startRef.current = { ...startRef.current, sidebarNavigation: E_Data_Load_Status.FULFULLED };
    }
    if (startRef.current.sidebarNavigation === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, sidebarNavigation: E_Data_Load_Status.PENDING };
      dispatch(getSidebarNavination('menus'));
    }
  }, [dispatch]);

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
        return nav.entrypoint === uriEntrypoint || nav.link === '/' + uriEntrypoint;
      };

      const searchMenu = (navigation: INavigation[]): INavigation | undefined => {
        for (const nav of navigation) {
          if (isExists(nav)) return nav;

          if (nav.items && nav.items.length > 0) {
            const result = searchMenu(nav.items);
            if (result) return result;
          }
        }
      };

      const result = searchMenu(sidebarNavigations || []);
      if (result) whenMfeOpen({ ...result });
    }
  }, [sidebarNavigations, uriPath, uriEntrypoint, whenMfeOpen]);

  console.log('sidebarNavigations', sidebarNavigations);
  return <ul className='sidebar-menu'>{NavigationUtils().makeMenu(sidebarNavigations, 0)}</ul>;
};
