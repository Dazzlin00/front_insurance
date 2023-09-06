import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import logo from '../../red-seguro-logo.jpg';


import { Outlet,Link } from 'react-router-dom';

function navbar() {
 
    return (
        <>
        
        <Navbar className="navBg" expand="lg">
  <Container style={{ maxHeight: "60px" }}>
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
      <img src={logo} alt="logo" className="img-thumbnail" style={{ width: '150px', height:'70px'}} />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/plans">Planes</Nav.Link>
        <Nav.Link as={Link} to="/about">Sobre nosotros</Nav.Link>
        <Nav.Link as={Link} to="/contact">Contáctanos</Nav.Link>
        <Nav.Link as={Link} to="/politics">Politicas</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link as={Link} to="/login">Acceder</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        <section>
          <Outlet></Outlet>
        </section>
        </>
      )
    }
    


export default navbar


