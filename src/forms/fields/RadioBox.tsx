import { useCallback, useMemo } from 'react';
import { IOptions } from 'store';

export interface IRadioBox {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  options?: IOptions[];
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const RadioBox: React.FC<IRadioBox> = ({ fieldLabel, fieldName, fieldValue, isRequired, options = [], onChange }) => {
  const value = useMemo(() => fieldValue && Number(fieldValue), [fieldValue]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(fieldName || '', e.currentTarget.value);
    },
    [fieldName, onChange]
  );

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='radio-box-group'>
        {options?.map(option => (
          <div key={option.value} className='radio-box'>
            <input type='radio' id={option.value} name={fieldName} value={Number(option.value)} {...(value === Number(option.value) ? { checked: true } : {})} onChange={handleChange} />
            <label htmlFor={option.value}>{option.label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};
