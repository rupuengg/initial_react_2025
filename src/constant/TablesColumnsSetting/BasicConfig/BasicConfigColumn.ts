import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IBasicConfigEntity } from 'entities';

export function getBasicConfigColumnSetting(anaInfo?: any): (ColDef<IBasicConfigEntity> | ColGroupDef<IBasicConfigEntity>)[] {
  return [
    {
      field: 'key',
      headerName: 'Key',
      width: 100,
    },
    {
      field: 'socialMediaLink',
      headerName: 'Social Media Link',
      width: 100,
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IBasicConfigEntity> | ColGroupDef<IBasicConfigEntity>)[]),
  ];
}
