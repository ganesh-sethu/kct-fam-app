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
  getDepartments: prefixBackEndURI("/api/departments"),
  getAllUsers:prefixBackEndURI("/api/users/all")
};

export default apiEndPoints;
