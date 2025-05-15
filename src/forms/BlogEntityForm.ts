import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';

export const BlogEntityForm: IBaseForm[] = [
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
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.EDITOR,
            fieldName: 'description',
            fieldLabel: 'Description',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.RADIO,
            fieldName: 'isShow',
            fieldLabel: 'Show',
            options: [
              { value: '1', label: 'Yes' },
              { value: '0', label: 'No' },
            ],
          },
        ],
      },
    ],
  },
];
