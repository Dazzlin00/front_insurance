import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link } from 'react-router-dom';
import axios from "../api/axios";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const PoliciesCreate = ({ typeRoute }) => {

  const { id } = useParams();

  const [numid, setCedula] = useState("");
  const { user, getUser } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [datos, setDatos] = React.useState([]);
  const [num_poliza, setNumeroPoliza] = useState("");
  const [fecha_inicio, setFechaInicio] = React.useState("");
  const [fecha_vencimiento, setFechavencimiento] = React.useState("");
  const [monto_prima, setPrima] = React.useState("");
  const [tipo_poliza, setTipoPoliza] = React.useState("");
  const [FormaPago, setFormaPago] = React.useState("");
  const [id_usuario, setIdUser] = React.useState("");
  const [cobertura, setCobertura] = React.useState("");

  const searchPoliza = async () => {

    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      let url = user?.data.roles.includes("user") ? '/api/user-poliza/' : '/api/polizas/';
      const response = await axios.get(url + id, {
        headers,
      });
      const poliza = response.data[0];
      console.log(poliza)
      setNumeroPoliza(poliza.num_poliza);
      setFechaInicio(poliza.fecha_inicio);
      setFechavencimiento(poliza.fecha_vencimiento);
      setPrima(poliza.monto_prima);
      setTipoPoliza(poliza.tipo_poliza);
      setFormaPago(poliza.formaPago);
      setCobertura(poliza.cobertura);
      setCedula(poliza.numid);
      setName(poliza.username);

    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro la poliza.</div>
      );
    }

  }
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

  const actualizar = async (event) => {
    event.preventDefault();

    if (!numid | tipo_poliza === "Seleccione" | !fecha_inicio | !fecha_vencimiento | !cobertura | !monto_prima) {
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
      await axios.put("/api/polizas/" + id,

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

  const registrar = async (event) => {
    event.preventDefault();

    if (!numid | tipo_poliza === "Seleccione" | !fecha_inicio | !fecha_vencimiento | !cobertura | !monto_prima) {
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

  const getAllPolizas = async () => {
    const response = await axios.get("/api/tipopolizas");
    setDatos(response.data);
  };

  const getNumeroAleatorio = async () => {
    return Math.floor(Math.random() * 9999999999) + 1
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {

    if (typeRoute === 'view') {
      searchPoliza();
    } else if (typeRoute === 'update' && !user?.data.roles.includes("user")) {
      searchPoliza();
      getAllPolizas();
    } else if (typeRoute === 'create' && !user?.data.roles.includes("user")) {
      getAllPolizas();
      setNumeroPoliza(getNumeroAleatorio());
    }
  }, [user]);

  return (
    <div className="row" style={{ marginTop: 100 }}>
      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header">PÓLIZA</div>
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

                        disabled={typeRoute === 'view'}
                      />

                      {typeRoute !== 'view' && (
                        <button
                          className="btn btn-outline-secondary"
                          type="submit"
                        >
                          Buscar
                        </button>
                      )}
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

                    disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
                  >
                    <option>Seleccione</option>

                    {tipo_poliza != '' ? (
                      datos?.map((dato) => (
                        <option key={dato.id} value={dato.id}>
                          {dato.descripcion}
                        </option>
                      ))
                    ) : (
                      <option selected >{tipo_poliza}</option>
                    ) }
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

                        disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
                      />
                    </Col>

                    <Col>
                      <label className="form-label">Fecha final</label>
                      <input
                        value={fecha_vencimiento}
                        onChange={(e) => setFechavencimiento(e.target.value)}
                        type="date"
                        className="form-control"

                        disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
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
                  <input
                    value={monto_prima}
                    onChange={(e) => setPrima(e.target.value)}
                    className="form-control"
                    placeholder="Monto prima"

                    disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
                  />
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

                    disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
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

                    disabled={typeRoute === 'view' || user?.data.roles.includes("user")}
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

                {typeRoute === 'view' && (
                  <Link
                    to={'/policies/update/' + id}
                    className="btn btn-primary"
                  >
                    Actualizar
                  </Link>
                )}

                { typeRoute === 'update' && (
                  <button onClick={actualizar} className="btn btn-primary" type="submit">
                    Guardar
                  </button>
                )}

                {typeRoute === 'create' && (
                  <button onClick={registrar} className="btn btn-primary" type="submit">
                    Registrar
                  </button>
                )}
              </div>

              <div className="col-md-6 d-grid">
                <Link
                  to='/policies'
                  className="btn btn-outline-secondary"
                >
                  Regresar
                </Link>
              </div>
              {message && <text className="sucess" style={{ marginTop: 5 }}>{message}</text>}

            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default PoliciesCreate;
