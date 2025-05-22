import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IMenuGroupEntity } from 'entities';

export function getMenuGroupColumnSetting(anaInfo?: any): (ColDef<IMenuGroupEntity> | ColGroupDef<IMenuGroupEntity>)[] {
  return [
    {
      field: 'menuGroupTitle',
      headerName: 'Title',
    },
    {
      field: 'menuGroupType',
      headerName: 'Type',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IMenuGroupEntity> | ColGroupDef<IMenuGroupEntity>)[]),
  ];
}
