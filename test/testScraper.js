const parsePage = require("../parsing");
const Hrefs = require("../meta").Href;

const main = async () => {
  let etfs = await Hrefs.findAll();
  etfs = etfs.map(link => link.link);

  let res;
  let i = 1;
  for (let link of etfs) {
    console.log("Parsing: " + link + " (" + i + " of 140)");
    res = await parsePage(link);
    // console.log(JSON.stringify(res, null, 2));
    i++;
  }
};

main();

module.exports = main;
