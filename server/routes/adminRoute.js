const router = require("express").Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");
const authenticate = require("../common/authenticate");
router.post(
  "/department/add",
  authenticate.auth,
  authenticate.adminAuth,
  (req, res) => {
    db.query(
      "INSERT INTO departments(department,department_name,allocated_budget,budget_used) VALUES(?,?,?,?)",
      [
        req.body.department,
        req.body.departmentName,
        req.body.allocatedBudget,
        req.body.budgetUsed,
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
  "/users/add",
  authenticate.auth,
  authenticate.adminAuth,
  (req, res) => {
    bcrypt.hash(req.body.password, 10, (bcryptErr, hashedPassword) => {
      if (bcryptErr) {
        console.log(bcryptErr);
        res.status(500).send({
          msg: "Error in bcrypt",
          err: bcryptErr,
        });
      } else {
        db.query(
          "INSERT INTO users(empId,name,email,department,designation,password) VALUES(?,?,?,?,?,?)",
          [
            req.body.empId,
            req.body.name,
            req.body.email,
            req.body.department,
            req.body.designation,
            hashedPassword,
          ],
          (err, result, fields) => {
            if (err) {
              if (err.code === "ER_DUP_ENTRY") {
                res.status(500).send({
                  msg: "Employee id already exists",
                });
              } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
                res.status(500).send({
                  msg: "Department doesn't exist",
                });
              }
            } else if (result && result.affectedRows) {
              res.send({
                msg: "User added",
              });
            } else {
              console.log(result);
              res.status(500).send({
                msg: "Error adding user",
                err: result,
              });
            }
          }
        );
      }
    });
  }
);

router.get("/test", authenticate.auth, authenticate.adminAuth, (req, res) => {
  res.send({
    msg: "authenticated",
  });
});

module.exports = router;
