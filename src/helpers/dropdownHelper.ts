import { IOptions } from 'store';
import { backendApiAxiosInstance } from 'store/services/axios';

interface IFieldMapper {
  value: string;
  label: string;
}

export interface IDropDownHelper {
  api: string;
  fieldName?: string;
  fieldMapper: IFieldMapper;
  filter?: (item: any) => void;
  callback?: (fieldName: string, options: IOptions[]) => void;
}

export function dropdownHelper({ api, fieldName, fieldMapper, filter, callback }: IDropDownHelper) {
  const makeOptions = (result: any) => {
    const f = filter ? filter : (item: any) => item;
    const results = result.data.data as any[];
    const options: IOptions[] = results.filter(f).map((item: any) => ({ value: item[fieldMapper.value], label: item[fieldMapper.label], other: item }));
    if (fieldName && callback) callback(fieldName, options);
  };

  return async () => {
    makeOptions(await backendApiAxiosInstance.get(api, { headers: { 'Content-Type': 'application/json' } }));
  };
}
