// example api key validator to check api key is valid
function isApiKeyValid(req, res, next) {
  let token = Tokens.findOne({ where: { key: req.query.key } });
  if (!token) {
    return res.status(403).json({ "403": "Unauthorized" });
  }
  next();
}
