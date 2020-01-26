const router = require("express").Router();

router.use("/etf", require("./etf"));
router.use("/key", require("./key"));

module.exports = router;
