import { createAsyncThunk } from '@reduxjs/toolkit';
import { E_Menu_Type } from 'enums';
import { DataApiPath } from 'store/constants';
import { MenuGroupApi } from 'store/services';

export const getMenuGroup = createAsyncThunk(`globalSlice/getMainMenugroupNavination`, async (menuGroupType: E_Menu_Type) => {
  const result = await MenuGroupApi.get(DataApiPath.menuGroupByType.toString().replace('{type}', menuGroupType));
  return { menuGroupType, result };
});
