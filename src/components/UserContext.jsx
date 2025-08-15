import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Load current user on first render
  useEffect(() => {
    const saved = localStorage.getItem("currentUser");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  function login(userObj) {
    setUser(userObj);
    localStorage.setItem("currentUser", JSON.stringify(userObj));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("currentUser");
  }

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
