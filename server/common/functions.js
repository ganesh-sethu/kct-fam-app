const {
  NORMAL_USER,
  BUDGET_COORDINATOR,
  HOD,
  HR,
  ARCHIVE,
  PRINCIPAL,
} = require("./constants.js");
const sendMail = require("./mail.js");
const db = require("../db/db");
const formFields = require("./formFields.js");

module.exports = {
  findUserVal: (user) => {
    if (user.designation === "BUDGET") {
      return BUDGET_COORDINATOR;
    } else if (user.designation === "HOD") {
      return HOD;
    } else if (user.designation === "HR") {
      return HR;
    } else if (user.designation === "ARCH_DEPT") {
      return ARCHIVE;
    } else if (user.designation === "PRINCIPAL") {
      return PRINCIPAL;
    } else return NORMAL_USER;
  },

  findDesignation: (userVal) => {
    if (userVal === BUDGET_COORDINATOR) return "BUDGET";
    else if (userVal === HOD) return "HOD";
    else if (userVal === HR) return "HR";
    else if (userVal === ARCHIVE) return "ARCH_DEPT";
    else if (userVal === PRINCIPAL) return "PRINCIPAL";
    else return "APPROVED";
  },

  requestSentMail: (user, eventInfo) => {
    let html = "";
    Object.keys(formFields).map((item) => {
      html +=
        "<p><b>" +
        formFields[item] +
        "</b> : " +
        eventInfo[formFields[item]] +
        "</p>";
    });
    sendMail([user.email], "Request for event", "Request details ", html).catch(
      (err) => console.log(err)
    );
  },
  notifyMail: (requestedUser, designation, eventInfo) => {
    if (designation === "APPROVED") return;
    else {
      db.query(
        "SELECT email FROM users WHERE designation=?",
        designation,
        (error, result, fields) => {
          if (error) console.log(error);
          else if (result && result.length) {
            let emails = result.map((item) => item.email);
            let html = "";
            Object.keys(formFields).map((item) => {
              html +=
                "<p><b>" +
                formFields[item] +
                "</b> : " +
                eventInfo[formFields[item]] +
                "</p>";
            });
            sendMail(
              emails,
              requestedUser.name + " requested an event approval",
              "request for event approval",
              html
            );
          } else console.log(designation + " not found");
        }
      );
    }
  },
  approveMail: (requestId, rejectedUser) => {
    db.query(
      "SELECT email,event_info from requests join users on requests.emp_id = users.emp_id WHERE request_id=?",
      requestId,
      (error, result) => {
        if (error) console.log(error);
        else if (result && result.length) {
          const eventInfo = result[0].event_info;
          const email = result[0].email;
          const html =
            "<h3 color='red'>Your request for even " +
            eventInfo[formFields.title] +
            " is approved</h3>" +
            "<p> Approved by : " +
            rejectedUser.name +
            "(" +
            rejectedUser.designation +
            ")</p>";
          sendMail([email], "Request Approved", "", html);
        } else console.log("Request not found");
      }
    );
  },
  rejectMail: (requestId, rejectedUser, rejectionReason) => {
    db.query(
      "SELECT email,event_info from requests join users on requests.emp_id = users.emp_id WHERE request_id=?",
      requestId,
      (error, result) => {
        if (error) console.log(error);
        else if (result && result.length) {
          console.log(result);
          const eventInfo = result[0].event_info;
          const email = result[0].email;
          const html =
            "<h5 color='red'>Sorry! your request for " +
            eventInfo[formFields.title] +
            " is rejected</h5>" +
            "<p> Rejected by : " +
            rejectedUser.name +
            "(" +
            rejectedUser.designation +
            ")</p>"
          sendMail([email], "Request rejected", "", html);
        } else console.log("Request not found");
      }
    );
  },
};
