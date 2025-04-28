import { ColDef, ColGroupDef } from 'ag-grid-community';
import { ContactInfoEntityForm, IBaseForm, SiteConfigEntityForm } from 'forms';
import { defaultContactInfo } from 'mock/defaultContactInfo';
import { defaultSiteConfigEntity } from 'mock/defaultSiteConfigEntity';
import { getContactInfoColumnSetting, getSiteConfigColumnSetting } from 'constant';
import { AclType, Permission, PermissionName } from 'constant/Ana';
import { CommonEntity } from 'entities';
import { ANAInfoModel } from 'entities/ANAInfo';
import { E_Mapping_Data } from 'enums';
import { isPermissionExist } from 'utils';
import { DataApiPath, IEndpoint, defaultEndpoint, defaultEntityDataParams } from 'store';
import { mapFormWithValues } from 'components';

export function getEndpoint(uri?: string | IEndpoint): IEndpoint {
  const version = ''; //path === 'raas' ? '' : '/v1/';
  const endpoint: IEndpoint = { ...defaultEndpoint };

  if (uri && typeof uri === 'string') {
    endpoint.list = version + uri;
    endpoint.get = version + uri;
    endpoint.save = version + uri;
    endpoint.update = version + uri;
    endpoint.delete = version + uri;
  } else if (uri && typeof uri !== 'string') {
    return {
      list: version + uri.list,
      get: version + uri.get,
      save: version + uri.save,
      update: version + uri.update,
      delete: version + uri.delete,
    };
  }

  return endpoint;
}

function getMappingData(mappingData: E_Mapping_Data, entrypoint?: string, anaInfo?: ANAInfoModel): Permission | IBaseForm[] | (ColDef<any> | ColGroupDef<CommonEntity>)[] {
  if (!entrypoint) throw new Error('Please entrypoint');

  const getCondition = (fun_ColumnSetting: any, permission: Permission, frm?: IBaseForm[], defaultEntity?: CommonEntity) => {
    switch (mappingData) {
      case E_Mapping_Data.COLUMN_SETTING:
        return fun_ColumnSetting(anaInfo);
      case E_Mapping_Data.FORM:
        return frm;
      case E_Mapping_Data.PERMISSION:
        return permission;
      case E_Mapping_Data.DEFAULT_ENTITY:
        return defaultEntity;
      default:
    }
  };

  switch (entrypoint) {
    case 'contactInfo':
      return getCondition(getContactInfoColumnSetting, Permission.CHASSIS_TYPE, ContactInfoEntityForm, defaultContactInfo);
    case 'siteConfig':
      return getCondition(getSiteConfigColumnSetting, Permission.CHASSIS_TYPE, SiteConfigEntityForm, defaultSiteConfigEntity);
    default:
      return getCondition(() => [], Permission.LOGIN);
  }
}

export class Mapper {
  // private path?: string;
  private entrypoint?: string;
  // private sectionId?: string | null;
  private endpoint?: string | IEndpoint;
  private permission?: Permission;
  private anaInfo?: ANAInfoModel;
  private form?: IBaseForm[];
  private defaultEntity?: CommonEntity;

  constructor(entrypoint: string, anaInfo?: ANAInfoModel) {
    // this.path = path;
    this.entrypoint = entrypoint;
    // this.sectionId = sectionId;
    this.anaInfo = anaInfo;
  }

  setEndpoint() {
    if (this.entrypoint) this.endpoint = getEndpoint(DataApiPath[this.entrypoint]);
  }

  getPermission() {
    return this.permission;
  }

  setAnaInfoPermission() {
    if (this.anaInfo && this.anaInfo.allHphPermission && this.permission) {
      if (this.permission === Permission.LOGIN) {
        this.anaInfo = {
          ...this.anaInfo,
          allHphPermission: this.anaInfo.allHphPermission,
          currentBu: this.anaInfo.currentBu,
          token: this.anaInfo.token,
          allowRead: !!this.anaInfo.token,
          allowUpdate: !!this.anaInfo.token,
          allowCreate: !!this.anaInfo.token,
          allowDelete: !!this.anaInfo.token,
          email: this.anaInfo.email,
        };
      } else {
        this.anaInfo = {
          ...this.anaInfo,
          allHphPermission: this.anaInfo.allHphPermission,
          currentBu: this.anaInfo.currentBu,
          token: this.anaInfo.token,
          allowRead: isPermissionExist(PermissionName[this.permission], AclType.READ, this.anaInfo.allHphPermission),
          allowUpdate: isPermissionExist(PermissionName[this.permission], AclType.UPDATE, this.anaInfo.allHphPermission),
          allowCreate: isPermissionExist(PermissionName[this.permission], AclType.CREATE, this.anaInfo.allHphPermission),
          allowDelete: isPermissionExist(PermissionName[this.permission], AclType.DELETE, this.anaInfo.allHphPermission),
          email: this.anaInfo.email,
        };
      }
    }
  }

  getEndpointParams() {
    this.setEndpoint();
    this.permission = getMappingData(E_Mapping_Data.PERMISSION, this.entrypoint) as Permission;
    this.defaultEntity = getMappingData(E_Mapping_Data.DEFAULT_ENTITY, this.entrypoint) as unknown as CommonEntity;
    this.form = mapFormWithValues(getMappingData(E_Mapping_Data.FORM, this.entrypoint) as IBaseForm[], this.defaultEntity);
    this.setAnaInfoPermission();

    const { entrypoint, endpoint, permission } = this;

    return {
      ...defaultEntityDataParams,
      entrypoint,
      endpoint,
      permission,
    };
  }

  getColumnSetting() {
    return getMappingData(E_Mapping_Data.COLUMN_SETTING, this.entrypoint, this.anaInfo) as (ColDef<CommonEntity> | ColGroupDef<CommonEntity>)[];
  }

  getForm() {
    return this.form;
  }

  getDefaultEntity() {
    return this.defaultEntity;
  }
}
