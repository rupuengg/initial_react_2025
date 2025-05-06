import { defaultEntityStatusDataEntity } from 'mock';
import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { IEntityStatusDataEntity } from 'entities';
import { E_Board_Type, E_Data_Load_Status, E_Operation_Permission } from 'enums';
import { useTableMapper } from 'hooks';
import { IApplicationState, IUseDispatch, getDataList, useAppDispatch } from 'store';
import { AddEditViewForm, Login } from 'components';
import { TableData } from './TableData';

export const MainContent = () => {
  const { global, entityData } = useSelector((state: IApplicationState) => state);
  const dispatch: IUseDispatch = useAppDispatch();
  const { entrypoint, selectedNav } = global;
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);
  const { mapper } = useTableMapper(entrypoint);

  const board = useMemo(() => <h1 className='header1'>Board</h1>, []);

  const table = useMemo(
    () => (
      <Routes>
        <Route index path={`login`} element={<Login />} />
        <Route index path={`:other/add`} element={<AddEditViewForm type={E_Operation_Permission.ADD} />} />
        <Route index path={`:other/view/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.VIEW} />} />
        <Route index path={`:other/edit/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.EDIT} />} />
        <Route index path={`:other/copy/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.COPY} />} />
        <Route index path={`:other/*`} element={<TableData />} />
      </Routes>
    ),
    []
  );

  useEffect(() => {
    if (
      selectedNav &&
      selectedNav.type === E_Board_Type.TABLE &&
      mapper.entrypoint &&
      (!startRef.current || !startRef.current[mapper.entrypoint] || startRef.current[mapper.entrypoint] === E_Data_Load_Status.PENDING) &&
      entityData.items[mapper.entrypoint] &&
      entityData.items[mapper.entrypoint].isTabularDataActive
    ) {
      startRef.current = { ...startRef.current, [mapper.entrypoint]: E_Data_Load_Status.FULFULLED };
    }
    if (mapper.entrypoint && (!startRef.current || !startRef.current[mapper.entrypoint] || startRef.current[mapper.entrypoint] === E_Data_Load_Status.NOT_YET_STARTED)) {
      startRef.current = { ...startRef.current, [mapper.entrypoint]: E_Data_Load_Status.PENDING };
      // Load Data
      if (!entityData.items[mapper.entrypoint] || !entityData.items[mapper.entrypoint].list || entityData.items[mapper.entrypoint].list.length === 0) dispatch(getDataList(mapper));
    }
  }, [mapper.entrypoint, mapper, entityData.items, dispatch]);

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
