import { defaultEntityStatusDataEntity } from 'mock';
import { IPageMapper, NoMatch, pageMapper } from 'pages';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IEntityStatusDataEntity, INavigation } from 'entities';
import { E_Data_Load_Status } from 'enums';
import { DataApiPath, IApplicationState, IUseDispatch, getMainNavination, useAppDispatch } from 'store';
import { Login, PrivateRoute } from 'components';

export const MainNavigation = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);

  const homeRoute = useMemo(() => {
    return navigation.find(nav => nav.page?.toString().toLowerCase().trim() === 'home')?.route;
  }, [navigation]);

  useEffect(() => {
    if (startRef.current.mainNavigation === E_Data_Load_Status.PENDING) {
      startRef.current = { ...startRef.current, mainNavigation: E_Data_Load_Status.FULFULLED };
    }
    if (startRef.current.mainNavigation === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, mainNavigation: E_Data_Load_Status.PENDING };
      dispatch(getMainNavination(DataApiPath.mainNavigation.toString()));
    }
  }, [dispatch]);

  const renderComp = useCallback((nav: INavigation) => {
    if (nav.page && pageMapper[nav.page as keyof IPageMapper]) return pageMapper[nav.page as keyof IPageMapper];
    return null;
  }, []);

  if (!homeRoute) return null;

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={homeRoute} replace />} />
        {navigation.map((nav: INavigation) => (
          <Route key={nav.route} path={nav.route} element={renderComp(nav)} />
        ))}
        <Route key='login' path={'/admin/login'} element={<Login />} />
        <Route path={'/admin/*'} element={<PrivateRoute />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
};
