const express = require("express");
const server = express();
const db = require("./db");

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const api = require("./routes/api");
server.use("/api", api);

// omit null values from being returned on row fetches
server.set("json replacer", (k, v) => (v === null ? undefined : v));

const PORT = 4000;
const TWENTY_FOUR_HOURS = 86400000;

db.sync({ force: true }).then(() => {
  server.listen(PORT, async () => {
    console.log(`up on ${PORT}`);

    const parsePage = require("./parsing");
    const storeETF = require("./db/storing");
    const testUrl =
      "https://www.ssga.com/us/en/individual/etfs/funds/spdr-blackstone-gso-senior-loan-etf-srln";

    const etf = await parsePage(testUrl);
    await storeETF(etf);

    //   setInterval(() => {
    //     console.log("Server is updating data...")
    //     updateDb();
    //     console.log('...done.')
    //   }, TWENTY_FOUR_HOURS);
    // setInterval(() => {
    //   console.log("half minute interval running");
    // }, 30000);
  });
});
