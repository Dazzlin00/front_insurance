import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


import { Outlet,Link } from 'react-router-dom';

function navbar() {
 
    return (
        <>
        
        <Navbar className="navBg" expand="lg"  >
          <Container>
            <Navbar.Brand as={Link} to="/">INSURANCE</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
               
                <Nav.Link as={Link} to="/plans" >Planes</Nav.Link>
                <Nav.Link as={Link} to="/about">Sobre nosotros</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contáctanos</Nav.Link>
                <Nav.Link as={Link} to="/politics">Politicas</Nav.Link>
                
              </Nav>
              <Col xs="auto">
            <Button as={Link} to="/login">Acceder</Button>
          </Col>
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


