import React, { useEffect, useState, Component, useCallback } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "../api/axios";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PaymentsCreate = ({ typeRoute }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  const { user, getUser } = useAuthContext();

  const [numid, setCedula] = useState("");
  const [name, setName] = useState("");
  const [numero_transaccion, setNumeroTransaccion] = useState("");
  const [fecha_pago, setFechaPago] = useState("");
  const [monto, setMonto] = useState("");
  const [num_poliza, setNumPoliza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [estadoVal, setEstadoVal] = useState([]);

  const [pagoId, setPagoId] = useState(id);

  const searchPago = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      console.log(id+"este es el id pago");

      let url = user?.data.roles.includes("user")
        ? "/api/user-pago/"
        : "/api/pagos/";
      const response = await axios.get(url + pagoId, {
        headers,
      });
      const pago = response.data;
      console.log(pago);
      setNumeroTransaccion(pago.numero_transaccion);
      setFechaPago(pago.fecha_pago);
      setMonto(pago.monto);
      setDescripcion(pago.descripcion);
      setNumPoliza(pago.num_poliza);
      setCedula(pago.numid);
      setName(pago.username);
      setEstadoVal(pago.estadoVal);
      setEstado(pago.estado);

    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible> No se encontro el pago. </Alert>
      );
    }
  };

  const eliminarPago = async () => {
    if (!id) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No existe el pago.</Alert>
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    /*try {
      const response = await axios.delete(`/api/pagos/${id}`, {
        headers,
      });
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Póliza eliminada.</Alert>);
      navigate('/payments');
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo eliminar la póliza.</Alert>
      );
    }*/
  }

  const eliminar = async (event) => {
    event.preventDefault();

    const handleClose = () => setShow(false);

    const deleteP = () => {
      eliminarPago();
      setShow(false);
      console.log(show);
    };

    setShow(true);
    setMessage(
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>¡ATENCIÓN!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar el pago?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={ () => deleteP() }>
            SI
          </Button>
          <Button variant="secondary" onClick={ () => setShow(false) }>
            NO
          </Button>
        </Modal.Footer>
      </Modal>
    );

  };

  const buscar = async (event) => {
    event.preventDefault();

    if (!numid) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>La cedula no debe esta vacia</Alert>
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
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se encontro el usuario</Alert>
      );
    }
  };

  const actualizar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      (tipo_pago === "Seleccione") |
      !fecha_inicio |
      !fecha_vencimiento |
      !cobertura |
      !monto_prima
    ) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>Debe completar todos los datos</Alert>
      );
      return;
    }

    const data = {
      tipo_pago,
      fecha_inicio,
      fecha_vencimiento,
      cobertura,
      monto_prima,
      
    };

    try {
      await axios.put(
        "/api/pagos/" + id,

        data
      );
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/payments/view/'+id);
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo registrar</Alert>
      );
    }
  };

  const registrar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      (tipo_pago === "Seleccione") |
      !fecha_inicio |
      !fecha_vencimiento |
      !cobertura |
      !monto_prima
    ) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>Debe completar todos los datos</Alert>
      );
      return;
    }
    const data = {
      id_usuario,
      num_pago,
      tipo_pago,
      fecha_inicio,
      fecha_vencimiento,
      cobertura
    };

    try {
      await axios.post( "/api/pagos", data);
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/payments/view/'+id);
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo registrar</Alert>
      );
    }
  };

  const getAllPagos = async () => {
    const response = await axios.get("/api/tipopagos");
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
      searchPago();
    } else if (typeRoute === "update" && !user?.data.roles.includes("user")) {
      searchPago();
      getAllPagos();
    } else if (typeRoute === "create" && !user?.data.roles.includes("user")) {
      getAllPagos();
      setNumeroPago(getNumeroAleatorio());
    }
  }, [user]);

  return (
    <div className="row" style={{ marginTop: 100 }}>
      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header">PAGO</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <Form onSubmit={buscar}>
                    <label className="form-label">Nro. Documento</label>
                    <div className="input-group ">
                      <Form.Control
                        type="text"
                        value={setFechaPago(pago.fecha_pago);}
                        onChange={(e) => setCedula(e.target.value)}
                        //className="form-control"
                        placeholder="Nro. Documento"
                        onFocus={() => setMessage("")}
                        disabled={typeRoute === "view" || user?.data.roles.includes("user")}
                      />

                      {typeRoute !== "view" && (
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
                  <label className="form-label">Nombre de Usuario</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Número de póliza"
                    value={name}
                    onChange={(e) => setNumeroPago(e.target.value)}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Nro. de Transacción</label>
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
                    value={tipo_pago}
                    defaultValue={tipo_pago}
                    onChange={(e) => setTipoPago(e.target.value)}
                    className="form-select"
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
                  >
                    <option>Seleccione</option>

                    { datos?.map((dato) => (
                        <option key={dato.id} value={dato.id}>
                          {dato.descripcion}
                        </option>
                      )) }
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
                        disabled={
                          typeRoute === "view" ||
                          user?.data.roles.includes("user")
                        }
                      />
                    </Col>

                    <Col>
                      <label className="form-label">Fecha final</label>
                      <input
                        value={fecha_vencimiento}
                        onChange={(e) => setFechavencimiento(e.target.value)}
                        type="date"
                        className="form-control"
                        disabled={
                          typeRoute === "view" ||
                          user?.data.roles.includes("user")
                        }
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
                <div className="mb-3">
                  <label className="form-label">Cobertura</label>
                  <input
                    value={cobertura}
                    onChange={(e) => setCobertura(e.target.value)}
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
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Forma de pago</label>
                  <select
                    value={FormaPago}
                    onChange={(e) => setFormaPago(e.target.value)}
                    className="form-select"
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
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
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    value={estado}
                    defaultValue={"Inactivo"}
                    onChange={(e) => setEstado(e.target.value)}
                    className="form-select"
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
                  >
                    <option selected={estado === "Activo"} key="Activo" value="Activo">Activo</option>
                    <option selected={estado === "Inactivo"} key="Inactivo" value="Inactivo">Inactivo</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 d-grid">
                {typeRoute === "view" && !user?.data.roles.includes("user") && (
                  <Link
                    to={"/payments/update/" + id}
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
              <div className="col-md-4 d-grid">
              {typeRoute !== "create" && !user?.data.roles.includes("user") && (
                  <button
                    onClick={eliminar}
                    className="btn btn-danger"
                    type="submit"
                  >
                    Eliminar
                  </button>
                )}
              </div>
              <div className="col-md-4 d-grid">
                <Link to="/payments" className="btn btn-outline-secondary">
                  Regresar
                </Link>
              </div>
              {message && (
                <div className="sucess" style={{ marginTop: 5, position: 'absolute', top: 0}}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCreate;
