import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
// import { ANAInfoModel } from 'module/Ana';
import { IContactInfoEntity } from 'entities';
import { E_Renderer_Type } from 'enums';

// import { E_Renderer_Type } from 'enums';

// import { qcmaintenanceRadioOption } from './QuayCraneForm';

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
      // comparator: numberComparator,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      // comparator: numberComparator,
    },
    {
      field: 'query',
      headerName: 'Query',
      // comparator: numberComparator,
    },
    // {
    //   field: 'maintenance',
    //   headerName: 'Maintenance',
    //   width: 150,
    //   cellRenderer: (params: any) => {
    //     const index = qcmaintenanceRadioOption.findIndex(d => d.key === params.data.maintenance);
    //     return index >= 0 ? params.data.maintenance : 'N';
    //   },
    // },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IContactInfoEntity> | ColGroupDef<IContactInfoEntity>)[]),
  ];
}
