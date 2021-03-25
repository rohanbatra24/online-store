const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "",
    user: "",
    password:
      "",
    database: "",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { db };
