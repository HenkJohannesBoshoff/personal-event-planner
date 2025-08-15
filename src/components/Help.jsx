import React from "react";

export default function Help() {
  return (
    <div className="p-3">
      <br />
      <h1 className="text-center text-decoration-underline">Help Page</h1>
      <br />
      <p className="lead text-center">
        Welcome to the Personal Event Planner! This app helps you manage your
        events, so you never miss an important occasion.
      </p>
      <hr />
      <br />
      <div className="row justify-content-center">
        <div
          className="col-lg-8 col-md-10 col-sm-12 text-start mx-auto"
          style={{ maxWidth: "800px" }}
        >
          <h4 className="mb-3 text-decoration-underline">How to Use</h4>
          <ul className="ps-4 ms-0 help-list lh-lg">
            <li>
              <strong>Login or Register</strong> to access your personal event
              dashboard.
            </li>
            <li>
              Use the <strong>Dashboard</strong> to view all upcoming events in
              chronological order.
            </li>
            <li>
              Click <strong>Add Event</strong> to create a new event, and fill
              in all details — including <em>title</em>, <em>date</em>,{" "}
              <em>time</em>, <em>location</em>, and a <em>description</em>.
            </li>
            <li>
              Use the <strong>Edit</strong> button to update an event’s details,
              including the date or time if it changes.
            </li>
            <li>
              Click <strong>Delete</strong> to remove an event — you’ll be asked
              to confirm first.
            </li>
            <li>
              Use the search bar in the dashboard to quickly find events by
              title.
            </li>
          </ul>

          <h4 className="mt-4 mb-3 text-decoration-underline">Tips</h4>
          <ul className="ps-4 ms-0 help-list lh-lg">
            <li>
              Always double-check both the <strong>date</strong> and{" "}
              <strong>time</strong> when creating an event to ensure it appears
              in the correct order.
            </li>
            <li>
              Keep descriptions short and to the point (max 200 characters).
            </li>
            <li>
              Your events are stored securely in your account, and only you can
              see them after logging in.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
