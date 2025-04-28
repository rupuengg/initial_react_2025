import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IJobSeekerEntity } from 'entities/JobSeekerEntity';

export function getJobSeekerColumnSetting(anaInfo?: any): (ColDef<IJobSeekerEntity> | ColGroupDef<IJobSeekerEntity>)[] {
  return [
    {
      field: 'firstName',
      headerName: 'Firstname.',
    },
    {
      field: 'lastName',
      headerName: 'Lastname.',
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'phone',
      headerName: 'Phone',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IJobSeekerEntity> | ColGroupDef<IJobSeekerEntity>)[]),
  ];
}
