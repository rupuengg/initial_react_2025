import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export interface IMainNavigation {}

export const MainNavigation: React.FC<IMainNavigation> = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={`/ssd`} replace />} />
        {/* <Route path={`${DataManagementConstants.API_MAIN_ROUTE}/:entity`} element={<Dashboard />} /> */}
        {/* <Route path="/" element={Home} />
        <Route path="/home" element={Home} />
        <Route path="/projects/:id" element={Project} />
        <Route path="/projects" element={Projects} />
        <Route path="/contact" element={Contact} />
        <Route path="*">
          <NoMatch />
        </Route> */}
      </Route>
    </Routes>
  );
};
