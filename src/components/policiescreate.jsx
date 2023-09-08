import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import { Form } from "react-bootstrap";

const PoliciesCreate = () => {
  const [numid, setCedula] = useState("");
  const { user } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [datos, setDatos] = React.useState([]);

  const buscar = async (event) => {
    event.preventDefault();

    if (!numid) {
      setMessage(
        <div class="alert alert-danger">
          Por favor complete todos los campos
        </div>
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
    } catch (e) {
      setMessage(
        <div class="alert alert-danger">No se encontro el usuario</div>
      );
    }
  };

  useEffect(() => {
    getAllPolizas();
  }, []);

  const getAllPolizas = async () => {
    const response = await axios.get("/api/tipopolizas");
    setDatos(response.data);
  };

  return (
    <div className="row" style={{ marginTop: 100 }}>
      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header">NUEVA PÓLIZA</div>
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
                        //className="form-control"
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
                    {message && <text className="sucess">{message}</text>}
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
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Tipo de póliza</label>
                  <select className="form-select">
                    <option value="">Seleccione</option>
                    {datos?.map((dato) => (
                      <option key={dato.id} value={dato.id}>
                        {dato.descripcion}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Duración</label>
                  <select className="form-select">
                    <option>Seleccioné una opción</option>
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Monto prima</label>
                  <select className="form-select">
                    <option>Seleccioné una opción</option>
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Cobertura</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Cobertura"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Forma de pago</label>
                  <select className="form-select">
                    <option>Seleccioné una opción</option>
                    <option>Option One</option>
                    <option>Option Two</option>
                    <option>Option Three</option>
                  </select>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesCreate;
