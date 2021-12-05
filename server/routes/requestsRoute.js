const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const { findUserVal } = require("../common/functions");
const {
  NORMAL_USER,
  BUDGET_COORDINATOR,
  HOD,
  HR,
  ARCHIVE,
  PRINCIPAL,
  REJECTED,
} = require("../common/constants");
router.post("/", authenticate.auth, (req, res) => {
  let userLevel = findUserVal(req.user);
  let values = [
    req.user.emp_id,
    userLevel,
    req.body.eventType,
    JSON.stringify(req.body.data),
  ];
  let query = "";
  if (userLevel === BUDGET_COORDINATOR) {
    query =
      "INSERT INTO requests(emp_id,user_level,event_type,event_info,approval_status,budget_ref_no) VALUES(?,?,?,?,?,?)";
    values = [...values, HR, req.body.budgetRefNo];
  } else if (userLevel === ARCHIVE) {
    query =
      "INSERT INTO requests(emp_id,user_level,event_type,event_info,approval_status,aad_no) VALUES(?,?,?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR, req.body.aadNo];
  } else {
    query =
      "INSERT INTO requests(emp_id,user_level,event_type,event_info,approval_status) VALUES(?,?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR];
  }

  db.query(query, values, (error, result, fields) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    } else if (result && result.affectedRows) {
      res.send({
        msg: "request sent successfully",
      });
    } else {
      console.log(result);
      res.status(500).send({
        result,
      });
    }
  });
});

router.get("/", authenticate.auth, (req, res) => {
  const userLevel = findUserVal(req.user);
  let query = "SELECT * FROM requests where approval_status=?";
  db.query(query, userLevel, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    } else if (result && result.length) {
      res.send({
        requests: [...result],
      });
    } else {
      res.send({
        msg: "No requests found",
      });
    }
  });
});

router.put("/reject", authenticate.auth, (req, res) => {
  const userLevel = findUserVal(req.user);
  db.query(
    "UPDATE requests SET approval_status=?,rejected_by=?,rejection_reason=? WHERE approval_status=? AND request_id=?",
    [
      -1,
      req.user.emp_id,
      req.body.rejectionReason,
      userLevel,
      req.body.requestId,
    ],
    (error, result) => {
      if (error) {
        console.log(error);
        res.status(500).send({
          error,
        });
      } else if (result && result.affectedRows) {
        res.send({
          msg: "Request declined successfully",
        });
      } else {
        res.status(500).send({
          result,
        });
      }
    }
  );
});
module.exports = router;
