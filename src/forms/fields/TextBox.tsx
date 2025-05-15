import { useCallback } from 'react';

export interface ITextBox {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const TextBox: React.FC<ITextBox> = ({ fieldLabel, fieldName, fieldValue, isRequired, error, onChange }) => {
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
      <div className='field-box'>
        <input name={fieldName} value={fieldValue || ''} onChange={handleChange} />
      </div>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};
