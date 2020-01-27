const fs = require("fs");
const path = require("path");

const { Href } = require("../meta");

async function createSeedFile() {
  let seedFilePath = path.join(__dirname, "etf_links.txt");
  let etfs = await Href.findAll();
  let links = etfs.map(etf => etf.link).join("\n");

  console.log("Generating seed file.");
  fs.writeFile(seedFilePath, links, err => {
    if (err) throw err;

    console.log("Done. Check seed folder for seed file.");
  });
}

createSeedFile();
