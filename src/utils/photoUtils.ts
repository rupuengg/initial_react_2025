import { IPhoto } from 'models';

export const PhotoUtils = (photos: IPhoto[] | undefined) => {
  return {
    sort: () => {
      console.log('photos', photos);
      if (photos) return photos.sort((a: IPhoto, b: IPhoto) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      else return [];
    },
    getVideo: () => {
      if (!photos) return undefined;
      return photos.find(p => p.audioCodec === 'aac');
    },
  };
};
