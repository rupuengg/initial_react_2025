import React, { useCallback, useMemo } from 'react';
import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';
import { TextField } from './TextField';
import { FieldLabel } from './fields';
import { FieldText } from './fields/FieldText';

interface IRenderForm {
  form: IBaseForm;
  isReadable?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const RenderForm: React.FC<IRenderForm> = ({ form, isReadable, onChange }) => {
  const getMainField = useCallback(
    (row: IBaseForm) => {
      if (isReadable) {
        return [React.createElement(FieldLabel, { key: row.key + 'label' }, row.fieldLabel), React.createElement(FieldText, { key: row.key + 'text' }, row.fieldValue?.toString())];
      } else {
        switch (row.fieldType) {
          case E_FieldType.TEXT:
            return React.createElement(TextField, { ...row, onChange });
          default:
            return null;
        }
      }
    },
    [isReadable]
  );

  const getField = useCallback(
    (column: IBaseForm): React.ReactNode => {
      if (column.type === E_Form_Type.COLUMN) {
        return React.createElement(
          'div',
          { className: 'flex-row-item', id: column.key, key: column.key },
          column.rows?.map(row => getField(row))
        );
      } else if (column.type === E_Form_Type.ROW) {
        return React.createElement(
          'div',
          { className: 'flex-row', id: column.key, key: column.key },
          column.fields?.map(field => getField(field))
        );
      } else if (column.type === E_Form_Type.FIELD) {
        return React.createElement('div', { className: 'flex-row-item', id: column.key, key: column.key }, getMainField(column));
      }
    },
    [isReadable]
  );

  const mainForm = useMemo(() => {
    return React.createElement('div', { className: 'flex-row-auto' }, getField(form));
  }, [form, isReadable]);

  return mainForm;
};
