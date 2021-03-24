const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "rohanbatra",
    password: "",
    database: "ecommerce",
  },
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = { db };
