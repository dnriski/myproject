const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/checkAuth");
const { forwardAuthenticated } = require("../config/checkAuth");
//------------ Welcome Route ------------//
router.get("/", (req, res) => {
  res.render("welcome");
});

//------------ Dashboard Route ------------//
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dash", {
    name: req.user.name,
  })
);

//halaman home
router.get("/pesan", ensureAuthenticated, (req, res) =>
  res.render("menu/pesan", {
    title: "Kritik dan Saran",
    layout: "./partials/layout",
  })
);

router.get(`/list`, forwardAuthenticated, (req, res) =>
  res.render("menu/list", {
    title: "Menu List Home",
    layout: "./partials/layout",
  })
);

router.get(`/about`, ensureAuthenticated, (req, res) =>
  res.render("menu/about", {
    title: "Menu List Home",
    layout: "./partials/layout",
  })
);
module.exports = router;
