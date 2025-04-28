import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IContactInfoEntity } from 'entities';
import { E_Renderer_Type } from 'enums';

export function getContactInfoColumnSetting(anaInfo?: any): (ColDef<IContactInfoEntity> | ColGroupDef<IContactInfoEntity>)[] {
  return [
    {
      field: 'isRead',
      headerName: 'Is Read',
      cellDataType: E_Renderer_Type.MESSAGE_READ,
      maxWidth: 100,
    },
    {
      field: 'name',
      headerName: 'Name.',
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'phone',
      headerName: 'Phone',
    },
    {
      field: 'query',
      headerName: 'Query',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IContactInfoEntity> | ColGroupDef<IContactInfoEntity>)[]),
  ];
}
