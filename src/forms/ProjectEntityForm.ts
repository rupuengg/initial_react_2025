import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';

export const ProjectEntityForm: IBaseForm[] = [
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
            fieldType: E_FieldType.DATE,
            fieldName: 'startDate',
            fieldLabel: 'Startdate',
            isRequired: true,
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.DATE,
            fieldName: 'endDate',
            fieldLabel: 'Enddate',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'imageKitGalleryName',
            fieldLabel: 'ImageKit',
            isRequired: true,
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.addressOne',
            fieldLabel: 'Address1',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.addressTwo',
            fieldLabel: 'Address2',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.city',
            fieldLabel: 'City',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.state',
            fieldLabel: 'State',
          },
        ],
      },
      {
        type: E_Form_Type.ROW,
        fields: [
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.zipCode',
            fieldLabel: 'ZipCode',
          },
          {
            type: E_Form_Type.FIELD,
            fieldType: E_FieldType.TEXT,
            fieldName: 'address.country',
            fieldLabel: 'Country',
          },
        ],
      },
    ],
  },
];
