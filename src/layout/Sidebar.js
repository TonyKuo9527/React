import React, { useState } from "react";
import { Accordion, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import SidebarsConfig from "../SidebarsConfig";

function Sidebar({ activeKey, handleSelect }) {
  return (
    <Accordion activeKey={activeKey} onSelect={handleSelect}>
      {SidebarsConfig.accordionItems.map((item, index) => (
        <Accordion.Item eventKey={item.eventKey} key={index}>
          <Accordion.Header>
            <i className={`bi ${item.icon}`} />
            {item.header}
          </Accordion.Header>
          <Accordion.Body>
            <Nav variant="pills" className="flex-column">
              {item.links.map((link, linkIndex) => (
                <Nav.Item key={linkIndex}>
                  <Nav.Link as={NavLink} to={link.to} activeClassName="active">
                    {link.label}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Sidebar;
