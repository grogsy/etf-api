const router = require("express").Router();
const { User } = require("../../db/models");
const { alreadyLoggedIn, badPassword } = require("../authMiddleware");

router.post("/", [alreadyLoggedIn, badPassword], async (req, res, next) => {
  try {
    const user = await User.create({ ...req.body });
    req.login(user, err =>
      err
        ? next(err)
        : res.json({ status: 200, user: user.email, msg: "User created." })
    );
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      res
        .status(409)
        .json({ status: 409, reason: "That email is currently in use." });
    } else if (error.name === "SequelizeValidationError") {
      res.status(400).json({ status: 400, reason: "Invalid Email." });
    } else {
      next(error);
    }
  }
});

module.exports = router;
