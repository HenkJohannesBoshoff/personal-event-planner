import React, { createContext, useReducer, useEffect, useContext } from "react";
import UserContext from "./UserContext";

function uuidv4() {
  return Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
}

const EventContext = createContext();

function eventReducer(state, action) {
  switch (action.type) {
    case "INIT":
      return action.payload;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      return state.map((ev) =>
        ev.id === action.payload.id ? action.payload : ev
      );
    case "DELETE":
      return state.filter((ev) => ev.id !== action.payload);
    case "RESET":
      return [];
    default:
      return state;
  }
}

export function EventProvider({ children }) {
  const { user } = useContext(UserContext);
  const [events, dispatch] = useReducer(eventReducer, []);

  // Load when user changes
  useEffect(() => {
    if (user?.email) {
      const saved = localStorage.getItem(`events_${user.email}`);
      dispatch({ type: "INIT", payload: saved ? JSON.parse(saved) : [] });
    } else {
      dispatch({ type: "RESET" });
    }
  }, [user?.email]);

  // Save when events change (and user exists)
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`events_${user.email}`, JSON.stringify(events));
    }
  }, [events, user?.email]);

  function addEvent(eventData) {
    const newEvent = { id: uuidv4(), ...eventData };
    dispatch({ type: "ADD", payload: newEvent });
  }

  function updateEvent(updatedEvent) {
    dispatch({ type: "UPDATE", payload: updatedEvent });
  }

  function deleteEvent(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  return (
    <EventContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
}

export default EventContext;
