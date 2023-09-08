import React from "react";
import { Container, Row, Col, Image} from "react-bootstrap";
import Footer from "./layouts/footer";
const Contact = () => {
  return (
    <div
      style={{
        backgroundColor: "#EAEAEA",
       marginTop:"105px"
      }}
    >
      <Image
        style={{ width: "100%", height: "500px" }}
        src={require("../assets/contactanos.png")}
      
       
      />
     
      
      <div
        style={{ backgroundColor: "#87CEEB", padding: 20 }}
      >
        <h1 style={{ color: "#333333" }}>Contáctanos</h1>
        <p
          style={{
            color: "#333333",
            textAlign: "center",
            textJustify: "inter-word",
          }}
        >
          Si tienes alguna pregunta o consulta, no dudes en ponerte en contacto
          con nosotros. <br /> Estamos aquí para ayudarte.
        </p>
        <p style={{ color: "#333333" }}>
          Correo electrónico: info@redseguro.com
        </p>
        <p style={{ color: "#333333" }}>Teléfono: +1 123 456 7890</p>
        <p style={{ color: "#333333" }}>
          Dirección: Calle Ficticia, 123, Ciudad Imaginaria, País Inventado
        </p>
      </div>
            <Footer />

    </div>
  );
};

export default Contact;
