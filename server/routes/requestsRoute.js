const router = require("express").Router();
const db = require("../db/db");
const authenticate = require("../common/authenticate");
const {
  findUserVal,
  requestSentMail,
  notifyMail,
  findDesignation,
  rejectMail,
  approveMail,
} = require("../common/functions");
const {
  NORMAL_USER,
  BUDGET_COORDINATOR,
  HOD,
  HR,
  ARCHIVE,
  PRINCIPAL,
  REJECTED,
  APPROVED,
} = require("../common/constants");

router.post("/", authenticate.auth, (req, res) => {
  let userLevel = findUserVal(req.user);
  let nextUserLevel = 0;
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
    nextUserLevel = HR;
  } else if (userLevel === ARCHIVE) {
    query =
      "INSERT INTO requests(emp_id,user_level,event_type,event_info,approval_status,aad_no) VALUES(?,?,?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR, req.body.aadNo];
    nextUserLevel = BUDGET_COORDINATOR;
  } else {
    query =
      "INSERT INTO requests(emp_id,user_level,event_type,event_info,approval_status) VALUES(?,?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR];
    nextUserLevel = BUDGET_COORDINATOR;
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
      requestSentMail(req.user, {
        ...req.body.data,
        eventType: req.body.eventType,
      });
      notifyMail(req.user, findDesignation(nextUserLevel), {
        ...req.body.data,
        eventType: req.body.eventType,
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
  const callBack = (error, result) => {
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
  };
  if (userLevel === HOD) {
    db.query(
      "SELECT * FROM requests join users on requests.emp_id=users.emp_id where approval_status=? and department=?",
      [userLevel, req.user.department],
      callBack
    );
  } else {
    db.query(
      "SELECT * FROM requests where approval_status=?",
      userLevel,
      callBack
    );
  }
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
        rejectMail(req.body.requestId, req.user, req.body.rejectionReason);
      } else if (result && !result.affectedRows && !result.fieldCount) {
        res.send({
          msg: "Row not found",
        });
      } else {
        res.status(500).send({
          result,
        });
      }
    }
  );
});

router.put("/approve", authenticate.auth, (req, res) => {
  const userLevel = findUserVal(req.user);
  const requestedUserLevel = req.body.user_level;
  let nextLevel = 0;
  let values = [];
  let query = "";
  if (userLevel === BUDGET_COORDINATOR) {
    query =
      "UPDATE requests SET approval_status=?, budget_ref_no=? WHERE approval_status=? AND request_id=?";
    if (requestedUserLevel === NORMAL_USER) nextLevel = HOD;
    else if (requestedUserLevel === HOD) nextLevel = HR;
    else if (requestedUserLevel === HR) nextLevel = ARCHIVE;
    else if (requestedUserLevel === ARCHIVE) nextLevel = PRINCIPAL;
    else if (requestedUserLevel === PRINCIPAL) nextLevel = APPROVED;
    values = [nextLevel, req.body.budgetRefNo, userLevel, req.body.requestId];
  } else if (userLevel === ARCHIVE) {
    query =
      "UPDATE requests SET approval_status=?, aad_no=? WHERE approval_status=? AND request_id=?";
    values = [userLevel + 1, req.body.aadNo, userLevel, req.body.requestId];
  } else {
    query =
      "UPDATE requests SET approval_status=? WHERE approval_status=? AND request_id=?";
    nextLevel = userLevel + 1;
    values = [nextLevel, userLevel, req.body.requestId];
  }

  db.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    } else if (result && result.affectedRows) {
      res.send({
        msg: "Request approved by " + req.user.designation,
      });
      approveMail(req.body.requestId, req.user);
    } else if (result && !result.affectedRows && !result.fieldCount) {
      res.send({
        msg: "Row not found",
      });
    } else {
      res.status(500).send({
        result,
      });
    }
  });
});

module.exports = router;
