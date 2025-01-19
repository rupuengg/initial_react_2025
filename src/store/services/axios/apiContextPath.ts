import { isImageKitUsingKong } from 'utils';

export const DATA_MANAGEMENT_API_CONTEXT_PATH = isImageKitUsingKong ? process.env.REACT_APP_KONG_GATEWAY_DATA_MANAGEMENT_API_URI : process.env.REACT_APP_DATA_MANAGEMENT_API_URI;
