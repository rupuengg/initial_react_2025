import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
// import { ANAInfoModel } from 'module/Ana';
import { ISiteConfigEntity } from 'entities';
// import { E_Renderer_Type } from 'enums';
import { numberComparator } from 'utils';

// import { qcmaintenanceRadioOption } from './QuayCraneForm';

export function getSiteConfigColumnSetting(anaInfo?: any): (ColDef<ISiteConfigEntity> | ColGroupDef<ISiteConfigEntity>)[] {
  return [
    {
      field: 'id',
      headerName: 'Id',
      width: 106,
    },
    {
      field: 'route',
      headerName: 'Route.',
      pinned: 'left',
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      // dataType: 'number',
      comparator: numberComparator,
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
    ...(getCommonColumnSetting(anaInfo) as (ColDef<ISiteConfigEntity> | ColGroupDef<ISiteConfigEntity>)[]),
  ];
}
