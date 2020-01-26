const Sequelize = require("sequelize");
const db = require("../db");

// holding can potentially list extra information: such as:
//      -shares held
//      -market cap
//      -market value
//      -ISIN

const Holding = db.define(
  "holding",
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

module.exports = Holding;
