const { Sector } = require("../../models");

module.exports = async function(etfId, sectors, type) {
  let newSector;
  for (let sector of sectors) {
    newSector = await Sector.create({ etfId, type, ...sector });
    // console.log("Sector successfully created: " + newSector.etfId);
  }
};
