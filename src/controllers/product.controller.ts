import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import { PrismaClient } from '@prisma/client';
import { ProductProps } from '../types/Product.type';
import { createProduct, deleteProduct } from '../models/Product.model';

export const store: RequestHandler = async (req, res) => {
  try {
    const productData: ProductProps = req.body;
    const product = await createProduct(productData); 
    return response(res, { status: 200, data: product });
  } catch (error) {
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
    console.log(JSON.parse(req.body.body), 'ID');
    const tempFileNames: string[] | undefined = req.body.tempFiles;
    return response(res, { status: 200, data: req.files });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};


