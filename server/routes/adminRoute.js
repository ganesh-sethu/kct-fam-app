const router = require("express").Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");
const authenticate = require("../common/authenticate");




router.get("/test", authenticate.auth, authenticate.adminAuth, (req, res) => {
  res.send({
    msg: "authenticated",
  });
});

module.exports = router;
