import { ColDef, ColGroupDef } from 'ag-grid-community';
import { IBaseForm } from 'forms';
import { Mapper } from 'mapper';
import { useEffect, useRef, useState } from 'react';
import { CommonEntity } from 'entities';
import { ANAInfoModel, EMPTY_ANA_INFO } from 'entities/ANAInfo';
import { IEntityDataParams, defaultEntityDataParams } from 'store';
import { useANAInfo } from './useANAInfo';

export const useTableMapper = (path: string | undefined, entrypoint: string | undefined, sectionId: string | undefined | null) => {
  const mapperRef = useRef<Mapper>();
  const anaInfo = useANAInfo();
  const [mapper, setMapper] = useState<IEntityDataParams<CommonEntity>>(defaultEntityDataParams);
  const [columnSetting, setColumnSetting] = useState<(ColDef<CommonEntity> | ColGroupDef<CommonEntity>)[]>([]);
  const [entityForm, setEntityForm] = useState<IBaseForm | undefined>();
  const [defaultEntity, setDefaultEntity] = useState<CommonEntity | undefined>();

  useEffect(() => {
    if (path && entrypoint && anaInfo.token && anaInfo.allHphPermission) {
      const anaInfoModel: ANAInfoModel = { ...EMPTY_ANA_INFO, currentBu: anaInfo.currentBu, email: anaInfo.email, userName: anaInfo.userName, allHphPermission: anaInfo.allHphPermission };
      mapperRef.current = new Mapper(path, entrypoint, sectionId, anaInfoModel);

      setMapper(mapperRef.current.getEndpointParams() as IEntityDataParams<CommonEntity>);
      setColumnSetting(mapperRef.current.getColumnSetting() as (ColDef<CommonEntity> | ColGroupDef<CommonEntity>)[]);
      setEntityForm(mapperRef.current.getForm());
      setDefaultEntity(mapperRef.current.getDefaultEntity());
    }
  }, [path, entrypoint, sectionId, anaInfo]);

  return { mapper, columnSetting, entityForm, defaultEntity };
};
