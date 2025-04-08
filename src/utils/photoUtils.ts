import { IPhoto } from 'models';

export const PhotoUtils = (photos: IPhoto[] | undefined) => {
  return {
    sort: () => {
      if (photos) return photos.sort((a: IPhoto, b: IPhoto) => (a < b ? -1 : a > b ? 1 : 0));
      else return [];
    },
    getVideo: () => {
      if (!photos) return undefined;
      return photos.find(p => p.audioCodec === 'aac');
    },
  };
};
