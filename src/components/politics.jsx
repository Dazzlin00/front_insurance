import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import politicas from "../assets/politic.jpg";

const Politics = () => {
  return (
    <Container
      style={{
        backgroundColor: "#EAEAEA",
        marginTop: 30,
        marginBottom: 30,
        padding: "30px",
      }}
    >
      <Row>
        <Col xs="12" md="6">
          <img
            src={politicas}
            alt="Imagen de contacto"
            style={{  width: "600px", height: "600px",borderRadius:10 }}
          />
        </Col>
        <Col xs="12" md="6">
          <h1 style={{ color: "#333333" }}>Políticas</h1>
          <div style={{ backgroundColor: "#87CEEB" ,borderRadius:10 ,padding:3}}>
            <h2 style={{ color: "#333333" }}>Política de Privacidad</h2>
            <p
              style={{
                color: "#333333",
                textAlign: "justify",
                textJustify: "inter-word",
                margin:10
              }}
            >
              En RedSeguro, nos tomamos muy en serio la privacidad de nuestros
              clientes. Nos comprometemos a proteger la información personal que
              nos proporcionas y a utilizarla de acuerdo con las leyes y
              regulaciones aplicables. No compartiremos tu información con
              terceros sin tu consentimiento expreso, a menos que sea requerido
              por la ley.
            </p>
          </div>
          <div style={{ padding:3}}>
            <h2 style={{ color: "#333333" }}>Política de Cookies</h2>
            <p
              style={{
                color: "#333333",
                textAlign: "justify",
                textJustify: "inter-word",
                margin:10
              }}
            >
              Utilizamos cookies en nuestro sitio web para mejorar tu
              experiencia y brindarte un servicio personalizado. Las cookies nos
              permiten recordar tus preferencias y realizar un seguimiento de
              tus interacciones con nuestro sitio. Puedes ajustar tus
              preferencias de cookies en la configuración de tu navegador.
            </p>
          </div>
          <div style={{ backgroundColor: "#87CEEB" ,borderRadius:10 ,padding:3}}>
            <h2 style={{ color: "#333333" }}>Política de Reembolsos</h2>
            <p
              style={{
                color: "#333333",
                textAlign: "justify",
                textJustify: "inter-word",
                margin:10
              }}
            >
              En RedSeguro, nos esforzamos por ofrecer productos y servicios de
              calidad. Si no estás satisfecho con tu compra, puedes solicitar un
              reembolso dentro de los 30 días posteriores a la fecha de compra.
              Nos reservamos el derecho de evaluar cada solicitud de reembolso
              de manera individual y tomar medidas adecuadas según corresponda.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Politics;
