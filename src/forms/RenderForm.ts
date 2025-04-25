import React, { useCallback, useMemo } from 'react';
import { E_FieldType, E_Form_Type } from 'enums';
import { IBaseForm } from './BaseForm';
import { FieldLabel, TextBox } from './fields';
import { FieldText } from './fields/FieldText';
import { ImageUrl } from './fields/ImageUrl';
import { SelectBox } from './fields/SelectBox';
import { TagBox } from './fields/TagBox';
import { Textarea } from './fields/Textarea';

interface IRenderForm {
  form?: IBaseForm[] | null;
  isReadable?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const RenderForm: React.FC<IRenderForm> = ({ form, isReadable, onChange }) => {
  const getField = useCallback(
    (row: IBaseForm, colIndex: number, rowIndex: number) => {
      if (isReadable) {
        return [
          React.createElement(FieldLabel, { key: colIndex + '-' + rowIndex + '-label', fieldLabel: row.fieldLabel }, row.fieldLabel),
          React.createElement(FieldText, { key: colIndex + '-' + rowIndex + '-text', fieldValue: row.fieldValue?.toString() }, row.fieldValue?.toString()),
        ];
      } else {
        switch (row.fieldType) {
          case E_FieldType.TEXT:
            return React.createElement(TextBox, { ...row, onChange });
          case E_FieldType.TEXTAREA:
            return React.createElement(Textarea, { ...row, onChange });
          case E_FieldType.DROPDOWN_ONE_SELECT:
            return React.createElement(SelectBox, { ...row, onChange });
          case E_FieldType.URL_CAPTURE:
            return React.createElement(ImageUrl, { ...row, onChange });
          case E_FieldType.TAG:
            return React.createElement(TagBox, { ...row, onChange });
          default:
            return null;
        }
      }
    },
    [isReadable, onChange]
  );

  const getColOrRow = useCallback(
    (column: IBaseForm, colIndex: number = 0, rowIndex: number = 0): React.ReactNode => {
      const key = `${colIndex}-${rowIndex}-`;
      if (column.type === E_Form_Type.COLUMN) {
        return React.createElement(
          'div',
          { className: 'flex-row-item', key: `${key}col` },
          column.rows?.map((row, index) => getColOrRow(row, colIndex + 1, index))
        );
      } else if (column.type === E_Form_Type.ROW) {
        return React.createElement(
          'div',
          { className: `flex-row${column.fields?.length === 1 ? ' flex-row-1' : ''}`, key: `${key}col-row` },
          column.fields?.map((field, index) => getColOrRow(field, colIndex + 1, index))
        );
      } else if (column.type === E_Form_Type.FIELD) {
        return React.createElement('div', { className: 'flex-row-item', key: `${key}col-row-group` }, getField(column, colIndex, rowIndex));
      }
    },
    [isReadable, getField]
  );

  const mainForm = useMemo(() => {
    return React.createElement(
      'div',
      { className: 'flex-row' },
      form?.map((f, index) => getColOrRow(f, index))
    );
  }, [form, isReadable, getColOrRow]);

  if (!form) return null;

  return mainForm;
};
