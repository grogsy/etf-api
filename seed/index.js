const uploadETFLinks = require("./uploadETFLinks");
const db = require("../db");

db.sync({ force: true }).then(async () => {
  await uploadETFLinks();
});
