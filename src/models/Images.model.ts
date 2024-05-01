import { Image, PrismaClient } from "@prisma/client";
import { deleteFile, moveTempToImage } from "../utils/images";
import { Comparation } from "../types/Comparation.type";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function registerImages(tempImagesNames: string[], productId: string) {
  try {
    const comparation: Comparation[] = [];
    const images: Image[] = [];

    await Promise.all(tempImagesNames.map(async (imageName) => {
      const uuid = randomUUID();
      const actualName = `${uuid}.${imageName.split('.')[1]}`;
      const registredImage = await prisma.image.create({
        data: {
          id: uuid,
          imageUrl: actualName,
          productId: productId,
        },
      });

      comparation.push({ lastName: imageName, actualName });
      moveTempToImage(imageName, registredImage.imageUrl);
      images.push(registredImage);
    }));

    return {comparation, images};
  } catch (error) {
    await Promise.all(tempImagesNames.map(name => deleteFile(name, true)));
    throw error;
  }
}

export async function deleteImagesById(id: string) {
  const images = (await prisma.image.findMany({ where: {productId: id}})).map(item => item.imageUrl);
  images.forEach(imageName => {
    deleteFile(imageName, false);
  });
}