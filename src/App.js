import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Accordion } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

import sidebarsConfig from './sidebarsConfig';

import Dashboard from './components/dashboard';
import Settings from './components/settings';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [activeKey, setActiveKey] = useState(null);

  const handleSelect = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <Container fluid>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={NavLink} to="/">Try</Navbar.Brand>
      </Navbar>
      <Row>
        <Col xs={2}>
          <Accordion activeKey={activeKey} onSelect={handleSelect}>
            {sidebarsConfig.accordionItems.map((item, index) => (
              <Accordion.Item eventKey={item.eventKey} key={index}>
                <Accordion.Header><i className={`bi ${item.icon}`} style={{ fontSize: '2rem', color: 'red' }} />{item.header}</Accordion.Header>
                <Accordion.Body>
                  <Nav variant="pills" className="flex-column">
                    {item.links.map((link, linkIndex) => (
                      <Nav.Item key={linkIndex}>
                        <Nav.Link as={NavLink} to={link.to} activeClassName="active">
                          <i className={`bi ${link.icon}`} style={{ fontSize: '2rem', color: 'red' }} />
                          {link.label}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                  </Nav>
                </Accordion.Body>
              </Accordion.Item>
            ))}
            </Accordion>
        </Col>
        <Col xs={10}>
          <Container className="p-3">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
