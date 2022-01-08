const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../front/public/assets/products_img');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	},
});
const upload = multer({ storage });
const userRoutes = express.Router();
const {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
	getCategories,
	searchProductsByCategory,
} = require('../controllers/productControllers');
userRoutes.get('/', getProducts);
userRoutes.get('/categories/product', getProductsByCategory);
userRoutes.get(
	'/categories/product/search/:category',
	searchProductsByCategory
);
userRoutes.get('/categories', getCategories);
userRoutes.get('/product/:id', getProductById);
userRoutes.post('/', upload.single('image'), postProduct);
userRoutes.get('/search/:category/:name', searchProduct);

module.exports = userRoutes;
