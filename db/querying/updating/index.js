const { Href } = require("../../../meta");
const updateETF = require("./updateETF");

module.exports = async function() {
  let etfs = await Href.findAll();
  etfs = etfs.map(etf => etf.link);
  for (let etf of etfs) {
    await updateETF(etf);
  }
};
