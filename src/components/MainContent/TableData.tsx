import { defaultEntityStatusDataEntity } from 'mock';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CommonEntity, IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status, E_Operation_Permission } from 'enums';
import { useTableMapper } from 'hooks';
import { UrlUtils } from 'utils';
import { IApplicationState, IUseDispatch, deleteData, getDataList, useAppDispatch } from 'store';
import { AgTable, AgTableHeader } from 'components';

export const TableData = () => {
  const { global, entityData } = useSelector((state: IApplicationState) => state);
  const dispatch: IUseDispatch = useAppDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { path, entrypoint, sectionId, mfeTitle } = global;
  const [isExport, setIsExport] = useState<boolean>(false);
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);

  const { mapper, columnSetting } = useTableMapper(path, entrypoint, sectionId);

  const mockData = useMemo(() => {
    if (entrypoint && entityData.items[entrypoint]) return entityData.items[entrypoint].list;
    return [];
  }, [entrypoint, entityData]);

  const handleAdd = useCallback(() => {
    navigate({
      pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other, E_Operation_Permission.ADD),
      search: `?${searchParams.toString()}`,
    });
  }, [params, navigate, searchParams]);

  const handleRowClick = useCallback((data: CommonEntity) => {
    console.log(data);
  }, []);

  const handleRowDoubleClick = useCallback(
    (e: any, data: CommonEntity) => {
      navigate({
        pathname: UrlUtils.makeRouteWidthoutSearch(params.entity, params.other, E_Operation_Permission.VIEW, data.id.toString()),
        search: `?${searchParams.toString()}`,
      });
    },
    [params, navigate, searchParams]
  );

  const handleDelete = useCallback(
    (data: CommonEntity) => {
      dispatch(deleteData({ ...mapper, dataKey: data.id.toString() }));
    },
    [mapper, dispatch]
  );

  useEffect(() => {
    if (
      mapper.entrypoint &&
      (!startRef.current || !startRef.current[mapper.entrypoint] || startRef.current[mapper.entrypoint] === E_Data_Load_Status.PENDING) &&
      entityData.items[mapper.entrypoint] &&
      entityData.items[mapper.entrypoint].isTabularDataActive
    ) {
      startRef.current = { ...startRef.current, [mapper.entrypoint]: E_Data_Load_Status.FULFULLED };
    }
    if (mapper.entrypoint && (!startRef.current || !startRef.current[mapper.entrypoint] || startRef.current[mapper.entrypoint] === E_Data_Load_Status.NOT_YET_STARTED)) {
      startRef.current = { ...startRef.current, [mapper.entrypoint]: E_Data_Load_Status.PENDING };
      // Load Data
      if (!entityData.items[mapper.entrypoint] || !entityData.items[mapper.entrypoint].list || entityData.items[mapper.entrypoint].list.length === 0) dispatch(getDataList(mapper));
    }
  }, [mapper, entityData.items, dispatch]);

  if (!entityData.items || !entityData.items[mapper.entrypoint] || (entityData.items[mapper.entrypoint] && !entityData.items[mapper.entrypoint].isTabularDataActive)) return <h1>Loading...</h1>;

  return (
    <AgTable<CommonEntity>
      header={
        <AgTableHeader
          headerLabel={mfeTitle}
          showDownloadIcon={true}
          showAddIcon={true}
          onAdd={handleAdd}
          onExportCsv={() => {
            setIsExport(true);
            setTimeout(() => setIsExport(false), 0);
          }}
        />
      }
      columnDefs={columnSetting}
      refreshData={mockData}
      isDownloadAsCsv={isExport}
      onRowClick={handleRowClick}
      onRowDoubleClick={handleRowDoubleClick}
      onDelete={handleDelete}
    />
  );
};
