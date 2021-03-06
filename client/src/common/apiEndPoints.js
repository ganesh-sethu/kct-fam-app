const prefixBackEndURI = (path) => {
  return process.env.REACT_APP_BACKEND + path;
};

const apiEndPoints = {
  getUser: prefixBackEndURI("/api/users"),
  loginUser: prefixBackEndURI("/api/login"),
  getRequests: prefixBackEndURI("/api/request"),
  approveRequest: prefixBackEndURI("/api/request/approve"),
  rejectRequest: prefixBackEndURI("/api/request/reject"),
  postRequest: prefixBackEndURI("/api/request"),
  getUpComingEvents: prefixBackEndURI("/api/events"),
  getCompletedEvents: prefixBackEndURI("/api/events/completed"),
  getDepartments: prefixBackEndURI("/api/departments"),
  getAllUsers: prefixBackEndURI("/api/users/all"),
  getReport: prefixBackEndURI("/api/reports"),
  getAcademicYear : prefixBackEndURI("/api/academic-year"),
  editAcademicYear:prefixBackEndURI("/api/academic-year"),
  createAcademicYear:prefixBackEndURI("/api/academic-year"),
  submitProof : prefixBackEndURI("/api/events/proof"),
  deleteProof : prefixBackEndURI("/api/events/proof/delete"),
  register:prefixBackEndURI("/api/register"),
  addDepartment : prefixBackEndURI("/api/departments/add"),
  deleteDepartment : prefixBackEndURI("/api/departments/delete"),
  deleteUser : prefixBackEndURI("/api/users/delete"),
  addUser : prefixBackEndURI("/api/users/add")
  

};

export default apiEndPoints;
