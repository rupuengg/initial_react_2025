import {
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GetRowIdParams,
  GridReadyEvent,
  ICellRendererParams,
  ModuleRegistry,
  RowClickedEvent,
  RowDoubleClickedEvent,
  ValidationModule,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CommonEntity } from 'entities';
import { E_Renderer_Type } from 'enums';
import { CellRemdererComponent } from './CellRemdererComponent';

ModuleRegistry.registerModules([ClientSideRowModelModule, ValidationModule /* Development Only */]);

provideGlobalGridOptions({ theme: 'legacy' });

export interface IAgTable<AgGridEntity> {
  header: JSX.Element;
  refreshData?: AgGridEntity[];
  columnDefs: (ColDef<AgGridEntity> | ColGroupDef<AgGridEntity>)[] | null;
  onRowClick?: (data: AgGridEntity) => void;
  onRowDoubleClick?: (e: any, data: AgGridEntity) => void;
  onActionButtonClick?: (data: CommonEntity, type: any) => void;
  isDownloadAsCsv?: boolean;
}

export const AgTable = <AgGridEntity,>({ header, refreshData, columnDefs, onRowClick, onRowDoubleClick, onActionButtonClick, isDownloadAsCsv }: IAgTable<AgGridEntity>) => {
  const [data] = useState<AgGridEntity[] | undefined>(refreshData);
  const gridRef = useRef<AgGridReact<AgGridEntity>>(null);
  const columnBodyTemplate = useCallback(
    (params: ICellRendererParams<CommonEntity>) => {
      const column: any = params.colDef;

      if (column.field === 'actionButtons') return <div className='actionIcons'>{params.value}</div>;
      else if (params.colDef?.cellDataType === E_Renderer_Type.ACTION)
        return <CellRemdererComponent params={params} onClick={(params: ICellRendererParams, type: any) => onActionButtonClick && onActionButtonClick(params.data, type)} />;
      else return <CellRemdererComponent params={params} />;
    },
    [onActionButtonClick]
  );

  const defaultColDef: ColDef<AgGridEntity> = {
    autoHeaderHeight: true,
    flex: 1,
    minWidth: 150,
    // filter: 'agSetColumnFilter',
    cellRenderer: columnBodyTemplate,
    suppressHeaderMenuButton: false,
    suppressHeaderContextMenu: false,
    // enableValue: true,
    // enableRowGroup: true,
    // enablePivot: true,
    // suppressColumnsToolPanel: true,
    // cellDataType: false,
  };

  const autoGroupColumnDef = useMemo<ColDef>(() => {
    return {
      minWidth: 200,
      pinned: 'left',
    };
  }, []);

  const newColumnDefs = useMemo(() => {
    return columnDefs
      ? columnDefs.map(c => ({
          ...c,
          // chartDataType: c.chartDataType ? c.chartDataType : "series",
        }))
      : [];
  }, [columnDefs]);

  useEffect(() => {
    if (gridRef.current) {
      const div = document.querySelector('#direct-Grid-Div');
      if (div) div.children[0].setAttribute('class', div.children[0].getAttribute('class') + ' ag-theme-apline');
    }
  }, []);

  const onGridReady = useCallback((params: GridReadyEvent) => {
    console.log('params', params);
    // if (params.api.getToolPanelInstance('filters')) {
    //   params.api.getToolPanelInstance('filters')!.expandFilters();
    //   params.api!.getToolPanelInstance('filters')!.collapseFilterGroups();
    // }
  }, []);

  const getRowId = useCallback((params: GetRowIdParams) => String(params.data.key), []);

  useEffect(() => {
    if (gridRef.current && gridRef.current.api) gridRef.current.api.updateGridOptions({ rowData: refreshData });
  }, [refreshData]);

  useEffect(() => {
    if (gridRef.current && isDownloadAsCsv) {
      gridRef.current.api.exportDataAsCsv();
    }
  }, [isDownloadAsCsv]);

  return (
    <div style={{ width: '100%', height: 'calc(100% - 20px)', paddingRight: '20px' }} className='agTableReact'>
      {header}
      <div id='direct-Grid-Div' style={{ height: 'calc(100% - 70px)', width: '100%' }}>
        <AgGridReact
          ref={gridRef}
          className='ag-theme-alpine'
          columnDefs={newColumnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          rowData={data}
          // pivotMode={false}
          getRowId={getRowId}
          // rowSelection={{ mode: "singleRow", checkboxes: false, enableClickSelection: true }}
          // getRowClass={(params: RowClassParams<AgGridEntity>) => {
          // if (!params.data) return;

          // if (params.api.getFocusedCell()?.rowIndex && params.rowIndex === params.api.getFocusedCell()?.rowIndex) {
          //   return "edited-row";
          // }

          //   // if (params.data.flag_edit && params.data.flag_edit === true) {
          //   //   return "edited-row";
          //   // }
          //   // if (params.data.flag_disabled && params.data.flag_disabled === true) {
          //   //   return "disabled-row";
          //   // }
          // }}
          onRowClicked={(e: RowClickedEvent<AgGridEntity>) => {
            if (!e.api.isPivotMode() && e.data && onRowClick) onRowClick(e.data);
          }}
          onRowDoubleClicked={(e: RowDoubleClickedEvent<AgGridEntity>) => {
            if (!e.api.isPivotMode() && e.data && onRowDoubleClick) onRowDoubleClick(e, e.data);
          }}
          // sideBar={"columns"}
          // sideBar={{
          //   toolPanels: [
          //     {
          //       id: 'columns',
          //       labelDefault: 'Columns',
          //       labelKey: 'columns',
          //       iconKey: 'columns',
          //       toolPanel: 'agColumnsToolPanel',
          //       toolPanelParams: {
          //         // suppressRowGroups: false,
          //         suppressValues: false,
          //         suppressPivotMode: false,
          //         suppressColumnFilter: false,
          //         suppressColumnSelectAll: true,
          //         suppressColumnExpandAll: true,
          //       },
          //     },
          //     {
          //       id: 'filters',
          //       labelDefault: 'Filters',
          //       labelKey: 'filters',
          //       iconKey: 'filter',
          //       toolPanel: 'agFiltersToolPanel',
          //       toolPanelParams: {
          //         suppressExpandAll: true,
          //         suppressFilterSearch: true,
          //       },
          //     },
          //   ],
          //   hiddenByDefault: false,
          // }}
          // pivotPanelShow={'always'}
          // cellSelection={true}
          // enableCharts={true}
          onGridReady={onGridReady}
          maintainColumnOrder={true}
          suppressScrollOnNewData={false}
          suppressRowHoverHighlight={false}
          // rowBuffer={100000}
          suppressContextMenu={false}
          // onColumnVisible={(e: ColumnVisibleEvent<AgGridEntity>) => {
          //   debugger;
          //   // if (e.api.isPivotMode()) {
          //   // e.api.setF
          //   // }
          // }}
          // onColumnPivotChanged={(e: ColumnPivotChangedEvent<AgGridEntity>) => {
          //   debugger;
          //   // if (e.api.isPivotMode()) {
          //   // e.api.setF
          //   // }
          // }}
          // onColumnValueChanged={(e: ColumnValueChangedEvent<AgGridEntity>) => {
          //   debugger;
          //   // e.api.setColumnAggFunc(e.column?.getColId(), 'agTextColumnFilter')
          // }}
          // onColumnPivotModeChanged={(e: ColumnPivotModeChangedEvent<AgGridEntity>) => {
          //   debugger;
          // }}
          // onFilterOpened={(e: FilterOpenedEvent<AgGridEntity>) => {
          //   // debugger;
          // }}
          // onFilterModified={(e: FilterModifiedEvent<AgGridEntity>) => {
          //   debugger;
          // }}
        />
      </div>
    </div>
  );
};
