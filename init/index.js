const initializeEtfDb = require("./initETFDb");
const getEtfLinks = require("./getETFLinks");
const db = require("../db");

async function init() {
  db.sync({ force: true }).then(async () => {
    console.log("Setting up database...");
    await getEtfLinks();
    await initializeEtfDb();
    console.log("Setup successful.");
  });
}

init();
