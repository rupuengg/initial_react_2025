import { ColDef, ColGroupDef } from 'ag-grid-community';
// import { ANAInfoModel } from 'module/Ana';
import { CommonEntity } from 'entities';
import { E_Renderer_Type } from 'enums';

function getActionButtonColumnSetting(anaInfo?: any): ColDef<CommonEntity> | ColGroupDef<CommonEntity> {
  return {
    // field: '',
    colId: 'action-button',
    headerName: '',
    suppressFiltersToolPanel: true,
    suppressHeaderMenuButton: true,
    cellDataType: E_Renderer_Type.ACTION,
    suppressHeaderFilterButton: true,
    columnChooserParams: {
      suppressColumnFilter: true,
    },
    suppressHeaderContextMenu: true,
    sortable: false,
    maxWidth: 55,
    resizable: false,
    suppressMovable: true,
    hide: anaInfo && !anaInfo.allowDelete,
    pinned: 'right',

    // field: 'DeleteItem',
    // lockPinned: true,
    // suppressHeaderMenuButton: true,
    // suppressAutoSize: true,
    // columnChooserParams: {
    //   suppressColumnFilter: true,
    // },
    // headerName: ' ',
    // sortable: false,
    // width: 55,
    // resizable: false,
    // suppressMovable: true,
    // lockPosition: 'right',
    // lockVisible: true,
    // suppressColumnsToolPanel: true,
    // cellDataType: E_Renderer_Type.ACTION,
    // hide: anaInfo && !anaInfo.allowDelete,
  };
}

export function getCommonColumnSetting(anaInfo?: any): (ColDef<CommonEntity> | ColGroupDef<CommonEntity>)[] {
  return [getActionButtonColumnSetting(anaInfo)];
}
