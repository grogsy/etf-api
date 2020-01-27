const fs = require("fs");
const path = require("path");

const { Href } = require("../meta");

module.exports = async function() {
  let seedFilePath = path.join(__dirname, "etf_links.txt");

  let links = fs.readFileSync(seedFilePath, "utf8").split("\n");
  for (let link of links) {
    let newLink = await Href.create({ link });
    console.log(newLink.link + " stored to db.");
  }
  console.log("Done uploading.");
};
