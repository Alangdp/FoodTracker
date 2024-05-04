import { ImageProps } from '../types/Image.type';
import { ProductProps, ProductFilterSchema } from '../types/Product.type';
import { Image } from './Image.model';

export class Product implements ProductProps {
  id?: string;
  category: string;
  title: string;
  description: string;
  images: ImageProps[];
  value: number;
  discountPercent: number;
  companyId?: string;

  constructor({ id, category, title, description, images, value, discountPercent, companyId }: ProductProps) {
    ProductFilterSchema.parse({ id, category, title, description, images, value, discountPercent, companyId });
    this.id = id;
    this.category = category;
    this.title = title;
    this.description = description;
    this.images = images;
    this.value = value;
    this.discountPercent = discountPercent;
    this.companyId = companyId;
  }
}
