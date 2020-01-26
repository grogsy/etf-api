const { ApiKey } = require("../db/models");
const { TWENTY_FOUR_HOURS } = require("../constants");

function alreadyLoggedIn(req, res, next) {
  if (req.user) {
    return res.json({ status: 204, msg: "Already logged in." });
  } else {
    next();
  }
}

function notLoggedIn(req, res, next) {
  if (!req.user) {
    return res.json({ status: 401, msg: "Not logged in" });
  } else {
    next();
  }
}

function badPassword(req, res, next) {
  if (req.body.password.length < 8) {
    return res.status(401).json({
      status: 401,
      reason: "Password is too short. 8 characters required."
    });
  } else {
    next();
  }
}

function unauthorizedAccess(req, res, next) {
  if (!req.user) {
    return res
      .status(403)
      .json({ status: 403, reason: "Unauthorized/not logged in." });
  } else {
    next();
  }
}

async function validateApiKey(req, res, next) {
  let { key } = req.query;

  // validate the key exists on the url param
  if (!key) {
    return res
      .status(400)
      .json({ status: 400, reason: "API key is required." });
  }

  // validate the key belongs to the current user
  key = await ApiKey.findOne({ where: { value: key, userId: req.user.id } });
  if (!key) {
    return res.status(401).json({
      status: 401,
      reason: "The key provided does not match with the current user."
    });
  }

  // validate the key hasn't expired
  if (Date.now() - Date.parse(key.updatedAt) > TWENTY_FOUR_HOURS) {
    return res.status(401).json({
      status: 401,
      reason:
        "This API key is expired and can no longer be used. You must generate a new API key to continue."
    });
  }

  next();
}

module.exports = {
  alreadyLoggedIn,
  notLoggedIn,
  badPassword,
  unauthorizedAccess,
  validateApiKey
};
