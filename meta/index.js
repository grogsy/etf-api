const Sequelize = require("sequelize");
const db = require("../db");

// store links in the db so we don't have to hit the webpage everytime to update
const Href = db.define("href", {
  link: {
    type: Sequelize.STRING,
    unique: true
  }
});

module.exports = { Href };
