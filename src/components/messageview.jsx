import React, { useEffect, useState } from "react";
import { NavLink, Link, useParams } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const endpoint = "http://localhost:8000/api";

const MessageView = ({ typeRoute }) => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [message, setMessage] = React.useState("");
    const [email, setEmail] = useState("");
    const [contenido, setContenido] = useState("");
    const [estado, setEstado] = useState("");
    const [id_agente, setIdAgente] = useState("");
    const [creado, setCreado] = useState("");
    const [contestado, setContestado] = useState("");
    const [estadoVal, setEstadoVal] = useState([]);

    const { user, getUser } = useAuthContext();

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);

    useEffect(() => {
        getMensaje();
    }, [user]);

    const getMensaje = async () => {
        const response = await axios.get(`${endpoint}/general-mensajes/${id}`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            // La solicitud se realizó correctamente
            const mensaje = response.data;
            console.log(mensaje);
            setEmail(mensaje.email);
            setContenido(mensaje.contenido);
            setIdAgente(mensaje.id_agente);
            setCreado(mensaje.created_at);
            setContestado(mensaje.updated_at);
            setEstado(mensaje.estado);
            setEstadoVal(mensaje.estadoVal);
            // Haz algo con las reportes
        } else {
            // La solicitud falló
            const error = response.error;
            console.log(error);
            // Haz algo con el error
        }
    };

    const actualizar = async (event) => {
        event.preventDefault();

        const data = {
            estado,
            contestado,
        };

        try {
            await axios.put(`${endpoint}/general-mensajes/${id}`, data, {
                withCredentials: true,
            });
            setShow(true);
            setMessage(<Alert className="alert alert-success" onClose={() => setShow(false)} dismissible>Registro exitoso</Alert>);
            navigate('/messages/view/' + id);
        } catch (e) {
            setShow(true);
            setMessage(
                <Alert className="alert alert-danger" onClose={() => setShow(false)} dismissible>No se pudo registrar</Alert>
            );
        }
    };

    const eliminarMensaje = async () => {
        if (!id) {
          setShow(true);
          setMessage(
            <Alert
              className="alert alert-danger"
              onClose={() => setShow(false)}
              dismissible
            >
              No existe el mensaje.
            </Alert>
          );
          return;
        }

        try {
          await axios.delete(`${endpoint}/general-mensajes/${id}`,{
            withCredentials: true,
        });
    
          setShow(true);
          setMessage(
            <Alert
              className="alert alert-success"
              onClose={() => setShow(false)}
              dismissible
            >
              Mensaje eliminado.
            </Alert>
          );
          navigate("/messages");
        } catch (e) {
          setShow(true);
          setMessage(
            <Alert
              className="alert alert-danger"
              onClose={() => setShow(false)}
              dismissible
            >
              No se pudo eliminar el mensaje.
            </Alert>
          );
        }
      };

      const deleteM = () => {
        eliminarMensaje();
        setShow(false);
      };

    return (
        <div className="row" style={{ marginTop: 100 }}>
            <div className="col-sm-8 mx-auto">
                <div className="card">
                    <div className="card-header">MENSAJE</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Correo Electrónico</label>
                                    <div className="input-group ">
                                        <Form.Control
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            placeholder="Email"
                                            onFocus={() => setMessage("")}
                                            disabled
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Row className="mb-3">
                            <Col>
                                <label className="form-label">Fecha de Creación</label>
                                <input
                                    value={creado}
                                    onChange={(e) => setCreado(e.target.value)}
                                    type="date"
                                    className="form-control"
                                    disabled
                                />
                            </Col>
                            <Col>
                                <label className="form-label">Fecha de Respuesta</label>
                                <input
                                    value={contestado}
                                    onChange={(e) => setContestado(e.target.value)}
                                    type="date"
                                    className="form-control"
                                    disabled
                                />
                            </Col>
                        </Row>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="mb-3">
                                    <label className="form-label">Mensaje</label>
                                    <textarea
                                        rows={4}
                                        className="form-control"
                                        placeholder="Mensaje"
                                        value={contenido}
                                        disabled
                                    >
                                    </textarea>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Agente que Respondió</label>
                                    <input
                                        value={id_agente}
                                        onChange={(e) => setIdAgente(e.target.value)}
                                        type="text"
                                        className="form-control"
                                        placeholder="Agente"
                                        disabled
                                    />
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
                                        disabled={typeRoute === "view" || id_agente !== null}
                                    >
                                        {estadoVal?.map((est) => (
                                            <option key={est} value={est}>
                                                {est}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 d-grid">
                                {typeRoute === "view" && !user?.data.roles.includes("user") && (
                                    <Link
                                        to={"/messages/update/" + id}
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
                                <Link to="/messages" className="btn btn-outline-secondary">
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
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>¡ATENCIÓN!</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Desea eliminar el mensaje?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteM}>
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

export default MessageView;
