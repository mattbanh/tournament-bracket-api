const express = require("express");
const api = express.Router();
const { getAPIInfo } = require("../controllers/apiController.js");

api.get("/", getAPIInfo);

module.exports = api;
