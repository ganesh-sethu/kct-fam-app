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

router.put("/", authenticate.auth, (req, res) => {
  db.query(
    "update users set name=?,department=?,designation=?,email=? where emp_id=?",
    [req.body.name,req.body.department,req.body.designation,req.body.email,req.body.emp_id],
    (error,result) => {
      if (error) {
          console.log(error);
          res.status(500).send({
            error,
          });
        } else if (result && result.affectedRows) {
          res.send({
            msg: "User updated",
          });
        } else {
          res.status(500).send({
            result,
          });
        }
    }
  );
});

router.post(
  "/delete",
  authenticate.auth,
  (req, res) => {
    db.query(
      "delete from users where emp_id = ?",
      [
        req.body.emp_id
      ],
      (error,result) => {
        if (error) {
            console.log(error);
            res.status(500).send({
              error,
            });
          } else if (result && result.affectedRows) {
            res.send({
              msg: "User deleted",
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


router.get("/all", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM users",
    [req.user.emp_id],
    (error, result) => {
      if (error) {
        console.log(req.user);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          users : result.map(item => {
            return {...item,password:undefined}
          })
        });
      } else {
        res.send({
          msg: "No users found",
        });
      }
    }
  );
});


router.post(
  "/add",
  authenticate.auth,
  (req, res) => {
    db.query(
      "INSERT INTO users(emp_id,name,email,department,designation) VALUES(?,?,?,?,?)",
      [
        req.body.emp_id,
        req.body.name,
        req.body.email,
        req.body.department,
        req.body.designation,
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
          else{
            res.status(500).send(err)
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
);



module.exports = router;
