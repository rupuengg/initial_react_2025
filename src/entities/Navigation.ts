import { E_Board_Type, E_Menu_Type, E_Page_Mappper } from 'enums';

export interface INavigation {
  id: number;
  title: string;
  route: string;
  page?: E_Page_Mappper;
  menuType?: E_Menu_Type;
  type?: E_Board_Type;
  items?: INavigation[];
  isHide?: boolean;
  entrypoint?: string;
  isActive?: boolean;
  isShowHideSubMenu?: boolean;
}
