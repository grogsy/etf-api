function parseHoldings(holdings) {
  if (!holdings) {
    return [];
  }
  const names = holdings.findAll("td", "label").map(ele => ele.getText());
  const weights = holdings.findAll("td", "weight").map(ele => ele.getText());

  return names.map((name, index) => ({
    name,
    weight: +weights[index].replace("%", "")
  }));
}

module.exports = function(topHoldings) {
  if (!topHoldings) {
    return null;
  }
  const fundHoldingsEle = topHoldings.find("div", "fund-top-holdings");
  const fundHoldings = parseHoldings(fundHoldingsEle);

  const indexHoldingsEle = topHoldings.find("div", "index-top-holdings");
  const indexHoldings = parseHoldings(indexHoldingsEle);

  const output = {
    fundHoldings,
    indexHoldings
  };

  return output;
};
