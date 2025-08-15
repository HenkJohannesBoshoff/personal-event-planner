import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import UserContext from "./UserContext";

export default function Login() {
  //  Get the login function from global context
  const { login } = useContext(UserContext);

  //  React Router hooks
  const navigate = useNavigate(); // to redirect after login
  const location = useLocation(); // to see if the user was trying to visit a protected page

  // Determine where to redirect after login:
  // - If redirected from a protected route, go there.
  // - Otherwise, go to /dashboard.
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  // Local state for form inputs
  const [formData, setFormData] = useState({
    identifier: "", // can be email OR username
    password: "",
  });

  //  Local state for error messages
  const [error, setError] = useState("");

  //  Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // stop page reload
    setError(""); // clear any previous errors

    const id = formData.identifier.trim(); // remove whitespace
    const pw = formData.password;

    // Get registered users from localStorage (array)
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if there's a user with matching email/username and password
    const found = users.find(
      (u) => (u.email === id || u.username === id) && u.password === pw
    );

    // If no match, show error and stop
    if (!found) {
      setError("Invalid email/username or password.");
      return;
    }

    // If match found:
    // 1. Update global user state (context)
    // 2. Redirect to dashboard (or the page they came from)
    login(found);
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="container p-3">
      <br />
      <h1>Login</h1>

      {/* Login form */}
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Email/Username field */}
        <div className="mb-3">
          <label className="form-label">Email or Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
          />
        </div>

        {/* Password field */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        {/* Error message */}
        {error && <div className="text-danger mb-3">{error}</div>}

        {/* Submit button */}
        <button type="submit" className="btn btn-primary me-2">
          Login
        </button>
      </form>
    </div>
  );
}
