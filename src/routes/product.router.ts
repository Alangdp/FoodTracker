import { Router } from 'express';

import { pop, put, store } from '../controllers/product.controller';
import { uploadFileImage } from '../middleware/imageMiddleware';

const router = Router();

// Rotas REST
router.post('/', store);
router.delete('/:productId', pop);
router.put('/', uploadFileImage, put);

export default router;
