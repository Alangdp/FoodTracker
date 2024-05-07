import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import { ProductProps } from '../types/Product.type';
import { imagesManager } from '../utils/images';
import { ProductDatabase } from '../models/ProductDatabase.model';
import { ImageDabatase } from '../models/ImageDatabase.model';

export const store: RequestHandler = async (req, res) => {
  try {
    const images = req.body.tempFiles.map((item: string) => ({ imageUrl: item, productId: '' }));
    const productData: ProductProps = {
      id: '', // Substituido na criação
      status: req.body.status || true,
      category: req.body.category || 'Desactivate',
      title: req.body.title,
      description: req.body.description,
      value: Number(req.body.price),
      discountPercent: Number(req.body.discountPorcent),
      companyId: "9ce7c1d8-e85b-4ec1-8748-3acf8371cb85",
    };

    const product = await ProductDatabase.saveProductAndImages(images, productData); 
    return response(res, { status: 200, data: product });
  } catch (error) {
    console.log(error);
    if(req.body.tempFiles.length > 0) {
      req.body.tempFiles.forEach((name: string) => {
        imagesManager.deleteTempFile(name);
      });
    }

    return errorResponse(res, error);
  }
};

export const pop: RequestHandler = async (req, res) => {
  try {
    const productId = req.params.productId;
    const productToDelete = ProductDatabase.findById(productId);

    const images = await ImageDabatase.getAllImagesByProductId(productId);
    for(const image of images) {
      await image.delete();
    }


    return response(res, { status: 200, data: {
      ...productToDelete,
      images
    } });
  } catch (error) {
    return errorResponse(res, error);
  }
};


export const put: RequestHandler = async (req, res) => {
  try {
    return response(res, { status: 200, data: req.files });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};


