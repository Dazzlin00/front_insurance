import React, { useEffect, useState, Component, useMemo } from "react";
import useAuthContext from "../context/AuthContext";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";

import axios from "../api/axios";

function PoliciesTypeCreate({ typeRoute }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");

    const { user } = useAuthContext();

    const [descripcion, setDescripcion] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [descCobertura, setDescCobertura] = useState("");
    const [montoCobertura, setMontoCobertura] = useState("");
    const [tipo_coberturas, setTipoCoberturas] = useState([]);
    const [coberturas, setCoberturas] = useState([]);

    const handleSelectChange = (event) => {
        const selectedValues = Array.from(event.target.selectedOptions, (option) => option.value);
        setTipoCoberturas(selectedValues);
    };


    useEffect(() => {
        getAllCoberturas();
        if (typeRoute === "view") {
            searchTipoPoliza();
        } else if (typeRoute === "update") {
            searchTipoPoliza();
        } else if (typeRoute === "create") {

        }
    }, []);

    const getAllCoberturas = async () => {
        const response = await axios.get("/api/coberturas");
        setCoberturas(response.data);
    }
    const searchTipoPoliza = async () => {
        const headers = {
            Authorization: `Bearer ${user?.data.token}`,
        };

        try {

            const response = await axios.get(`/api/tipo-polizas-all/${id}`, {
                headers,
            });

            const tipoPoliza = response.data;
            setDescripcion(tipoPoliza.descripcion);
            setFechaCreacion(tipoPoliza.created_at);
            setTipoCoberturas(tipoPoliza.tipo_coberturas);

        } catch (e) {
            setMessage(
                <div className="alert alert-danger">No se encontro el tipo.</div>
            );
        }
    };

    const registrar = async (event) => {
        event.preventDefault();

        if (
            !descripcion |
            !tipo_coberturas
        ) {
            setMessage(
                <div className="alert alert-danger">Debe completar todos los datos</div>
            );
            return;
        }
        const data = {
            descripcion,
            tipo_coberturas
        };

        try {
            await axios.post("/api/tipo-polizas", data);
            setMessage(<div className="alert alert-success">Registro exitoso</div>);
        } catch (e) {
            setMessage(
                <div className="alert alert-danger">No se pudo registrar</div>
            );
        }
    };

    const crearCobertura = async (event) => {
        event.preventDefault();

        if (
            !descCobertura |
            !montoCobertura
        ) {
            setMessage(
                <div className="alert alert-danger">Debe completar todos los datos</div>
            );
            return;
        }
        const data = {
            descripcion: descCobertura,
            monto_cobertura: montoCobertura
        };

        try {
            await axios.post("/api/coberturas", data);
            setMessage(<div className="alert alert-success">Registro exitoso</div>);
            window.location.reload();
        } catch (e) {
            setMessage(
                <div className="alert alert-danger">No se pudo registrar</div>
            );
        }
    };

    const actualizar = async (event) => {
        event.preventDefault();
        if (
            !descripcion |
            !tipo_coberturas
        ) {
            setMessage(
                <div className="alert alert-danger">No debe haber campos vacios</div>
            );
            return;
        }

        const data = {
            descripcion,
            tipo_coberturas
        };

        try {
            await axios.put(
                "/api/tipo-polizas/" + id,
                data
            );

            setMessage(
                <div className="alert alert-success">Se actualizo correctamente</div>
            );
            navigate("/policiesType/view/" + id);
        } catch (e) {
            setMessage(
                <div className="alert alert-danger">No se pudo actualizar</div>
            );
        }
    };

    const eliminarTipoPoliza = async () => {
        if (!id) {
            setShow(true);
            setMessage(
                <Alert
                    className="alert alert-danger"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    No existe el tipo.
                </Alert>
            );
            return;
        }
        const headers = {
            Authorization: `Bearer ${user?.data.token}`,
        };
        try {
            await axios.delete("/api/tipo-polizas/" + id);

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
            navigate("/policiesType");
        } catch (e) {
            setShow(true);
            setMessage(
                <Alert
                    className="alert alert-danger"
                    onClose={() => setShow(false)}
                    dismissible
                >
                    No se pudo eliminar el tipo.
                </Alert>
            );
        }
    };

    const deleteU = () => {
        eliminarTipoPoliza();
        setShow(false);
    };
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="row" style={{ marginTop: 100 }}>
            <div className="col-sm-8 mx-auto">
                <div className="card">
                    <div className="card-header"> TIPO DE PÓLIZA</div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Descripción</label>
                                    <div className="input-group ">
                                        <Form.Control
                                            type="text"
                                            value={descripcion}
                                            onChange={(e) => setDescripcion(e.target.value)}
                                            className="form-control"
                                            placeholder="Descripcion"
                                            onFocus={() => setMessage("")}
                                            disabled={typeRoute === "view"}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label className="form-label">Fecha de creación</label>
                                    <input
                                        value={fechaCreacion}
                                        type="date"
                                        onChange={(e) => {
                                            setFechaCreacion(e.target.value);
                                        }}
                                        className="form-control"
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <label className="form-label">Coberturas</label>
                                <select
                                    value={tipo_coberturas}
                                    onChange={handleSelectChange}
                                    multiple
                                    className="form-select"
                                    placeholder="Coberturas"
                                    disabled={typeRoute === "view"}
                                >
                                    {coberturas?.map((dato) => (
                                        <option key={dato.id} value={dato.id}>
                                            {dato.descripcion} - {dato.monto_cobertura}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col mb-3 p-2 bg-secondary rounded">
                                <div>
                                    <h4>Crear Cobertura</h4>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descripción Cobertura</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Descripción cobertura"
                                        value={descCobertura}
                                        onChange={(e) => setDescCobertura(e.target.value)}
                                        disabled={typeRoute === "view"}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Monto Cobertura</label>
                                    <input
                                        value={montoCobertura}
                                        onChange={(e) => setMontoCobertura(e.target.value)}
                                        placeholder="Monto Cobertura"
                                        className="form-control"
                                        disabled={typeRoute === "view"}
                                    />
                                </div>
                                <button
                                    onClick={crearCobertura}
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    Crear
                                </button>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 d-grid">
                                {typeRoute === "view" && user?.data.roles.includes("admin") && (
                                    <Link
                                        to={"/policiesType/update/" + id}
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

                            <div className="col-md-4 d-grid">
                                {typeRoute !== "create" &&
                                    user?.data.roles.includes("admin") && (
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
                                <Link to="/policiesType" className="btn btn-outline-secondary">
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
                <Modal.Body>¿Desea eliminar el tipo?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={deleteU}>
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

export default PoliciesTypeCreate;
