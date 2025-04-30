export interface ICutomPhoto {
  cover?: boolean | string;
  featured?: boolean | string;
  galleryId?: string;
  galleryName?: string;
}

export interface IEmbeddedMetadata {
  YResolution?: string;
  XResolution?: string;
  DateCreated?: string;
  DateTimeCreated?: string;
}

export interface IVersionInfo {
  id: string;
  name: string;
}

export interface IPhoto {
  type?: string;
  name: string;
  audioCodec?: string;
  createdAt?: string;
  updatedAt?: string;
  fileId?: string;
  tags?: string | null;
  AITags?: string | null;
  versionInfo?: IVersionInfo;
  embeddedMetadata?: IEmbeddedMetadata;
  isPublished?: string;
  customCoordinates?: string | null;
  customMetadata?: ICutomPhoto;
  isPrivateFile?: string;
  url?: string;
  thumbnail?: string;
  fileType?: string;
  filePath?: string;
  height?: string;
  width?: string;
  size?: string;
  hasAlpha?: string;
  mime?: string;
}
