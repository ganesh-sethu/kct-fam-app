const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { findUserVal } = require("../common/functions");
router.post("/", authenticate.auth, (req, res) => {
  res.send({
    userType: findUserVal(req.user),
    user: { ...req.user },
  });
});

module.exports = router;
