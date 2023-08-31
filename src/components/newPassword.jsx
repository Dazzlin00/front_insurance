import React, { useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import useAuthContext from "../context/AuthContext";

const NewPassword = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuthContext();

    const handleLogin = async (event) => {
        event.preventDefault();
        login({ email, password });
    };


    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">

                    <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Cambiar contraseña</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3 mt-md-4">
                                        <div className="mb-3">
                                            <div className="mt-3">
                                                <p className="mb-0  text-center">
                                                    Haz cambiado tu contraseña, ahora puedes acceder a la plataforma con tu nueva contraseña
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="modal-footer">
                                    <Button className="btn btn-primary" data-bs-dismiss="modal">Aceptar</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Col md={8} lg={6} xs={12}>
                        <h2 className=" mb-5 text-uppercase ">Insurance</h2>
                        <Card className="shadow">
                            <div className="card-header ">
                                <h5 className="card-title">Nueva contraseña:</h5>
                            </div>
                            <Card.Body>

                                <div className="">
                                    <div className="mb-3">

                                        <Form onSubmit={handleLogin}>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <p className="text-left">Crea una nueva contraseña:</p>
                                                <Form.Control
                                                    type="password"
                                                    value={password}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Nueva contraseña"
                                                />

                                            </Form.Group>

                                            <Form.Group
                                                className="mb-3"
                                                controlId="formBasicPassword">

                                                <Form.Control
                                                    type="password"
                                                    value={password}

                                                    onChange={(e) => setPassword(e.target.value)}
                                                    placeholder="Confirma contraseña"


                                                />
                                            </Form.Group>

                                            <div className="d-grid">
                                                <Button variant="primary" /*type="submit"*/ data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                    Aceptar
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
        </div>
    );
};

export default NewPassword;
