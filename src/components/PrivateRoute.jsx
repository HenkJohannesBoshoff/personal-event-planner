import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

export default function PrivateRoute({ children }) {
  //  Access the current logged-in user from global context
  const { user } = useContext(UserContext);

  //  Get current route location
  //    - This is important for redirecting back after login
  const location = useLocation();

  //  If no user is logged in:
  //    - Redirect to /login
  //    - Save the current location in "state.from"
  //      so the login page knows where to send the user afterward
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  //  If user exists, render the child component (protected content)
  return children;
}
