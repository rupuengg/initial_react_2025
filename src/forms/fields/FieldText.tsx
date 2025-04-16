export interface IFieldText {
  key: string;
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (value: any) => void;
}

export const FieldText: React.FC<IFieldText> = ({ key, fieldLabel }) => {
  if (!fieldLabel) return null;

  return (
    <p key={key} className='text'>
      {fieldLabel}
    </p>
  );
};
