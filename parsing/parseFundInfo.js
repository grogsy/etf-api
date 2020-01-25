function makeCamelCase(str) {
  let words = str.split(" ");
  words[0] = words[0].toLowerCase();

  return words.join("");
}

module.exports = function(fundInfoElement) {
  const [rowOne, rowTwo] = fundInfoElement.findAll(
    "table",
    "ssmp-d-tablet-none"
  );
  const fiHeaders = rowOne
    .findAll("th")
    .map(ele => ele.getText())
    .filter(text => text.length)
    .concat(
      rowTwo
        .findAll("th")
        .map(ele => ele.getText())
        .filter(text => text.length)
    );
  const fiData = rowOne
    .findAll("td")
    .map(ele => ele.getText())
    .filter(text => text.length)
    .concat(
      rowTwo
        .findAll("td")
        .map(ele => ele.getText())
        .filter(text => text.length)
    );

  // good
  let fundInfo = {};
  for (let i = 0; i < fiHeaders.length; i++) {
    if (fiHeaders[i].startsWith("Gross Expense")) {
      fundInfo.grossExpenseRatio = +fiData[i].replace("%", "");
    } else if (fiHeaders[i].startsWith("Net Expense")) {
      fundInfo.netExpenseRatio = +fiData[i].replace("%", "");
    } else {
      fundInfo[makeCamelCase(fiHeaders[i])] = fiData[i];
    }
  }

  return fundInfo;
};
