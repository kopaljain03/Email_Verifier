const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");

const secret = process.env.jwt_secret;

function getToken(user) {
  return jwt.sign({ user }, secret, { expiresIn: "1h" });
}

function getUser(token) {
  var ret;
  jwt.verify(token, secret, (err, user) => {
    if (err) ret = "invalid token";
    else ret = user;
  });
  return ret;
}

module.exports = {
  getToken,
  getUser,
};
