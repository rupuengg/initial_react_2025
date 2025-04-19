import React, { useCallback } from 'react';
import { IBaseForm } from './BaseForm';
import { TextBox } from './fields';

export const TextField: React.FC<IBaseForm> = ({ key, fieldLabel, fieldName, fieldValue, valueType = 'text', error, isSavedClicked, isRequired, onChange }) => {
  const handleChange = useCallback(
    (e: any) => {
      if (onChange && e) onChange(e.currentTarget.name.toString(), e.currentTarget.value.toString());
    },
    [onChange]
  );

  return React.createElement(TextBox, {
    key: key,
    fieldLabel: fieldLabel,
    isRequired: !isRequired,
    error: isSavedClicked ? error : '', // Check save button is clicked
    valueType: valueType, // Type may be text | number
    fieldValue: fieldValue?.toString(), // Pass value
    fieldName: fieldName, // Field name is mandatory
    isSavedClicked: isSavedClicked,
    onChange: handleChange,
  });
};
