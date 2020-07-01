const express = require('express');

const router = express.Router();

const { db } = require('./db/database');

const homepage = require('../views/products/homepage');

const categories = require('../views/products/categories');

const categoryView = require('../views/products/categoryView');

router.get('/', (req, res) => {
	if (req.cookies.userId) {
		db.select('*').table('products').then((products) => res.send(homepage(req.cookies.userName, products)));
	}
	else {
		res.redirect('/login');
	}
});

router.get('/categories', (req, res) => {
	db
		.select('*')
		.table('categories')
		.then((categoriesList) => res.send(categories(req.cookies.userName, categoriesList)));
});

router.get('/categories/:id', (req, res) => {
	catId = req.params.id;

	db
		.select('*')
		.table('categories')
		.join('products', 'categories.id', '=', 'category_id')
		.where({ category_id: catId })
		.then((products) => res.send(categoryView(req.cookies.userName, products)));
});

module.exports = router;
