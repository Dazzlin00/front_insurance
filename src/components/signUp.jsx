import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

const SignUp = () => {

    return (
        <>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">

                    <Col md={8} lg={6} xs={12}>
                        <h2 className=" mb-5 text-uppercase ">Insurance</h2>
                        <Card className="shadow">
                            <div className="card-header ">
                                <h5 className="card-title">Regístrate</h5>
                            </div>
                            <Card.Body>

                                <div className="mb-3 mt-md-4">
                                    <div className="mb-3">
                                        <Form >

                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">@</span>
                                                <input type="text" className="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="">@</span>
                                                <input type="email" className="form-control" placeholder="Correo" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>

                                            <div className="input-group mb-3">
                                                <span className="input-group-text" id="basic-addon1">@</span>
                                                <input type="password" className="form-control" placeholder="Contraseña" aria-label="Username" aria-describedby="basic-addon1" />
                                            </div>

                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <p className="form-check-label text-left" for="flexCheckDefault">
                                                    Acepto los términos y condiciones
                                                </p>
                                            </div>

                                            <div className="d-grid">
                                                <Button variant="primary" type="submit">
                                                    Crear cuenta
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
