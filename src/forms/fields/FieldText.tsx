import { E_FieldType } from 'enums';

export interface IFieldText {
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

export const FieldText: React.FC<IFieldText> = ({ fieldName, fieldType, fieldValue }) => {
  if (!fieldValue) return null;

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
    <p key={`text-${fieldName}`} className='text'>
      {fieldValue}
    </p>
  );
};
