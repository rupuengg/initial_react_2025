import { NoMatch } from 'pages';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IApplicationState } from 'store';
import { PrivateRoute } from 'components';

export const MainNavigation = () => {
  const { navigation } = useSelector((state: IApplicationState) => state.global);

  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={`${navigation[0].link}`} replace />} />
        {navigation.map(nav => (
          <Route key={nav.link} path={nav.link} element={nav.element} />
        ))}
        <Route path={'/admin/*'} element={<PrivateRoute />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
      <Route path='*' element={<NoMatch />} />
    </Routes>
  );
};
