import { E_Board_Type, E_FieldType, E_Form_Type } from 'enums';
import { EnumUtils } from 'utils';
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
              .map(item => ({ key: item.id, value: item.name })),
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.DROPDOWN_ONE_SELECT,
            fieldName: 'items',
            fieldLabel: 'Submenus',
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
