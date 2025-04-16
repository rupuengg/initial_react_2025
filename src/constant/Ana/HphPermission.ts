export type AclTypeValue = 'C' | 'R' | 'M' | 'D';

export type AclTypeInterface = {
  [key in 'CREATE' | 'READ' | 'UPDATE' | 'DELETE']: AclTypeValue;
};
export const AclType: AclTypeInterface = {
  CREATE: 'C',
  READ: 'R',
  UPDATE: 'M',
  DELETE: 'D',
};

export type AttributeTypeValue = 'tml';

export type AttributeTypeInterface = {
  [key in 'TERMINAL']: AttributeTypeValue;
};
export const AttributeType: AttributeTypeInterface = {
  TERMINAL: 'tml',
};

export interface HphPermission {
  acl: AclTypeValue[];
  tml: string[];
}

export interface AllHphPermission {
  [key: string]: HphPermission;
}
