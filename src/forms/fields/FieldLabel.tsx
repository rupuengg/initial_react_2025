export interface IFieldLabel {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (value: any) => void;
}

export const FieldLabel: React.FC<IFieldLabel> = ({ fieldName, fieldLabel }) => {
  if (!fieldLabel) return null;

  return (
    <p key={`label-${fieldName}`} className='label'>
      {fieldLabel}
    </p>
  );
};
