import { getCommonColumnSetting } from '../CommonColumnSetting';
import { ColDef, ColGroupDef } from 'ag-grid-community';
import { INavigation } from 'entities';

export function getMenuColumnSetting(anaInfo?: any): (ColDef<INavigation> | ColGroupDef<INavigation>)[] {
  return [
    {
      field: 'title',
      headerName: 'Title',
    },
    {
      field: 'route',
      headerName: 'Link',
    },
    {
      field: 'page',
      headerName: 'Page',
    },
    {
      field: 'menuType',
      headerName: 'Menu Type',
    },
    {
      field: 'type',
      headerName: 'Board Type',
    },
    {
      field: 'items',
      headerName: 'Submenus',
    },
    {
      field: 'entrypoint',
      headerName: 'Entrypoint',
    },
    ...(getCommonColumnSetting(anaInfo) as (ColDef<INavigation> | ColGroupDef<INavigation>)[]),
  ];
}
