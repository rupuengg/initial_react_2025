import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IUser } from 'entities';

export function getUserColumnSetting(anaInfo?: any): (ColDef<IUser> | ColGroupDef<IUser>)[] {
  return [
    {
      field: 'firstName',
      headerName: 'Firstname',
      width: 100,
    },
    {
      field: 'lastName',
      headerName: 'Lastname',
      width: 100,
    },
    {
      field: 'email',
      headerName: 'Email',
    },
    {
      field: 'username',
      headerName: 'Username',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<IUser> | ColGroupDef<IUser>)[]),
  ];
}
