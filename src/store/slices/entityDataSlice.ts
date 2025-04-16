import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from 'entities';
import { IEntityDataParams, IEntityDataState, defaultDataState, defaultEntityDataState } from 'store/states';
import { deleteData, getDataByKey, getDataList, saveData, updateData } from 'store/thunk';

export const entityDataSlice = createSlice({
  name: 'entityDataSlice',
  initialState: defaultEntityDataState,
  reducers: {
    setDataList(draft: IEntityDataState, action: PayloadAction<IEntityDataParams<CommonEntity>>) {
      if (action.payload.result && Array.isArray(action.payload.result)) {
        draft.items = {
          ...draft.items,
          [action.payload.entrypoint]: { ...defaultDataState, list: [...action.payload.result], isTabularDataActive: true },
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
        const dataIndex = list.findIndex(item => item.id.toString() === action.payload.dataKey);
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
        action.payload.dataKey &&
        !Array.isArray(action.payload.result) &&
        draft.items[action.payload.entrypoint] &&
        action.payload.result &&
        typeof action.payload.result !== 'string'
      ) {
        const list: CommonEntity[] = [...draft.items[action.payload.entrypoint].list];
        const dataIndex = list.findIndex(item => item.id.toString() === action.payload.dataKey);
        if (dataIndex >= 0) {
          draft.items[action.payload.entrypoint].list = [
            ...list.slice(0, dataIndex),
            { ...draft.items[action.payload.entrypoint].list[dataIndex], ...action.payload.result },
            ...list.slice(dataIndex + 1),
          ];
        } else {
          draft.items[action.payload.entrypoint].list = [...list, { ...action.payload.result }];
        }
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
        const dataIndex = list.findIndex(item => item.id.toString() === action.payload.dataKey);
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
