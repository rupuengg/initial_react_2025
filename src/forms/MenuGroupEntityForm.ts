import { E_FieldType, E_Form_Type, E_Menu_Type } from 'enums';
import { EnumUtils } from 'utils';
import { IOptions } from 'store';
import { IBaseForm } from './BaseForm';

export const MenuGroupEntityForm: IBaseForm[] = [
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'menuGroupTitle',
            fieldLabel: 'Title',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.DROPDOWN_ONE_SELECT,
            fieldName: 'menuGroupType',
            fieldLabel: 'Title',
            options: EnumUtils()
              .enum2Obj(E_Menu_Type)
              .map(item => ({ value: item.id, label: item.name }) as IOptions),
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.DROPDOWN_MULTI_SELECT,
            fieldName: 'menus',
            fieldLabel: 'Menus',
            optionConfig: { api: 'menus', fieldMapper: { value: 'id', label: 'title' }, filter: (item: any) => Number(item.isParent) === 1 },
          },
        ],
      },
    ],
  },
];
