const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM departments",
    (error, result) => {
      if (error) {
        console.log(req.user);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({departments : result});
      } else {
        res.status(404).send({
          msg: "No departments found",
        });
      }
    }
  );
});

module.exports = router;
