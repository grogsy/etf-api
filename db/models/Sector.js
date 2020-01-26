const Sequelize = require("sequelize");
const db = require("../db");

const Sector = db.define(
  "sector",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    type: {
      type: Sequelize.ENUM("Fund", "Index"),
      allowNull: false
    },
    weight: {
      type: Sequelize.DECIMAL(5, 2),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = Sector;
