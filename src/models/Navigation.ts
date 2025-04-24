import { E_Board_Type } from 'enums';

export interface INavigation {
  title: string;
  link: string;
  type: E_Board_Type;
  scrollTo: string;
  items?: INavigation[];
  isHide?: boolean;
  entrypoint?: string;
}
