// import { FieldType, TextType } from 'veronica-ui-component/dist/component/core';
import { E_FieldType, E_Form_Type } from 'enums';

export interface IBaseForm {
  key: string;
  type: E_Form_Type;
  rows?: IBaseForm[];
  fields?: IBaseForm[];
  field?: IBaseForm;
  fieldType?: E_FieldType;
  fieldName?: string;
  fieldLabel?: string;
  fieldValue?: string | number | object | boolean;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (fieldKey: string, fieldValue: any) => void;
}
