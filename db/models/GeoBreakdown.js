const Sequelize = require("sequelize");
const db = require("../db");

const GeoBreakdown = db.define(
  "geobreakdown",
  {
    country: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmtpy: true
      }
    },
    weight: {
      type: Sequelize.DECIMAL(4, 2),
      allowNull: false
    }
  },
  {
    timestamps: false
  }
);

module.exports = GeoBreakdown;
