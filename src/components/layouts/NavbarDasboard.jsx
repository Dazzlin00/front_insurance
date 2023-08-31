import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";


import { Outlet, Link } from "react-router-dom";
import useAuthContext from "../../context/AuthContext";

const NavbarDashboard = () => {
  const { logout } = useAuthContext();
  const handleLogout = () => {
    logout();
 
  };

  return (
    <>
      <Navbar className="navBg" expand="lg">
        <Container>
          <Navbar.Brand>INSURANCE</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/policies">
                Polizas
              </Nav.Link>
              <Nav.Link as={Link} to="/accidents">
                Siniestros
              </Nav.Link>
              <Nav.Link as={Link} to="/reports">
                Reportes
              </Nav.Link>
              <Nav.Link as={Link} to="/">
                Configuración
              </Nav.Link>
            </Nav>
         
            <Col xs="auto">
            <Button onClick={handleLogout}>Cerrar Sesion</Button>
            </Col>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section>
        <Outlet></Outlet>
      </section>
    </>
  );
};

export default NavbarDashboard;