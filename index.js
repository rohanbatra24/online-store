const express = require('express');

const app = express();

const PORT = process.env.PORT

const cors = require('cors');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const cookieSession = require('cookie-session');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cookieParser());

app.use(
	cookieSession({
		keys : [ 'bytfi76g86f8og7hgo' ]
	})
);

app.use(cors());

const productsRouter = require('./routes/products');

const authRouter = require('./routes/auth');

const cartRouter = require('./routes/cart');

const adminRouter = require('./routes/admin');

app.use(productsRouter);

app.use(authRouter);

app.use(cartRouter);

app.use(adminRouter);

app.listen(PORT, () => {
	console.log('App listening on port 3000!');
});
