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

router.post(
	'/login',
	[
		check('email')
			.trim()
			.normalizeEmail()
			.isEmail()
			.withMessage('Must provide a valid email')
			.custom(async (email) => {
				const user = await db('users').select('*').where({ email: email });
				if (!user.length) {
					throw new Error('Email not found');
				}
			}),
		check('password').trim().custom(async (password, { req }) => {
			const comparePasswords = async (dbPass, supplied) => {
				const [ hashed, salt ] = dbPass.split('.');
				const suppliedHashedBuf = await scrypt(supplied, salt, 64);
				return hashed === suppliedHashedBuf.toString('hex');
			};

			const user = await db.select('*').table('users').where({ email: req.body.email });

			if (!user[0]) {
				throw new Error('Invalid Password');
			}

			if ((await comparePasswords(user[0].password, password)) === false) {
				throw new Error('Invalid password');
			}
		})
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			console.log('not empty');
			return res.send(login(req.session.userName, errors.mapped()));
		}

		const user = await db.select('*').table('users').where({ email: req.body.email });

		req.session = { userId: user[0].id, userName: user[0].name };
		res.redirect('/');
	}
);

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
