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
	const comparePasswords = async (dbPass, supplied) => {
		const arr = dbPass.split('.');
		const [ hashed, salt ] = arr;

		const suppliedHashedBuf = await scrypt(supplied, salt, 64);

		return hashed === suppliedHashedBuf.toString('hex');
	};

	db.select('*').table('users').where({ email: req.body.email }).then(async (data) => {
		if (data.length) {
			if (await comparePasswords(data[0].password, req.body.password)) {
				req.session = { userId: data[0].id, userName: data[0].name };
				res.redirect('/');
			}
			else {
				res.send('wrong password');
			}
		}
		else {
			res.send('User email does not exist');
		}
	});
});

router.get('/signup', (req, res) => {
	res.send(signup());
});

router.post('/signup', async (req, res) => {
	const { name, email, password, passwordConfirmation } = req.body;

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
