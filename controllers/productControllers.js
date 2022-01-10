const Product = require('../models/Product');

const fs = require('fs');
const { urlencoded } = require('express');

//get products
const getProducts = (req, res) => {
	// console.log(req.params);
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
			// console.log(filterData);
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
	Product.findOneAndDelete({ _id: req.params.id }, (err, docs) => {
		if (err) {
			res.json({ error: ' ha ocurrido un error' });
		} else {
			res.json({ msg: 'producto eliminado' });
		}
	});
	// .then((res) => res.json({ msg: 'producto eliminado' }))
	// .catch((err) => res.json({ error: ' ha ocurrido un error' }));
};

const postProduct = (req, res, next) => {
	const { name, description, price, category } = req.body;

	let newProduct = new Product({
		name,
		description,
		price,

		category,
	});

	newProduct
		.save()
		.then(() => {
			res.json({
				msg: `nuevo producto  ${newProduct.name}`,
			});
		})
		.catch((err) => res.status(400).json({ Error: 'error' }));
};

const updateProduct = (req, res) => {
	const { name, description, price, category } = req.body;

	Product.findOneAndUpdate(
		{ _id: req.params.id },
		{ name, description, price, category },
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
