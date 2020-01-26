const ETF = require("./ETF");
const FundInfo = require("./FundInfo");
const GeoBreakdown = require("./GeoBreakdown");
const Holding = require("./Holding");
const Sector = require("./Sector");
const User = require("./User");
const ApiKey = require("./ApiKey");

User.hasOne(ApiKey);
ApiKey.belongsTo(User);

ETF.hasOne(FundInfo, { foreignKey: "etfId", onDelete: "cascade" });
FundInfo.belongsTo(ETF);

ETF.hasMany(Sector, { foreignKey: "etfId", onDelete: "cascade" });
Sector.belongsTo(ETF);

ETF.hasMany(Holding, { foreignKey: "etfId", onDelete: "cascade" });
Holding.belongsTo(ETF);

ETF.hasMany(GeoBreakdown, { foreignKey: "etfId", onDelete: "cascade" });
GeoBreakdown.belongsTo(ETF);

module.exports = {
  ETF,
  FundInfo,
  GeoBreakdown,
  Holding,
  Sector,
  User,
  ApiKey
};
