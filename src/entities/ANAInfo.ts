import { AllHphPermission } from 'constant/Ana';

export interface ANAInfoModel {
  allHphPermission?: AllHphPermission;
  currentBu: string;
  availableBuList: string[];
  token?: string;
  allowRead: boolean;
  allowUpdate: boolean;
  allowCreate: boolean;
  allowDelete: boolean;
  email: string;
  userName: string;
}

export const EMPTY_ANA_INFO: ANAInfoModel = {
  currentBu: '',
  availableBuList: [],
  allowRead: true,
  allowUpdate: true,
  allowCreate: true,
  allowDelete: true,
  email: '',
  userName: '',
};
