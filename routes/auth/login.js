const router = require("express").Router();
const { User } = require("../../db/models");
const { alreadyLoggedIn } = require("../authMiddleware");

router.post("/", alreadyLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
      attributes: { exclude: ["id", "password", "salt"] }
    });
    if (!user || !user.correctPassword(req.body.password)) {
      res.status(401).json({ status: 401, reason: "Incorrect Email/Password" });
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
