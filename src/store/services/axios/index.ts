import { API_CONTEXT_PATH, API_VERSION } from './apiContextPath';
import { axiosWithIntercepter, tokenReference } from './axiosInstance';

const imageKitAxiosInstance = axiosWithIntercepter(API_CONTEXT_PATH + API_VERSION);

export { tokenReference, axiosWithIntercepter, imageKitAxiosInstance };
