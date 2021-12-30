const prefixBackEndURI = (path) => {
  return process.env.REACT_APP_BACKEND + path;
};

const apiEndPoints = {
  getUser: prefixBackEndURI("/api/users"),
  loginUser: prefixBackEndURI("/api/login"),
  getRequests: prefixBackEndURI("/api/request"),
};

export default apiEndPoints;
