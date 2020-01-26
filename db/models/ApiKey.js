const Sequelize = require("sequelize");
const db = require("../db");

const ApiKey = db.define("apikey", {
  value: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
});

module.exports = ApiKey;
