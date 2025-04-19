export interface IFieldLabel {
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

export const FieldLabel: React.FC<IFieldLabel> = ({ key, fieldLabel }) => {
  if (!fieldLabel) return null;

  return (
    <p key={key} className='label'>
      {fieldLabel}
    </p>
  );
};
