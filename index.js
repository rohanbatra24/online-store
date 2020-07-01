const express = require('express');

const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors());

const productsRouter = require('./routes/products');

const authRouter = require('./routes/auth');

const cartRouter = require('./routes/cart');

const adminRouter = require('./routes/admin');

app.use(productsRouter);

app.use(authRouter);

app.use(cartRouter);

app.use(adminRouter);

app.listen(3000, () => {
	console.log('App listening on port 3000!');
});
