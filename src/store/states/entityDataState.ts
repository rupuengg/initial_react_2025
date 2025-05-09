import { Permission } from 'constant/Ana';
import { CommonEntity } from 'entities';
import { E_Data_Save_Status } from 'enums';

export interface IEndpoint {
  list?: string;
  get?: string;
  save?: string;
  update?: string;
  delete?: string;
}

export const defaultEndpoint: IEndpoint = {};

export interface IEntityDataParams<CommonEntity> {
  path: string;
  entrypoint: string;
  sectionId?: string | null;
  permission?: Permission;
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

export interface IOptions {
  value?: string;
  label?: string;
  tagLabel?: string;
}

export interface IDataSaveStatus {
  dataSaveStatus?: E_Data_Save_Status;
  error?: string;
}

export interface IDataState {
  list: CommonEntity[];
  initialForms?: CommonEntity;
  lastEditRowId: string;
  dataSaveStatus?: IDataSaveStatus;

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
  dp: { [x: string]: IOptions[] };
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
