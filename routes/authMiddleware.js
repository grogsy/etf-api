// middleware here to check:
//      -if api key is valid
//      -if user is currently logged in
//
// example api key validator to check api key is valid
// function isApiKeyValid(req, res, next) {
//   let token = Tokens.findOne({ where: { key: req.query.key } });
//   if (!token) {
//     return res.status(403).json({ "403": "Unauthorized" });
//   }
//   next();
// }

function alreadyLoggedIn(req, res, next) {
  if (req.user) {
    return res.json({ msg: "Already logged in." });
  } else {
    next();
  }
}

function notLoggedIn(req, res, next) {
  if (!req.user) {
    return res.json({ msg: "Not logged in" });
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

module.exports = {
  alreadyLoggedIn,
  notLoggedIn,
  badPassword
};
