import React, { useEffect, useState, Component, useMemo } from "react";
import useAuthContext from "../context/AuthContext";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";

import axios from "../api/axios";
function AccidentsCreate({ typeRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [numid, setCedula] = useState("");
  const { user } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [fecha_reporte, setFechaSiniestro] = React.useState("");
  const [fecha_declaracion, setFechaDeclaracion] = React.useState("");
  const [id_usuario, setIdUser] = React.useState("");
  const [siniestroId, setSiniestroId] = useState(id);
  const [num_poliza, setNumeroPoliza] = useState(null);
  const [estado_ocu, setEstadoOcu] = useState("");
  const [ciudad, setCiudadOcu] = useState("");
  const [lugar, setLugarOcu] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [datos, setDatos] = React.useState([]);
  const [datosp, setDatosP] = React.useState([]);
  const [estado, setEstado] = useState("");

  const [id_tipo_siniestro_descripcion, setTipoSiniestroDescripcion] =
    React.useState("");
  const [id_tipo_siniestro, setTipoSiniestro] = React.useState("");

  const [id_poliza, setIdPoliza] = React.useState("");
  const [cobertura, setCobertura] = React.useState("");

  useEffect(() => {
    if (typeRoute === "view") {
      searchSiniestro();
    } else if (typeRoute === "update" && !user?.data.roles.includes("user")) {
      searchSiniestro();
    } else if (typeRoute === "create" && !user?.data.roles.includes("user")) {
    }
  }, []);


  //------------------------------------VER DETALLE------------------------------------------------
  const searchSiniestro = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      let url = `/api/siniestro/`;
      console.log(siniestroId + "este es el id");
     
      const response = await axios.get(url + `${siniestroId}`, {
        headers,
      });

      setNumeroPoliza(response.data.num_poliza);
      setTipoSiniestroDescripcion(response.data.tiposiniestrodes);
      setCedula(response.data.numid);
      setName(response.data.name);
      setFechaSiniestro(response.data.fecha_reporte);
      setFechaDeclaracion(response.data.fecha_declaracion);
      setEstadoOcu(response.data.estado_ocu);
      setCiudadOcu(response.data.ciudad);
      setLugarOcu(response.data.lugar);
      setDescripcion(response.data.descripcion);
      console.log(response.data.id_poliza);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro el siniestro.</div>
      );
    }
  };

  //------------------BUSCA LAS POLIZAS QUE TIENE EL USUARIO--------------------
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
      const response = await axios.get(`/api/poliza-user?numid=${numid}`, {
        headers,
      });
      const datosp = response.data;
      setIdUser(response.data[0].id_usuario);
      setName(response.data[0].nombre);
      setNumeroPoliza(datosp.num_poliza);
      setDatosP(datosp);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">
          El usuario no tiene polizas registradas
        </div>
      );
    }
  };
//-----------------------REGISTRA UN SINIESTRO---------------------------
  const registrar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      (id_tipo_siniestro === "Seleccione") |
      !fecha_reporte |
      !fecha_declaracion |
      !estado_ocu |
      !ciudad |
      !lugar |
      !descripcion
    ) {
      setMessage(
        <div className="alert alert-danger">Debe completar todos los datos</div>
      );
      return;
    }
    const data = {
      id_tipo_siniestro,
      id_poliza,
      id_usuario,
      fecha_reporte,
      fecha_declaracion,
      estado_ocu,
      ciudad,
      lugar,
      descripcion,
    };

    try {
      await axios.post("/api/siniestros", data);
      setMessage(<div className="alert alert-success">Registro exitoso</div>);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo registrar</div>
      );
    }
  };
//--------------------ACTUALIZA---------------------------------
  const actualizar = async (event) => {
    event.preventDefault();
    if (
      !fecha_reporte |
      !fecha_declaracion |
      !estado_ocu |
      !ciudad |
      !lugar |
      !descripcion
    ) {
      setMessage(
        <div className="alert alert-danger">No debe haber campos vacios</div>
      );
      return;
    }

    const data = {
      fecha_reporte,
      fecha_declaracion,
      estado_ocu,
      ciudad,
      lugar,
      descripcion,
    };

    try {
      await axios.put(
        "/api/siniestros/" + id,

        data
      );

      setMessage(
        <div className="alert alert-success">Se actualizo correctamente</div>
      );
      navigate("/accidents/view/" + id);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo actualizar</div>
      );
    }
  };
  const aprobar = async (event) => {
    event.preventDefault();
   
    const data = {
      estado,
    };
    try {
      await axios.put(
        "/api/aprobar/" + id,

        data
      );

      setMessage(
        <div className="alert alert-success">Solicitud Aprobada</div>
      );
      navigate("/accidents");
    } catch (e) {
      console.log(e);
    }
  };
  const rechazar = async (event) => {
    event.preventDefault();
   
    const data = {
      estado,
    };
    try {
      await axios.put(
        "/api/rechazar/" + id,

        data
      );

      setMessage(
        <div className="alert alert-danger">Solicitud Rechazada</div>
      );
      navigate("/accidents");
    } catch (e) {
     console.log(e);
    }
  };
  //---------------------------------- ELIMINA--------------------------------
  const eliminarSiniestro = async () => {
    if (!id) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          No existe el siniestro.
        </Alert>
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };
    try {
      await axios.delete("/api/siniestros/" + id);

      setShow(true);
      setMessage(
        <Alert
          className="alert alert-success"
          onClose={() => setShow(false)}
          dismissible
        >
          Siniestro eliminado.
        </Alert>
      );
      navigate("/accidents");
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          No se pudo eliminar el siniestro.
        </Alert>
      );
    }
  };

  const deleteP = () => {
    eliminarSiniestro();
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //----------------------MUESTRA POR EL NUMERO DE POLIZA EL SINIESTRO
  const getSiniestrosCoberturas = async (poliza) => {
    let url = `/api/siniestros-poliza/${poliza}`;
    const response = await axios.get(url);
    return response.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getSiniestrosCoberturas(id_poliza);

        setDatos(response);
      } catch (error) {
        console.error(error);
        setDatos([]);
      }
    };
    fetchData();
  }, [id_poliza]);
  return (
    <div className="row" style={{ marginTop: 100 }}>
      <text>{console.log(name + "nombre")}</text>
      <text>{console.log(id_tipo_siniestro + "id siniestro")}</text>

      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header"> SINIESTROS</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <Form onSubmit={buscar}>
                    <label className="form-label">Nro. Documento</label>
                    <div className="input-group ">
                      <tex>{id_usuario}</tex>
                      <Form.Control
                        type="text"
                        value={numid}
                        onChange={(e) => setCedula(e.target.value)}
                        //  className="form-control"
                        placeholder="Nro. Documento"
                        onFocus={() => setMessage("")}
                        disabled={
                          typeRoute === "view" || typeRoute === "update"
                        }
                      />
                      <button
                        className="btn btn-outline-secondary"
                        type="submit"
                        disabled={
                          typeRoute === "view" || typeRoute === "update"
                        }
                      >
                        Buscar
                      </button>
                    </div>
                  </Form>
                </div>
              </div>

              <div className="col-md-6">
                <div
                  className="mb-3"
                  style={{
                    display:
                      typeRoute === "update" || typeRoute === "view"
                        ? "none"
                        : "block",
                  }}
                >
                  <text>{id_poliza}</text>

                  <label className="form-label">Numero de Polizas</label>
                  <select
                    value={id_poliza}
                    onChange={(e) => {
                      setIdPoliza(e.target.value);
                    }}
                    className="form-select"
                    id="select-coberturas"
                  >
                    <option>Seleccione</option>

                    {datosp?.map((dato) => (
                      <option key={dato.id_poliza} value={dato.id_poliza}>
                        {dato.num_poliza}
                      </option>
                    ))}
                  </select>
                </div>
                <div
                  className="mb-3"
                  style={{
                    display: typeRoute === "create" ? "none" : "block",
                  }}
                >
                  <label className="form-label">Numero de poliza</label>
                  <input
                    value={num_poliza}
                    onChange={(e) =>
                      setTipoSiniestroDescripcion(e.target.value)
                    }
                    type="text"
                    className="form-control"
                    placeholder="Numero de poliza"
                    disabled={typeRoute === "update" || typeRoute === "view"}
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
                    onChange={(e) => setName(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div
              className="mb-3"
              style={{
                display:
                  typeRoute === "update" || typeRoute === "view"
                    ? "none"
                    : "block",
              }}
            >
              <text>{id_tipo_siniestro_descripcion}</text>

              <label className="form-label">Tipo de Siniestro</label>

              <select
                value={id_tipo_siniestro}
                onChange={(e) => setTipoSiniestro(e.target.value)}
                className="form-select"
              >
                <option>Seleccione</option>

                {datos?.map((dato) => (
                  <option key={dato.id_tsiniestro} value={dato.id_tsiniestro}>
                    {dato.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div
              className="mb-3"
              style={{
                display: typeRoute === "create" ? "none" : "block",
              }}
            >
              <label className="form-label">Tipo de siniestro</label>
              <input
                value={id_tipo_siniestro_descripcion}
                onChange={(e) => setTipoSiniestroDescripcion(e.target.value)}
                type="text"
                className="form-control"
                placeholder="Tipo de siniestro"
                disabled={typeRoute === "update" || typeRoute === "view"}
              />
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Estado de ocurrencia</label>
                  <input
                    value={estado_ocu}
                    onChange={(e) => setEstadoOcu(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Estado de ocurrencia"
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Ciúdad de ocurrencia</label>
                  <input
                    value={ciudad}
                    onChange={(e) => setCiudadOcu(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Ciúdad de ocurrencia"
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3">
                  <label className="form-label">Lugar de ocurrencia</label>
                  <input
                    value={lugar}
                    onChange={(e) => setLugarOcu(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Lugar de ocurrencia"
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fecha del siniestro</label>

                  <input
                    value={fecha_reporte}
                    onChange={(e) => setFechaSiniestro(e.target.value)}
                    type="date"
                    className="form-control"
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Fecha de declaración</label>
                  <input
                    value={fecha_declaracion}
                    onChange={(e) => setFechaDeclaracion(e.target.value)}
                    type="date"
                    className="form-control"
                    disabled={typeRoute === "view"}
                  />
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
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="form-control"
                    cols="30"
                    rows="8"
                    disabled={typeRoute === "view"}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-3 d-grid">
                {typeRoute === "view" && !user?.data.roles.includes("user") && (
                  <Link
                    to={"/accidents/update/" + id}
                    className="btn btn-primary"
                  >
                    Actualizar
                  </Link>
                )}

                {typeRoute === "update" && (
                  <button
                    onClick={actualizar}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Guardar
                  </button>
                )}
                <div className=" d-grid">
                  {typeRoute === "create" && (
                    <button
                      onClick={registrar}
                      className="btn btn-primary"
                      type="submit"
                    >
                      Registrar
                    </button>
                  )}
                </div>
               
              </div>

              <div className="col-md-3 d-grid">
                {typeRoute !== "create" &&
                  !user?.data.roles.includes("user") && (
                    <button
                      onClick={handleShow}
                      className="btn btn-danger"
                      type="submit"
                    >
                      Eliminar
                    </button>
                  )}
              </div>
              <div className="col-md-2 d-grid">
                {typeRoute !== "create" &&
                  !user?.data.roles.includes("user") && (
                    <button
                       onClick={aprobar}
                      className="btn btn-secondary"
                      type="submit"
                    >
                      Aprobar
                    </button>
                  )}
              </div>
              <div className="col-md-2 d-grid">
                {typeRoute !== "create" &&
                  !user?.data.roles.includes("user") && (
                    <button
                       onClick={rechazar}
                      className="btn btn-secondary"
                      type="submit"
                    >
                      Rechazar
                    </button>
                  )}
              </div>
              <div className="col-md-2 d-grid">
                <Link to="/accidents" className="btn btn-outline-secondary">
                  Regresar
                </Link>
              </div>
              {message && (
                <text className="sucess" style={{ marginTop: 5 }}>
                  {message}
                </text>
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>¡ATENCIÓN!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar el siniestro?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteP}>
            SI
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AccidentsCreate;
