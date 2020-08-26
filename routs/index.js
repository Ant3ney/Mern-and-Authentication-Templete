//index routs
var express = require("express");
var router = express.Router();

//Show landing page
router.get("/", (req, res) => {
	res.render("index");
});

module.exports = router;