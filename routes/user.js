const express = require("express"),
  router = express.Router()
  

router.get("/", function (req, res, next) {
    //carregar dash
  res.render("user", {user: req.user});
  console.log(req.user)
});


module.exports = router;
