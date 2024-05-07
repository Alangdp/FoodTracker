import { Image, PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/Product.type";
import { Product } from "./ProductModel";
import { randomUUID } from "crypto";
import { ImageProps } from "../types/Image.type";
import { ImageDabatase } from "./ImageDatabase.model";
const prisma = new PrismaClient();

export class ProductDatabase extends Product{

  static async saveProductOnDB(productProps: ProductProps) {
    // Validação
    const product = new Product(productProps);
    await prisma.product.create({
      data: {
        ...product,
        id: productProps.id,
      }
    }); 

    return product;
  }

  static async saveProductAndImages(imagesProps: ImageProps[], productProps: ProductProps) {
    const productId = randomUUID();
    const product = new ProductDatabase(await ProductDatabase.saveProductOnDB({
      ...productProps,
      id: productId
    }));

    const teste = imagesProps.map( item => ({
      ...item,
      productId: productId
    }));

    const images = await ImageDabatase.saveImagesOnDB(teste);

    return(
      {
        ...product,
        images
      }
    );
  }

  constructor(productProps: ProductProps) {
    super(productProps);
  }

  static async findById(id: string) {
    const product = await prisma.product.findFirst({where: {id}}) as ProductProps;
    return new ProductDatabase(product);
  }

  async delete() {
    prisma.product.delete({where: {id: this.id}});
  }
}