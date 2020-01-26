const initializeEtfDb = require("./initETFDb");
const getEtfLinks = require("./getETFLinks");

async function init() {
  await getEtfLinks();
  await initializeEtfDb();
}

init();
