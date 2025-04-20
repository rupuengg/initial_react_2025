import { Route, Routes } from 'react-router-dom';
import { E_Operation_Permission } from 'enums';
import { AddEditViewForm } from 'components';
import { TableData } from './TableData';

export const MainContent = () => {
  return (
    <Routes>
      <Route index path={`/add`} element={<AddEditViewForm type={E_Operation_Permission.ADD} />} />
      <Route index path={`/view/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.VIEW} />} />
      <Route index path={`/edit/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.EDIT} />} />
      <Route index path={`/*`} element={<TableData />} />
    </Routes>
  );
};
