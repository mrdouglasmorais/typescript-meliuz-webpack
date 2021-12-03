export interface IProduct{
  id: number;
  name: string;
  price: number;
  image: string;
  offer: boolean;
  category: number[];
  description: string;
  discount: number;
}

export interface ILinkTab{
  label?: string;
  href: string;
}

export interface ILoadComponent{
  show: boolean;
}

export interface ICardComponent{
  keyValue: number;
  textTitle: string;
  img: string;
  altText: string;
  handleAction: (value: IProduct) => void;
  descriptionText: string;
  priceText: number;
  itemDefault: IProduct;
}