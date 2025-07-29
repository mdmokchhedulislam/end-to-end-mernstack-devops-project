import express from 'express';
import { productController } from './product.controller';

const router = express.Router();

router.post('/add-product', productController.addBookData);
router.get('/', productController.getAllBookData);
router.put('/delete-book', productController.deleteBookData);
router.put('/update-book', productController.updateBookData);


export const productRoutes = router;
