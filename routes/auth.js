const express = require('express');

const router = express.Router();

const login = require('../views/auth/login');

const signup = require('../views/auth/signup');

const { db } = require('./db/database');

router.get('/login', (req, res) => {
	res.send(login(req.cookies.userName));
});

router.get('/logout', (req, res) => {
	res.clearCookie('userId');
	res.clearCookie('userName');

	res.redirect('/');
});

router.post('/login', (req, res) => {
	db.select('*').table('users').where({ email: req.body.email, password: req.body.password }).then((data) => {
		if (data.length) {
			res.cookie('userId', data[0].id);
			res.cookie('userName', data[0].name);
			res.redirect('/');
		}
		else {
			res.send('wrong credentials');
		}
	});
});

router.get('/signup', (req, res) => {
	res.send(signup());
});

router.post('/signup', (req, res) => {
	console.log('req.body', req.body);

	const { name, email, password } = req.body;

	db('users').insert({ name: name, email: email, password: password }).returning('*').then((data) => {
		res.cookie('userId', data[0].id);
		res.cookie('userName', data[0].name);

		res.redirect('/');
	});
});

module.exports = router;
