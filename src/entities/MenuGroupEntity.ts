import { E_Menu_Type } from 'enums';
import { INavigation } from './Navigation';

export interface IMenuGroupEntity {
  id?: number;
  menuGroupTitle: string;
  menuGroupType?: E_Menu_Type;
  menus?: INavigation[];
}
