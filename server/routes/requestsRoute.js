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

const updateBudget = (department) => {
  let budgetUsed = department.budget_used + department.budget;
  db.query(
    "update departments set budget_used=? where department = ?",
    [budgetUsed, department.department],
    (error, result) => {
      if (error) {
        console.log(error);
      } else if (result && result.affectedRows) {
        console.log("Budget Updated");
      } else {
        console.log(result);
      }
    }
  );
};
const reduceBudget = (reqId) => {
  db.query(
    "select u.department,JSON_EXTRACT(event_info,'$.Budget') as budget,d.budget_used from users u,requests r,departments d where r.emp_id = u.emp_id and u.department = d.department and request_id=?",
    [reqId],
    (error, result) => {
      if (error) {
        console.log(error);
      } else if (result && result.length) {
        updateBudget({ ...result[0], budget: parseInt(result[0].budget) });
      } else {
        console.log(result);
      }
    }
  );
};

router.post("/", authenticate.auth, (req, res) => {
  let userLevel = findUserVal(req.user);
  let nextUserLevel = 0;
  let values = [req.user.emp_id, userLevel, JSON.stringify(req.body)];
  let query = "";
  if (userLevel === BUDGET_COORDINATOR) {
    query =
      "INSERT INTO requests(emp_id,user_level,event_info,approval_status,budget_ref_no) VALUES(?,?,?,?,?)";
    values = [...values, HR, req.body.budgetRefNo];
    nextUserLevel = HR;
  } else if (userLevel === ARCHIVE) {
    query =
      "INSERT INTO requests(emp_id,user_level,event_info,approval_status,aad_no) VALUES(?,?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR, req.body.aadNo];
    nextUserLevel = BUDGET_COORDINATOR;
  } else {
    query =
      "INSERT INTO requests(emp_id,user_level,event_info,approval_status) VALUES(?,?,?,?)";
    values = [...values, BUDGET_COORDINATOR];
    nextUserLevel = BUDGET_COORDINATOR;
  }

  db.query(query, values, (error, result) => {
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
        ...req.body,
      });
      notifyMail(req.user, findDesignation(nextUserLevel), {
        ...req.body,
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
    console.log(userLevel);
    db.query(
      "SELECT * FROM requests \
           join users u1 on requests.emp_id=u1.emp_id \
           join departments d on d.department=u1.department where approval_status=? and u1.department=?",
      [userLevel, req.user.department],
      callBack
    );
  } else {
    db.query(
      "SELECT * FROM requests \
      join users u1 on requests.emp_id=u1.emp_id \
      join departments d on d.department=u1.department where approval_status=? ",
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
  const requestedUserLevel = req.body.userLevel;
  let nextLevel = 0;
  let values = [];
  let query =
    "UPDATE requests SET approval_status=? WHERE approval_status=? AND request_id=?";
  if (userLevel === BUDGET_COORDINATOR) {
    if (requestedUserLevel === NORMAL_USER) nextLevel = HOD;
    else if (requestedUserLevel === HOD) nextLevel = HR;
    else if (requestedUserLevel === HR) nextLevel = ARCHIVE;
    else if (requestedUserLevel === ARCHIVE) nextLevel = PRINCIPAL;
    else if (requestedUserLevel === PRINCIPAL) nextLevel = APPROVED;
  } else {
    nextLevel = userLevel + 1;
  }
  values = [nextLevel, userLevel, req.body.requestId];
  db.query(query, values, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send({
        error,
      });
    } else if (result && result.affectedRows) {
      if(nextLevel=== APPROVED){
        reduceBudget(req.body.requestId);
      }
      res.send({
        msg: "Request approved",
      });
      approveMail(req.body.requestId, req.user);
    } else {
      console.log(query);
      console.log(values);
      res.status(500).send({
        result,
      });
    }
  });
});

module.exports = router;
