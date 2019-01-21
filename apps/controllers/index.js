var express = require("express");

var router = express.Router();

router.use("/blog", require(__dirname + "/blog"));

router.get("/", function (req, res) {
    res.json({"message": "this is Home Page"});
});
router.get("/chat", function (req, res) {
    res.render("chat");
});

module.exports = router;