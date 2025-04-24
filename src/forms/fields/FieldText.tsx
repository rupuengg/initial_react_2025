export interface IFieldText {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (value: any) => void;
}

export const FieldText: React.FC<IFieldText> = ({ fieldName, fieldValue }) => {
  if (!fieldValue) return null;

  return (
    <p key={`text-${fieldName}`} className='text'>
      {fieldValue}
    </p>
  );
};
