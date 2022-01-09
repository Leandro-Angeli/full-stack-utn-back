const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, '../front/public/assets/products_img');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname.replace(/\s/g, '_'));
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
	deleteProduct,
} = require('../controllers/productControllers');
userRoutes.get('/', getProducts);
userRoutes.get('/categories/product', getProductsByCategory);
userRoutes.get(
	'/categories/product/search/:category',
	searchProductsByCategory
);
userRoutes.get('/categories', getCategories);
userRoutes.get('/product/:id', getProductById);
userRoutes.post('/', upload.single('img'), postProduct);
userRoutes.delete('/', deleteProduct);
userRoutes.get('/search/:category/:name', searchProduct);

module.exports = userRoutes;
