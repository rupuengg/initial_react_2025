import { IPhoto } from './Photo';

export interface IGallery {
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  folderId: string;
  folderPath: string;
  galleryId: string;
  galleryCover: IPhoto;

  thumbnail?: string;
  fileType?: string;
  filePath?: string;
  photos?: IPhoto[];
  width?: number;
  height?: number;
  url?: number;
}
