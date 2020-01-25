const parsePage = require("./testPage");
const storeETF = require("../db/storing");

async function testModel() {
  const etf = await parsePage();
  await storeETF(etf);
}

testModel();
