import React, { useContext, useState } from "react";
import EventContext from "./EventContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { events, deleteEvent } = useContext(EventContext);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);

  // Sort events by date (soonest first)
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // Filter events by search term
  const filteredEvents = sortedEvents.filter((ev) =>
    ev.title.toLowerCase().includes(search.toLowerCase())
  );

  // Format date and time together
  function formatDateTime(dateString, timeString) {
    const date = new Date(dateString + "T" + timeString);
    return (
      date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      }) +
      " at " +
      timeString
    );
  }

  // Show modal with selected event
  function confirmDelete(event) {
    setEventToDelete(event);
    setShowModal(true);
  }

  // Delete event and close modal
  function handleDelete() {
    if (eventToDelete) {
      deleteEvent(eventToDelete.id);
    }
    setShowModal(false);
    setEventToDelete(null);
  }

  return (
    <div className="p-3">
      <br />
      <h1>Dashboard</h1>

      {/* Search filter */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search events..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filteredEvents.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="row g-3">
          {filteredEvents.map((ev) => (
            <div className="col-md-6 col-lg-4" key={ev.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{ev.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {formatDateTime(ev.date, ev.time)} — {ev.location}
                  </h6>
                  <p className="card-text">{ev.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link
                    to={`/edit/${ev.id}`}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmDelete(ev)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bootstrap Delete Confirmation Modal */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete{" "}
                <strong>{eventToDelete?.title}</strong>?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
