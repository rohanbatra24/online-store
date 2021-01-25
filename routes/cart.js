const express = require('express');

const router = express.Router();

const { db } = require('./db/database');

const cart = require('../views/products/cart');

router.get('/cart', (req, res) => {
	if (req.session.userId) {
		db('cart')
			.join('cartitems', 'cart.id', '=', 'cart_id')
			.join('products', 'products.id', '=', 'product_id')
			.from('cart')
			.where({ user_id: req.session.userId })
			.select('*', 'cartitems.id')
			.then((data) => res.send(cart(req.session.userName, data)));
	}
	else {
		res.redirect('/login');
	}
});

router.post('/removecartitem/:id', (req, res) => {
	id = req.params.id;

	db('cartitems')
		.where({ id: id })
		.decrement('quantity', 1)
		.returning('quantity')
		.then((qty) => {
			if (qty[0] < 1) {
				db('cartitems').where({ id: id }).del().then(() => res.redirect('/cart'));
			}
			else {
				res.redirect('/cart');
			}
		})
		.catch((err) => console.log('err', err));
});

router.post('/addtocart/:id', (req, res) => {
	// how to communicate the id of the product in the post request:
	// There are two options to do this -
	// 1. put the id of the product at the end of the url. for eg. /addtocart/${product.id} and make this route /addtocart/:id & read with req.params.id
	// 2. add a hidden input element inside the form and give it a value attr of ${product.id} and name attr of productID, then you can read that info from inside the route handler with req.body.productID

	const productId = req.params.id;

	console.log('req.params.id', req.params.id);

	const userId = req.session.userId;

	let cartId;

	db('cart')
		.where({ user_id: userId })
		.then((data) => {
			if (!data.length) {
				db('cart').insert({ user_id: userId, datecreated: new Date() }).returning('*').then((data) => {
					cartId = data[0].id;
				});
			}
			else {
				cartId = data[0].id;
			}
		})
		.then(() => {
			db('cartitems')
				.where({
					product_id : productId,
					cart_id    : cartId || 0
				})
				.then((data) => {
					if (data.length > 0) {
						db('cartitems')
							.where({ product_id: productId, cart_id: cartId })
							.increment('quantity', 1)
							.then((data) => data)
							.catch((err) => console.log('err', err));
					}
					else {
						db('products')
							.where({
								id : productId
							})
							.select('id', 'title', 'price')
							.then((data) => {
								console.log('data', data);
								db('cartitems')
									.insert({
										cart_id    : cartId,
										product_id : data[0].id,
										quantity   : 1,
										price      : data[0].price
									})
									.catch((err) => console.log('err', err));
							});
					}
				})
				.catch((err) => console.log('err', err));
		});

	res.redirect('/');
});

module.exports = router;
