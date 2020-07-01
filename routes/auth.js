const express = require('express');

const router = express.Router();

const crypto = require('crypto');

const util = require('util'); // to promisify scrypt result

const scrypt = util.promisify(crypto.scrypt);

const login = require('../views/auth/login');

const signup = require('../views/auth/signup');

const { db } = require('./db/database');

router.get('/login', (req, res) => {
	res.send(login(req.session.userName));
});

router.get('/logout', (req, res) => {
	req.session = null;

	res.redirect('/');
});

router.post('/login', (req, res) => {
	db.select('*').table('users').where({ email: req.body.email, password: req.body.password }).then((data) => {
		if (data.length) {
			req.session = { userId: data[0].id, userName: data[0].name };
			res.redirect('/');
		}
		else {
			res.send('User email and password do not match');
		}
	});
});

router.get('/signup', (req, res) => {
	res.send(signup());
});

router.post('/signup', async (req, res) => {
	const { name, email, password } = req.body;

	const salt = crypto.randomBytes(8).toString('hex');

	//scrypt returns a promise (dont need callback) because of util promisify at the top
	const hashedBuffer = await scrypt(password, salt, 64);

	db('users')
		.insert({ name: name, email: email, password: `${hashedBuffer.toString('hex')}.${salt}` })
		.returning('*')
		.then((data) => {
			req.session = { userId: data[0].id, userName: data[0].name };
			res.redirect('/');
		})
		.catch((err) => console.log('err', err));
});

module.exports = router;
