import { Contact, Home, NoMatch } from 'pages';
import { Navigate, Route, Routes } from 'react-router-dom';

export const MainNavigation = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={`/home`} replace />} />
        <Route path='/home' element={<Home />} />
        {/* <Route path="/projects/:id" element={Project} /> */}
        {/* <Route path="/projects" element={Projects} /> */}
        <Route path='/contact' element={<Contact />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
