import { defaultMenuEntity } from 'mock-values';
import { v4 } from 'uuid';
import { IMenuEntity, INavigationAllEntity, IRecursionInterface } from 'entities';
import { E_Notification_Type } from 'enums';

export interface IVersionInformation {
  appName: string;
  version: string;
}

export interface IEnvironmentVariableEntity {
  env: string;
  version?: IVersionInformation[];
}

export interface INotificationState {
  isShowNotification: boolean;
  notificationType: E_Notification_Type;
  notificationMessage: string;
  isActiveScreen: boolean;
}

export interface IWorkspaceState {
  environmentVariable: IEnvironmentVariableEntity;
  identifier: string;
  entrypoint?: string;
  path?: string;
  sectionId?: string | null;
  showMainView?: boolean;
  mfeTitle?: string;
  mfeSupTitle?: any[];
  mainNavTitle?: string[];
  showNavigation?: boolean;
  expanded?: boolean;
  showNotification?: boolean;
  message?: string;
  background?: string;
  workspaceDropdown?: any;
  counter?: any;
  mainViewWidth?: any;
  dataFromLocal?: any;
  mfeFullscreen?: boolean;
  mfeGraphic?: boolean;
  isMainMenu?: boolean;
  mfePageInformation?: any;
  defaultPageInformation?: any;
  showCodeLibrary?: boolean;
  showInventorySearch?: boolean;
  showMovementSearch?: boolean;
  showPARASearch?: boolean;
  showModalForVersionInformation?: boolean;
  showModalForVersionIcon?: boolean;
  mainMenu: IMenuEntity;
  notification: INotificationState;
  navigationBarPinned: boolean;
  generatedMainMenu: INavigationAllEntity;
  currentUniqueMenuObjectId?: string;
  refreshTimestamp: { [x: string]: number };
  showSyncStatus?: boolean;
  showZoom?: boolean;
  showRealTimeUser?: boolean;
  isNeedSwitchConfirmation?: boolean;
  storedOpenMfeData?: IRecursionInterface;
  unReadMessageCount: string;
  showLiveChat: boolean;
}

export const defaultEnvironmentVariableEntity: IEnvironmentVariableEntity = {
  env: '',
};

export const defaultNotificationState: INotificationState = {
  isShowNotification: false,
  notificationType: E_Notification_Type.SUCCESS,
  notificationMessage: '',
  isActiveScreen: false,
};

export const defaultWorkspaceState: IWorkspaceState = {
  environmentVariable: { ...defaultEnvironmentVariableEntity },
  identifier: v4(),
  entrypoint: '',
  path: '',
  showMainView: false,
  mfeTitle: '',
  mfeSupTitle: [],
  mainNavTitle: [],
  showNavigation: false,
  expanded: true,
  showNotification: false,
  message: '',
  background: '',
  workspaceDropdown: '',
  counter: 0,
  mainViewWidth: 'calc(100% - 62px)',
  dataFromLocal: {},
  mfeFullscreen: false,
  mfeGraphic: false,
  isMainMenu: false,
  mfePageInformation: null,
  defaultPageInformation: null,
  showCodeLibrary: false,
  showInventorySearch: false,
  showMovementSearch: false,
  showPARASearch: false,
  showModalForVersionInformation: false,
  showModalForVersionIcon: false,
  mainMenu: defaultMenuEntity,
  notification: defaultNotificationState,
  navigationBarPinned: true,
  generatedMainMenu: {},
  refreshTimestamp: {},
  unReadMessageCount: '',
  showLiveChat: false,
};
