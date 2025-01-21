export interface IOfferItem {
  title: string;
  img: string;
  items: string[];
}

export interface IOffer {
  floor_image: string;
  title: string;
  price: string;
  options: IOfferItem[];
}
