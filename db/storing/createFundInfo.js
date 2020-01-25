const { FundInfo } = require("../models");

module.exports = async function(etfId, fundInfo) {
  const newFundInfo = await FundInfo.create({ etfId, ...fundInfo });
  console.log("Fund Info successfully created: " + newFundInfo.etfId);
};
