const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { PRINCIPAL } = require("../common/constants");

router.get("/", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests r \
      join users u on r.emp_id = u.emp_id \
      join departments d on d.department=u.department \
     where  approval_status=? and JSON_EXTRACT(event_info,'$.From') > ?",
    [ PRINCIPAL + 1,new Date().toISOString().split('T')[0]],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result.map(item => {
            return {...item,password:undefined}
          })],
        });
      } else {
        res.send({
          msg: "No events found",
        });
      }
    }
  );
});

router.get("/completed", authenticate.auth, (req, res) => {
  db.query(
    "SELECT * FROM requests r \
      join users u on r.emp_id = u.emp_id \
      join departments d on d.department=u.department \
     where  approval_status=? and JSON_EXTRACT(event_info,'$.From') < ?",
    [ PRINCIPAL + 1,new Date().toISOString().split('T')[0]],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.length) {
        res.send({
          events: [...result.map(item => {
            return {...item,password:undefined}
          })],
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
