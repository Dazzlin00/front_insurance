import React, { useState,useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";
import logo from '../red-seguro-logo.jpg';


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordconfi] = useState("");
 const { register,errors,success } = useAuthContext();
 const [message, setMessage] = React.useState("");

  const handleregister = async (event) => {
    event.preventDefault();
    if (!name ||!email || !password|| !password_confirmation) {
     
      setMessage( <div class="alert alert-danger">Por favor complete todos los campos</div>);
      return;
    }
    register({ name,email, password,password_confirmation});
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("")
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [message]);

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <h2 className="mb-5">
              <img src={logo} alt="logo" className="img-thumbnail w-50 border border-0" />
            </h2>
            <Card className="shadow">
              <div className="card-header ">
                <h5 className="card-title">Regístrate</h5>
              </div>
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <div className="mb-3">
                    <Form onSubmit={handleregister}>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                          
                        </span>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="Nombre"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        
                        </span>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          placeholder="Correo"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>

                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                        
                        </span>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                          placeholder="Contraseña"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>
                      <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">
                         
                        </span>
                        <input
                          value={password_confirmation}
                          onChange={(e) => setPasswordconfi(e.target.value)}
                          type="password"
                          className="form-control"
                          placeholder="Confirmar Contraseña"
                          aria-label="Username"
                          aria-describedby="basic-addon1"
                        />
                      </div>

                     
                      {errors && <text className="error">{errors}</text>}
                      {success && <text className="sucess">{success}</text>}
                      {message && <text className="sucess">{message}</text>}

                      <div className="d-grid">
                        <Button variant="primary" type="submit">
                        Registrarse 
                        </Button>
                      </div>
                    </Form>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignUp;
