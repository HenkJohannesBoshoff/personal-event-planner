import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { EventProvider } from "./components/EventContext";
import { UserProvider } from "./components/UserContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
