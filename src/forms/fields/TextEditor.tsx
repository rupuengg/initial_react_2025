import { useCallback, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface ITextEditor {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  isPreview?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const TextEditor: React.FC<ITextEditor> = ({ fieldLabel, fieldName, fieldValue, isRequired, onChange }) => {
  const quillRef = useRef<ReactQuill>(null);

  const handleChange = useCallback(
    (e: any) => {
      if (onChange) onChange(fieldName || '', e);
    },
    [fieldName, onChange]
  );

  const imageHandler = useCallback(() => {
    const url = prompt('Enter the image URL');
    if (url && quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);
      quill.insertEmbed(range.index, 'image', url, 'user');
    }
  }, []);

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'code-block'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image'];

  return (
    <div className='form-field'>
      <label>
        <span>{fieldLabel}</span>
        {isRequired ? <sup>*</sup> : null}
      </label>
      <div className='field-box editor'>
        <ReactQuill ref={quillRef} theme='snow' modules={modules} formats={formats} value={fieldValue || 'Hello'} onChange={handleChange} />
      </div>
    </div>
  );
};
