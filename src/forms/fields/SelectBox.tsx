import { IOption } from 'forms';
import { useCallback } from 'react';

export interface ISelectBox {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  options?: IOption[];
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const SelectBox: React.FC<ISelectBox> = ({ fieldLabel, fieldName, fieldValue, isRequired, options, onChange }) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) onChange(fieldName || '', e.currentTarget.value);
  }, []);

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='box'>
        <select name={fieldName} value={fieldValue} onChange={handleChange}>
          <option>Select</option>
          {options?.map(option => (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
