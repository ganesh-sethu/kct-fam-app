const router = require("express").Router();
const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  db.query(
    "SELECT * FROM users WHERE email=?",
    req.body.email,
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          msg: "Error! Can't login",
          error,
        });
      }
      if (result.length) {
        if(!result[0].password || result[0].password === null){
          return res.status(204).send({
            msg : "User not registered !"
          })
        }
        bcrypt.compare(
          req.body.password,
          result[0].password,
          (errorBcrypt, isPasswordMatching) => {
            if (errorBcrypt) res.status(500).send({ errorBcrypt });
            else {
              if (!isPasswordMatching) {
                res.status(401).send({
                  msg: "Wrong password",
                });
              } else {
                const user = { ...result[0] };
                user.password = undefined;
                res.send({
                  accessToken: jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                    // expiresIn: "24h",
                  }),
                  ...result[0],
                  password:undefined
                });
              }
            }
          }
        );
      } else {
        console.log(result);
        res.status(401).send({
          msg: "No user found",
        });
      }
    }
  );
});

router.post("/register",(req,res) => {
  bcrypt.hash(req.body.password, 10, (bcryptErr, hashedPassword) => {
    if (bcryptErr) {
      console.log(bcryptErr);
      res.status(500).send({
        msg: "Error in bcrypt",
        err: bcryptErr,
      });
    } else {
      db.query("update users set password = ? where email = ?",[hashedPassword,req.body.email],(error, result) => {
        if (error) {
          console.log(error);
          res.status(500).send({
            error,
          });
        } else if (result && !result.affectedRows && !result.fieldCount) {
          res.status(500).send({
            msg: "Email id not found.Contact admin",
          });
        }else if (result && result.affectedRows) {
          res.send({
            msg: "Registered successfully",
          });
          
        } else {
          res.status(500).send({
            result,
          });
        }
      })   
    }
  });



 
})
module.exports = router;
