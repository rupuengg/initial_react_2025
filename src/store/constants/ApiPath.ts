export const ApiPath = {
  PATH: {
    ROUTE_PATH: {
      GALLERY_PATH: 'gallery',
      PHOTO_PATH: 'photo',
    },
    GALLERY_ALLPHOTOS: 'gallery/{galleryId}',
    GALLERY_ONLY_DONE_PHOTOS: 'gallery/{galleryId}/completed',
    GALLERY_ONLY_UNDER_PHOTOS: 'gallery/{galleryId}/under',
  },
  METHOD: {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
  },
};
