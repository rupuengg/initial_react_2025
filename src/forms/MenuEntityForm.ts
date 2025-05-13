import { E_Board_Type, E_FieldType, E_Form_Type, E_Menu_Type, E_Page_Mappper } from 'enums';
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
            fieldName: 'route',
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
            fieldName: 'menuType',
            fieldLabel: 'Menu Type',
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
            fieldType: E_FieldType.DROPDOWN_ONE_SELECT,
            fieldName: 'page',
            fieldLabel: 'Page',
            options: EnumUtils()
              .enum2Obj(E_Page_Mappper)
              .map(item => ({ value: item.id, label: item.name }) as IOptions),
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.RADIO,
            fieldName: 'isParent',
            fieldLabel: 'Parent Menu',
            options: [
              { value: '1', label: 'Yes' },
              { value: '0', label: 'No' },
            ],
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.LEFT_TO_RIGHT,
            fieldName: 'items',
            fieldLabel: 'Submenus',
            optionConfig: { api: 'menus', fieldMapper: { value: 'id', label: 'title' }, filter: (item: any) => Number(item.isParent) !== 1 },
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
