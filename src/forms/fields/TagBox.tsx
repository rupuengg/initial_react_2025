import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Tags } from 'components';

function trimAndFilterTags(tags: string[]) {
  return _.uniq(tags.filter(tag => tag.trim() !== '').map(tag => tag.trim()));
}

export interface ITagBox {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const TagBox: React.FC<ITagBox> = props => {
  const inputRef: any = useRef(null);
  const { fieldLabel, fieldName, fieldValue, isRequired, error, onChange } = props;
  const [text, setText] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (fieldValue && typeof fieldValue === 'string' && fieldValue !== '') {
      setTags([...trimAndFilterTags(fieldValue.split(','))]);
    }
  }, [fieldValue]);

  const addTags = useCallback(
    (addTags: string[]) => {
      const newTags = trimAndFilterTags([...tags, ...addTags]);
      setTags([...newTags]);
      if (onChange) onChange(fieldName || '', newTags.join(', '));
    },
    [tags, setTags]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.value;
      const lastChar = value.slice(value.length - 1);
      if (lastChar === ',') {
        addTags([value.slice(0, value.length - 1)]);
        setText('');
      } else setText(value);
    },
    [tags]
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
      e.preventDefault();

      const clipboardData = e.clipboardData.getData('Text').toString();
      const newTags = clipboardData.split(',').map(tag => tag.trim());
      addTags(newTags);
    },
    [tags]
  );

  const handleClickDiv = useCallback(() => {
    if (inputRef.current) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='box' onClick={handleClickDiv}>
        <Tags tags={tags} onDelete={tags => tags && setTags([...tags])} />
        <input ref={inputRef} name={fieldName} value={text} autoComplete='off' onChange={handleChange} onPaste={handlePaste} />
      </div>
      {error && <span className='error'>{error}</span>}
    </div>
  );
};
