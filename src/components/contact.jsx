import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactanos from "../assets/contactanos.jpg";

const Contact = () => {
  return (
    <Container
    style={{
      backgroundColor: "#EAEAEA",
      marginTop: 30,
      marginBottom: 30,
      padding: "30px",
      borderRadius:10 
    }}    >
      <Row>
        <Col
          xs="12"
          md="6"
        >
          <img
            src={contactanos}
            alt="Imagen de contacto"
            style={{  width: "600px", height: "600px", borderRadius:10 }}
            />
        </Col>
        
        <Col>
        
          <h1 style={{ color: "#333333" }}>Contáctanos</h1>
          <div style={{ backgroundColor: "#87CEEB",borderRadius:10 ,padding:20 }}>
          <p
            style={{
              color: "#333333",
              textAlign: "center",
              textJustify: "inter-word",
            }}
          >
            Si tienes alguna pregunta o consulta, no dudes en ponerte en
            contacto con nosotros. <br /> Estamos aquí para ayudarte.
          </p>
          <p style={{ color: "#333333" }}>
            Correo electrónico: info@redseguro.com
          </p>
          <p style={{ color: "#333333" }}>Teléfono: +1 123 456 7890</p>
          <p style={{ color: "#333333" }}>
            Dirección: Calle Ficticia, 123, Ciudad Imaginaria, País Inventado
          </p>

          </div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
