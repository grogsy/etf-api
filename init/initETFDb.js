const db = require("../db");
const parsePage = require("../parsing");
const storeETF = require("../db/querying/storing");
const { Href } = require("../meta");

module.exports = async function() {
  // db.sync().then(async function() {
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
  // });
};
