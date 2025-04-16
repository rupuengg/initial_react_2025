import { ActionReducerMapBuilder, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMenuEntity, INavigationEntity, IRecursionInterface } from 'entities';
import { E_Notification_Type } from 'enums';
import { NavigationUtils, isEnvironmentForTesting, textToSpeech } from 'utils';
import { IEnvironmentVariableEntity, IWorkspaceState, defaultWorkspaceState } from 'store/states/Workspace/WorkspaceState';
import { loadEnvironmentVariable, loadWorkspaceMenu } from 'store/thunk';

export const WORKSPACE_SLICE = 'workspaceSlice';

const findPath = (ob: any, key: any, value: any) => {
  const path: any = [];
  const keyExists: any = (obj: any) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
      // eslint-disable-next-line no-prototype-builtins
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      path.pop();
      for (let i = 0; i < obj.length; i++) {
        const result = keyExists(obj[i], key);
        if (result) {
          path.push(obj[i][key]);
          return result;
        }
        path.pop();
      }
    } else {
      for (const k in obj) {
        path.push(k);
        const result = keyExists(obj[k], key);
        if (result) {
          return result;
        }
        path.pop();
      }
    }
    return false;
  };
  keyExists(ob);
  let myPath: any = [];
  myPath = path?.reverse();
  return myPath;
};

export const workspaceSlice = createSlice({
  name: WORKSPACE_SLICE,
  initialState: defaultWorkspaceState,
  reducers: {
    setWorkspaceMenu(draft: IWorkspaceState, action: PayloadAction<IMenuEntity>) {
      draft.generatedMainMenu = new NavigationUtils().getNavigation(action.payload);
    },
    setEnvironmentVariable(draft: IWorkspaceState, action: PayloadAction<IEnvironmentVariableEntity>) {
      draft.environmentVariable = action.payload;
    },
    showCodeLibrary(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showCodeLibrary = action.payload;
    },
    showInventorySearch(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showInventorySearch = action.payload;
    },
    showMovementSearch(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showMovementSearch = action.payload;
    },
    showPARASearch(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showPARASearch = action.payload;
    },
    navigationBarPinned(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.navigationBarPinned = action.payload;
    },
    setEntryPoint(draft: IWorkspaceState, action: PayloadAction<{ path: string; entrypoint: string; sectionId: string | null }>) {
      draft.path = action.payload.path;
      draft.entrypoint = action.payload.entrypoint;
      draft.sectionId = action.payload.sectionId;
      draft.showMainView = true;
    },
    onOpenMFE(draft: IWorkspaceState, action: PayloadAction<{ mfeData?: IRecursionInterface; isConfirmed?: boolean }>) {
      // If current state needs confirmation and not confirmed yet, store data and return
      if (draft.isNeedSwitchConfirmation && !action.payload.isConfirmed) {
        setTimeout(() => {
          document.dispatchEvent(new CustomEvent('workspace-request-open-mfe'));
        }, 200);

        draft.storedOpenMfeData = action.payload.mfeData;
        return;
      }

      // Use different input source based on isConfirmed
      const inputData = action.payload.isConfirmed ? draft.storedOpenMfeData : action.payload.mfeData;
      // Return unchanged state if inputData is missing
      if (!inputData) return;

      // Original logic using inputData
      const { navigation } = { ...draft.generatedMainMenu };
      const path = findPath(navigation, 'title', inputData.title);

      if (isEnvironmentForTesting(draft.environmentVariable)) {
        textToSpeech(`${inputData.title} is opened`);
      }
      const prevRefreshTimeStamp = { ...draft.refreshTimestamp };
      prevRefreshTimeStamp[`${inputData.path}-${inputData.entrypoint}`] = Date.now();

      draft.mfeTitle = inputData.customTitle ? inputData.customTitle : inputData.title;
      draft.mfeSupTitle = path.slice(0, -1);
      draft.mainNavTitle = inputData.mainNavTitle;
      draft.sectionId = inputData.sectionId;
      draft.isMainMenu = inputData.isMainMenu;
      draft.showNavigation = true;
      draft.workspaceDropdown = '';
      draft.entrypoint = inputData.entrypoint;
      draft.path = inputData.path;
      draft.expanded = true;
      draft.showMainView = inputData.entrypoint && inputData.path ? true : false;
      draft.mfeFullscreen = true;
      draft.mfeGraphic = inputData.graphical;
      draft.defaultPageInformation = inputData.defaultPageInformation;
      draft.currentUniqueMenuObjectId = inputData.uniqueMenuObjectId;
      if (inputData.isMainMenu) {
        draft.mfePageInformation = null;
      }
      draft.refreshTimestamp = prevRefreshTimeStamp;
      draft.isNeedSwitchConfirmation = inputData.isNeedSwitchConfirmation;
      draft.storedOpenMfeData = undefined;
    },
    showNotification(draft: IWorkspaceState, action: PayloadAction<{ notificationType: E_Notification_Type; notificationMessage: string }>) {
      (draft.notification.isActiveScreen = false), (draft.notification.isShowNotification = true), (draft.notification.notificationType = action.payload.notificationType), (draft.notification.notificationMessage = action.payload.notificationMessage);
    },
    clearNotification(draft: IWorkspaceState) {
      (draft.notification.isActiveScreen = false), (draft.notification.isShowNotification = false), (draft.notification.notificationType = E_Notification_Type.ALERT), (draft.notification.notificationMessage = '');
    },
    showProfile(draft: IWorkspaceState) {
      draft.showMainView = true;
      draft.entrypoint = 'userProfile';
      draft.path = 'support';
      draft.sectionId = 'profile';
      draft.mfeTitle = 'Accessibility';
      draft.mfeSupTitle = [];
    },
    showUserActivity(draft: IWorkspaceState) {
      draft.showMainView = true;
      draft.entrypoint = 'userActivity';
      draft.path = 'support';
      draft.sectionId = 'activity';
      draft.mfeTitle = 'History';
      draft.mfeSupTitle = [];
    },
    showVersionInformation(draft: IWorkspaceState) {
      draft.showModalForVersionInformation = !draft.showModalForVersionInformation;
    },
    showVersionModalMinimise(draft: IWorkspaceState) {
      draft.showModalForVersionIcon = true;
      draft.showModalForVersionInformation = false;
    },
    showOptions(draft: IWorkspaceState) {
      const syncStatus = localStorage.getItem('showSyncStatus');
      const zoom = localStorage.getItem('showZoom');
      const realTimeUser = localStorage.getItem('showRealTimeUser');

      const statusSync = syncStatus ? Boolean(syncStatus) : false;
      const statusZ = zoom ? Boolean(zoom) : false;
      const realTimeUserStatus = realTimeUser ? Boolean(realTimeUser) : false;

      draft.showSyncStatus = statusSync;
      draft.showZoom = statusZ;
      draft.showRealTimeUser = realTimeUserStatus;
    },
    showOptionByKey(draft: IWorkspaceState, action: PayloadAction<{ key: string; value: boolean }>) {
      if (action.payload.key === 'showSyncStatus') draft.showSyncStatus = action.payload.value;
      if (action.payload.key === 'showZoom') draft.showZoom = action.payload.value;
      if (action.payload.key === 'showRealTimeUser') draft.showRealTimeUser = action.payload.value;
    },
    showModalForVersionIcon(draft: IWorkspaceState) {
      draft.showModalForVersionIcon = false;
      draft.showModalForVersionInformation = true;
    },
    showModalCloseByKey(draft: IWorkspaceState, action: PayloadAction<{ key: string; value: boolean }>) {
      if (action.payload.key === 'showCodeLibrary') draft.showCodeLibrary = false;
      if (action.payload.key === 'showInventorySearch') draft.showInventorySearch = false;
      if (action.payload.key === 'showMovementSearch') draft.showMovementSearch = false;
      if (action.payload.key === 'showPARASearch') draft.showPARASearch = false;
      if (action.payload.key === 'showModalForVersionInformation') draft.showModalForVersionInformation = false;
    },
    updateUnreadMessageCount(draft: IWorkspaceState, action: PayloadAction<string>) {
      draft.unReadMessageCount = action.payload;
    },
    openMFEFromDataManagement(draft: IWorkspaceState, action: PayloadAction<string | undefined>) {
      // = (menuName: string | undefined) => {
      if (action.payload?.toLowerCase() === 'container') {
        draft.showInventorySearch = true;
        return;
      }

      const cb = (nav: INavigationEntity[]): INavigationEntity | undefined => {
        for (let iCounter = 0; iCounter < nav.length; iCounter++) {
          const element = nav[iCounter];

          if (element.title?.toLowerCase() === action.payload?.toLowerCase() && Array.isArray(element.submenu) && element.submenu.length > 0) {
            return element.submenu[0];
          } else if (element.title?.toLowerCase() === action.payload?.toLowerCase()) return element;
          else if (Array.isArray(element.submenu) && element.submenu.length > 0) {
            const val = cb(element.submenu);
            if (val !== undefined) return val;
            else cb(element.submenu);
          } else continue;
        }
      };

      const navigation: INavigationEntity[] | undefined = draft.mainMenu.navigation;
      const currentNav: INavigationEntity | undefined = navigation ? cb(navigation) : undefined;
      const path = currentNav ? findPath(navigation, 'title', currentNav.title) : undefined;

      if (currentNav) {
        draft.entrypoint = currentNav.entrypoint;
        draft.path = currentNav.path;
        draft.sectionId = currentNav.sectionId;

        draft.mfeTitle = currentNav.title;
        draft.mfeSupTitle = path.slice(0, -1);
        draft.mainNavTitle = [];
        draft.isMainMenu = true;
        draft.expanded = true;
        draft.showMainView = currentNav.entrypoint && currentNav.path ? true : false;
        draft.mfeFullscreen = true;
        draft.mfeGraphic = currentNav.graphical;
        draft.defaultPageInformation = currentNav.defaultPageInformation;
        draft.currentUniqueMenuObjectId = currentNav.uniqueMenuObjectId;
        draft.mfePageInformation = null;
      }
    },
    showLiveChat(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showLiveChat = action.payload;
    },
    hideLiveChat(draft: IWorkspaceState, action: PayloadAction<boolean>) {
      draft.showLiveChat = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IWorkspaceState>) => {
    builder.addCase(loadWorkspaceMenu.fulfilled, (draft: IWorkspaceState, action: PayloadAction<IMenuEntity>) => {
      workspaceSlice.caseReducers.setWorkspaceMenu(draft, action);
    });
    builder.addCase(loadEnvironmentVariable.fulfilled, (draft: IWorkspaceState, action: PayloadAction<IEnvironmentVariableEntity>) => {
      workspaceSlice.caseReducers.setEnvironmentVariable(draft, action);
    });
    // .addCase(getLiveUsersByBU.fulfilled, (draft: ILiveUserState, action: PayloadAction<LiveUserEntity[]>) => {
    //   workspaceSlice.caseReducers.setAllLiveUsers(draft, action);
    // })
    // .addCase(updateLiveUser.fulfilled, (draft: ILiveUserState, action: PayloadAction<LiveUserEntity>) => {
    //   workspaceSlice.caseReducers.updateLiveUsers(draft, action);
    // })
    // .addCase(updateLiveUserActivePage.fulfilled, (draft: ILiveUserState, action: PayloadAction<LiveUserEntity>) => {
    //   workspaceSlice.caseReducers.updateLiveActivePageUsers(draft, action);
    // })
    // .addCase(clearLiveUserActivePage.fulfilled, (draft: ILiveUserState, action: PayloadAction<LiveUserEntity>) => {
    //   workspaceSlice.caseReducers.clearLiveActivePageUsers(draft, action);
    // })
    // .addCase(deleteLiveUser.fulfilled, (draft: ILiveUserState, action: PayloadAction<LiveUserEntity>) => {
    //   workspaceSlice.caseReducers.removeLiveUsers(draft, { type: action.type, payload: { user: action.payload } });
    // })
    // .addCase(getAllLiveUserByCurrentUser.fulfilled, (draft: ILiveUserState, action: PayloadAction<{ liveUserChat: LiveUserChatEntity[]; email: string }>) => {
    //   workspaceSlice.caseReducers.setLiveUserChatForCurrentUser(draft, action);
    // })
    // .addCase(getAllByUserMessages.fulfilled, (draft: ILiveUserState, action: PayloadAction<{ liveUserChat: PagingResponseEntity<LiveUserChatMessage[]>; fromUser: string; toUser: string }>) => {
    //   workspaceSlice.caseReducers.setLiveUserChatMessages(draft, action);
    // })
    // .addCase(sendLiveUserChat.fulfilled, (draft: ILiveUserState, action: PayloadAction<{ chat: LiveUserChatMessage; email: string }>) => {
    //   workspaceSlice.caseReducers.setChatMessage(draft, action);
    // })
    // .addCase(openLiveUserChat.fulfilled, (draft: ILiveUserState, action: PayloadAction<{ liveUserChat: LiveUserChatEntity | undefined; email: string }>) => {
    //   workspaceSlice.caseReducers.updateLiveUserChat(draft, action);
    // });
  },
});

export const WorkspaceActions = workspaceSlice.actions;
export const workspaceReducer = workspaceSlice.reducer;
