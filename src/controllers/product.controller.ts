import { RequestHandler } from 'express';
import { errorResponse, response } from '../utils/responses';
import { ProductProps } from '../types/Product.type';
import { createProduct, deleteProduct } from '../models/Product.model';
import { deleteFile } from '../utils/images';

export const store: RequestHandler = async (req, res) => {
  try {
    const productData: ProductProps = {
      category: 'test',
      title: req.body.title,
      description: req.body.description,
      value: Number(req.body.price),
      discountPercent: Number(req.body.discountPorcent),
      images: req.body.tempFiles.map((item: string) => ({ imageUrl: item, productId: '' }))
    };

    const product = await createProduct(productData); 
    return response(res, { status: 200, data: product });
  } catch (error) {
    if(req.body.tempFiles.length > 0) {
      req.body.tempFiles.forEach((name: string) => {
        deleteFile(name, true);
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
    // console.log(JSON.parse(req.body.body), 'ID');
    // const tempFileNames: string[] | undefined = req.body.tempFiles;

    console.log(req.body);
    return response(res, { status: 200, data: req.files });
  } catch (error) {
    console.log(error);
    return errorResponse(res, error);
  }
};


