import { About, Contact, Gallery, Home, NoMatch, Project, ProjectPhoto, Services } from 'pages';
import { Faq } from 'pages/Faq';
import { Navigate, Route, Routes } from 'react-router-dom';

export const MainNavigation = () => {
  return (
    <Routes>
      <Route path='/'>
        <Route index element={<Navigate to={`/home`} replace />} />
        <Route path='/home' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/projects/:id' element={<ProjectPhoto />} />
        <Route path='/projects' element={<Project />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/faq' element={<Faq />} />
        <Route path='*' element={<NoMatch />} />
      </Route>
    </Routes>
  );
};
