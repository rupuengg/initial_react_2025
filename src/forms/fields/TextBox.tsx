export interface ITextBox {
  key: string;
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired: boolean;
  onChange: (value: any) => void;
}

export const TextBox: React.FC<ITextBox> = () => {
  return (
    <div>
      <label></label>
      <input />
    </div>
  );
};
