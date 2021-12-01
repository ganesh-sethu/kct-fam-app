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
                    expiresIn: "24h",
                  }),
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
module.exports = router;
