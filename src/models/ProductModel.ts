import { ImageProps } from '../types/Image.type';
import { ProductProps, ProductFilterSchema } from '../types/Product.type';
import { Image } from './Image.model';

export class Product implements ProductProps {
  id: string;
  category: string;
  title: string;
  description: string | null;
  value: number;
  discountPercent: number;
  companyId: string;
  status: boolean;

  constructor({ id, category, title, description, value, discountPercent, companyId, status }: ProductProps) {
    ProductFilterSchema.parse({ id, category, title, description, value, discountPercent, companyId, status });
    this.id = id;
    this.category = category;
    this.title = title;
    this.description = description;
    this.value = value;
    this.discountPercent = discountPercent;
    this.companyId = companyId;
    this.status = status;
  }
}
