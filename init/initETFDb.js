const parsePage = require("../parsing");
const storeETF = require("../db/querying/storing");
const { Href } = require("../meta");

async function initETFDb() {
  let etfs = await Href.findAll();
  etfs = etfs.map(etf => etf.link);

  let i = 1;
  for (let link of etfs) {
    console.log("Parsing: " + link + " (" + i + " of 140)");
    let res = await parsePage(link);
    console.log("Storing: " + res.name + " into databse... (" + i + " of 140)");
    await storeETF(res);
    i++;
  }
  console.log("Done.");
}

module.exports = initETFDb;
