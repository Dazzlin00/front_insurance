import React, { useState } from "react";
import { Button, Form, Container, Image } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";
import Carousel from "react-bootstrap/Carousel";
import Footer from "./layouts/footer";
//import ExampleCarouselImage from '../assets/politic.jpg';
const Home = () => {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { mensajes, errors, success } = useAuthContext();

  const handleMessage = async (event) => {
    event.preventDefault();
    mensajes({ email, mensaje });
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
            <p>La vida está llena de imprevistos, y es importante estar preparado para ellos. Un seguro puede ayudarte a protegerte financieramente en caso de accidentes</p>
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
            <p>En RedSeguro, sabemos que tu patrimonio es importante para ti. Por eso, ofrecemos una amplia gama de seguros diseñados para protegerte</p>
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
            Con RedSeguro, puedes estar seguro de que tu patrimonio está protegido.
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
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
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

            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <p className="txtJustify">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the first item's accordion body.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <p className="txtJustify">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the second item's accordion body. Let's imagine this
                    being filled with some actual content.
                  </p>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  className="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <p className="txtJustify">
                    Placeholder content for this accordion, which is intended to
                    demonstrate the <code>.accordion-flush</code> className.
                    This is the third item's accordion body. Nothing more
                    exciting happening here in terms of content, but just
                    filling up the space to make it look, at least at first
                    glance, a bit more representative of how this would look in
                    a real-world application.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <Footer />
    </view>
  );
};
export default Home;
