import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { globalReducer } from './slices/globalSlice';

export * from './constants';
export * from './services';
export * from './slices';
export * from './states';
export * from './thunk';

const rootReducer = combineReducers({
  global: globalReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_ENVIRONMENT === 'development',
});

export type IApplicationState = ReturnType<typeof store.getState>;
export type IUseDispatch = any;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
