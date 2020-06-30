const knex = require('knex');

const db = knex({
	client     : 'pg',
	connection : {
		host     : '127.0.0.1',
		user     : 'rohanbatra',
		password : '',
		database : 'ecommerce'
	}
});

module.exports = { db };
