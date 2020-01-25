const Sequelize = require("sequelize");
const db = require("../db");

const FundInfo = db.define(
  "fundinfo",
  {
    benchmark: {
      type: Sequelize.STRING
    },
    inceptionDate: {
      type: Sequelize.STRING
    },
    optionsAvailable: {
      type: Sequelize.STRING
    },
    grossExpenseRatio: {
      type: Sequelize.DECIMAL(4, 2)
    },
    netExpenseRatio: {
      type: Sequelize.DECIMAL(4, 2)
    },
    investmentManager: {
      type: Sequelize.STRING
    },
    managementTeam: {
      type: Sequelize.STRING
    },
    distributor: {
      type: Sequelize.STRING
    },
    distributionFrequency: {
      type: Sequelize.STRING
    }
    // distributionFrequency: {
    //     type: Sequelize.ENUM('Monthly', 'Quarterly')
    // }
  },
  {
    timestamps: false
  }
);

module.exports = FundInfo;
