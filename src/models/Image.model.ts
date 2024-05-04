import { ImageFilterSchema, ImageProps } from '../types/Image.type';

// ! ImageURL no primeiro momento se reflete ao nome temporario da imagem

export class Image implements ImageProps {
  id?: string;
  imageUrl: string;
  productId: string;
  status: boolean;

  constructor({ id, imageUrl, productId, status }: ImageProps) {
    ImageFilterSchema.parse({id, imageUrl, productId, status});
    this.id = id;
    this.imageUrl = imageUrl;
    this.productId = productId;
    this.status = status;
  }
}
