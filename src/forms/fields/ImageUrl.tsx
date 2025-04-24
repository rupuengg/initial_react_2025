import { useCallback } from 'react';
import { TextBox } from './TextBox';

export interface IImageData {
  width?: number | null;
  height?: number | null;
  mime?: string | null;
}

export interface IImageUrl {
  fieldLabel?: string;
  fieldName?: string;
  fieldValue?: string;
  valueType?: 'text' | 'number';
  error?: string;
  isSavedClicked?: boolean;
  isRequired?: boolean;
  onChange?: (key: string, value: any, other?: any) => void;
}

export const ImageUrl: React.FC<IImageUrl> = props => {
  const getMeta = async (url: string, cb: any) => {
    const ar = url.split('.');
    const newUrl = ar[ar.length - 1];
    const indexOfQuestionMark = newUrl.indexOf('?');
    const ext = newUrl.slice(0, indexOfQuestionMark < 0 ? newUrl.length : indexOfQuestionMark);
    const mimeType: string | null = 'image/' + ext;

    const img = new Image();
    img.onload = () => cb(null, img, mimeType);
    img.onerror = err => cb(err);
    img.src = url;
  };

  const handleChange = useCallback(async (name: string, value: any) => {
    getMeta(value, (err: string | Event, img: HTMLImageElement, mimeType?: string) => {
      const imgData: IImageData = { width: img?.naturalWidth, height: img?.naturalHeight, mime: mimeType };
      if (props.onChange) props.onChange(props.fieldName || '', value, imgData);
    });
  }, []);

  return <TextBox {...props} onChange={handleChange} />;
};
