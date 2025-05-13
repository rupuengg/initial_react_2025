import { E_FieldType, E_Form_Type } from 'enums';
import { IDropDownHelper } from 'helpers/dropdownHelper';
import { IOptions } from 'store';

export interface IBaseForm {
  type: E_Form_Type;
  rows?: IBaseForm[];
  fields?: IBaseForm[];
  field?: IBaseForm;
  fieldType?: E_FieldType;
  fieldName?: string;
  options?: IOptions[];
  optionConfig?: IDropDownHelper;
  fieldLabel?: string;
  fieldValue?: any; //string | number | object | boolean;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  // onChange?: (fieldKey: string, fieldValue: any) => void;
}
