const Product = require('../models/Product');
const multer = require('multer');
const fs = require('fs');
const { urlencoded } = require('express');

//get products
const getProducts = (req, res) => {
	console.log(req.params);
	Product.find()
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
};
const getProductsByCategory = (req, res) => {
	Product.find()
		.sort({ category: 1 })
		.then((data) => res.json(data))
		.catch((err) => res.json(err));
};
const getCategories = (req, res) => {
	Product.find({}, 'category')
		.then((data) => {
			let filterData = data.map((e) => e.category);
			data = filterData.filter((i, p) => {
				return filterData.indexOf(i) == p;
			});
			console.log(filterData);
			res.json(data);
		})
		.catch((err) => res.json(err));
};
const getProductById = (req, res) => {
	Product.findById(req.params.id)
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: 'producto no encontrado' }));
};
const searchProduct = (req, res) => {
	const { category, name } = req.params;
	// res.json(req.params);
	Product.find({ category, name })
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: 'producto no encontrado' }));
};
//get products
// post products

//multer settings
// const storage = multer.diskStorage({
// 	destination: (req, file, callback) => {
// 		callback(null, '../front/public/uploads');
// 	},
// 	filename: (req, file, callback) => {
// 		callback(null, file.originalname);
// 	},
// });

//multer settings
//multer test
const postProduct = (req, res, next) => {
	const { name, description, price, img, category } = req.body;
	console.log(req.file);
	let newProduct = new Product({
		name,
		description,
		price,
		img: req.file.filename,
		category,
	});
	const extensionFile = req.file.mimetype.split('/')[1];
	console.log(extensionFile);
	if (
		extensionFile != 'jpg' &&
		extensionFile != 'jpeg' &&
		extensionFile != 'png' &&
		extensionFile != 'svg'
	) {
		res.send('solo se admiten imagenes');
	} else {
		newProduct
			.save()
			.then(() =>
				res.json({
					msg: `nuevo producto  ${newProduct}`,
					req: { body: req.body, files: req.file },
				})
			)
			.catch((err) => res.status(400).json({ Error: 'error' }));
	}
};
//multer test
// const postProduct = (req, res) => {
// 	const { name, description, price, img, category } = req.body;

// 	let newProduct = new Product({
// 		name,
// 		description,
// 		price,
// 		img,
// 		category,
// 	});
// 	newProduct
// 		.save()
// 		.then(() => res.json({ msg: `nuevo producto  ${newProduct}` }))
// 		.catch((err) => res.status(400).json({ Error: 'error' }));
// };
// post products
module.exports = {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
	getCategories,
};
