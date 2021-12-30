import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../state/slices/authenticationSlice";

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    localStorage.removeItem("token");
    dispatch(logout);

    navigate("/login");
  });

  return <div>Logging out...</div>;
}
