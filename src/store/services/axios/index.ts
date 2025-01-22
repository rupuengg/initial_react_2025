import { API_CONTEXT_PATH } from './apiContextPath';
import { axiosWithIntercepter, tokenReference } from './axiosInstance';

const imageKitAxiosInstance = axiosWithIntercepter(API_CONTEXT_PATH);

export { tokenReference, axiosWithIntercepter, imageKitAxiosInstance };
