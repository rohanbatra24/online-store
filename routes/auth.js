const express = require('express');

const router = express.Router();

const { check, validationResult } = require('express-validator');

const crypto = require('crypto');

const util = require('util'); // to promisify scrypt result

const scrypt = util.promisify(crypto.scrypt);

const login = require('../views/auth/login');

const signup = require('../views/auth/signup');

const { db } = require('./db/database');

const validators = require('./validators');

router.get('/login', (req, res) => {
	res.send(login(req.session.userName));
});

router.get('/logout', (req, res) => {
	req.session = null;

	res.redirect('/');
});

router.post('/login', [ validators.requireEmailExists, validators.requireValidPassword ], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.send(login(req.session.userName, errors.mapped()));
	}

	const user = await db.select('*').table('users').where({ email: req.body.email });

	req.session = { userId: user[0].id, userName: user[0].name };
	res.redirect('/');
});

router.get('/signup', (req, res) => {
	res.send(signup(req.session.userName));
});

router.post(
	'/signup',
	[
		validators.requireName,
		validators.requireEmail,
		validators.requirePassword,
		validators.requirePasswordConfirmation
	],
	async (req, res) => {
		const { name, email, password } = req.body;

		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.send(signup(req.session.userName, errors.mapped()));
		}

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
	}
);

module.exports = router;
