const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const knex = require('knex');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

const db = knex({
	client     : 'pg',
	connection : {
		host     : '127.0.0.1',
		user     : 'rohanbatra',
		password : '',
		database : 'ecommerce'
	}
});

const homepage = require('./views/homepage');

const cart = require('./views/cart');

const login = require('./views/login');

app.get('/', (req, res) => {
	const cookie = req.cookies;

	if (cookie.userId) {
		db.select('*').table('products').then((products) => res.send(homepage(products)));
	}
	else {
		res.redirect('/login');
	}
});

app.get('/login', (req, res) => {
	res.send(login());
});

app.post('/login', (req, res) => {
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

app.get('/signup', (req, res) => {
	res.send(homepage(database.products));
});

app.post('/signup', (req, res) => {
	res.send(homepage(database.products));
});

app.post('/addtocart/:id', (req, res) => {
	// how to communicate the id of the product in the post request:
	// There are two options to do this -
	// 1. put the id of the product at the end of the url. for eg. /addtocart/${product.id} and make this route /addtocart/:id & read with req.params.id
	// 2. add a hidden input element inside the form and give it a value attr of ${product.id} and name attr of productID, then you can read that info from inside the route handler with req.body.productID

	const productId = req.params.id;

	const userId = req.cookies.userId;

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

app.get('/cartItems', (req, res) => {
	db.select('*').table('cartitems').then((data) => res.send(data));
});

app.get('/products', (req, res) => {
	db.select('*').table('products').then((data) => res.send(data));
});

app.get('/cart', (req, res) => {
	const cookie = req.cookies;

	if (cookie.userId) {
		db('cart')
			.join('cartitems', 'cart.id', '=', 'cart_id')
			.join('products', 'products.id', '=', 'product_id')
			.from('cart')
			.where({ user_id: cookie.userId })
			.select('*')
			.then((data) => res.send(cart(data)));
	}
	else {
		res.redirect('/login');
	}

	// db.select('*').table('cart').where({ id: 1 }).then((data) => res.send(cart(data)));
});

app.get('/users', (req, res) => {
	db.select('*').table('users').then((data) => res.send(data));
});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
