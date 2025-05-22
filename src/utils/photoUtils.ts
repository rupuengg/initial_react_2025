import { IGallery, IPhoto } from 'entities';

export const PhotoUtils = (photos: IPhoto[] | undefined) => {
  const galleryImageKitFolderMapper: { [x: string]: string } = {
    '000_f_142_gulshan_bellina_done': '000 - F 142 Gulshan Bellina - Done',
    '053_t7_1906_exotica_dreamvilli_done': '053 - T7 - 1906 - Exotica DreamVilli - Done',
    '012_f_123_gulshan_bellina_done': '012 - F - 123 - Gulshan Bellina - Done',
    '016_f_044_gulshan_bellina_done': '016 - F - 044 - Gulshan Bellina - Done',
    '031_f_154_gulshan_bellina_done': '031 - F - 154 - Gulshan Bellina - Done',
    '043_110_aditya_dhurav_apartment_delhi_done': '043 - 110 - Aditya - Dhurav Apartment Delhi - Done',
    '049_j_061_subodh_gulshan_bellina_done': '049 - J - 061 - Subodh - Gulshan Bellina - Done',
    '034_g_3052_gaur_city_14_avenue': '034 - G 3052 - Gaur City 14 Avenue',
    '013_g_ajay_1004_samridhi_done': '013 - G - Ajay - 1004 - Samridhi - Done',
    '029_a-_183_gulshan_bellina_done': '029 - A- 183 - Gulshan Bellina - Done',
    '011_g_044_gulshan_bellina_done': '011 - G - 044 - Gulshan Bellina - Done',
  };

  return {
    sort: () => {
      if (photos) return photos.sort((a: IPhoto, b: IPhoto) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
      else return [];
    },
    getVideo: () => {
      if (!photos) return undefined;
      return photos.find(p => p.audioCodec === 'aac');
    },
    getGalleryAndImageKitFolder: (galleries: IGallery[], galleryId: string) => {
      const gallery = galleries.find(g => g.galleryId === galleryId);
      if (gallery) return { galleryId, imageKitFolder: gallery.name };

      const meta = document.querySelector('[name="image.kit.folder"]');
      if (meta && meta.getAttribute('content')) return { galleryId, imageKitFolder: meta.getAttribute('content') || '' };

      if (galleryImageKitFolderMapper[galleryId]) return { galleryId, imageKitFolder: galleryImageKitFolderMapper[galleryId] || '' };

      return { galleryId, imageKitFolder: '' };
    },
    getAllProjects: () => {
      return Object.keys(galleryImageKitFolderMapper);
    },
  };
};
