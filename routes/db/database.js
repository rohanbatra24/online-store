const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "ec2-52-3-4-232.compute-1.amazonaws.com",
    user: "wcolmwychdvnks",
    password:
      "1ed027e47503ef655d779c66e5db1df11c98740b7081c0424cfb0dbf6051354b",
    database: "dc4u844hrlijvr",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports = { db };
