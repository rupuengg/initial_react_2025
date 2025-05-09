import { useCallback } from 'react';

export interface ITextarea {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const Textarea: React.FC<ITextarea> = ({ fieldLabel, fieldName, fieldValue, isRequired, onChange }) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <div className='box'>
        <textarea name={fieldName} rows={4} value={fieldValue || ''} onChange={handleChange} />
      </div>
    </div>
  );
};
