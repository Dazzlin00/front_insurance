import React, { useState } from "react";
import { Button, Form, Container, Image } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./layouts/footer";
import Accordion from "react-bootstrap/Accordion";

//import ExampleCarouselImage from '../assets/politic.jpg';
const Home = () => {
  const [email, setEmail] = useState("");
  const [contenido, setContenido] = useState("");
  const { mensajes, errors, success } = useAuthContext();

  const handleMessage = async (event) => {
    event.preventDefault();
    mensajes({ email, contenido });
  };

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <view>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <Image
            style={{ width: " 100%", height: "100%" }}
            src={require("../assets/cr1.jpg")}
            text="First slide"
          />
          <Carousel.Caption>
            <h3>No dejes tu futuro en manos del azar</h3>
            <p>
              La vida está llena de imprevistos, y es importante estar preparado
              para ellos. Un seguro puede ayudarte a protegerte financieramente
              en caso de accidentes
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ width: "100%", height: "100%" }}
            src={require("../assets/finanzas.jpg")}
            text="Second slide"
          />
          <Carousel.Caption>
            <h3>Protege tu patrimonio con los mejores seguros del mercado</h3>
            <p>
              En RedSeguro, sabemos que tu patrimonio es importante para ti. Por
              eso, ofrecemos una amplia gama de seguros diseñados para
              protegerte
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image
            style={{ width: " 100%", height: "100%" }}
            src={require("../assets/riesgo2.jpg")}
            text="Third slide"
          />
          <Carousel.Caption>
            <h3>Un seguro a medida para tus necesidades financieras</h3>
            <p>
              Con RedSeguro, puedes estar seguro de que tu patrimonio está
              protegido.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <div className="container">
        <div className="row align-items-start">
          <div className="col">
            <h5>Contacta con nosotros</h5>

            <Form onSubmit={handleMessage} className="mb-5 mt-3">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ingrese su correo"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  placeholder="Mensaje"
                />
                {errors && <text>{errors}</text>}
                {success && <text>{success}</text>}
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </div>
            </Form>
          </div>

          <div className="col">
            <h5>Preguntas Frecuentes</h5>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  ¿Que Beneficios obtengo al tener un seguro en RedSeguros{" "}
                </Accordion.Header>
                <Accordion.Body>
                  Los beneficios de obtener un seguro son numerosos y variados.
                  RedSeguros puede protegerte de pérdidas financieras
                  significativas en caso de que ocurra un evento imprevisto.
                  También puede brindarte tranquilidad, sabiendo que estás
                  protegido en caso de que algo suceda.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>¿Por qué necesito seguro?</Accordion.Header>
                <Accordion.Body>
                  El seguro puede protegerte de pérdidas financieras
                  significativas en caso de que ocurra un evento imprevisto. Por
                  ejemplo, si tienes un accidente automovilístico, tu seguro de
                  automóvil puede pagar los daños a tu vehículo y a los
                  vehículos de otras personas.
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  ¿Cómo elijo el seguro adecuado para mí?
                </Accordion.Header>
                <Accordion.Body>
                  Hay muchos factores a considerar al elegir un seguro, como el
                  tipo de seguro que necesitas, el costo de la póliza y los
                  beneficios que ofrece. Es importante comparar las diferentes
                  pólizas disponibles para encontrar la que mejor se adapte a
                  tus necesidades y presupuesto.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  ¿Cómo puedo reportar un siniestro?
                </Accordion.Header>
                <Accordion.Body>
                  Para reportar un siniestro, debes acceder a la página web
                  RedSeguros y buscar el formulario de siniestros. Una vez que
                  hayas encontrado el formulario, debes ingresar la información
                  requerida, como tu cedula, número de póliza, la fecha del
                  siniestro, la ubicación del siniestro y una descripción del
                  siniestro.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>

      <Footer />
    </view>
  );
};
export default Home;
