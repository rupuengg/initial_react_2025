import { IBlogEntity } from './BlogEntity';
import { IContactInfoEntity } from './ContactInfoEntity';
import { IJobSeekerEntity } from './JobSeekerEntity';
import { IMenuGroupEntity } from './MenuGroupEntity';
import { INavigation } from './Navigation';
import { ISiteConfigEntity } from './SiteConfigEntity';
import { IUser } from './User';

export * from './ANAInfo';
export * from './Banner';
export * from './BlogEntity';
export * from './ContactInfoEntity';
export * from './EntityStatusDataEntity';
export * from './Gallery';
export * from './JobSeekerEntity';
export * from './MenuGroupEntity';
export * from './Navigation';
export * from './Offer';
export * from './Photo';
export * from './SiteConfigEntity';
export * from './TestimonialEntity';
export * from './User';

export type CommonEntity = INavigation | IContactInfoEntity | IJobSeekerEntity | ISiteConfigEntity | IBlogEntity | IMenuGroupEntity | IUser;
