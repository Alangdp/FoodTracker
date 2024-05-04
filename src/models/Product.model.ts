// import { PrismaClient } from "@prisma/client";
// import { ProductProps, ProductFilterSchema } from "../types/Product.type";
// import { randomUUID } from "crypto";

// const prisma = new PrismaClient();

// async function createProduct(data: ProductProps) {
//   ProductFilterSchema.parse(data);
//   const productId = randomUUID();
//   const { images, ...productData } = data;
//   const imagesProcessed = await ImageDabatase.saveImagesOnDB(images.map(item => ({
//     ...item,
//     productId: productId
//   })));
  
//   const product = await prisma.product.create({
//     data: {
//       id: productId,
//       ...productData,
//     },
//   });

//   return ({
//     ...product,
//     images: imagesProcessed
//   });
// }


// async function deleteProduct(productId: string) {
//   const product = await prisma.product.delete({
//     where: {id: productId}
//   });
//   (await ImageDabatase.getAllImagesByProductId(productId)).map( async (item) => await item.delete());
//   return product;
// };

// export { createProduct, deleteProduct };