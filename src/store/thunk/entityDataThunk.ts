import { createAsyncThunk } from '@reduxjs/toolkit';
// import { WorkspaceConstant } from 'constant';
import { CommonEntity } from 'entities';
// import { E_Notification_Type } from 'enums';
import { EntityDataApi, IEntityDataParams /*WorkspaceActions*/ } from 'store';

export const domainMapper: { [x: string]: string } = {
  'terminal-model': 'tm',
  'yard-management': 'ym',
  'inventory-management': 'im',
  'control-tower': 'ct',
  raas: 'rs',
};

export const getDataList = createAsyncThunk(`entityDataSlice/getList`, async (dataParams: IEntityDataParams<CommonEntity>) => {
  dataParams.result = await EntityDataApi.get(domainMapper[dataParams.path], dataParams.endpoint);
  return dataParams;
});

export const getDataByKey = createAsyncThunk(`entityDataSlice/getDataByKey`, async (dataParams: IEntityDataParams<CommonEntity>) => {
  if (!dataParams.dataKey) throw new Error('Error while converting');
  dataParams.result = await EntityDataApi.getByKey(domainMapper[dataParams.path], dataParams.endpoint, dataParams.dataKey);
  return dataParams;
});

export const saveData = createAsyncThunk(`entityDataSlice/saveData`, async (dataParams: IEntityDataParams<CommonEntity>) => {
  if (!dataParams.data) throw new Error('Error while converting');
  dataParams.result = await EntityDataApi.post(domainMapper[dataParams.path], dataParams.endpoint, dataParams.data);
  if (dataParams.result && dataParams.dataKey && !Array.isArray(dataParams.result) && dataParams.result && typeof dataParams.result !== 'string') {
    // thunkApi.dispatch(
    //   WorkspaceActions.showNotification({
    //     notificationType: E_Notification_Type.SUCCESS,
    //     notificationMessage: WorkspaceConstant.COMMON_NOTIFICATION_MESSAGE.CREATED.replace('{title}', dataParams.dataKey),
    //   })
    // );
  }
  return dataParams;
});

export const updateData = createAsyncThunk(`entityDataSlice/updateData`, async (dataParams: IEntityDataParams<CommonEntity>) => {
  if (!dataParams.data) throw new Error('Error while converting');
  dataParams.result = await EntityDataApi.put(domainMapper[dataParams.path], dataParams.endpoint, dataParams.data);
  if (dataParams.result && dataParams.dataKey && !Array.isArray(dataParams.result) && dataParams.result && typeof dataParams.result !== 'string') {
    // thunkApi.dispatch(
    //   WorkspaceActions.showNotification({
    //     notificationType: E_Notification_Type.SUCCESS,
    //     notificationMessage: WorkspaceConstant.COMMON_NOTIFICATION_MESSAGE.UPDATED.replace('{title}', dataParams.dataKey),
    //   })
    // );
  }
  return dataParams;
});

export const deleteData = createAsyncThunk(`entityDataSlice/deleteData`, async (dataParams: IEntityDataParams<CommonEntity>) => {
  if (!dataParams.dataKey) throw new Error('Error while converting');
  dataParams.result = await EntityDataApi.delete(domainMapper[dataParams.path], dataParams.endpoint, dataParams.dataKey);
  if (dataParams.result && dataParams.dataKey && !Array.isArray(dataParams.result) && dataParams.result && typeof dataParams.result === 'string') {
    // thunkApi.dispatch(
    //   WorkspaceActions.showNotification({
    //     notificationType: E_Notification_Type.SUCCESS,
    //     notificationMessage: WorkspaceConstant.COMMON_NOTIFICATION_MESSAGE.DELETED.replace('{title}', dataParams.dataKey),
    //   })
    // );
  }
  return dataParams;
});
