import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "./UserContext";

export default function Register() {
  // Access login() from UserContext so we can auto-login after registering
  const { login } = useContext(UserContext);

  // Hook for navigation after successful registration
  const navigate = useNavigate();

  // Controlled form state for storing user inputs
  const [formData, setFormData] = useState({
    name: "", // full name of the user
    email: "", // email address
    username: "", // unique username
    password: "", // account password
  });

  // State to hold validation errors for display
  const [errors, setErrors] = useState({});

  // Validation function to check inputs before saving
  const validate = () => {
    let temp = {};

    // Full name required
    if (!formData.name.trim()) temp.name = "Full name is required.";

    // Email format check
    if (!formData.email.trim()) temp.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      temp.email = "Email is not valid.";

    // Username required
    if (!formData.username.trim()) temp.username = "Username is required.";

    // Password length check
    if (!formData.password.trim()) temp.password = "Password is required.";
    else if (formData.password.length < 8)
      temp.password = "Password must be at least 8 characters.";

    // Save any errors for rendering
    setErrors(temp);

    // Returns true if there are no errors
    return Object.keys(temp).length === 0;
  };

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Stop submission if validation fails
    if (!validate()) return;

    // Get existing users from localStorage or an empty array
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Prevent duplicate email registration
    if (users.some((u) => u.email === formData.email)) {
      setErrors({ email: "Email is already registered." });
      return;
    }

    // Prevent duplicate username registration
    if (users.some((u) => u.username === formData.username)) {
      setErrors({ username: "Username is already taken." });
      return;
    }

    // Add new user to localStorage
    const updatedUsers = [...users, formData];
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Log in the new user immediately
    login(formData);

    // Redirect to dashboard
    navigate("/dashboard");
  }

  return (
    <div className="container p-3">
      <br />
      <h1>Register</h1>

      {/* Registration form */}
      <form onSubmit={handleSubmit} className="mt-3">
        {/* Full Name */}
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        {/* Username */}
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          {errors.username && (
            <div className="text-danger">{errors.username}</div>
          )}
        </div>

        {/* Password */}
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
          {errors.password && (
            <div className="text-danger">{errors.password}</div>
          )}
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-success me-2">
          Register
        </button>
      </form>
    </div>
  );
}
