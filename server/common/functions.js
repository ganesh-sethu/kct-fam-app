const {
  NORMAL_USER,
  BUDGET_COORDINATOR,
  HOD,
  HR,
  ARCHIVE,
  PRINCIPAL,
} = require("./constants.js");
module.exports = {
  findUserVal: (user) => {
    if (user.department === "BUDGET") {
      return BUDGET_COORDINATOR;
    } else if (user.department === "HOD") {
      return HOD;
    } else if (user.department === "HR") {
      return HR;
    } else if (user.department === "ARCH_DEPT") {
      return ARCHIVE;
    } else if (user.department === "PRINCIPAL") {
      return PRINCIPAL;
    } else return NORMAL_USER;
  },
};
