const Product = require('../models/Product');

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
const searchProductsByCategory = (req, res) => {
	const { category } = req.params;
	// res.json(req.params);
	Product.find({ category: category })
		.then((data) => res.json(data))
		.catch((err) => res.json({ error: 'producto no encontrado' }));
};
//get products
// post products
const deleteProduct = (req, res) => {
	const id = req.params.id;
	Product.findByIdAndDelete(id)
		.then((res) => console.log('ok'), res.json({ msg: 'producto eliminado' }))
		.catch(
			(err) => console.log('error'),
			res.json({ error: ' ha ocurrido un error' })
		);
};

const postProduct = (req, res, next) => {
	const { name, description, price, category } = req.body;

	// console.log(req.body), console.log(req.file);
	img = req.file.originalname.replace(/\s/g, '_');

	let newProduct = new Product({
		name,
		description,
		price,
		img,
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
			.then(() => {
				res.json({
					msg: `nuevo producto  ${newProduct}`,
					req: { body: req.body, files: req.file },
				});
			})
			.catch((err) => res.status(400).json({ Error: 'error' }));
	}
};

const updateProduct = (req, res) => {
	const { name, description, price, category } = req.body;
	img = req.file.originalname.replace(/\s/g, '_');
	Product.findOneAndUpdate(
		{ _id: req.params.id },
		{ name, description, price, category, img },
		{ new: true },
		(err, data) => {
			err
				? res.json({ error: 'ha ocurrido un error' })
				: res.json({ msg: 'datos actualizados', data: data });
		}
	);
};
// post products
module.exports = {
	getProducts,
	postProduct,
	getProductsByCategory,
	getProductById,
	searchProduct,
	getCategories,
	searchProductsByCategory,
	deleteProduct,
	updateProduct,
};
