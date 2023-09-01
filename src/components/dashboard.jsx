import React, { Component, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

import useAuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
      console.log(user?.data.role);
    }
  }, [user, getUser]);
  return (
    <div>
     
      {user && (
        <div>
            {/* CLIENTE */}
          {user?.data.roles.includes("user") && (
            <Container>
             ¡Bienvenido, {user?.data.name}!
              <Row className="vh-500 d-flex justify-content-center">
                <Col md={22} lg={50} xs={12}>
                  <Card className="shadow">
                    <div className="card-header">
                      <h5 className="card-title">Vencimiento de Pólizas</h5>
                    </div>
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Descripción</th>
                              <th scope="col">Inicio</th>
                              <th scope="col">Fin</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>XXXXXXXXX</td>
                              <td>0000-00-00</td>
                              <td>0000-00-00</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>XXXXXXXXX</td>
                              <td>0000-00-00</td>
                              <td>0000-00-00</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>XXXXXXXXX</td>
                              <td>0000-00-00</td>
                              <td>0000-00-00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="vh-500 d-flex justify-content-center">
                <Col md={22} lg={50} xs={12}>
                  <Card className="shadow">
                    <div className="card-header">
                      <h5 className="card-title">Siniestros</h5>
                    </div>
                    <Card.Body>
                      <div className="mb-3 mt-md-4"></div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}

           {/* Agente */}
          {user?.data.roles.includes("agent") && (
            <Container>
             ¡Bienvenido, {user?.data.name}!
              <Row className="vh-500 d-flex justify-content-center">
                <Col md={22} lg={50} xs={12}>
                  <Card className="shadow">
                    <div className="card-header">
                      <h5 className="card-title">Últimos clientes</h5>
                    </div>
                    <Card.Body>
                      <div className="mb-3 mt-md-4">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">ID</th>
                              <th scope="col">Usuario</th>
                              <th scope="col">Ingreso</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th scope="row">1</th>
                              <td>XXXXXXXXX</td>
                              <td>@usuario</td>
                              <td>0000-00-00</td>
                            </tr>
                            <tr>
                              <th scope="row">2</th>
                              <td>XXXXXXXXX</td>
                              <td>@usuario</td>
                              <td>0000-00-00</td>
                            </tr>
                            <tr>
                              <th scope="row">3</th>
                              <td>XXXXXXXXX</td>
                              <td>@usuario</td>
                              <td>0000-00-00</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row className="vh-500 d-flex justify-content-center">
                <Col md={22} lg={50} xs={12}>
                  <Card className="shadow">
                    <div className="card-header">
                      <h5 className="card-title">Siniestros</h5>
                    </div>
                    <Card.Body>
                      <div className="mb-3 mt-md-4"></div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
