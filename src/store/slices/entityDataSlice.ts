import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from 'entities';
import { E_Data_Save_Status } from 'enums';
import { IEntityDataParams, IEntityDataState, IOptions, defaultDataState, defaultEntityDataState } from 'store/states';
import { deleteData, getDataByKey, getDataList, saveData, updateData } from 'store/thunk';

export const entityDataSlice = createSlice({
  name: 'entityDataSlice',
  initialState: defaultEntityDataState,
  reducers: {
    loadingStart(draft: IEntityDataState, action: PayloadAction<string>) {
      draft.items = {
        ...draft.items,
        [action.payload]: { ...defaultDataState, isLoading: true },
      };
    },
    loadingEnd(draft: IEntityDataState, action: PayloadAction<string>) {
      draft.items = {
        ...draft.items,
        [action.payload]: { ...defaultDataState, isLoading: false },
      };
    },
    setDataList(draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) {
      if (action.payload.result && Array.isArray(action.payload.result)) {
        draft.items = {
          ...draft.items,
          [action.payload.entrypoint]: { ...defaultDataState, list: [...action.payload.result], isTabularDataActive: true, isLoading: false },
        };
      }
    },
    setDataByKey(draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) {
      if (
        action.payload.result &&
        action.payload.dataKey &&
        !Array.isArray(action.payload.result) &&
        draft.items[action.payload.entrypoint] &&
        action.payload.result &&
        typeof action.payload.result !== 'string'
      ) {
        const list: CommonEntity[] = [...draft.items[action.payload.entrypoint].list];
        const dataIndex = list.findIndex(item => item.id?.toString() === action.payload.dataKey);
        if (dataIndex >= 0) {
          draft.items[action.payload.entrypoint].list = [
            ...list.slice(0, dataIndex),
            { ...draft.items[action.payload.entrypoint].list[dataIndex], ...action.payload.result },
            ...list.slice(dataIndex + 1),
          ];
        }
      }
    },
    addOrUpdateData(draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) {
      if (
        action.payload.result &&
        // action.payload.dataKey &&
        !Array.isArray(action.payload.result) &&
        draft.items[action.payload.entrypoint] &&
        action.payload.result &&
        typeof action.payload.result !== 'string'
      ) {
        const list: CommonEntity[] = [...draft.items[action.payload.entrypoint].list];
        const dataIndex = list.findIndex(item => item.id?.toString() === action.payload.data?.id?.toString());
        if (dataIndex >= 0) {
          draft.items[action.payload.entrypoint].list = [
            ...list.slice(0, dataIndex),
            { ...draft.items[action.payload.entrypoint].list[dataIndex], ...action.payload.result },
            ...list.slice(dataIndex + 1),
          ];
        } else {
          draft.items[action.payload.entrypoint].list = [...list, { ...action.payload.result }];
        }
        draft.items[action.payload.entrypoint].dataSaveStatus = { dataSaveStatus: E_Data_Save_Status.SAVE_DONE, error: undefined };
      }
    },
    deleteData(draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) {
      if (
        action.payload.result &&
        action.payload.dataKey &&
        !Array.isArray(action.payload.result) &&
        draft.items[action.payload.entrypoint] &&
        action.payload.result &&
        typeof action.payload.result === 'string'
      ) {
        const list: CommonEntity[] = [...draft.items[action.payload.entrypoint].list];
        const dataIndex = list.findIndex(item => item.id?.toString() === action.payload.dataKey);
        if (dataIndex >= 0) {
          draft.items[action.payload.entrypoint].list = [...list.slice(0, dataIndex), ...list.slice(dataIndex + 1)];
        }
      }
    },
    updateLastRowId(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string; dataKey: string }>) {
      if (action.payload.dataKey && draft.items[action.payload.entrypoint]) {
        draft.items[action.payload.entrypoint].lastEditRowId = action.payload.dataKey;
      }
    },
    dataSaveStatusStart(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string | undefined }>) {
      if (action.payload.entrypoint) draft.items[action.payload.entrypoint].dataSaveStatus = { dataSaveStatus: E_Data_Save_Status.SAVE_INITIALIZE };
    },
    dataSaveStatusDone(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string | undefined }>) {
      if (action.payload.entrypoint) draft.items[action.payload.entrypoint].dataSaveStatus = { dataSaveStatus: E_Data_Save_Status.SAVE_DONE };
    },
    dataSaveStatusError(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string | undefined; error: string }>) {
      if (action.payload.entrypoint) draft.items[action.payload.entrypoint].dataSaveStatus = { dataSaveStatus: E_Data_Save_Status.SAVE_ERROR, error: action.payload.error };
    },
    dataSaveStatusReset(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string | undefined }>) {
      if (action.payload.entrypoint) draft.items[action.payload.entrypoint].dataSaveStatus = undefined;
    },
    setDropDownOptions(draft: IEntityDataState, action: PayloadAction<{ entrypoint: string | undefined; fieldName: string; options: IOptions[] }>) {
      if (action.payload.entrypoint && !draft.items[action.payload.entrypoint]) {
        draft.items = {
          ...draft.items,
          [action.payload.entrypoint]: { ...defaultDataState },
        };
      }

      if (action.payload.entrypoint) {
        draft.items[action.payload.entrypoint].dp = {
          ...draft.items[action.payload.entrypoint].dp,
          [action.payload.fieldName]: action.payload.options,
        };
      }
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IEntityDataState>) => {
    builder.addCase(getDataList.fulfilled, (draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) => {
      entityDataSlice.caseReducers.setDataList(draft, action);
    });
    builder.addCase(getDataByKey.fulfilled, (draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) => {
      entityDataSlice.caseReducers.setDataByKey(draft, action);
    });
    builder.addCase(saveData.fulfilled, (draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) => {
      entityDataSlice.caseReducers.addOrUpdateData(draft, action);
    });
    builder.addCase(updateData.fulfilled, (draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) => {
      entityDataSlice.caseReducers.addOrUpdateData(draft, action);
    });
    builder.addCase(deleteData.fulfilled, (draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) => {
      entityDataSlice.caseReducers.deleteData(draft, action);
    });
  },
});

export const EntityDataActions = entityDataSlice.actions;
export const entityDataReducer = entityDataSlice.reducer;
