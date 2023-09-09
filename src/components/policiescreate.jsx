import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import axios from "../api/axios";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const PoliciesCreate = () => {
  const [numid, setCedula] = useState("");
  const { user } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [datos, setDatos] = React.useState([]);
  const [num_poliza, setNumeroPoliza] = useState(
    Math.floor(Math.random() * 9999999999) + 1
  );
  const [fecha_inicio, setFechaInicio] = React.useState("");
  const [fecha_vencimiento, setFechavencimiento] = React.useState("");
  const [monto_prima, setPrima] = React.useState("");
  const [tipo_poliza, setTipoPoliza] = React.useState("");
  const [FormaPago, setFormaPago] = React.useState("");
  const [id_usuario, setIdUser] = React.useState("");

  const [cobertura, setCobertura] = React.useState("");

  const buscar = async (event) => {
    event.preventDefault();

    if (!numid) {
      setMessage(
        <div className="alert alert-danger">
         La cedula no debe esta vacia
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
      setIdUser(user.id);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro el usuario</div>
      );
    }
  };
  const registrar = async (event) => {
    event.preventDefault();

    if (!numid| tipo_poliza==="Seleccione"|  !fecha_inicio|  !fecha_vencimiento|  !cobertura|  !monto_prima) {
      setMessage(
        <div className="alert alert-danger">
         Debe completar todos los datos
        </div>
      );
      return;
    }
    const data = {
     id_usuario,
     num_poliza,
     tipo_poliza,
     fecha_inicio,
     fecha_vencimiento,
     cobertura,
     monto_prima
    };
   

    try {
        await axios.post("/api/polizas", 
        
        data
        
      );
      setMessage(
        <div class="alert alert-success">Registro exitoso</div>
      );
      
    } catch (e) {
      setMessage(
        <div class="alert alert-danger">No se pudo registrar</div>
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
                    <text>{id_usuario}</text>
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
                    value={num_poliza}
                    onChange={(e) => setNumeroPoliza(e.target.value)}

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
                  <select
                    value={tipo_poliza}
                    onChange={(e) => setTipoPoliza(e.target.value)}
                    className="form-select"
                  >
                    <option>Seleccione</option>
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
                  <Row>
                    <Col>
                      <label className="form-label">Fecha inicio</label>
                      <input
                        value={fecha_inicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        type="date"
                        className="form-control"
                      />
                    </Col>

                    <Col>
                    <text>{fecha_vencimiento}</text>
                      <label className="form-label">Fecha final</label>
                      <input
                        value={fecha_vencimiento}
                        onChange={(e) => setFechavencimiento(e.target.value)}
                        type="date"
                        className="form-control"
                      />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Monto prima</label>
                  <select
                    value={monto_prima}
                    onChange={(e) => setPrima(e.target.value)}
                    className="form-select"
                  >
                    <option>Seleccione</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Cobertura</label>
                  <input
                    value={cobertura}
                    onChange={(e) => setCobertura(e.target.value)}
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
                  <select
                    value={FormaPago}
                    onChange={(e) => setFormaPago(e.target.value)}
                    className="form-select"
                  >
                    <option>Seleccione</option>
                    <option>Efectivo</option>
                    <option>Transferencia bancaria</option>
                    <option>Tarjetas de crédito</option>
                    <option>Cheques</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 d-grid">
                <button onClick={registrar} className="btn btn-primary" type="submit">
                  Registrar
                </button>
              </div>
              
              <div className="col-md-6 d-grid">
                <button  className="btn btn-outline-secondary" type="submit">
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
};

export default PoliciesCreate;
