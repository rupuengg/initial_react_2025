import React, { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CommonEntity } from 'entities';
import { E_Operation_Permission } from 'enums';
import { useTableMapper } from 'hooks';
import { UrlUtils } from 'utils';
import { IApplicationState, IUseDispatch, deleteData, useAppDispatch } from 'store';
import { AgTable, AgTableHeader } from 'components';

interface ITableData {
  isDataLoading?: boolean;
  onRefresh: () => void;
}

export const TableData: React.FC<ITableData> = ({ isDataLoading, onRefresh }) => {
  const { global, entityData } = useSelector((state: IApplicationState) => state);
  const dispatch: IUseDispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { entrypoint, mfeTitle } = global;
  const [isExport, setIsExport] = useState<boolean>(false);

  const { mapper, columnSetting } = useTableMapper(entrypoint);

  const mockData = useMemo(() => {
    if (entrypoint && entityData.items[entrypoint]) return entityData.items[entrypoint].list;
    return [];
  }, [entrypoint, entityData]);

  const handleAdd = useCallback(() => {
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other, E_Operation_Permission.ADD),
      search: `?${searchParams.toString()}`,
    });
  }, [params, navigate, searchParams]);

  const handleRowClick = useCallback((data: CommonEntity) => {
    console.debug(data);
  }, []);

  const handleRowDoubleClick = useCallback(
    (e: any, data: CommonEntity) => {
      navigate(E_Operation_Permission.VIEW + '/' + data.id?.toString());
      // navigate({
      //   pathname: UrlUtils.makeRouteWidthoutSearch('admin', params.other, E_Operation_Permission.VIEW, data.id.toString()),
      //   search: `?${searchParams.toString()}`,
      // });
    },
    [params, navigate, searchParams]
  );

  const handleActionButton = useCallback(
    (data: CommonEntity, type: any) => {
      if (type === 'delete') dispatch(deleteData({ ...mapper, result: undefined, data: undefined, dataKey: data.id?.toString() }));
      else if (type === 'edit') navigate(E_Operation_Permission.EDIT + '/' + data.id?.toString());
      else if (type === 'copy') navigate(E_Operation_Permission.COPY + '/' + data.id?.toString());
    },
    [mapper, dispatch]
  );

  // if (!entityData.items || !entityData.items[mapper.entrypoint] || (entityData.items[mapper.entrypoint] && !entityData.items[mapper.entrypoint].isTabularDataActive)) return <h1>Loading...</h1>;

  return (
    <AgTable<CommonEntity>
      header={
        <AgTableHeader
          headerLabel={mfeTitle}
          showRefreshIcon={true}
          showDownloadIcon={true}
          showAddIcon={true}
          isRefreshDone={!isDataLoading}
          onAdd={handleAdd}
          onExportCsv={() => {
            setIsExport(true);
            setTimeout(() => setIsExport(false), 0);
          }}
          refreshCallback={onRefresh}
        />
      }
      columnDefs={columnSetting}
      refreshData={mockData}
      isDownloadAsCsv={isExport}
      onRowClick={handleRowClick}
      onRowDoubleClick={handleRowDoubleClick}
      onActionButtonClick={handleActionButton}
    />
  );
};
