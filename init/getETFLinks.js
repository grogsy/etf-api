const { Builder, By } = require("selenium-webdriver");
const { Href, db } = require("../meta");

const url = "https://www.ssga.com/us/en/individual/etfs/fund-finder";

module.exports = async function() {
  db.sync().then(async function() {
    let driver = await new Builder().forBrowser("firefox").build();

    // automate consent form
    await driver.get(url);
    await driver.findElement(By.id("individual")).click();
    await driver.findElement(By.id("js-ssmp-clrButtonLabel")).click();

    let links = await driver.findElements(By.className("fundname"));
    links = links.slice(1, 141);

    for (let link of links) {
      let href = await link.findElement(By.tagName("a")).getAttribute("href");
      // cache links to backend... don't have to fire up webdriver every run now
      console.log("Inserting " + href + "into db...");
      await Href.create({ link: href });
    }

    driver.quit();
  });
};
