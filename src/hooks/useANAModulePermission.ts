import { useEffect, useState } from 'react';
import { AclType, Permission, PermissionName } from 'constant/Ana';
import { ANAInfoModel, EMPTY_ANA_INFO } from 'entities/ANAInfo';
import { isPermissionExist } from 'utils';
import { useANAInfo } from './useANAInfo';

export const useANAModulePermission = (permission?: Permission) => {
  const anaInfo = useANAInfo();
  const [anaInfoPermission, setAnaPermission] = useState<ANAInfoModel>(EMPTY_ANA_INFO);

  useEffect(() => {
    if (anaInfo.allHphPermission && permission) {
      if (permission === Permission.LOGIN) {
        setAnaPermission(prevState => ({
          ...prevState,
          allHphPermission: anaInfo.allHphPermission,
          currentBu: anaInfo.currentBu,
          token: anaInfo.token,
          allowRead: !!anaInfo.token,
          allowUpdate: !!anaInfo.token,
          allowCreate: !!anaInfo.token,
          allowDelete: !!anaInfo.token,
          email: anaInfo.email,
        }));
      } else {
        setAnaPermission(prevState => ({
          ...prevState,
          allHphPermission: anaInfo.allHphPermission,
          currentBu: anaInfo.currentBu,
          token: anaInfo.token,
          allowRead: isPermissionExist(PermissionName[permission], AclType.READ, anaInfo.allHphPermission),
          allowUpdate: isPermissionExist(PermissionName[permission], AclType.UPDATE, anaInfo.allHphPermission),
          allowCreate: isPermissionExist(PermissionName[permission], AclType.CREATE, anaInfo.allHphPermission),
          allowDelete: isPermissionExist(PermissionName[permission], AclType.DELETE, anaInfo.allHphPermission),
          email: anaInfo.email,
        }));
      }
    }
  }, [permission, anaInfo.allHphPermission]);

  return { ...anaInfoPermission };
};
