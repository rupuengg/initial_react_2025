// import { LicenseManager } from 'ag-charts-enterprise';
import {
  AllCommunityModule,
  ClientSideRowModelModule,
  ColDef,
  ColGroupDef,
  GetRowIdParams,
  // NumberEditorModule,
  // NumberFilterModule,
  // TextEditorModule,
  // TextFilterModule,
  // ColGroupDef,
  // GridApi,
  // GridOptions,
  // SideBarDef,
  // createGrid,
  GridReadyEvent,
  ICellRendererParams,
  ModuleRegistry,
  RowClickedEvent,
  // RowClassParams,
  // ColumnPivotChangedEvent,
  // ColumnValueChangedEvent,
  // FilterOpenedEvent,
  // ColumnVisibleEvent,
  // FilterModifiedEvent,
  // ColumnPivotModeChangedEvent,
  RowDoubleClickedEvent,
  ValidationModule,
  provideGlobalGridOptions,
} from 'ag-grid-community';
import {
  AllEnterpriseModule,
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  // DateFilterModule,
  // IntegratedChartsModule,
  // RowGroupingModule,
  MultiFilterModule,
  PivotModule,
  RowGroupingPanelModule,
  SetFilterModule,
} from 'ag-grid-enterprise';
import 'ag-grid-enterprise/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { CommonEntity } from 'entities';
import { E_Renderer_Type } from 'enums';
import { CellRemdererComponent } from './CellRemdererComponent';

// LicenseManager.setLicenseKey(
//   'Using_this_{AG_Grid}_Enterprise_key_{AG-064264}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{Hongkong_International_Terminals_Limited}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{Veronica}_only_for_{5}_Front-End_JavaScript_developers___All_Front-End_JavaScript_developers_working_on_{Veronica}_need_to_be_licensed___{Veronica}_has_not_been_granted_a_Deployment_License_Add-on___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{17_October_2025}____[v3]_[01]_MTc2MDY1NTYwMDAwMA==75a0d9f52a371edff31804fa0f139dcf'
// );

ModuleRegistry.registerModules([
  AllCommunityModule,
  AllEnterpriseModule,
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  PivotModule,
  FiltersToolPanelModule,
  SetFilterModule,
  RowGroupingPanelModule,
  ValidationModule /* Development Only */,

  MultiFilterModule,
  // SetFilterModule,
  // TextFilterModule,
  // NumberFilterModule,
  // DateFilterModule,

  // IntegratedChartsModule.with(AgChartsEnterpriseModule),

  // NumberEditorModule,
  // TextEditorModule,
  // TextFilterModule,
  // NumberFilterModule,
  // ClientSideRowModelModule,
  // ColumnMenuModule,
  // ContextMenuModule,
  // RowGroupingModule,
]);

// Mark all grids as using legacy themes
provideGlobalGridOptions({ theme: 'legacy' });

export interface IAgTable<AgGridEntity> {
  header: JSX.Element;
  refreshData?: AgGridEntity[];
  columnDefs: (ColDef<AgGridEntity> | ColGroupDef<AgGridEntity>)[] | null;
  onRowClick?: (data: AgGridEntity) => void;
  onRowDoubleClick?: (e: any, data: AgGridEntity) => void;
  onDelete?: (data: CommonEntity) => void;
  isDownloadAsCsv?: boolean;
}

export const AgTable = <AgGridEntity,>({ header, refreshData, columnDefs, onRowClick, onRowDoubleClick, onDelete, isDownloadAsCsv }: IAgTable<AgGridEntity>) => {
  const gridRef = useRef<AgGridReact<AgGridEntity>>(null);
  const columnBodyTemplate = useCallback(
    (params: ICellRendererParams<CommonEntity>) => {
      const column: any = params.colDef;

      if (column.field === 'actionButtons') return <div className='actionIcons'>{params.value}</div>;
      else if (params.colDef?.cellDataType === E_Renderer_Type.ACTION) return <CellRemdererComponent params={params} onClick={(params: ICellRendererParams) => onDelete && onDelete(params.data)} />;
      else return <CellRemdererComponent params={params} />;
    },
    [onDelete]
  );

  const defaultColDef: ColDef<AgGridEntity> = {
    // autoHeaderHeight: true,
    flex: 1,
    minWidth: 150,
    filter: 'agSetColumnFilter',
    cellRenderer: columnBodyTemplate,
    suppressHeaderMenuButton: false,
    suppressHeaderContextMenu: false,
    enableValue: true,
    enableRowGroup: true,
    enablePivot: true,
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
    params.api.getToolPanelInstance('filters')!.expandFilters();
    params.api!.getToolPanelInstance('filters')!.collapseFilterGroups();
  }, []);

  const getRowId = useCallback((params: GetRowIdParams) => String(params.data.key), []);

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
          rowData={refreshData}
          pivotMode={false}
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
          sideBar={{
            toolPanels: [
              {
                id: 'columns',
                labelDefault: 'Columns',
                labelKey: 'columns',
                iconKey: 'columns',
                toolPanel: 'agColumnsToolPanel',
                toolPanelParams: {
                  suppressRowGroups: false,
                  suppressValues: false,
                  suppressPivotMode: false,
                  suppressColumnFilter: false,
                  suppressColumnSelectAll: true,
                  suppressColumnExpandAll: true,
                },
              },
              {
                id: 'filters',
                labelDefault: 'Filters',
                labelKey: 'filters',
                iconKey: 'filter',
                toolPanel: 'agFiltersToolPanel',
                toolPanelParams: {
                  suppressExpandAll: true,
                  suppressFilterSearch: true,
                },
              },
            ],
            hiddenByDefault: false,
          }}
          pivotPanelShow={'always'}
          cellSelection={true}
          enableCharts={true}
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
