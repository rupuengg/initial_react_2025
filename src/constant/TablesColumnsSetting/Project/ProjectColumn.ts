import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IProject } from 'entities';
import { E_Renderer_Type } from 'enums';

export function getProjectColumnSetting(anaInfo?: any): (ColDef<IProject> | ColGroupDef<IProject>)[] {
  return [
    {
      field: 'title',
      headerName: 'Title',
      width: 100,
    },
    {
      field: 'startDate',
      headerName: 'Startdate',
      cellDataType: E_Renderer_Type.DATE,
      width: 100,
    },
    {
      field: 'endDate',
      headerName: 'Enddate',
      cellDataType: E_Renderer_Type.DATE,
      width: 100,
    },
    {
      field: 'imageKitGalleryName',
      headerName: 'ImageKit',
    },
    {
      field: 'address.addressOne',
      headerName: 'Address',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IProject> | ColGroupDef<IProject>)[]),
  ];
}
