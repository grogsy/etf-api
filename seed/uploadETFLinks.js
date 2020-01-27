const fs = require("fs");
const path = require("path");

const { Href } = require("../meta");

module.exports = async function() {
  let seedFilePath = path.join(__dirname, "etf_links.txt");

  fs.readFile(seedFilePath, "utf8", async (err, content) => {
    if (err) throw err;

    console.log("Running upload script.");
    let links = content.split("\n");
    for (let link of links) {
      let newLink = await Href.create({ link });
      console.log(newLink.link + " stored to db.");
    }
    // console.log(content.split("\n"));
  });
};
