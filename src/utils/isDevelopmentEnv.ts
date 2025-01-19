export const isDevelopmentEnv = process.env.REACT_APP_ENVIRONMENT === 'development';
export const isProductionEnv = !isDevelopmentEnv;
export const isImageKitUsingKong = process.env.REACT_APP_DATA_MANAGEMENT_USING_KONG === 'true';
