import { PrismaClient } from "@prisma/client";
import { ImageProps } from "../types/Image.type";
import { Image } from "./Image.model";
import { randomUUID } from "crypto";
import { Comparation } from "../types/Comparation.type";
import { imagesManager } from "../utils/images";

const prisma = new PrismaClient();

export class ImageDabatase extends Image{
  static async saveImageOnDB(imageProps: ImageProps) {
    try {
      const imageId = randomUUID();
      let image = new ImageDabatase(imageProps);
      image = new ImageDabatase(await prisma.image.create({data: {
        ...imageProps,
        id: imageId,
        imageUrl: `${imageId}.${imageProps.imageUrl.split(".")[1]}`,
      }}));

      imagesManager.ToConcrete(imageProps.imageUrl, image.imageUrl);
      return image;
    } catch (error) {
      imagesManager.deleteTempFile(imageProps.imageUrl);
      throw error;
    }
  }

  static async saveImagesOnDB(imageProps: ImageProps[]) {
    const comparation: Comparation[] = [];
    const images: ImageDabatase[] = [];

    for(const props of imageProps) {
      const image = await this.saveImageOnDB(props);
      comparation.push({lastName: props.imageUrl, actualName: image.imageUrl});
      images.push(image);
    }

    return images;
  }

  static async getAllImagesByProductId(productId: string) {
    const images = (await prisma.image.findMany({where: {productId}})).map( item => 
      new ImageDabatase(item)
    );
    return images;
  }

  constructor(imageProps: ImageProps) {
    super(imageProps);
  }

  async delete() {
    prisma.image.delete({where: {id: this.id}});
  }
}
