const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM users WHERE emp_id=?",
    [req.user.emp_id],
    (error, result) => {
      if (error) {
        console.log(req.user);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          ...result[0],
          password: undefined,
        });
      } else {
        res.send({
          msg: "No user found",
        });
      }
    }
  );
});

module.exports = router;
