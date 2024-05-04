import { PrismaClient } from "@prisma/client";
import { ProductProps } from "../types/Product.type";
import { Product } from "./ProductModel";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export class ProductDatabase extends Product {
  static async saveProductOnDB(productProps: ProductProps) {
    const productId = randomUUID();
    const product = new Product(productProps);

    return prisma.product.create({data: {
      ...product,
      id: productId
    }});
  }

  static async getAllProducts() {
    const products = await prisma.product.findMany();
    return products.map((product) => new Product(product));
  }

  static async getProductById(productId: string) {
    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new Error("Product not found");
    }
    return new Product(product);
  }

  constructor(productProps: ProductProps) {
    super(productProps);
  }

  async delete() {
    await prisma.product.delete({ where: { id: this.id } });
  }
}
