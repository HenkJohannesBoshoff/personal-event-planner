import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import Help from "./components/Help";
import Login from "./components/Login";
import Register from "./components/Register";
import EditEvent from "./components/EditEvent";
import PrivateRoute from "./components/PrivateRoute";
import { UserProvider } from "./components/UserContext";
import { EventProvider } from "./components/EventContext";

export default function App() {
  return (
    <UserProvider>
      <EventProvider>
        <Header />
        <div style={{ marginTop: "70px" }}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddEvent />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditEvent />
                </PrivateRoute>
              }
            />

            <Route path="/help" element={<Help />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </EventProvider>
    </UserProvider>
  );
}
