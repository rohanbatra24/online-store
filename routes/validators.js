const { check } = require("express-validator");

const { db } = require(__dirname + "./db/database");

const util = require("util"); // to promisify scrypt result

const crypto = require("crypto");

const scrypt = util.promisify(crypto.scrypt);

module.exports = {
  requireName: check("name").notEmpty().withMessage("Name cannot be empty"),
  requireEmail: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (email) => {
      const exists = await db("users").where({ email: email }).select("*");

      if (exists.length) {
        throw new Error("Email in use");
      }
    }),
  requirePassword: check("password")
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage("Must be between 4 and 20 characters"),
  requirePasswordConfirmation: check("passwordConfirmation")
    .trim()
    .isLength({ min: 4, max: 10 })
    .withMessage("Must be between 4 and 20 characters")
    .custom((passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error("Passwords must match");
      } else {
        return true;
      }
    }),
  requireEmailExists: check("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Must provide a valid email")
    .custom(async (email) => {
      const user = await db("users").select("*").where({ email: email });
      if (!user.length) {
        throw new Error("Email not found");
      }
    }),
  requireValidPassword: check("password")
    .trim()
    .custom(async (password, { req }) => {
      const comparePasswords = async (dbPass, supplied) => {
        const [hashed, salt] = dbPass.split(".");
        const suppliedHashedBuf = await scrypt(supplied, salt, 64);
        return hashed === suppliedHashedBuf.toString("hex");
      };

      const user = await db
        .select("*")
        .table("users")
        .where({ email: req.body.email });

      if (!user[0]) {
        throw new Error("Invalid Password");
      }

      if ((await comparePasswords(user[0].password, password)) === false) {
        throw new Error("Invalid password");
      }
    }),
};
