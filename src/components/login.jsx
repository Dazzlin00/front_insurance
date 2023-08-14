import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, errors } = useAuthContext();

  const handleLogin = async (event) => {
    event.preventDefault();
    login({ email, password });
  };
  return (
    <div>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <h2 className=" mb-5 text-uppercase ">Insurance</h2>
            <Card className="shadow">
              <div class="card-header ">
                <h5 class="card-title">Acceso</h5>
              </div>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={handleLogin}>
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
                        controlId="formBasicPassword"
                      >
                        
                        <Form.Control
                          type="password"
                          value={password}
                          
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"

                          
                        />
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formBasicCheckbox"
                      >
                        <p className="small">
                          <a className="text-primary" href="#!">
                            Forgot password?
                          </a>
                        </p>
                      </Form.Group>
                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                          Login
                        </Button>
                      </div>
                    </Form>
                    <div className="mt-3">
                      <p className="mb-0  text-center">
                        Don't have an account?{" "}
                        <a href="{''}" className="text-primary fw-bold">
                          Sign Up
                        </a>
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
