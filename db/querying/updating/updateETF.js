const storeETF = require("../storing");
const { ETF } = require("../../models");

module.exports = async function(etf) {
  const oldETF = await ETF.findOne({ where: { ticker: etf.ticker } });
  await oldETF.destroy();

  const newETF = await storeETF(etf);
  console.log("ETF successfully updated: " + newETF.name);
};
