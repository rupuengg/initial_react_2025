import { FieldType } from 'veronica-ui-component/dist/component/core';
import { E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';

export const QuayCraneEntityForm: IBaseForm = {
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
          fieldType: FieldType.TEXT,
          fieldName: 'quayCraneNo',
          fieldLabel: 'Quay Crane',
        },
        {
          type: E_Form_Type.FIELD,
          key: 'berthingTml',
          fieldType: FieldType.TEXT,
          fieldName: 'berthingTml',
          fieldLabel: 'Berth Terminal',
        },
      ],
    },
  ],
};
