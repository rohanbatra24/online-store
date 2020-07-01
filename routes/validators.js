const { check } = require('express-validator');

const { db } = require('./db/database');

module.exports = {
	requireName                 : check('name').notEmpty().withMessage('Name cannot be empty'),
	requireEmail                : check('email')
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage('Must be a valid email')
		.custom(async (email) => {
			const exists = await db('users').where({ email: email }).select('*');

			if (exists.length) {
				throw new Error('Email in use');
			}
		}),
	requirePassword             : check('password')
		.trim()
		.isLength({ min: 4, max: 10 })
		.withMessage('Must be between 4 and 20 characters'),
	requirePasswordConfirmation : check('passwordConfirmation')
		.trim()
		.isLength({ min: 4, max: 10 })
		.withMessage('Must be between 4 and 20 characters')
		.custom((passwordConfirmation, { req }) => {
			if (passwordConfirmation !== req.body.password) {
				throw new Error('Passwords must match');
			}
			else {
				return true;
			}
		})
};
