const Sequelize = require("sequelize");
const db = require("../db");

const ETF = db.define(
  "etf",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    ticker: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    timestamps: false
  }
);

module.exports = ETF;
