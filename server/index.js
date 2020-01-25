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

// set up passport auth strategy
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
// omit null values from being returned on row fetches
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

// for development purposes only
server.etc = {};
server.etc.port = PORT;

module.exports = server;
