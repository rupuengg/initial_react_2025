import { IPhoto } from 'models';

export interface IGlobalState {
  photos: IPhoto[];
}

export const defaultGlobalState: IGlobalState = {
  photos: [],
};
