const createETF = require("./createETF");
const createFundInfo = require("./createFundInfo");
const createHoldings = require("./createHoldings");
const createSectors = require("./createSectors");
const createGeoWeight = require("./createGeoWeight");

module.exports = async function(etf) {
  // create etf model
  const newETF = await createETF(etf.name, etf.ticker);

  // create fundInfo model
  await createFundInfo(newETF.id, etf.fundInfo);

  // create holding model
  if (etf.topHoldings) {
    if (etf.topHoldings.fundHoldings.length) {
      await createHoldings(newETF.id, etf.topHoldings.fundHoldings, "Fund");
    }
    if (etf.topHoldings.indexHoldings.length) {
      await createHoldings(newETF.id, etf.topHoldings.indexHoldings, "Index");
    }
  }

  // create sector model
  if (etf.sectorAllocation) {
    if (etf.sectorAllocation.fundSector.length) {
      await createSectors(newETF.id, etf.sectorAllocation.fundSector, "Fund");
    }
    if (etf.sectorAllocation.indexSector.length) {
      await createSectors(newETF.id, etf.sectorAllocation.indexSector, "Index");
    }
  }

  // create geo weight model
  if (etf.geographicalBreakdown) {
    await createGeoWeight(newETF.id, etf.geographicalBreakdown);
  }
};
