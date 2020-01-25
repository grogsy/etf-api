const router = require("express").Router();
const { notLoggedIn } = require("../authMiddleware");

router.post("/", notLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
