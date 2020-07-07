const express = require('express');

const router = express.Router();

const { db } = require('./db/database');

const homepage = require('../views/products/homepage');

const categories = require('../views/products/categories');

const categoryView = require('../views/products/categoryView');

router.get('/', (req, res) => {
	db.select('*').table('products').join('categories', 'categories.id', '=', 'category_id').then((products) => {
		console.log('products', products);
		res.send(homepage(req.session.userName, products));
	});
});

router.get('/categories', (req, res) => {
	db
		.select('*')
		.table('categories')
		.then((categoriesList) => res.send(categories(req.session.userName, categoriesList)));
});

router.get('/categories/:id', (req, res) => {
	catId = req.params.id;

	db
		.select('*')
		.table('categories')
		.join('products', 'categories.id', '=', 'category_id')
		.where({ category_id: catId })
		.then((products) => res.send(categoryView(req.session.userName, products)));
});

module.exports = router;
