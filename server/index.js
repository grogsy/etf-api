const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const passport = require("passport");

const db = require("../db");
const sessionStore = new SequelizeStore({ db });
const server = express();

const { PORT } = require("../constants");
const api = require("../routes/api");
const auth = require("../routes/auth");

// set up a basic passport auth strategy
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// json middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
// prevent null values from row fetches from being sent in the response body
server.set("json replacer", (k, v) => (v === null ? undefined : v));

// session middleware
server.use(
  session({
    secret: process.env.SESSION_SECRET || "test secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false
  })
);

// passport middleware
server.use(passport.initialize());
server.use(passport.session());

// routing middleware
server.use("/api", api);
server.use("/auth", auth);

// 404 handler
server.use((req, res, next) => {
  res.status(404).json({ status: 404, msg: "Not found." });
});

// for development purposes only
server.etc = {};
server.etc.port = PORT;

module.exports = server;
