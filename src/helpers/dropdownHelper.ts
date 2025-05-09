import { IOptions } from 'store';
import { backendApiAxiosInstance } from 'store/services/axios';

interface IFieldMapper {
  value: string;
  label: string;
}

export interface IDropDownHelper {
  api: string;
  fieldName: string;
  fieldMapper: IFieldMapper;
  callback?: (fieldName: string, options: IOptions[]) => void;
}

export function dropdownHelper({ api, fieldName, fieldMapper, callback }: IDropDownHelper) {
  const makeOptions = (result: any) => {
    const results = result.data.data as any[];
    const options: IOptions[] = results.map((item: any) => ({ value: item[fieldMapper.value], label: item[fieldMapper.label] }));
    if (callback) callback(fieldName, options);
  };

  return async () => {
    makeOptions(await backendApiAxiosInstance.get(api, { headers: { 'Content-Type': 'application/json' } }));
  };
}
