const router = require("express").Router();
const uuidv4 = require("uuid/v4");
const { ApiKey } = require("../../db/models");
const { notLoggedIn } = require("../authMiddleware");

router.get("/", notLoggedIn, async (req, res, next) => {
  try {
    const key = await ApiKey.findOne({ where: { userId: req.user.id } });
    if (!key) {
      res
        .status(404)
        .json({ status: 404, msg: "No API key set for current user." });
    } else {
      res.json({ key: key.value });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/generate", notLoggedIn, async (req, res, next) => {
  try {
    const newKey = uuidv4();
    let key = await ApiKey.findOne({ where: { userId: req.user.id } });
    if (key) {
      await key.update({ value: newKey });
    } else {
      key = await ApiKey.create({ userId: req.user.id, value: newKey });
    }
    res.json({
      key: key.value,
      msg: "API key created successfully.",
      usage:
        "Append ?key=<YOUR_API_KEY_HERE> to url paths calling the API. This key will expire after 24 hours."
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
