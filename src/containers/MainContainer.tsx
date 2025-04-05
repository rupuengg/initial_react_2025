import { MainNavigation } from 'navigation';
import { useEffect, useRef } from 'react';
import { EMPTY_DATA_STATUS_ENTITY, E_Data_Load_Status, IDataStatus, IUseDispatch, getAllGallery, getAllPhotos, getFeaturedGallery, useAppDispatch } from 'store';

export const MainContainer = () => {
  const dispatch: IUseDispatch = useAppDispatch();
  const startRef = useRef<IDataStatus>(EMPTY_DATA_STATUS_ENTITY);

  useEffect(() => {
    if (startRef.current.loadAllPhotos === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, loadAllPhotos: E_Data_Load_Status.PENDING };
      dispatch(getAllPhotos());
    }
  }, [dispatch]);

  useEffect(() => {
    if (startRef.current.loadAllGalleries === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, loadAllGalleries: E_Data_Load_Status.PENDING };
      dispatch(getAllGallery());
    }
  }, [dispatch]);

  useEffect(() => {
    if (startRef.current.loadFeaturedGallery === E_Data_Load_Status.NOT_YET_STARTED) {
      startRef.current = { ...startRef.current, loadFeaturedGallery: E_Data_Load_Status.PENDING };
      dispatch(getFeaturedGallery());
    }
  }, [dispatch]);

  return <MainNavigation />;
};
