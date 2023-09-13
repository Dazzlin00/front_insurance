import React, { useEffect, useState, Component, useCallback } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link, Navigate } from "react-router-dom";
import axios from "../api/axios";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PoliciesCreate = ({ typeRoute }) => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [show, setShow] = useState(true);

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
  const [estado, setEstado] = React.useState("");
  const [polizaId, setPolizaId] = useState(id);

  const searchPoliza = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {
      console.log(id+"este es el id poliza");

      let url = user?.data.roles.includes("user")
        ? "/api/user-poliza/"
        : "/api/polizas/";
      const response = await axios.get(url + polizaId, {
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
      setCedula(poliza.numid);
      setName(poliza.username);
      setEstado(poliza.estado);

    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible> No se encontro la poliza. </Alert>
      );
    }
  };

  const eliminarPoliza = async () => {
    if (!id) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No existe la póliza.</Alert>
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    /*try {
      const response = await axios.delete(`/api/polizas/${id}`, {
        headers,
      });
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Póliza eliminada.</Alert>);
      navigate('/policies');
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
      eliminarPoliza();
      setShow(false);
      console.log(show);
    };

    setShow(true);
    setMessage(
      <Modal show={show} onHide={ handleClose }>
        <Modal.Header closeButton>
          <Modal.Title>¡ATENCIÓN!</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Desea eliminar la póliza?</Modal.Body>
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
      (tipo_poliza === "Seleccione") |
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
      tipo_poliza,
      fecha_inicio,
      fecha_vencimiento,
      cobertura,
      monto_prima,
      
    };

    try {
      await axios.put(
        "/api/polizas/" + id,

        data
      );
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/policies/view/'+id);
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
      (tipo_poliza === "Seleccione") |
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
      num_poliza,
      tipo_poliza,
      fecha_inicio,
      fecha_vencimiento,
      cobertura
    };

    try {
      await axios.post( "/api/polizas", data);
      setShow(true);
      setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
      navigate('/policies/view/'+id);
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo registrar</Alert>
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
    } else if (typeRoute === "create" && !user?.data.roles.includes("user")) {
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
                <Link to="/policies" className="btn btn-outline-secondary">
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

export default PoliciesCreate;
