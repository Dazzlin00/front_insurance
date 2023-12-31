import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";
import "../css/login.css";
import { Link, isRouteErrorResponse } from "react-router-dom";
import logo from "../red-seguro-logo.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors, success } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage(
        <div class="alert alert-danger">
          Por favor complete todos los campos
        </div>
      );
      return;
    }
    login({ email, password });
  };

  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <h2 className="mb-5">
              <img
                src={logo}
                alt="logo"
                className="img-thumbnail w-50 border border-0"
              />
            </h2>
            <Card className="shadow">
              <div className="card-header ">
                <h5 className="card-title">Acceso</h5>
              </div>
              <Card.Body>
                <div
                  className="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1
                          className="modal-title fs-5"
                          id="staticBackdropLabel"
                        >
                          Cambiar contraseña
                        </h1>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3 mt-md-4">
                          <div className="mb-3">
                            <div className="input-group mb-3">
                              <span
                                className="input-group-text"
                                id="basic-addon1"
                              >
                                @
                              </span>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                              />
                            </div>
                            <div className="mt-3">
                              <p className="mb-0  text-center">
                                Enviaremos un link de restauración de contraseña
                                a tu correo electrónico asociado
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-dismiss="modal"
                        >
                          Cerrar
                        </button>
                        <button type="button" className="btn btn-primary">
                          Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Ingrese su correo"
                          onFocus={() => setMessage("")}
                        />
                      </Form.Group>

                      <Form.Group
                        className="mb-3"
                        controlId="formBasicPassword"
                      >
                        <Form.Control
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Contraseña"
                          onFocus={() => setMessage("")}
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a
                            className="text-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            href="#!"
                          >
                            <Link to="/newPassword">
                              ¿Haz olvidado tu contraseña?
                            </Link>
                          </a>
                        </p>
                      </Form.Group>
                      {errors && <text className="error">{errors}</text>}
                      {success && <text className="sucess">{success}</text>}
                      {message && <text className="sucess">{message}</text>}

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Acceder
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        No tienes una cuenta?{" "}
                        <Link to="/signUp" className="text-primary fw-bold">
                          Crear cuenta
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Login;
