const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "ec2-34-193-232-231.compute-1.amazonaws.com",
    user: "kzbkjuzbftqria",
    password:
      "02912f2dde074205f278bdb29aa21621e8b04f787e61ae497ae90f507f736cf1",
    database: "dbc6j8d1fjjao1",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { db };
