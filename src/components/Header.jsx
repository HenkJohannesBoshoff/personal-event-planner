import React, { useContext, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Header() {
  // Get user info and logout function from context
  const { user, logout } = useContext(UserContext);

  // State to control navbar collapse manually
  const [open, setOpen] = useState(false);

  // Function to close the menu after a link is clicked (important for mobile)
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="md" fixed="top">
      <Container>
        <Navbar.Brand as={NavLink} to="/dashboard" onClick={handleLinkClick}>
          EventPlanner
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-collapse"
          onClick={() => setOpen(!open)}
        />
        <Navbar.Collapse in={open} id="navbar-collapse">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/dashboard" onClick={handleLinkClick}>
              Dashboard
            </Nav.Link>
            <Nav.Link as={NavLink} to="/add" onClick={handleLinkClick}>
              Add Event
            </Nav.Link>
            <Nav.Link as={NavLink} to="/help" onClick={handleLinkClick}>
              Help
            </Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <>
                <span className="navbar-text me-2">Hi, {user.username}</span>
                <button
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    logout();
                    handleLinkClick(); // close navbar on mobile
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login" onClick={handleLinkClick}>
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register" onClick={handleLinkClick}>
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
