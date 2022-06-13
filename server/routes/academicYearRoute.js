const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT year FROM academic_year limit 1",
    (error, result) => {
      if (error) {
         console.log(error)
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
         ...result[0]
        });
      } else {
        res.status(500).send({
           msg:"Academic Year is not set"
        });
      }
    }
  );
});
router.put("/", authenticate.auth, (req, res) => {
    db.query(
      "update academic_year set year=?",[req.body.academicYear],
      (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({error})
        } else if (result && result.affectedRows) {
          res.send({
              msg:"Academic Year updated successfully"
          })
        } else {
          res.status(500).send({result})
        }
      }
    );
  });


  router.post("/", authenticate.auth, (req, res) => {
    db.query(
      "insert into academic_year (year) values (?)",[req.body.academicYear],
      (error, result) => {
        if (error) {
            console.log(error)
            res.status(500).send({error})
        } else if (result && result.affectedRows) {
          res.send({
              msg:"Academic Year added successfully"
          })
        } else {
          res.status(500).send({result})
        }
      }
    );
  });


module.exports = router;
