import { useCallback, useEffect, useState } from 'react';
import { E_Icon_Name } from 'enums';
import { IOptions } from 'store';
import { Icon } from 'components';

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

export const SocialLinksSelection: React.FC<ILeftToRightSelection> = ({ fieldLabel, fieldName, fieldValue, isRequired, options, onChange }) => {
  const [opt, setOpt] = useState<{ [x: string]: string }>({});

  useEffect(() => {
    let newOpt: { [x: string]: string } = {};
    options?.forEach(o => {
      if (o && o.label) {
        newOpt[o.label.toString()] = '';
      }
    });

    if (fieldValue) {
      const ar = JSON.parse(fieldValue);
      newOpt = { ...ar };
    }

    setOpt(newOpt);
  }, [fieldValue, options]);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, label: string) => {
      const newOpt: { [x: string]: string } = { ...opt };
      if (label && Object.keys(newOpt).indexOf(label) >= 0) {
        newOpt[label] = event.currentTarget.value;
      }

      if (onChange) onChange(fieldName || '', JSON.stringify(newOpt));
    },
    [opt, fieldName, onChange]
  );

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='social_links'>
        <div className='inner-box'>
          <ul>
            {Object.keys(opt)?.map(o => (
              <li key={o} value={o}>
                <div>
                  <Icon iconName={o as E_Icon_Name} />
                </div>

                <div>
                  <input name={o} value={opt[o]} type='text' onChange={e => handleChange(e, o)} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
