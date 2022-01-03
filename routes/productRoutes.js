const express = require('express');
const userRoutes = express.Router();
const {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
} = require('../controllers/productControllers');
userRoutes.get('/', getProducts);
userRoutes.get('/categories/', getProductsByCategory);
userRoutes.get('/product/:id', getProductById);
userRoutes.post('/', postProduct);
userRoutes.get('/search/:category/:name', searchProduct);

module.exports = userRoutes;
