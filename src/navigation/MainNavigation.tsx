import { About, Contact, Faq, Gallery, Home, NoMatch, Project, ProjectPhoto, Services } from 'pages';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { INavigation } from 'entities';
import { IApplicationState } from 'store';
import { Login, PrivateRoute } from 'components';

export const MainNavigation = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);

  const renderComp = useCallback((nav: INavigation) => {
    switch (nav.link) {
      case '/home_interior_design_in_noida':
        return <Home />;
      case '/about_us':
        return <About />;
      case '/home_interior_services':
        return <Services />;
      case '/project_done_by_us':
        return <Project />;
      case '/project_done_by_us/:id':
        return <ProjectPhoto />;
      case '/all_photos':
        return <Gallery />;
      case '/contact_us':
        return <Contact />;
      case '/faq':
        return <Faq />;
    }
  }, []);

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={`${navigation[0].link}`} replace />} />
        {navigation.map((nav: INavigation) => (
          <Route key={nav.link} path={nav.link} element={renderComp(nav)} />
        ))}
        <Route key='login' path={'/admin/login'} element={<Login />} />
        <Route path={'/admin/*'} element={<PrivateRoute />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
};
