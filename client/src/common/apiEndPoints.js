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
  createAcademicYear:prefixBackEndURI("/api/academic-year")
};

export default apiEndPoints;
