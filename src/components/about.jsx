import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import icon from "../red-seguro-icon.png";
import nosotros from "../assets/about.jpg";
import Footer from "./layouts/footer";

const AboutUs = () => {
  return (
    <div
      style={{
        backgroundColor: "#EAEAEA",
     
        
      }}
    >
     
       
          <img
            src={nosotros}
            alt="Imagen de contacto"
           width={"100%"}
           height={600}
          />
       
        <Col>
          
          <div
            style={{
             
              backgroundColor: "#87CEEB",
            
              padding:20
            }}
          >
            <h1 style={{ color: "#333333" }}>Sobre nosotros</h1>
            <p
              style={{
                color: "#333333",
                textAlign: "justify",
                textJustify: "inter-word",
              }}
            >
              RedSeguro es una empresa líder en la gestión de seguros
              financieros, dedicada a brindar tranquilidad y protección a
              nuestros clientes. Nuestro compromiso es ofrecer soluciones
              innovadoras y confiables que se adapten a las necesidades
              financieras de nuestros clientes. Contamos con un equipo de
              expertos en seguros financieros que trabajan arduamente para
              proporcionar asesoramiento personalizado y productos de calidad.
              En RedSeguro, entendemos la importancia de salvaguardar los
              activos financieros de nuestros clientes y nos esforzamos por
              ofrecer coberturas integrales y competitivas. Nuestra misión es
              construir relaciones sólidas y duraderas con nuestros clientes,
              brindando un servicio excepcional y una experiencia positiva en
              todo momento.
            </p>
            <p
              style={{
                color: "#333333",
                textAlign: "center",
                textJustify: "inter-word",
              }}
            >
              El escudo azul en nuestro logotipo simboliza nuestra promesa de
              brindar seguridad, confianza y protección a nuestros clientes, y
              nuestro compromiso de ser su socio confiable en el camino hacia un
              futuro seguro y próspero.
            </p>
            <img
              src={icon}
              alt="icon"
              style={{ width: "10%" }}
            />
            <p
              style={{
                color: "#555555",
                fontStyle: "italic",
                fontSize: "24px",
              }}
            >
              "Protegiendo tu futuro, asegurando tu tranquilidad"
            </p>
          </div>
        </Col>
        <Footer />

    </div>
  );
};

export default AboutUs;
