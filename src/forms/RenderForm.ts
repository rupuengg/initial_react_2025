import { defaultEntityStatusDataEntity } from 'mock';
import React, { useCallback, useMemo, useRef } from 'react';
import { IEntityStatusDataEntity } from 'entities';
import { E_Data_Load_Status, E_FieldType, E_Form_Type } from 'enums';
import { IDropDownHelper, dropdownHelper } from 'helpers/dropdownHelper';
import { IOptions } from 'store';
import { IBaseForm } from './BaseForm';
import { FieldLabel, FieldText, ImageUrl, SelectBox, SelectMulti, TagBox, TextBox, Textarea } from './fields';

interface IRenderForm {
  form?: IBaseForm[] | null;
  isReadable?: boolean;
  dp?: { [x: string]: IOptions[] };
  dropdownUpdater?: (fieldName: string, options: IOptions[]) => void;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const RenderForm: React.FC<IRenderForm> = ({ form, isReadable, dp, dropdownUpdater, onChange }) => {
  const startRef = useRef<IEntityStatusDataEntity>(defaultEntityStatusDataEntity);

  const dropdownCallback = useCallback((optionsConfig?: IDropDownHelper) => {
    if (optionsConfig && optionsConfig.fieldName) {
      const key = `dp-${optionsConfig.fieldName}`;
      if (!startRef.current[key]) startRef.current[key] = E_Data_Load_Status.NOT_YET_STARTED;

      if (startRef.current[key] === E_Data_Load_Status.PENDING) {
        startRef.current = { ...startRef.current, [key]: E_Data_Load_Status.FULFULLED };
      }

      if (dropdownHelper && startRef.current[key] === E_Data_Load_Status.NOT_YET_STARTED) {
        startRef.current = { ...startRef.current, [key]: E_Data_Load_Status.PENDING };
        dropdownHelper(optionsConfig)();
      }
    }
  }, []);

  const getOptions = useCallback((main: { [x: string]: IOptions[] }, row: IBaseForm): IOptions[] => {
    if (main && row.fieldName && main[row.fieldName]) return main[row.fieldName];
    else if (row.options) return row.options;
    return [];
  }, []);

  const getField = useCallback(
    (row: IBaseForm, colIndex: number, rowIndex: number) => {
      if (isReadable) {
        return [
          React.createElement(FieldLabel, { key: colIndex + '-' + rowIndex + '-label', fieldLabel: row.fieldLabel }, row.fieldLabel),
          React.createElement(FieldText, { key: colIndex + '-' + rowIndex + '-text', fieldValue: row.fieldValue?.toString() }, row.fieldValue?.toString()),
        ];
      } else {
        if (row.optionConfig && row.fieldName) dropdownCallback({ ...row.optionConfig, fieldName: row.fieldName, callback: dropdownUpdater });
        switch (row.fieldType) {
          case E_FieldType.TEXT:
            return React.createElement(TextBox, { ...row, onChange });
          case E_FieldType.TEXTAREA:
            return React.createElement(Textarea, { ...row, onChange });
          case E_FieldType.DROPDOWN_ONE_SELECT:
            return React.createElement(SelectBox, { ...row, options: getOptions(dp || {}, row), onChange });
          case E_FieldType.DROPDOWN_MULTI_SELECT:
            return React.createElement(SelectMulti, { ...row, options: getOptions(dp || {}, row), onChange });
          case E_FieldType.URL_CAPTURE:
            return React.createElement(ImageUrl, { ...row, onChange });
          case E_FieldType.TAG:
            return React.createElement(TagBox, { ...row, onChange });
          default:
            return null;
        }
      }
    },
    [isReadable, getOptions, dp, onChange, dropdownCallback, dropdownUpdater]
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
    [getField]
  );

  const mainForm = useMemo(() => {
    return React.createElement(
      'div',
      { className: 'flex-row' },
      form?.map((f, index) => getColOrRow(f, index))
    );
  }, [form, getColOrRow]);

  if (!form) return null;

  return mainForm;
};
