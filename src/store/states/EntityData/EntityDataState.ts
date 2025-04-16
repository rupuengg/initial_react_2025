import { CommonEntity } from 'entities';

// import { Permission } from 'module/Ana';

export interface IEndpoint {
  list?: string;
  get?: string;
  save?: string;
  update?: string;
  delete?: string;
}

export const defaultEndpoint: IEndpoint = {};

export function getEndpoint(path: string, uri?: string | IEndpoint): IEndpoint {
  const version = path === 'raas' ? '' : '/v1/';
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

export interface IEntityDataParams<CommonEntity> {
  path: string;
  entrypoint: string;
  sectionId?: string | null;
  // permission?: Permission;
  endpoint: IEndpoint;
  dataKey?: string;
  data?: CommonEntity;
  result?: CommonEntity[] | CommonEntity | string;
}

export const defaultEntityDataParams: IEntityDataParams<CommonEntity> = {
  path: '',
  entrypoint: '',
  endpoint: { ...defaultEndpoint },
};

export interface DropdownOptions {
  dropdownLabel?: string;
  value?: string;
  tagLabel?: string | number;
  icon?: string;
  isMaster?: boolean;
  lozengesLabel?: string;
  lozengesVariation?: string;
  showText?: string;
}

export interface IDataState {
  list: CommonEntity[];
  initialForms?: CommonEntity;
  lastEditRowId: string;

  isLoading: boolean;
  isTabularDataActive: boolean;
  isAdd: boolean;
  isRead: boolean;
  isEditable: boolean;
  isSaveClicked: boolean;
  isSliderOpen: boolean;
  isBlockChanged: boolean;

  errorMessage: { [key: string]: string };

  // Dropdown Options
  dp: { [x: string]: DropdownOptions[] };
}

export const defaultDataState: IDataState = {
  list: [],
  lastEditRowId: '',

  isTabularDataActive: false,
  isAdd: false,
  isRead: false,
  isEditable: false,
  isLoading: false,
  isSaveClicked: false,
  isSliderOpen: true,
  isBlockChanged: true,

  errorMessage: {},

  // Dropdown Options
  dp: {},
};

export interface IEntityDataState {
  items: { [x: string]: IDataState };
}

export const defaultEntityDataState: IEntityDataState = {
  items: {},
};
