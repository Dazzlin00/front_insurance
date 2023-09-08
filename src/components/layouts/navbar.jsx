import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

import logo from "../../red.png";
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Outlet, Link } from "react-router-dom";

function NavBar() {

  return (
    <>
  
<Navbar className="navBg fixed-top" expand="lg" >
      <Container >
      <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="logo"
             // className="img-thumbnail"
              style={{ width: "200px", height: "80px" }}
            />
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto" position="relative">
          <Nav.Link as={Link} to="/plans" style={{ fontWeight: "bold",fontFamily: "Arial"  }}>
                Planes
              </Nav.Link>
              <Nav.Link as={Link} to="/about" style={{ fontWeight: "bold" ,fontFamily: "Arial"}}>
                Sobre nosotros
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" style={{ fontWeight: "bold",fontFamily: "Arial" }}>
                Contáctanos
              </Nav.Link>
              <Nav.Link as={Link} to="/politics" style={{ fontWeight: "bold",fontFamily: "Arial" }}>
                Politicas
              </Nav.Link>
            
          </Nav>
          
            <Button  style={{ width: "120px", height: "40px" }} href="/login">
                Acceder
              </Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <section >
        <Outlet></Outlet>
      </section>
    </>
  );
}

export default NavBar;
