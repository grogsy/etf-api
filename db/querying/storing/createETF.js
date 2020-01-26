const { ETF } = require("../../models");

module.exports = async function(name, ticker) {
  const newETF = await ETF.create({ name, ticker });
  // console.log("ETF succesfully created: " + name);

  return newETF;
};
