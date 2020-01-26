const router = require("express").Router();
const { unauthorizedAccess, validateApiKey } = require("../authMiddleware");

const {
  ETF,
  FundInfo,
  Holding,
  Sector,
  GeoBreakdown
} = require("../../db/models");

router.get(
  "/",
  [unauthorizedAccess, validateApiKey],
  async (req, res, next) => {
    try {
      const etfs = await ETF.findAll({
        attributes: ["ticker"]
      });
      res.json({ availableEtfs: etfs });
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:ticker",
  [unauthorizedAccess, validateApiKey],
  async (req, res, next) => {
    try {
      const etf = await ETF.findOne({
        where: {
          ticker: req.params.ticker
        },
        include: [
          { model: FundInfo, attributes: { exclude: ["id", "etfId"] } },
          {
            model: Holding,
            // this option might need to be used when limiting the holdings return to strictly 10
            // separate: true,
            // limit: 10,
            // order: [['weight', 'DESC']],
            attributes: { exclude: ["id", "etfId"] }
          },
          { model: Sector, attributes: { exclude: ["id", "etfId"] } },
          { model: GeoBreakdown, attributes: { exclude: ["id", "etfId"] } }
        ],
        attributes: { exclude: ["id"] }
      });

      res.json(etf);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
