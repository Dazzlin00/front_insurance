import React, { useEffect, useState, Component, useCallback } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "../api/axios";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { differenceInDays } from "date-fns";

const PoliciesCreate = ({ typeRoute }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showp, setShowp] = useState(false);

  const [numid, setCedula] = useState("");
  const { user, getUser } = useAuthContext();
  const [message, setMessage] = React.useState("");
  const [name, setName] = React.useState("");
  const [datos, setDatos] = React.useState([]);
  const [datos2, setDatos2] = React.useState([]);

  const [num_poliza, setNumeroPoliza] = useState("");
  const [fecha_inicio, setFechaInicio] = React.useState("");
  const [fecha_vencimiento, setFechavencimiento] = React.useState("");
  const [monto_prima, setPrima] = React.useState("");
  const [tipo_poliza, setTipoPoliza] = React.useState("");
  const [FormaPago, setFormaPago] = React.useState("");
  const [id_usuario, setIdUser] = React.useState("");
  const [cobertura, setCobertura] = React.useState("");
  const [monto_cobertura, setMontoCobertura] = React.useState("");
  const [idCobertura, setIdCobertura] = React.useState("");

  const [estado, setEstado] = React.useState("");
  const [polizaId, setPolizaId] = useState(id);

  //------------------------------------VER DETALLE------------------------------------------------

  const searchPoliza = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      console.log(id + "este es el id poliza");
      let url = "/api/polizas/";

      const response = await axios.get(url + `${polizaId}`, {
        headers,
      });
      const poliza = response.data;
      console.log(poliza);
      setNumeroPoliza(poliza.num_poliza);
      setFechaInicio(poliza.fecha_inicio);
      setFechavencimiento(poliza.fecha_vencimiento);
      setPrima(poliza.monto_prima);
      setTipoPoliza(poliza.tipo_poliza);
      setFormaPago(poliza.formaPago);
      setCobertura(poliza.cobertura);
      setMontoCobertura(poliza.monto_cobertura);
      setCedula(poliza.numid);
      setName(poliza.username);
      setEstado(poliza.estado);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro la poliza.</div>
      );
    }
  };
  //---------------------------------- ELIMINA--------------------------------
  //
  const eliminarPoliza = async () => {
    if (!id) {
      setShowp(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShowp(false)}
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
      await axios.delete("/api/polizas/" + id);

     
      setMessage(
        <Alert
          className="alert alert-success"
          onClose={() => setShowp(false)}
          dismissible
        >
          Siniestro eliminado.
        </Alert>
      );
      navigate("/policies");
    } catch (e) {
     
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShowp(false)}
          dismissible
        >
          No se pudo eliminar la poliza.
        </Alert>
      );
    }
  };

  const deleteP = () => {
    eliminarPoliza();
    setShowp(false);
  };

  const handleClose = () => setShowp(false);
  const handleShow = () => setShowp(true);
  //------------------------------------BUSCAR USUARIOS REGISTRADOS------------------------------------------------

  const buscar = async (event) => {
    event.preventDefault();

    if (!numid) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          La cedula no debe esta vacia
        </Alert>
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
      setShow(true);
      
      if (user?.data.roles.includes("user")) {
        setMessage(
          <Alert
            className="alert alert-danger"
            onClose={() => setShow(false)}
            dismissible
          >
           Tu información personal está desactualizada. Para crear pólizas, actualiza tu información
          </Alert>
        );
       
      } else  {
       
        setMessage(
          <Alert
            className="alert alert-danger"
            onClose={() => setShow(false)}
            dismissible
          >
           No se ha encontro el usuario
          </Alert>
        );
      }
      
    }
  };
  //------------------------------------ACTUALIZAR------------------------------------------------

  const actualizar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      !fecha_inicio |
      !fecha_vencimiento |
      !cobertura |
      !monto_prima
    ) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          Debe completar todos los datos
        </Alert>
      );
      return;
    }

    const data = {
      monto_prima,
      fecha_inicio,
      fecha_vencimiento,
    };

    try {
      await axios.put(
        "/api/polizas/" + id,

        data
      );
      setMessage(
        <div className="alert alert-success">Actualizacion exitosa</div>
      );

      navigate("/policies/view/" + id);
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          No se pudo Actualizar
        </Alert>
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
        "/api/aprobarp/" + id,

        data
      );

      setMessage(<div className="alert alert-success">Solicitud Aprobada</div>);
      navigate("/policies");
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
        "/api/rechazarp/" + id,

        data
      );

      setMessage(<div className="alert alert-danger">Solicitud Rechazada</div>);
      navigate("/policies");
    } catch (e) {
      console.log(e);
    }
  };
  //------------------------------------REGISTRAR------------------------------------------------

  const registrar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      (tipo_poliza === "Seleccione") |
      !fecha_inicio |
      !fecha_vencimiento |
      !cobertura |
      !monto_prima
    ) {
      setShow(true);
      setMessage(
        <div className="alert alert-danger">Debe completar todos los datos</div>
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
      monto_prima,
    };

    try {
      await axios.post("/api/polizas", data);

      setMessage(<div className="alert alert-success">Registro exitoso</div>);

      navigate("/policies/view/" + id);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo registrar</div>
      );
    }
  };

  const getAllPolizas = async () => {
    const response = await axios.get("/api/tipopolizas");
    setDatos(response.data);
  };

  const getNumeroAleatorio = () => {
    const random = Math.floor(Math.random() * 9999999999) + 1;
    return random;
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {
    if (typeRoute === "view") {
      searchPoliza();
    } else if (typeRoute === "update" && !user?.data.roles.includes("user")) {
      searchPoliza();
      getAllPolizas();
    } else if (typeRoute === "create") {
      getAllPolizas();
      setNumeroPoliza(getNumeroAleatorio());
    }
  }, [user]);

  function obtenerDiferenciaEnDias(fecha1, fecha2) {
    const format = "YYYY-MM-DD"; // Formato de las fechas

    const fechaInicio = moment(fecha1, format);
    const fechaFin = moment(fecha2, format);

    const diferenciaEnDias = fechaFin.diff(fechaInicio, "days");

    return diferenciaEnDias;
  }
  //--------------------------------------------------------------------------------------------------
  //-------------------------------PRIMA--------------------------------------------------------------
  //--------------------------------------------------------------------------------------------------
  function calcularPrima (monto) {
   
   //DIFERENCIA DE DIAS
    const diferenciaEnDias = obtenerDiferenciaEnDias(
      fecha_inicio,
      fecha_vencimiento
    );
   const meses = diferenciaEnDias/30;

   
   const prima_mensual= monto/meses;
   return prima_mensual;
   // console.log(diferenciaEnDias + "dias");

  }
  const getPrima = async (id_cobertura) => {
    let url = `/api/cobertura-monto/${id_cobertura}`;
    const response = await axios.get(url);
    return response;
  };
  //----------------------MUESTRA POR EL TIPO DE POLIZA LA COBERTURA ASOCIADA
  const getPolizaCoberturas = async (poliza) => {
    let url = `/api/cobertura-poliza/`;
    const response = await axios.get(url+poliza);
    return response.data;
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPolizaCoberturas(tipo_poliza);

        setDatos2(response);
        console.log(response.data);
        
       
      } catch (error) {
        console.error(error);
        setDatos2([]);
      }
    };
    fetchData();
  }, [tipo_poliza]);

  useEffect(() => {
    const fetchData = async () => {
      try {

        if (typeRoute === "create") {
          const response = await getPrima(cobertura);
          const montoc=response.data;
          //setDatos2(response);
         setPrima(calcularPrima (montoc))
          console.log(montoc+ "este es el monto");

        }
       
        
       
      } catch (error) {
        console.error(error);
       // setDatos2([]);
      }
    };
    fetchData();
  }, [cobertura,fecha_inicio,fecha_vencimiento]);

  return (
    <div className="row" style={{ marginTop: 150 }}>

        

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
                    defaultValue={tipo_poliza}
                    onChange={(e) => setTipoPoliza(e.target.value)}
                    className="form-select"
                    disabled={typeRoute === "view"}
                  >
                    <option>
                      {typeRoute === "view" || typeRoute === "update"
                        ? tipo_poliza
                        : "Seleccione"}
                    </option>

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
                        disabled={typeRoute === "view"}
                      />
                    </Col>

                    <Col>
                      <label className="form-label">Fecha final</label>
                      <input
                        value={fecha_vencimiento}
                        onChange={(e) => setFechavencimiento(e.target.value)}
                        type="date"
                        className="form-control"
                        disabled={typeRoute === "view"}
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
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Cobertura</label>
                <select
                  value={cobertura}
                  onChange={(e) => setCobertura(e.target.value)}
                  className="form-select"
                  disabled={typeRoute === "view"}
                >
                  <option>
                    {typeRoute === "view" || typeRoute === "update"
                      ? cobertura
                      : "Seleccione"}
                  </option>

                  {datos2?.map((dato2) => (
                    <option  key={dato2.id_cobertura} value={dato2.id_cobertura}>
                      {dato2.coberturas}
                    </option>
                  ))}
                </select>

                <div
                  className="mb-3"
                  style={{
                    display: typeRoute === "create" ? "none" : "block",
                  }}
                >
                  <label className="form-label">Monto de Cobertura</label>
                  <input
                    value={monto_cobertura}
                    onChange={(e) => setMontoCobertura(e.target.value)}
                    type="text"
                    className="form-control"
                    placeholder="Cobertura"
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
                  />
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-12"></div>
            </div>
            <div className="row">
              <div className="col-md-3 d-grid">
                {typeRoute === "view" && !user?.data.roles.includes("user") && (
                  <Link
                    to={"/policies/update/" + id}
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
                <Link to="/policies" className="btn btn-outline-secondary">
                  Regresar
                </Link>
              </div>
              {message && (
                <div
                  className="sucess"
                  style={{ marginTop: 5, position: "absolute", top: 0 }}
                >
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={showp} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>¡ATENCIÓN!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar la poliza?</Modal.Body>
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
};

export default PoliciesCreate;
