import React, { useState } from "react";
import { Container, Row, Col, Navbar } from "react-bootstrap";
import {
  Route,
  Routes,
  NavLink,
  BrowserRouter as Router,
} from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

import Sidebar from "./layout/Sidebar";
import UserInfo from "./layout/UserInfo";

import Dashboard from "./components/Dashboard";

import CertifyQuery from "./components/CertifyQuery";
import TechnicianSkillStatus from "./components/TechnicianSkillStatus";

import RegionCodeSettings from "./components/RegionCodeSettings";
import MachineModelMaintenance from "./components/MachineModelMaintenance";
import RegionSkillMachineMaintenance from "./components/RegionSkillMachineMaintenance";
import CertifyManualInput from "./components/CertifyManualInput";

import EmployeeDataSettings from "./components/EmployeeDataSettings";
import HRSynchronizationSettings from "./components/HRSynchronizationSettings";

import MOCodeSettings from "./components/MOCodeSettings";
import MORecordMaintenance from "./components/MORecordMaintenance";

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const [activeKey, setActiveKey] = useState(null);
  const [userName] = useState("UserName");

  const handleSelect = (eventKey) => {
    setActiveKey(activeKey === eventKey ? null : eventKey);
  };

  return (
    <Container fluid>
      <Row>
        <Col xl={2}>
          <Container fluid className="p-3">
            <Navbar expand="lg" className="bg-body-tertiary">
              <Container>
                <Navbar.Brand as={NavLink} to="/" exact>
                  HRMS
                </Navbar.Brand>
              </Container>
            </Navbar>
            <Sidebar activeKey={activeKey} handleSelect={handleSelect} />
            <UserInfo userName={userName} />
          </Container>
        </Col>
        <Col xl={10}>
          <Container className="p-3">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/CertifyQuery" element={<CertifyQuery />} />
              <Route
                path="/TechnicianSkillStatus"
                element={<TechnicianSkillStatus />}
              />

              <Route
                path="/RegionCodeSettings"
                element={<RegionCodeSettings />}
              />
              <Route
                path="/MachineModelMaintenance"
                element={<MachineModelMaintenance />}
              />
              <Route
                path="/RegionSkillMachineMaintenance"
                element={<RegionSkillMachineMaintenance />}
              />
              <Route
                path="/CertifyManualInput"
                element={<CertifyManualInput />}
              />

              <Route
                path="/EmployeeDataSettings"
                element={<EmployeeDataSettings />}
              />
              <Route
                path="/HRSynchronizationSettings"
                element={<HRSynchronizationSettings />}
              />

              <Route path="/MOCodeSettings" element={<MOCodeSettings />} />
              <Route
                path="/MORecordMaintenance"
                element={<MORecordMaintenance />}
              />
            </Routes>
          </Container>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
