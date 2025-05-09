import { E_Board_Type, E_FieldType, E_Form_Type } from 'enums';
import { EnumUtils } from 'utils';
import { IOptions } from 'store';
import { IBaseForm } from './BaseForm';

export const MenuEntityForm: IBaseForm[] = [
  {
    type: E_Form_Type.COLUMN,
    rows: [
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'title',
            fieldLabel: 'Title',
            isRequired: true,
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'link',
            fieldLabel: 'Link',
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
            fieldName: 'type',
            fieldLabel: 'Board Type',
            options: EnumUtils()
              .enum2Obj(E_Board_Type)
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
            fieldName: 'items',
            fieldLabel: 'Submenus',
            optionConfig: { api: 'menus', fieldName: 'items', fieldMapper: { value: 'id', label: 'title' } },
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'entrypoint',
            fieldLabel: 'Entrypoint',
          },
        ],
      },
    ],
  },
  {
    type: E_Form_Type.COLUMN,
  },
  {
    type: E_Form_Type.COLUMN,
  },
];
