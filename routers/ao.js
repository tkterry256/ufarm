const express = require("express");

const router = express.Router();

const aoViewData = require("../view-data/ao");

module.exports = (basePath) => {
  router.get("/", (req, res) => {
    const viewData = {...aoViewData(basePath, "/")}
    res.render("pages/ao/dashboard", viewData);
  });

  router.get("/farmer-one-manage", (req, res) => {
    res.render(
      "pages/ao/farmer-one-manage",
      aoViewData(basePath, "/farmer-one-manage")
    );
  });

  router.get("/create-farmer-one", (req, res) => {
    res.render(
      "pages/ao/create-farmer-one",
      aoViewData(basePath, "/create-farmer-one")
    );
  });

  router.get("/communication", (req, res) => {
    res.render("pages/ao/communication", aoViewData(basePath, "/communication"));
  });

  router.get("/market", (req, res) => {
    res.render("pages/ao/market", aoViewData(basePath, "/market"));
  });

  router.get("/statistics", (req, res) => {
    res.render("pages/ao/statistics", aoViewData(basePath, "/statistics"));
  });

  return router;
};
