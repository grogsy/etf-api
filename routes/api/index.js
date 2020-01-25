const router = require("express").Router();

router.use("/etf", require("./etf"));

module.exports = router;
