const Sequelize = require("sequelize");
const db = require("../db");

const GeoBreakdown = db.define(
  "geobreakdown",
  {
    country: {
      type: Sequelize.STRING,
      allowNull: false
      // for some reason this validator breaks this model ONLY
      // validate: {
      //   notEmtpy: true
      // }
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

module.exports = GeoBreakdown;
