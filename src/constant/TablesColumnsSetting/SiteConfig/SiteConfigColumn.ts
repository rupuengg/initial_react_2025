import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { ISiteConfigEntity } from 'entities';

export function getSiteConfigColumnSetting(anaInfo?: any): (ColDef<ISiteConfigEntity> | ColGroupDef<ISiteConfigEntity>)[] {
  return [
    {
      field: 'route',
      headerName: 'Route.',
      pinned: 'left',
    },
    {
      field: 'title',
      headerName: 'Title',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<ISiteConfigEntity> | ColGroupDef<ISiteConfigEntity>)[]),
  ];
}
