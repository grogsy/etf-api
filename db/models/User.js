const Sequelize = require("sequelize");
const crypto = require("crypto");
const db = require("../db");

const User = db.define(
  "user",
  {
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    salt: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false
  }
);

User.prototype.correctPassword = function(password) {
  return User.encryptPassword(password, this.salt) === this.password;
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString("base64");
};

User.encryptPassword = function(password, salt) {
  return crypto
    .createHash("RSA-SHA256")
    .update(password)
    .update(salt)
    .digest("hex");
};

// password hooks
function setSaltAndPassword(user) {
  if (user.changed("password")) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

User.beforeCreate(setSaltAndPassword);
User.beforeUpdate(setSaltAndPassword);

module.exports = User;
