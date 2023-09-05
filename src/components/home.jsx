import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";

const Home = () => {

  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");
  const { mensajes,errors,success } = useAuthContext();

  const handleMessage = async (event) => {
    event.preventDefault();
    mensajes({ email, mensaje });
  };

  

  return (

    <div>
      <div id="carouselExampleIndicators" className="carousel slide">

        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="https://rolland.com.mx/wp-content/uploads/2019/01/p-shutterstock-749534260.jpg.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://rolland.com.mx/wp-content/uploads/2019/01/p-shutterstock-749534260.jpg.jpeg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://rolland.com.mx/wp-content/uploads/2019/01/p-shutterstock-749534260.jpg.jpeg" className="d-block w-100" alt="..." />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>

      </div>

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

              <Form.Group
                className="mb-3"
                controlId="formBasicMessage">

                <Form.Control
                  as="textarea"
                  rows={3}
                  value={mensaje}

                  onChange={(e) => setMensaje(e.target.value)}
                  placeholder="Mensaje"

                />
                {errors && <text >{errors}</text>}
                {success && <text >{success}</text>}
                
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

            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    Accordion Item #1
                  </button>
                </h2>
                <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <p className="txtJustify">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item's accordion body.</p>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    Accordion Item #2
                  </button>
                </h2>
                <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <p className="txtJustify">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item's accordion body. Let's imagine this being filled with some actual content.</p>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    Accordion Item #3
                  </button>
                </h2>
                <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                  <p className="txtJustify">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footerBlack">
        <footer className="py-3 ">
          <p className="text-center">© Copyright 2023 | RedSeguro</p>
        </footer>
      </div>



    </div>



  )
}
export default Home