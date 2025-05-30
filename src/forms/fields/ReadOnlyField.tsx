import { E_FieldType } from 'enums';

export interface IReadOnlyField {
  fieldLabel?: string;
  fieldName?: string;
  fieldType?: E_FieldType;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (value: any) => void;
}

export const ReadOnlyField: React.FC<IReadOnlyField> = ({ fieldName, fieldLabel, fieldType, fieldValue }) => {
  if (fieldValue && fieldType === E_FieldType.EDITOR) return <div className='form-preview' dangerouslySetInnerHTML={{ __html: fieldValue }} />;
  if (fieldValue && (fieldType === E_FieldType.DROPDOWN_ONE_SELECT || fieldType === E_FieldType.DROPDOWN_MULTI_SELECT))
    return (
      <div className='form-preview'>
        <pre>
          <code>{fieldValue}</code>
        </pre>
      </div>
    );

  return (
    <div className='form-field marginTop20'>
      <p key={`label-${fieldName}`} className='label'>
        {fieldLabel}
      </p>
      <p key={`text-${fieldName}`} className='text'>
        {fieldValue}
      </p>
    </div>
  );
};
