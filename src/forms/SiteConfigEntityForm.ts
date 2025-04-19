import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';

export const SiteConfigEntityForm: IBaseForm = {
  type: E_Form_Type.COLUMN,
  key: 'column1',
  rows: [
    {
      type: E_Form_Type.ROW,
      key: 'row1',
      fields: [
        {
          type: E_Form_Type.FIELD,
          key: 'quayCraneNo',
          fieldType: E_FieldType.TEXT,
          fieldName: 'quayCraneNo',
          fieldLabel: 'Quay Crane',
        },
        {
          type: E_Form_Type.FIELD,
          key: 'berthingTml',
          fieldType: E_FieldType.TEXT,
          fieldName: 'berthingTml',
          fieldLabel: 'Berth Terminal',
        },
      ],
    },
  ],
};
