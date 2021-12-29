import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  React.useEffect(() => {
    localStorage.removeItem("token");
    navigate("/login");
  });

  return <div>Logging out...</div>;
}
