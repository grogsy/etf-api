const { GeoBreakdown } = require("../../models");

module.exports = async function(etfId, weights) {
  let newGeoWeight;

  for (let weight of weights) {
    newGeoWeight = await GeoBreakdown.create({ etfId, ...weight });
    // console.log("Country Weight successfully created: " + newGeoWeight.etfId);
  }
};
