import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const Checkauth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();


  // // Debugging logs
  // console.log("Current location:", location.pathname);
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("User role:", user?.role);
  // console.log("Redirecting from:", location.state?.from);

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && location.pathname === "/auth/login") {
    const redirectTo = location.state?.from?.pathname || (user?.role === "admin" ? "/admin/dashboard" : "/shop/home");
    return <Navigate to={redirectTo} />;
  }


  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default Checkauth;
