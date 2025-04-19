import { INavigation } from 'models';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import { useEntrypoint } from 'hooks';
import { UrlUtils, encryption } from 'utils';
import { GlobalActions, IApplicationState, IUseDispatch, useAppDispatch } from 'store';

export const Sidebar = () => {
  const { sidebarNavigations } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { uriPath, uriEntrypoint, uriSectionId, uriDefaultPageInformation, uriIsMainMenu } = useEntrypoint();

  const whenMfeOpen = useCallback(
    (mfe: INavigation) => {
      dispatch(GlobalActions.onOpenMFE(mfe));
    },
    [dispatch]
  );

  useEffect(() => {
    if (uriPath && uriEntrypoint) {
      const isExists = (nav: INavigation) => {
        return nav.path === uriPath && nav.entrypoint === uriEntrypoint && nav.sectionId === uriSectionId;
      };

      const searchMenu = (navigation: INavigation[]): INavigation | undefined => {
        for (const nav of navigation) {
          // if (nav.type === 'Group' || nav.separator) continue;
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
  }, [sidebarNavigations, uriPath, uriEntrypoint, uriSectionId, uriDefaultPageInformation, uriIsMainMenu, whenMfeOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, nav: INavigation): void => {
      e.preventDefault();
      // searchParams.delete('defaultPageInformation');
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(`admin${nav.link}`, encryption(nav.path + ' ' + nav.entrypoint + ' ' + nav.sectionId)),
        search: `?${searchParams.toString()}`,
      });
    },
    [searchParams, navigate]
  );

  const makeMenu = (items: INavigation[], parentIndex: number = 0) => {
    return items.map((item, index) => (
      <li key={`${parentIndex === 0 ? 'mainMenu-' : 'subMenu'}parentIndex - ${index}`}>
        <NavLink to={`/admin${item.link}`} onClick={e => handleClick(e, item)} className={({ isActive }) => (isActive ? 'link active' : 'link inactive')}>
          {item.title}
        </NavLink>
        {item.items && item.items.length > 0 && <ul>{makeMenu(item.items, index)}</ul>}
      </li>
    ));
  };

  return <ul className='sidebar-menu'>{makeMenu(sidebarNavigations, 0)}</ul>;
};
