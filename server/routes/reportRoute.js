const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { APPROVED } = require("../common/constants");
router.post("/", authenticate.auth, (req, res) => {
  let query = "";
  let values = [];
  let reportType = req.body.reportType;
  console.log(req.body);
  if (reportType === "date") {
    query =
      "select * from requests where JSON_EXTRACT(event_info,'$.To') <= ? and JSON_EXTRACT(event_info,'$.From') >= ? and approval_status = ?";
    values = [req.body.to, req.body.from, APPROVED];
  } else if (reportType === "department") {
    query =
      "select * from requests r,users u where r.emp_id = u.emp_id and u.department=? and approval_status=?";
    values = [req.body.department, APPROVED];
  } else if (reportType === "faculty") {
    query = "select * from requests where emp_id = ? and approval_status = ?";
    values = [req.body.faculty, APPROVED];
  }
  db.query(query, values, (error, result) => {
    if (error) {
      res.status(500).send({
        error,
      });
    } else if (result && result.length) {
      res.send({
        events: result,
      });
    } else {
      console.log(values);
      res.send({
        msg: "No results found",
      });
    }
  });
});

module.exports = router;
