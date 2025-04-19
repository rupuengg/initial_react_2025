import _ from 'lodash';
import { AclTypeValue, AllHphPermission, AttributeTypeValue } from 'constant/Ana';

export const isPermissionExist = (permissionName: string, acl: AclTypeValue, allHphPermission?: AllHphPermission) => {
  if (!allHphPermission) {
    return false;
  }
  if (_.isEmpty(allHphPermission[permissionName])) {
    return false;
  }
  const isAclExist = allHphPermission[permissionName]?.acl?.includes(acl);
  return !!isAclExist;
};

export const retrievePermissionAttributeList = (permissionName: string, attributeName: AttributeTypeValue, allHphPermission?: AllHphPermission) => {
  if (!allHphPermission) {
    return [];
  }
  if (_.isEmpty(allHphPermission[permissionName])) {
    return [];
  }
  const permissionAttributeList = allHphPermission[permissionName][attributeName];
  return _.uniq(permissionAttributeList);
};
