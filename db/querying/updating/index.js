const { Href } = require("../../../meta");
const parsePage = require("../../../parsing");
const updateETF = require("./updateETF");

module.exports = async function() {
  let etfs = await Href.findAll();
  let links = etfs.map(etf => etf.link);
  for (let link of links) {
    let etf = await parsePage(link);
    await updateETF(etf);
  }
};
