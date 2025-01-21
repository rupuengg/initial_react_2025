export const isDevelopmentEnv = process.env.REACT_APP_ENVIRONMENT === 'development';
export const isProductionEnv = !isDevelopmentEnv;
