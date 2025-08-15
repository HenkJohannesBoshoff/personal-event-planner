import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventContext from "./EventContext";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function EditEvent() {
  const { events, updateEvent } = useContext(EventContext);
  const navigate = useNavigate();
  const { id } = useParams();

  // Find the event to edit
  const eventToEdit = events.find((ev) => ev.id === id);

  if (!eventToEdit) {
    return <p className="p-3">Event not found.</p>;
  }

  return (
    <div className="container p-3">
      <h1>Edit Event</h1>

      <Formik
        initialValues={{
          title: eventToEdit.title || "",
          date: eventToEdit.date || "",
          time: eventToEdit.time || "", // ✅ Added time
          location: eventToEdit.location || "",
          description: eventToEdit.description || "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title.trim()) errors.title = "Title is required.";
          if (!values.date) errors.date = "Date is required.";
          else if (isNaN(new Date(values.date).getTime()))
            errors.date = "Invalid date format.";
          if (!values.time) errors.time = "Time is required."; // ✅ Validate time
          if (!values.location.trim())
            errors.location = "Location is required.";
          if (!values.description.trim())
            errors.description = "Description is required.";
          return errors;
        }}
        onSubmit={(values) => {
          updateEvent({ id, ...values });
          navigate("/dashboard");
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Title */}
            <div className="mb-3">
              <label className="form-label">Title</label>
              <Field type="text" name="title" className="form-control" />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Date */}
            <div className="mb-3">
              <label className="form-label">Date</label>
              <Field type="date" name="date" className="form-control" />
              <ErrorMessage
                name="date"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Time */}
            <div className="mb-3">
              <label className="form-label">Time</label>
              <Field type="time" name="time" className="form-control" />
              <ErrorMessage
                name="time"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="form-label">Location</label>
              <Field type="text" name="location" className="form-control" />
              <ErrorMessage
                name="location"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Description */}
            <div className="mb-3">
              <label className="form-label">Description</label>
              <Field
                as="textarea"
                name="description"
                className="form-control"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-danger"
              />
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="btn btn-success me-2"
              disabled={isSubmitting}
            >
              Update Event
            </button>
            <button
              type="button"
              className="btn btn-teal"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
