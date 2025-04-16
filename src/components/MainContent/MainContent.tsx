import { Route, Routes } from 'react-router-dom';
import { E_Operation_Permission } from 'enums';
import { AddEditViewForm } from 'components';
import { TableData } from './TableData';

export const MainContent = () => {
  return (
    <>
      {/* {loader && <Loader Indicator='Stripe' size='Large' />} */}
      <div className='mfe-div-container' style={{ width: '100%', height: '100%', overflow: 'auto' }}>
        <Routes>
          <Route index path={`berthMaintenance/:berthId/*`} element={<h1>Microfrontend</h1>} />
          <Route index path={`BuildMap/*`} element={<h1>Microfrontend</h1>} />
          <Route index path={`:entity/:other/add`} element={<AddEditViewForm type={E_Operation_Permission.ADD} />} />
          <Route index path={`:entity/:other/view/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.VIEW} />} />
          <Route index path={`:entity/:other/edit/:dataId`} element={<AddEditViewForm type={E_Operation_Permission.EDIT} />} />
          <Route index path={`:entity/:other/*`} element={<TableData />} />
        </Routes>
      </div>
    </>
  );
};
