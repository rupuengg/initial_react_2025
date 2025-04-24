// import { FieldType, TextType } from 'veronica-ui-component/dist/component/core';
import { E_FieldType, E_Form_Type } from 'enums';

export interface IOption {
  key: string;
  value: string;
}

export interface IBaseForm {
  type: E_Form_Type;
  rows?: IBaseForm[];
  fields?: IBaseForm[];
  field?: IBaseForm;
  fieldType?: E_FieldType;
  fieldName?: string;
  options?: IOption[];
  fieldLabel?: string;
  fieldValue?: any; //string | number | object | boolean;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (fieldKey: string, fieldValue: any) => void;
}
