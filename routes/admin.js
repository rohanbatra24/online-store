const express = require('express');

const router = express.Router();

const { db } = require('./db/database');

const admin = require('../views/admin/admin');

const addcategory = require('../views/admin/addCategory');

const addProduct = require('../views/admin/addProduct');

const adminCategories = require('../views/admin/adminCategories');

router.get('/admin', (req, res) => {
	const categories = [];

	db
		.select('name')
		.table('categories')
		.then((data) => {
			for (let key of data) {
				categories.push(key.name);
			}
		})
		.then(() => {
			db
				.select('products.id', 'title', 'image', 'price', 'category_id', 'name')
				.table('products')
				.join('categories', 'categories.id', '=', 'category_id')
				.then((products) => {
					res.send(admin(req.cookies.userName, products));
				})
				.catch((err) => console.log('err', err));
		})
		.catch((err) => console.log('err', err));
});

router.get('/admin/addproduct', (req, res) => {
	const categories = [];

	db.select('name').table('categories').then((data) => {
		for (let key of data) {
			categories.push(key.name);
		}

		res.send(addProduct(req.cookies.userName, categories));
	});
});

router.get('/admin/addcategory', (req, res) => {
	res.send(addcategory(req.cookies.userName));
});

router.post('/admin/deletecategory/:id', (req, res) => {
	db('categories')
		.where({ id: req.params.id })
		.del()
		.then(() => res.redirect('/admin/categories'))
		.catch((err) => console.log('err', err));
});

router.post('/admin/deleteproduct/:id', (req, res) => {
	db('products')
		.where({ id: req.params.id })
		.del()
		.then(() => res.redirect('/admin'))
		.catch((err) => console.log('err', err));
});

router.post('/admin/addproduct', (req, res) => {
	// console.log(req.file.buffer.toString('base64'));

	const { title, price, image, category } = req.body;

	console.log('category', category);

	db('categories').where({ name: category }).then((category) => {
		db('products')
			.insert({ title: title, price: price, category_id: category[0].id, image: image })
			.returning('*')
			.then((data) => {
				res.redirect('/admin');
			});
	});
});

router.post('/admin/addcategory', (req, res) => {
	const { name } = req.body;

	db('categories').insert({ name: name }).returning('*').then((data) => {
		res.redirect('/categories');
	});
});

router.get('/admin/categories', (req, res) => {
	db
		.select('*')
		.table('categories')
		.then((categoriesList) => res.send(adminCategories(req.cookies.userName, categoriesList)));
});

module.exports = router;
