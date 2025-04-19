import { Route, Routes } from 'react-router-dom';
import { E_Operation_Permission } from 'enums';
import { AddEditViewForm } from 'components';
import { TableData } from './TableData';

export const MainContent = () => {
  return (
    <Routes>
      <Route index path={`:entity/:other/add`} element={<AddEditViewForm type={E_Operation_Permission.ADD} />} />
      <Route index path={`:entity/:other/view/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.VIEW} />} />
      <Route index path={`:entity/:other/edit/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.EDIT} />} />
      <Route index path={`:entity/:other/*`} element={<TableData />} />
    </Routes>
  );
};
