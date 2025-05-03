import { E_Board_Type } from 'enums';

export interface INavigation {
  id: number;
  title: string;
  link: string;
  type?: E_Board_Type;
  items?: INavigation[];
  isHide?: boolean;
  entrypoint?: string;
  isActive?: boolean;
  isShowHideSubMenu?: boolean;
}
