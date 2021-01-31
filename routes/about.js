const express = require("express");

const router = express.Router();

router.get("/about", (req, res) => {
  res.send(`<h4>Page under construction!</h4>`);
});

module.exports = router;
