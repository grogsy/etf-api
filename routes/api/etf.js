const router = require("express").Router();

const {
  ETF,
  FundInfo,
  Holding,
  Sector,
  GeoBreakdown
} = require("../../db/models");

router.get("/", async (req, res, next) => {
  try {
    const etfs = await ETF.findAll({
      // remove this after testing, this endpoint should only list etf tickers
      // it would look like:
      // attributes: ['ticker']
      include: [
        { model: FundInfo, attributes: { exclude: ["id", "etfId"] } },
        { model: Holding, attributes: { exclude: ["id", "etfId"] } },
        { model: Sector, attributes: { exclude: ["id", "etfId"] } },
        { model: GeoBreakdown, attributes: { exclude: ["id", "etfId"] } }
      ],
      attributes: { exclude: ["id"] }
    });
    res.json(etfs);
  } catch (error) {
    next(error);
  }
});

router.get("/:ticker", async (req, res, next) => {
  try {
    const etf = await ETF.findOne({
      where: {
        ticker: req.params.ticker
      },
      include: [
        { model: FundInfo, attributes: { exclude: ["id", "etfId"] } },
        { model: Holding, attributes: { exclude: ["id", "etfId"] } },
        { model: Sector, attributes: { exclude: ["id", "etfId"] } },
        { model: GeoBreakdown, attributes: { exclude: ["id", "etfId"] } }
      ],
      attributes: { exclude: ["id"] }
    });

    res.json(etf);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
