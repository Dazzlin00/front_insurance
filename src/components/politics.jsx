import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Politics = () => {
  return (
    <Container style={{ backgroundColor: '#EAEAEA', padding: '40px' }}>
      <Row>
        <Col>
          <h1 style={{ color: '#333333' }}>Políticas</h1>
          <h2 style={{ color: '#333333' }}>Política de Privacidad</h2>
          <p style={{ color: '#333333', textAlign: 'justify', textJustify: 'inter-word' }}>
            En RedSeguro, nos tomamos muy en serio la privacidad de nuestros clientes. Nos comprometemos a proteger la información personal que nos proporcionas y a utilizarla de acuerdo con las leyes y regulaciones aplicables. No compartiremos tu información con terceros sin tu consentimiento expreso, a menos que sea requerido por la ley.
          </p>
          <h2 style={{ color: '#333333' }}>Política de Cookies</h2>
          <p style={{ color: '#333333', textAlign: 'justify', textJustify: 'inter-word' }}>
            Utilizamos cookies en nuestro sitio web para mejorar tu experiencia y brindarte un servicio personalizado. Las cookies nos permiten recordar tus preferencias y realizar un seguimiento de tus interacciones con nuestro sitio. Puedes ajustar tus preferencias de cookies en la configuración de tu navegador.
          </p>
          <h2 style={{ color: '#333333' }}>Política de Reembolsos</h2>
          <p style={{ color: '#333333', textAlign: 'justify', textJustify: 'inter-word' }}>
            En RedSeguro, nos esforzamos por ofrecer productos y servicios de calidad. Si no estás satisfecho con tu compra, puedes solicitar un reembolso dentro de los 30 días posteriores a la fecha de compra. Nos reservamos el derecho de evaluar cada solicitud de reembolso de manera individual y tomar medidas adecuadas según corresponda.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Politics;