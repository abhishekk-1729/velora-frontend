import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Logout = () => {
  const { LogoutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    LogoutUser();
    localStorage.removeItem("token"); // Clear token from localStorage
    navigate("/"); // Redirect to the main page or home
  },[]);
  return <div></div>;
};

export default Logout;
