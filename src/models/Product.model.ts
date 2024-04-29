import { PrismaClient } from "@prisma/client";
import { ProductProps, ProductFilterSchema } from "../types/Product.type";
import { deleteByProductId } from "./Images.model";

const prisma = new PrismaClient();

async function createProduct(data: ProductProps) {
  ProductFilterSchema.parse(data);
  const { images, ...productData } = data;
  const product = await prisma.product.create({
    data: {
      ...productData,
    },
  });

  const imageCreatePromises = images.map(item => {
    return prisma.image.create({
      data: {
        imageUrl: item.imageUrl,
        productId: product.id,
      },
    });
  });

  const processPromisses = await Promise.all(imageCreatePromises);

  return ({
    ...product,
    images: processPromisses
  });
}


async function deleteProduct(productId: string) {
  const product = await prisma.product.delete({
    where: {id: productId}
  });
  
  const images = await prisma.image.deleteMany({
    where: {productId}
  });
  
  return ({
    ...product,
    images: images
  });
}

async function updateProduct(data: ProductProps) {
  ProductFilterSchema.parse(data);
  if(!data.id) throw new Error("Invalid Id");
  const { images, ...productData } = data;
  const product = await prisma.product.update({
    where: {id: data.id},
    data: {
      ...productData,
    },
  });

  await deleteByProductId(data.id);
  const imageCreatePromises = images.map(item => {
    return prisma.image.create({
      data: {
        imageUrl: item.imageUrl,
        productId: product.id,
      },
    });
  });

  const processPromisses = await Promise.all(imageCreatePromises);

  return ({
    ...product,
    images: processPromisses
  });
}

export { createProduct, deleteProduct };