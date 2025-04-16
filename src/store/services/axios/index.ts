import { API_CONTEXT_PATH, API_VERSION, BACKEND_API_CONTEXT_PATH } from './apiContextPath';
import { axiosWithIntercepter, tokenReference } from './axiosInstance';

const backendApiAxiosInstance = axiosWithIntercepter(BACKEND_API_CONTEXT_PATH + API_VERSION);
const imageKitAxiosInstance = axiosWithIntercepter(API_CONTEXT_PATH + API_VERSION);

export { tokenReference, axiosWithIntercepter };

export { backendApiAxiosInstance, imageKitAxiosInstance };
