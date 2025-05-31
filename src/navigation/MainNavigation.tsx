import { defaultEntityStatusDataEntity } from 'mock';
import { CustomBlog, IPageMapper, NoMatch, NotFound, ProjectPhoto, pageMapper } from 'pages';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IEntityStatusDataEntity, INavigation } from 'entities';
import { E_Data_Load_Status, E_Menu_Type } from 'enums';
import { PhotoUtils } from 'utils';
import { IApplicationState, IUseDispatch, getBasicConfig, getMenuGroup, useAppDispatch } from 'store';
import { Login, PrivateRoute, Profile } from 'components';

export const MainNavigation = () => {
  const { mainMenuGroup } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const isAdminBoard = useMemo(() => window.location.href.includes('/admin'), []);

  const allProjects = useMemo(() => {
    return PhotoUtils(undefined).getAllProjects();
  }, []);

  const homeRoute = useMemo(() => {
    return mainMenuGroup?.menus?.find(nav => nav.page?.toString().toLowerCase().trim() === 'home')?.route;
  }, [mainMenuGroup]);

  useEffect(() => {
    if (startRef.current.mainNavigation === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, mainNavigation: E_Data_Load_Status.PENDING };
      dispatch(getMenuGroup(E_Menu_Type.MAIN_MENU));
    }
  }, [isAdminBoard, dispatch]);

  useEffect(() => {
    if (isAdminBoard && startRef.current.sidebarNavigation === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, sidebarNavigation: E_Data_Load_Status.PENDING };
      dispatch(getMenuGroup(E_Menu_Type.ADMIN_MENU));
    }
  }, [isAdminBoard, dispatch]);

  useEffect(() => {
    if (startRef.current.basicConfig === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, basicConfig: E_Data_Load_Status.PENDING };
      dispatch(getBasicConfig());
    }
  }, [isAdminBoard, dispatch]);

  const renderComp = useCallback((nav: INavigation) => {
    if (nav.page && pageMapper[nav.page as keyof IPageMapper]) return pageMapper[nav.page as keyof IPageMapper];
    return null;
  }, []);

  if (!homeRoute && !isAdminBoard) return null;

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={homeRoute || ''} replace />} />
        {mainMenuGroup?.menus?.map((nav: INavigation) => <Route key={nav.route} path={nav.route} element={renderComp(nav)} />)}
        <Route path={'/blog/:id'} element={<CustomBlog isShowSingle={true} />} />
        {allProjects.map(p => (
          <Route key={p} path={'/project_done_by_us/' + p} element={<ProjectPhoto projectId={p} />} />
        ))}
        <Route key='profile' path={'/admin/profile'} element={<Profile />} />
        <Route key='login' path={'/admin/login'} element={<Login />} />
        <Route path={'/admin/*'} element={<PrivateRoute />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
};
