export interface ICutomPhoto {
  cover: boolean;
}

export interface IEmbeddedMetadata {
  YResolution: number;
  XResolution: number;
  DateCreated: string;
  DateTimeCreated: string;
}

export interface IVersionInfo {
  id: string;
  name: string;
}

export interface IPhoto {
  type: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  fileId: string;
  tags?: string;
  AITags?: string;
  versionInfo: IVersionInfo;
  embeddedMetadata: IEmbeddedMetadata;
  isPublished: string;
  customCoordinates?: string;
  customMetadata: ICutomPhoto;
  isPrivateFile: boolean;
  url: string;
  thumbnail: string;
  fileType: string;
  filePath: string;
  height: number;
  width: number;
  size: number;
  hasAlpha: boolean;
  mime: string;
}
