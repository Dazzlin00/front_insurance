import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Contact = () => {
  return (
    <Container style={{ backgroundColor: '#EAEAEA', padding: '40px' }}>
      <Row>
        <Col>
          <h1 style={{ color: '#333333' }}>Contáctanos</h1>
          <p style={{ color: '#333333', textAlign: 'center', textJustify: 'inter-word' }}>
            Si tienes alguna pregunta o consulta, no dudes en ponerte en contacto con nosotros. <br/> Estamos aquí para ayudarte.
          </p>
          <p style={{ color: '#333333' }}>
            Correo electrónico: info@redseguro.com
          </p>
          <p style={{ color: '#333333' }}>
            Teléfono: +1 123 456 7890
          </p>
          <p style={{ color: '#333333' }}>
            Dirección: Calle Ficticia, 123, Ciudad Imaginaria, País Inventado
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;