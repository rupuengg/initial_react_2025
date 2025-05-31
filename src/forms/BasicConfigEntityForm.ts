import { E_FieldType, E_Form_Type, E_Icon_Name } from 'enums';
import { EnumUtils } from 'utils';
import { IOptions } from 'store';
import { IBaseForm } from './BaseForm';

export const BasicConfigEntityForm: IBaseForm[] = [
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'key',
            fieldLabel: 'Key',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.SOCIAL_MEDIA,
            fieldName: 'socialMediaLink',
            fieldLabel: 'Social Media Links',
            options: EnumUtils()
              .enum2Obj(E_Icon_Name)
              .map(item => ({ value: item.id, label: item.name }) as IOptions),
          },
        ],
      },
    ],
  },
];
