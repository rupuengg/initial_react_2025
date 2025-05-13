import { faAdd, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { IOptions } from 'store';
import { FontIcon } from 'components';

export interface ILeftToRightSelection {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  options?: IOptions[];
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const LeftToRightSelection: React.FC<ILeftToRightSelection> = ({ fieldLabel, fieldName, fieldValue, isRequired, options, onChange }) => {
  const [opt, setOpt] = useState<IOptions[] | undefined>();

  useEffect(() => {
    if (fieldValue) {
      const selectedOptions: any[] = JSON.parse(fieldValue);
      const ar = selectedOptions.map(s => s.id?.toString());
      setOpt(options?.filter(o => ar.includes(o.value?.toString() || '')));
    }
  }, [fieldValue, options]);

  const handleChange = useCallback(
    (e: IOptions, isLeft: boolean) => {
      let newValues: IOptions[] = [...(opt ? opt : [])];
      if (isLeft) {
        newValues.push(e);
      } else {
        const index = newValues.findIndex(i => i.value === e.value);
        if (index >= 0) {
          newValues = [...newValues.slice(0, index), ...newValues.slice(index + 1)];
        }
      }

      if (onChange)
        onChange(
          fieldName || '',
          JSON.stringify(newValues),
          newValues.map(o => o.other)
        );
    },
    [opt, fieldName, onChange]
  );

  const getBoxData = useCallback(
    (opts: IOptions[] | undefined, isLeft: boolean) => {
      return (
        <div>
          <div className='inner-box'>
            <ul>
              {opts &&
                opts?.map(o => (
                  <li key={o.value} value={o.value} onClick={() => handleChange(o, isLeft)}>
                    <span>
                      <FontIcon icon={isLeft ? faAdd : faMinus} color={'#8a8a8a'} />
                    </span>

                    {o.label}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      );
    },
    [handleChange]
  );

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='left_right_selection'>
        {getBoxData(options, true)}
        {getBoxData(opt, false)}
      </div>
    </div>
  );
};
