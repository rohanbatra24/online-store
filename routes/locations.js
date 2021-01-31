const express = require("express");

const router = express.Router();
const layout = require("../views/layout");

router.get("/contact", (req, res) => {
  res.send(
    layout(
      req.session.userName,
      `<h4 class='locationsPageContent'>Page under construction!</h4><img class='underConstructionImg'src='https://www.pngkit.com/png/detail/208-2087380_construction-icon-under-construction.png'/>`
    )
  );
});

module.exports = router;
