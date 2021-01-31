const express = require("express");
const layout = require("../views/layout");

const router = express.Router();

router.get("/about", (req, res) => {
  res.send(
    layout(
      req.session.userName,
      `<h4 class='aboutPageContent'>Page under construction!</h4><img class='underConstructionImg'src='https://www.pngkit.com/png/detail/208-2087380_construction-icon-under-construction.png'/>`
    )
  );
});

module.exports = router;
