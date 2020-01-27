const http = require("http");
const server = require("./server");
const db = require("./db");
const updateETFs = require("./db/querying/updating");

const { TWENTY_FOUR_HOURS, FIVE_MINUTES } = require("./constants");

db.sync({ force: true }).then(() => {
  server.listen(server.etc.port, async () => {
    console.log(`up on ${server.etc.port}`);

    // if deployed on heroku ping page this is hosted on so it doesn't sleep
    setInterval(() => {
      console.log("keep alive ping");
      http.get("http://spdr-etf-api.herokuapp.com");
    }, FIVE_MINUTES);

    setInterval(async () => {
      console.log("Server is updating data...");
      await updateETFs();
      console.log("...done.");
    }, TWENTY_FOUR_HOURS);
  });
});
