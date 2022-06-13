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
router.put("/",authenticate.auth,(req,res) => {
  const {department,department_name,allocated_budget, budget_used} = req.body
  db.query("update departments set department_name = ? , allocated_budget = ? ,budget_used = ? where department = ?",
  [department_name,allocated_budget,budget_used,department],
  (error,result) => {
    if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.affectedRows) {
        res.send({
          msg: "Department updated",
        });
      } else {
        res.status(500).send({
          result,
        });
      }
  }
  
  )
})

router.post(
  "/add",
  authenticate.auth,
  (req, res) => {
    db.query(
      "INSERT INTO departments(department,department_name,allocated_budget,budget_used) VALUES(?,?,?,?)",
      [
        req.body.department,
        req.body.department_name,
        req.body.allocated_budget,
        req.body.budget_used,
      ],
      (err, result, fields) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            res.status(500).send({
              msg: "Department already exists",
            });
          }
        } else if (result && result.affectedRows) {
          res.send({
            msg: "department added",
          });
        } else {
          console.log(result);
          res.status(500).send({
            msg: "Error adding department",
          });
        }
      }
    );
  }
);

router.post(
  "/delete",
  authenticate.auth,
  (req, res) => {
    db.query(
      "delete from departments where department = ?",
      [
        req.body.department
      ],
      (error,result) => {
        if (error) {
            console.log(error);
            res.status(500).send({
              error,
            });
          } else if (result && result.affectedRows) {
            res.send({
              msg: "Department deleted",
            });
          } else {
            res.status(500).send({
              result,
            });
          }
      }
    );
  }
);

module.exports = router;
