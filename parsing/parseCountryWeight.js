module.exports = function(geoTableData) {
  if (!geoTableData) {
    return null;
  }

  // target of interest is stored as a stringified json
  const jsonStr = geoTableData.attrs.value.replace(/&#34;/gi, '"');
  const toJson = JSON.parse(jsonStr);

  // grab weights entry
  const weights = toJson.attrArray;
  const output = weights.map(obj => ({
    country: obj.name.value,
    weight: +obj.weight.value.replace("%", "")
  }));

  return output;
};
