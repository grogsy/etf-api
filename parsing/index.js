const JSSoup = require("jssoup").default;

const { syncRequest, asyncRequest } = require("../requests");

const parseFundInfo = require("./parseFundInfo");
const parseTopHoldings = require("./parseTopHoldings");
const parseCountryWeight = require("./parseCountryWeight");
const parseSectorAllocation = require("./parseSectorAllocation");

module.exports = async function(url) {
  const body = await asyncRequest(url);
  const soup = new JSSoup(body);

  const name = soup
    .find("h1")
    .find("span")
    .getText();

  const ticker = soup.find("span", "ticker").getText();

  // get fund info
  fundInfoEle = soup.find("div", "fund-info");
  fundInfo = parseFundInfo(fundInfoEle);

  // get top holdings
  const topHoldingsEle = soup.find("div", "top-holdings");
  const topHoldings = parseTopHoldings(topHoldingsEle);

  // get sector weight
  const sectorAllocationEle = soup.find("div", "sector_allocation");
  const sectorAllocation = parseSectorAllocation(sectorAllocationEle);

  // get country weight
  const countryWeightEle = soup.find("input", {
    id: "fund-geographical-breakdown"
  });
  const geographicalBreakdown = parseCountryWeight(countryWeightEle);

  let mockJSONObj = {
    name,
    ticker,
    fundInfo,
    topHoldings,
    geographicalBreakdown,
    sectorAllocation
  };

  return mockJSONObj;
};
