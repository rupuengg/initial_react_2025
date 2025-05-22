import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IBlogEntity } from 'entities';
import { E_Renderer_Type } from 'enums';

export function getBlogColumnSetting(anaInfo?: any): (ColDef<IBlogEntity> | ColGroupDef<IBlogEntity>)[] {
  return [
    {
      field: 'title',
      headerName: 'Title',
      width: 100,
    },
    {
      field: 'route',
      headerName: 'Route',
      width: 100,
    },
    {
      field: 'isShow',
      headerName: 'Show',
      cellDataType: E_Renderer_Type.TICK,
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IBlogEntity> | ColGroupDef<IBlogEntity>)[]),
  ];
}
