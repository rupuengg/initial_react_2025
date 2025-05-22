import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { IOptions } from 'store';

export interface ISelectMulti {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string[];
  options?: IOptions[];
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const SelectMulti: React.FC<ISelectMulti> = ({ fieldLabel, fieldName, fieldValue, isRequired, options = [], onChange }) => {
  const values = useMemo(() => {
    if (fieldValue && Array.isArray(fieldValue) && fieldValue.length > 0) return fieldValue?.map((v: any) => (typeof v === 'object' ? v.id.toString() : v.toString()));
    else return fieldValue;
  }, [fieldValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const values: string[] = [];
      const others: any[] = [];
      for (let index = 0; index < e.currentTarget.selectedOptions.length; index++) {
        const element = e.currentTarget.selectedOptions[index];
        values.push(element.value);

        const o = options.find(o => o.value?.toString() === element.value.toString());
        if (o) {
          others.push(o.other);
        }
      }
      if (onChange) onChange(fieldName || '', _.uniq(values), others.length > 0 ? others : null);
    },
    [options, fieldName, onChange]
  );

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='field-box'>
        <select name={fieldName} value={values || []} multiple onChange={handleChange}>
          <option>Select</option>
          {options?.map(option => <option key={option.value} value={option.value} label={option.label} />)}
        </select>
      </div>
    </div>
  );
};
