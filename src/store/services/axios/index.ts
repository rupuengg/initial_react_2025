import { isImageKitUsingKong } from 'utils';
import { DATA_MANAGEMENT_API_CONTEXT_PATH } from './apiContextPath';
import { axiosWithIntercepter, tokenReference } from './axiosInstance';

const imageKitAxiosInstance = axiosWithIntercepter(DATA_MANAGEMENT_API_CONTEXT_PATH, isImageKitUsingKong);

export { tokenReference, axiosWithIntercepter, imageKitAxiosInstance };
