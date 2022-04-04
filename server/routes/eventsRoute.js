const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { PRINCIPAL } = require("../common/constants");

router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests \
     where emp_id=? and approval_status=?",
    [req.user.emp_id, PRINCIPAL + 1],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result],
        });
      } else {
        res.send({
          msg: "No events found",
        });
      }
    }
  );
});

module.exports = router;
