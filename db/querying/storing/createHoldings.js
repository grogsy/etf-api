const { Holding } = require("../../models");

module.exports = async function(etfId, holdings, type) {
  let newHolding;
  for (let holding of holdings) {
    newHolding = await Holding.create({ etfId, type, ...holding });
    // console.log("Holding successfully created: " + newHolding.etfId);
  }
};
