import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import axios from "axios";
import useAuthContext from "../context/AuthContext";
const endpoint = "http://localhost:8000/api";

const Dashboard = () => {
  const [polizas, setPolizas] = useState([]);
  const [siniestros, setSiniestros] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {
    if (user?.data.roles.includes("user")) {
      getPolizas();
      getSiniestros();
    } else if (user?.data.roles.includes("agent")) {
      getAllPolizas();
      getAllSiniestros();
      getAllUsers();
    }
    if (user?.data.roles.includes("admin")) {
      getPolizas();
      getSiniestros();
      getAllPolizas();
      getAllSiniestros();
      getAllUsers();
    }
  }, [user]);
  const getPolizas = async () => {
    const response = await axios.get(`${endpoint}/user-poliza`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setPolizas(response.data);

      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };

  const getAllPolizas = async () => {
    const response = await axios.get(`${endpoint}/polizas`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setPolizas(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };

  const getSiniestros = async () => {
    const response = await axios.get(`${endpoint}/siniestro`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setSiniestros(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };
  const getAllSiniestros = async () => {
    const response = await axios.get(`${endpoint}/siniestros`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setSiniestros(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };
  const getAllUsers = async () => {
    const response = await axios.get(`${endpoint}/users`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setUsuarios(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };
  return (
    <div>
      {user && (
        <div style={{ marginTop: 100 }}>
          {/* CLIENTE */}
          {user?.data.roles.includes("user") && (
            <Container style={{ width: "1000px" }}>
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
                            {polizas.map((poliza, index) => (
                              <tr key={index + 1}>
                                <th scope="row">{index + 1}</th>
                                <td>{poliza.descripcion}</td>
                                <td>{poliza.fecha_inicio}</td>
                                <td>{poliza.fecha_vencimiento}</td>
                              </tr>
                            ))}
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
                      <div className="mb-3 mt-md-4">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Descripción</th>
                              <th scope="col">Fecha de Reporte</th>
                              <th scope="col">Fecha de Solucion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {siniestros.map((siniestro, index) => (
                              <tr key={index + 1}>
                                <th scope="row">{index + 1}</th>
                                <td>{siniestro.descripcion}</td>
                                <td>{siniestro.fecha_reporte}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          )}

          {/* Agente */}
          {user?.data.roles.includes("agent") && (
            <Container style={{ width: "1000px" }}>
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
                              <th scope="col">ID del Usuario</th>
                              <th scope="col">Usuario</th>
                              <th scope="col">Correo</th>
                              <th scope="col">Ingreso</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuarios.map((usuario, index) => (
                              <tr key={index + 1}>
                                <th scope="row">{index + 1}</th>
                                <td>{usuario.id}</td>
                              
                                <td>{usuario.name}</td>
                                <td>{usuario.email}</td>
                                <td>{usuario.registro}</td>
                              </tr>
                            ))}
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
                      <div className="mb-3 mt-md-4">
                        <table className="table">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              
                              <th scope="col">Descripción</th>
                              <th scope="col">Fecha de Reporte</th>
                              <th scope="col">Estado</th>
                            </tr>
                          </thead>
                          <tbody>
                            {siniestros.map((siniestro, index) => (
                              <tr key={index + 1}>
                                <th scope="row">{index + 1}</th>
                                <td>{siniestro.descripcion}</td>
                                <td>{siniestro.fecha_reporte}</td>
                                <td>{siniestro.estado}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
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
