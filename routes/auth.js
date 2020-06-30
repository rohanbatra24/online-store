const express = require('express');

const router = express.Router();

const cart = require('../views/products/cart');

const login = require('../views/auth/login');

const { db } = require('./db/database');

router.get('/login', (req, res) => {
	res.send(login(req.cookies.userId));
});

router.get('/logout', (req, res) => {
	res.clearCookie('userId');
	res.redirect('/');
});

router.post('/login', (req, res) => {
	db.select('*').table('users').where({ email: req.body.email, password: req.body.password }).then((data) => {
		if (data.length) {
			res.cookie('userId', data[0].id);
			res.redirect('/');
		}
		else {
			res.send('wrong credentials');
		}
	});
});

router.get('/signup', (req, res) => {
	res.send(homepage(database.products));
});

router.post('/signup', (req, res) => {
	res.send(homepage(database.products));
});

module.exports = router;
