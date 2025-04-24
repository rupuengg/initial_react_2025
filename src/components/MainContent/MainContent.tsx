import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { E_Board_Type, E_Operation_Permission } from 'enums';
import { IApplicationState } from 'store';
import { AddEditViewForm } from 'components';
import { TableData } from './TableData';

export const MainContent = () => {
  const { selectedNav } = useSelector((state: IApplicationState) => state.global);

  const board = useMemo(() => <h1 className='header1'>Board</h1>, []);

  const table = useMemo(
    () => (
      <Routes>
        <Route index path={`:other/add`} element={<AddEditViewForm type={E_Operation_Permission.ADD} />} />
        <Route index path={`:other/view/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.VIEW} />} />
        <Route index path={`:other/edit/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.EDIT} />} />
        <Route index path={`:other/copy/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.COPY} />} />
        <Route index path={`:other/*`} element={<TableData />} />
      </Routes>
    ),
    []
  );

  if (!selectedNav) return null;

  return (
    <Routes>
      <Route index path={'/'} element={<Navigate to={'/admin/dashboard'} />} />

      {/* Table Data */}
      {selectedNav.type === E_Board_Type.TABLE && <Route path='*' element={table} />}

      {/* Board */}
      {selectedNav.type === E_Board_Type.BOARD && <Route path='*' element={board} />}
    </Routes>
  );
};
