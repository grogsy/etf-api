function zipSectorData(sector) {
  if (!sector) {
    return [];
  }

  const labels = sector.findAll("td", "label").map(ele => ele.getText());
  const weights = sector.findAll("td", "data").map(ele => ele.getText());

  return labels.map((name, index) => ({
    name,
    weight: +weights[index].replace("%", "")
  }));
}

module.exports = function(sectorTableData) {
  if (!sectorTableData) {
    return null;
  }
  const fundSectorBreakdown = sectorTableData.find(
    "div",
    "fund-sector-breakdown"
  );
  const fundSector = zipSectorData(fundSectorBreakdown);

  const indexSectorBreakdown = sectorTableData.find(
    "div",
    "index-sector-breakdown"
  );
  const indexSector = zipSectorData(indexSectorBreakdown);

  return { fundSector, indexSector };
};
