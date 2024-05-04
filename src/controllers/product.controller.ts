import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import { ProductProps } from '../types/Product.type';
import { createProduct, deleteProduct } from '../models/Product.model';
import { imagesManager } from '../utils/images';

export const store: RequestHandler = async (req, res) => {
  try {
    const productData: ProductProps = {
      category: 'test',
      title: req.body.title,
      description: req.body.description,
      value: Number(req.body.price),
      discountPercent: Number(req.body.discountPorcent),
      images: req.body.tempFiles.map((item: string) => ({ imageUrl: item, productId: '' })),
      companyId: "d6b8da1c-1bf3-4523-aa20-757d1cd1b04d"
    };

    const product = await createProduct(productData); 
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
    const product = await deleteProduct(productId); 
    return response(res, { status: 200, data: product });
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


