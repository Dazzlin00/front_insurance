import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link } from "react-router-dom";
import axios from "../api/axios";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Phone } from "react-bootstrap-icons";

const Configuration = () => {
  const { user, getUser } = useAuthContext();

  const [name, setName] = useState("");
  const [numid, setCedula] = useState("");
  const [address, setDireccion] = useState("");
  const [phone, setTelefono] = useState("");

  const [message, setMessage] = React.useState("");
  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  const actualizar = async (event) => {
    event.preventDefault();
    if (!name || !numid || !address || !phone) {
      setMessage(
        <div class="alert alert-danger">
          Por favor complete todos los campos
        </div>
      );
      return;
    }

    const data = {
      name,
      numid,
      address,
      phone,
    };
const id=user?.data.user_id;
    try {
      await axios.put(
        "/api/actualizarinfo/" +id,

        data
      );

      setMessage(
        <div className="alert alert-success">Se actualizo correctamente</div>
      );
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo actualizar</div>
      );
    }
  };

  return (
    <div className="row" style={{ marginTop: 50 }}>
    
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <div className="card-header ">
              <h5 className="card-title">Actualizar Datos</h5>
            </div>
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <div className="mb-3">
               
                  <Form onSubmit={actualizar}>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                      ></span>
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onFocus={() => setMessage("")}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                      ></span>
                      <input
                        value={numid}
                        onChange={(e) => setCedula(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Cedula"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onFocus={() => setMessage("")}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                      ></span>
                      <input
                        value={address}
                        onChange={(e) => setDireccion(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Direccion"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onFocus={() => setMessage("")}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span
                        className="input-group-text"
                        id="basic-addon1"
                      ></span>
                      <input
                        value={phone}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Telefono"
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        onFocus={() => setMessage("")}
                      />
                    </div>

                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Actualizar
                      </Button>
                    </div>
                    {message && (
                      <text className="sucess" style={{ marginTop: 5 }}>
                        {message}
                      </text>
                    )}
                  </Form>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Configuration;
