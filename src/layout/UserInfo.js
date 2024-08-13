import React from "react";
import { Navbar, NavDropdown, Badge } from "react-bootstrap";

function UserInfo({ userName }) {
  return (
    <>
      <hr className="my-4" />
      <h6 className="text-muted">Profile</h6>
      <Badge bg="success">管理者</Badge>
      <Navbar>
        <Navbar.Collapse>
          <NavDropdown
            title={<i className="bi bi-person-circle">{userName}</i>}
            id="basic-nav-dropdown"
            drop="up"
          >
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

export default UserInfo;
