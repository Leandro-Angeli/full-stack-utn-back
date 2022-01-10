const express = require('express');

const userRoutes = express.Router();
const {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
	getCategories,
	searchProductsByCategory,
	deleteProduct,
	updateProduct,
} = require('../controllers/productControllers');
const upload = require('../multer/multerFunction');
userRoutes.get('/', getProducts);
userRoutes.get('/categories/product', getProductsByCategory);
userRoutes.get(
	'/categories/product/search/:category',
	searchProductsByCategory
);
userRoutes.get('/categories', getCategories);
userRoutes.get('/product/:id', getProductById);
userRoutes.post('/', postProduct);
userRoutes.patch('/patch/:id', updateProduct);
userRoutes.delete('/:id', deleteProduct);
userRoutes.get('/search/:category/:name', searchProduct);

module.exports = userRoutes;
