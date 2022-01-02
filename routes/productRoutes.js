const express = require('express');
const userRoutes = express.Router();
const {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
} = require('../controllers/productControllers');
userRoutes.get('/', getProducts);
userRoutes.get('/categories/', getProductsByCategory);
userRoutes.get('/product/:id', getProductById);
userRoutes.post('/', postProduct);

module.exports = userRoutes;
