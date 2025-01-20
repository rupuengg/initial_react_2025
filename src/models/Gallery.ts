import { IPhoto } from './Photo';

export interface IGallery {
  type: string;
  name: string;
  url: string;
  thumbnail: string;
  fileType: string;
  filePath: string;
  photos: IPhoto[];
}
