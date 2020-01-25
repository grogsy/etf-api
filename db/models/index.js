const ETF = require("./ETF");
const FundInfo = require("./FundInfo");
const GeoBreakdown = require("./GeoBreakdown");
const Holding = require("./Holding");
const Sector = require("./Sector");

ETF.hasOne(FundInfo, { foreignKey: "etfId" });
FundInfo.belongsTo(ETF);

ETF.hasMany(Sector, { foreignKey: "etfId" });
Sector.belongsTo(ETF);

ETF.hasMany(Holding, { foreignKey: "etfId" });
Holding.belongsTo(ETF);

ETF.hasMany(GeoBreakdown, { foreignKey: "etfId" });
GeoBreakdown.belongsTo(ETF);

module.exports = {
  ETF,
  FundInfo,
  GeoBreakdown,
  Holding,
  Sector
};
