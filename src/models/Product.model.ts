import { PrismaClient } from "@prisma/client";
import { ProductProps, ProductFilterSchema } from "../types/Product.type";
import { deleteImagesById, registerImages } from "./Images.model";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

async function createProduct(data: ProductProps) {
  ProductFilterSchema.parse(data);
  const uuid = randomUUID();
  const { images, ...productData } = data;
  const imagesProcessed = await registerImages(images.map( image => image.imageUrl), uuid);
  const product = await prisma.product.create({
    data: {
      id: uuid,
      ...productData
    },
  });
  return ({
    ...product,
    images: imagesProcessed
  });
}


async function deleteProduct(id: string) {
  const product = await prisma.product.delete({
    where: {id}
  });
  await deleteImagesById(id);
  return (product);
}

async function updateProduct(data: ProductProps) {
  ProductFilterSchema.parse(data);
  if(!data.id) throw new Error("Invalid Id");
  const {id, images, ...productData} = data;
  await deleteImagesById(id);
  const comparation = (await registerImages(images.map(image => image.imageUrl), id)).comparation;
  const imagesProcessed = comparation.map(item => ({
    imageUrl: item.actualName,
    productId: id,
    status: true
  }));
  const product = await prisma.product.update({where: {id}, data: {
    ...productData,
  }}); 

  return ({
    ...product,
    images: imagesProcessed
  });
}


export { createProduct, deleteProduct };