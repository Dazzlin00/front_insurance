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
  const [show, setShow] = useState(false);
  const [shows, setShows] = useState(false);

  const handleClose = () => setShows(false);
  const handleShow = () => setShows(true);
  const [message, setMessage] = useState("");
  const { user, getUser } = useAuthContext();

  const [iduser, setIdUser] = useState("");
  const [numid, setCedula] = useState("");
  const [name, setName] = useState("");
  const [numero_transaccion, setNumeroTransaccion] = useState("");
  const [fecha_pago, setFechaPago] = useState("");
  const [monto, setMonto] = useState("");
  const [num_poliza, setNumPoliza] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState("");
  const [estadoVal, setEstadoVal] = useState([]);
  const [polizas, setPolizas] = useState([]);
  const [datosp, setDatosP] = React.useState([]);

  const [pagoId, setPagoId] = useState(id);

  const searchPago = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
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

  const deleteP = async () => {
    eliminarPago();
    setShows(false);

  }

  const eliminarPago = async (event) => {
    if (!id) {
      setShows(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShows(false)}
          dismissible
        >
          No existe el pago.
        </Alert>
      );
      return;
    }

    try {
      await axios.delete(`/api/pagos/${id}`,{
        withCredentials: true,
    });

      setShow(true);
      setMessage(
        <Alert
          className="alert alert-success"
          onClose={() => setShows(false)}
          dismissible
        >
          Mensaje eliminado.
        </Alert>
      );
      navigate("/payments");
    } catch (e) {
      setShows(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShows(false)}
          dismissible
        >
          No se pudo eliminar el pago.
        </Alert>
      );
    }
  };

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
      setNumPoliza(datosp.num_poliza);
      setDatosP(datosp);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">
          El usuario no tiene polizas registradas
        </div>
      );
    }
  };

  const actualizar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      (num_poliza === "Seleccione") |
      !fecha_pago |
      !numero_transaccion |
      !monto |
      !estado
    ) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>Debe completar todos los datos</Alert>
      );
      return;
    }

    const data = {
      iduser,
      numero_transaccion,
      fecha_pago,
      monto,
      num_poliza,
      descripcion,
      estado
    };

    try {
      await axios.put(
        "/api/pagos/" + id,

        data
      );
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/payments/view/' + id);
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
      (num_poliza === "Seleccione") |
      !fecha_pago |
      !numero_transaccion |
      !monto
    ) {
     setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>Debe completar todos los datos</Alert>
      );
      return;
    }
    const data = {
      iduser,
      numero_transaccion,
      fecha_pago,
      monto,
      num_poliza,
      descripcion,
      estado
    };
    try {
      await axios.post("/api/pagos", data);
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/payments/view/' + id);
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo registrar</Alert>
      );
    }
  };

  /*const getAllPolizas = async () => {
    let url = user?.data.roles.includes("user")
        ? "/api/user-pago/"
        : "/api/pagos/";
    const response = await axios.get(url);
    setPolizas(response.data);
  };*/

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {

    //getAllPolizas();

    if (typeRoute === "view") {
      searchPago();
    } else if (typeRoute === "update" && !user?.data.roles.includes("user")) {
      searchPago();
    } else if (typeRoute === "create") {
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
                        value={numid}
                        onChange={(e) => setCedula(e.target.value)}
                        //className="form-control"
                        placeholder="Nro. Documento"
                        onFocus={() => setMessage("")}
                        disabled={typeRoute === "view"}
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
                    placeholder="Usuario"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="Nro. Transaccion"
                    value={numero_transaccion}
                    onChange={(e) => setNumeroTransaccion(e.target.value)}
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Row>
                <Col>
                  <div className="mb-3">
                    <label className="form-label">Póliza</label>
                    <select
                      value={num_poliza}
                      onChange={(e) => setNumPoliza(e.target.value)}
                      className="form-select"
                      disabled={
                        typeRoute === "view"
                      }
                    >
                      <option>Seleccione</option>

                      {datosp?.map((dato) => (
                        <option key={dato.id} value={dato.num_poliza}>
                          {dato.num_poliza}
                        </option>
                      ))}
                    </select>
                  </div>
                </Col>
                <Col>
                  <label className="form-label">Fecha de Pago</label>
                  <input
                    value={fecha_pago}
                    onChange={(e) => setFechaPago(e.target.value)}
                    type="date"
                    className="form-control"
                    disabled={
                      typeRoute === "view"
                    }
                  />
                </Col>
              </Row>
            </div>
            <Row>
              <Col>
                <label className="form-label">Monto</label>
                <input
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  type="text"
                  className="form-control"
                  disabled={
                    typeRoute === "view"
                  }
                />
              </Col>
            </Row>
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label className="form-label">Descripcion</label>
                  <textarea
                    rows={2}
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    className="form-control"
                    placeholder="Descripcion"
                    disabled={
                      typeRoute === "view"
                    }
                  >
                  </textarea>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <label className="form-label">Estado</label>
                  <select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                    className="form-select"
                    disabled={
                      typeRoute === "view" || user?.data.roles.includes("user")
                    }
                  >
                    {estadoVal?.map((est) => (
                      <option key={est} value={est}>
                        {est}
                      </option>
                    ))}

                    { typeRoute === "create" &&(
                      <option value="En espera">En Espera</option>
                    )}
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
                    onClick={handleShow}
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
                <div className="sucess" style={{ marginTop: 5, position: 'absolute', top: 0 }}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal show={shows} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>¡ATENCIÓN!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea eliminar el pago?</Modal.Body>
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

export default PaymentsCreate;
