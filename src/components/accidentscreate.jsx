import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import { Button, Form } from "react-bootstrap";

import axios from "../api/axios";
function AccidentsCreate() {
  const [numid, setCedula] = useState("");
  const { user } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [datos, setDatos] = React.useState([]);
  const [fecha_inicio, setFechaInicio] = React.useState("");
  const [fecha_declaracion, setFechaDeclaracion] = React.useState("");
  const [id_usuario, setIdUser] = React.useState("");

  const buscar = async (event) => {
    event.preventDefault();

    if (!numid) {
      setMessage(
        <div className="alert alert-danger">La cedula no debe esta vacia</div>
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      const response = await axios.get(`/api/search?numid=${numid}`, {
        headers,
      });
      const user = response.data;
      setName(user.name);
      setIdUser(user.id);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro el usuario</div>
      );
    }
  };

  return (
    <div className="row" style={{ marginTop: 100 }}>
      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header">NUEVO SINIESTRO</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <Form onSubmit={buscar}>
                    <label className="form-label">Nro. Documento</label>
                    <div className="input-group ">
                      <Form.Control
                        type="text"
                        value={numid}
                        onChange={(e) => setCedula(e.target.value)}
                      //  className="form-control"
                        placeholder="Nro. Documento"
                        onFocus={() => setMessage("")}

                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                      >
                        Buscar
                      </button>
                    </div>
                  </Form>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Número de póliza</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número de póliza"
                    value={name}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Asegurado</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre y Apellido / Razón Social"
                    value={name}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Estado de ocurrencia</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Estado de ocurrencia"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Ciúdad de ocurrencia</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Ciúdad de ocurrencia"
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Lugar de ocurrencia</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Lugar de ocurrencia"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fecha del siniestro</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fecha de declaración</label>
                  <input type="date" className="form-control" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">
                    Descripción del siniestro
                  </label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="8"
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-grid">
                <button className="btn btn-primary" type="submit">
                  Registrar
                </button>
              </div>
              <div className="col-md-6 d-grid">
                <button className="btn btn-outline-secondary" type="submit">
                  Cancelar
                </button>
              </div>
              {message && <text className="sucess" style={{marginTop:5}}>{message}</text>}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccidentsCreate;
