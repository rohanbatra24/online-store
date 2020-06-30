const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

const knex = require('knex');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

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

const admin = require('./views/admin');

const addProduct = require('./views/addproduct');

const categories = require('./views/categories');

const adminCategories = require('./views/adminCategories');

const addcategory = require('./views/addCategory');

const categoryView = require('./views/categoryView');

app.get('/', (req, res) => {
	const cookie = req.cookies;

	if (cookie.userId) {
		db.select('*').table('products').then((products) => res.send(homepage(cookie, products)));
	}
	else {
		res.redirect('/login');
	}
});

app.get('/login', (req, res) => {
	res.send(login(req.cookies.userId));
});

app.get('/logout', (req, res) => {
	res.clearCookie('userId');
	res.redirect('/');
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

app.get('/cart', (req, res) => {
	const cookie = req.cookies;

	if (cookie.userId) {
		db('cart')
			.join('cartitems', 'cart.id', '=', 'cart_id')
			.join('products', 'products.id', '=', 'product_id')
			.from('cart')
			.where({ user_id: cookie.userId })
			.select('*', 'cartitems.id')
			.then((data) => res.send(cart(req.cookies.userId, data)));
	}
	else {
		res.redirect('/login');
	}
});

app.get('/admin', (req, res) => {
	const categories = [];

	db
		.select('name')
		.table('categories')
		.then((data) => {
			for (let key of data) {
				categories.push(key.name);
			}
		})
		.then(() => {
			db
				.select('products.id', 'title', 'image', 'price', 'category_id', 'name')
				.table('products')
				.join('categories', 'categories.id', '=', 'category_id')
				.then((products) => {
					res.send(admin(req.cookies.userId, products));
				})
				.catch((err) => console.log('err', err));
		})
		.catch((err) => console.log('err', err));
});

app.get('/admin/addproduct', (req, res) => {
	const categories = [];

	db.select('name').table('categories').then((data) => {
		for (let key of data) {
			categories.push(key.name);
		}

		res.send(addProduct(req.cookies.userId, categories));
	});
});

app.get('/admin/addcategory', (req, res) => {
	res.send(addcategory(req.cookies.userId));
});

app.post('/admin/deletecategory/:id', (req, res) => {
	db('categories')
		.where({ id: req.params.id })
		.del()
		.then(() => res.redirect('/admin/categories'))
		.catch((err) => console.log('err', err));
});

app.post('/admin/deleteproduct/:id', (req, res) => {
	db('products')
		.where({ id: req.params.id })
		.del()
		.then(() => res.redirect('/admin'))
		.catch((err) => console.log('err', err));
});

app.post('/admin/addproduct', upload.single('image'), (req, res) => {
	// console.log(req.file.buffer.toString('base64'));

	const { title, price, image, category } = req.body;

	console.log('category', category);

	db('categories').where({ name: category }).then((category) => {
		db('products')
			.insert({ title: title, price: price, category_id: category[0].id, image: image })
			.returning('*')
			.then((data) => {
				res.redirect('/admin');
			});
	});
});

app.post('/admin/addcategory', (req, res) => {
	const { name } = req.body;

	db('categories').insert({ name: name }).returning('*').then((data) => {
		res.redirect('/categories');
	});
});

app.get('/admin/categories', (req, res) => {
	db
		.select('*')
		.table('categories')
		.then((categoriesList) => res.send(adminCategories(req.cookies.userId, categoriesList)));
});

app.get('/categories', (req, res) => {
	db
		.select('*')
		.table('categories')
		.then((categoriesList) => res.send(categories(req.cookies.userId, categoriesList)));
});

app.get('/categories/:id', (req, res) => {
	catId = req.params.id;

	db
		.select('*')
		.table('categories')
		.join('products', 'categories.id', '=', 'category_id')
		.where({ category_id: catId })
		.then((products) => res.send(categoryView(req.cookies.userId, products)));
});

app.post('/removecartitem/:id', (req, res) => {
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

app.post('/upload', upload.single('avatar'), function(req, res, next) {
	// req.file is the `avatar` file
	console.log(req.file);
	// req.body will hold the text fields, if there were any
});

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
