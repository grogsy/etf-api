const router = require("express").Router();
const { notLoggedIn } = require("../authMiddleware");

router.post("/", notLoggedIn, (req, res) => {
  try {
    req.logout();
    req.session.destroy();
    res.status(204).json({ status: 204, msg: "Logged out successfully." });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
