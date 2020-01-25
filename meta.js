// const db = require("./db");
const Sequelize = require("sequelize");
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost:5432/etflinks",
  { logging: false }
);
const router = require("express").Router();

// store links in the db so we don't have to hit the webpage everytime to update
const Href = db.define("href", {
  link: {
    type: Sequelize.STRING
  }
});

router.get("/", async (req, res, next) => {
  try {
    const links = await Href.findAll();
    res.json(links);
  } catch (error) {
    next(error);
  }
});

module.exports = { router, Href, db };
