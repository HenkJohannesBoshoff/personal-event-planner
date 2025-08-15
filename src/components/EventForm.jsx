import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";

//  Validation function
// - Receives all form values and returns an object with error messages.
// - If an input has no errors, it won't appear in the errors object.
function validate(values) {
  const errors = {};

  // Required fields
  if (!values.title) errors.title = "Title is required";
  if (!values.date) errors.date = "Date is required";
  if (!values.location) errors.location = "Location is required";

  // Optional description: max 200 chars
  if (values.description && values.description.length > 200) {
    errors.description = "Max 200 characters";
  }

  return errors; // Formik will use this to display errors
}

export default function EventForm({ initialValues, onSubmit, buttonText }) {
  const navigate = useNavigate(); // Used for Cancel button navigation

  return (
    <Formik
      initialValues={initialValues} // Starting values for the form fields
      validate={validate} // Function to run validation logic
      onSubmit={onSubmit} // Function to run when the form is submitted
    >
      {(
        { resetForm } // Formik injects helpers like resetForm here
      ) => (
        <Form>
          {/* Title Field */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <Field name="title" className="form-control" />
            <ErrorMessage
              name="title"
              component="div"
              className="text-danger"
            />
          </div>

          {/* Date Field */}
          <div className="mb-3">
            <label className="form-label">Date</label>
            <Field type="date" name="date" className="form-control" />
            <ErrorMessage name="date" component="div" className="text-danger" />
          </div>

          {/* Location Field */}
          <div className="mb-3">
            <label className="form-label">Location</label>
            <Field name="location" className="form-control" />
            <ErrorMessage
              name="location"
              component="div"
              className="text-danger"
            />
          </div>

          {/* Description Field */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <Field as="textarea" name="description" className="form-control" />
            <ErrorMessage
              name="description"
              component="div"
              className="text-danger"
            />
          </div>

          {/* Form Buttons */}
          <div className="d-flex gap-2">
            {/* Save button - triggers onSubmit */}
            <button type="submit" className="btn btn-primary">
              {buttonText}
            </button>

            {/* Reset button - clears the form fields */}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => resetForm()}
            >
              Reset
            </button>

            {/* Cancel button - goes back to dashboard without saving */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
