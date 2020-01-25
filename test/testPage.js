const parsePage = require("../parsing");

async function test() {
  console.log("Parsing: " + process.argv[2]);
  const res = await parsePage(process.argv[2]);
  console.log(JSON.stringify(res, null, 2));
  return res;
}

module.exports = test;
