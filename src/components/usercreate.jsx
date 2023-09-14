import React, { useEffect, useState, Component, useMemo } from "react";
import useAuthContext from "../context/AuthContext";
import { Button, Form, Alert, Modal } from "react-bootstrap";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";

import axios from "../api/axios";

function UserCreate({ typeRoute }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [message, setMessage] = React.useState("");

  const { user } = useAuthContext();

  const [numid, setCedula] = useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [fecha_registro, setFechaRegistro] = React.useState("");
  const [address, setAddress] = React.useState(id);
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [rolesVal, setRolesVal] = useState([]);

  useEffect(() => {
    getAllRoles();
    if (typeRoute === "view") {
      searchUsuario();
    } else if (typeRoute === "update") {
      searchUsuario();
    } else if (typeRoute === "create") {

    }
  }, []);
  
  const getAllRoles = async () => {
    const response = await axios.get("/api/user-roles");
    setRolesVal(response.data);
  }
  const searchUsuario = async () => {
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };

    try {

      const response = await axios.get(`/api/users/${id}`, {
        headers,
      });

      const user = response.data;
      setCedula(user.numid);
      setName(user.name);
      setEmail(user.email);
      setAddress(user.address);
      setPhone(user.phone);
      setRole(user.roles[0].name);

    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se encontro el usuario.</div>
      );
    }
  };

  const registrar = async (event) => {
    event.preventDefault();

    if (
      !numid |
      !name |
      !email |
      !address |
      !phone |
      !role
    ) {
      setMessage(
        <div className="alert alert-danger">Debe completar todos los datos</div>
      );
      return;
    }
    const data = {
      numid,
      name,
      email,
      address,
      phone,
      role
    };

    try {
      await axios.post("/api/users", data);
      setMessage(<div className="alert alert-success">Registro exitoso</div>);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo registrar</div>
      );
    }
  };

  const actualizar = async (event) => {
    event.preventDefault();
    if (
      !numid |
      !name |
      !email |
      !address |
      !phone |
      !role
    ) {
      setMessage(
        <div className="alert alert-danger">No debe haber campos vacios</div>
      );
      return;
    }

    const data = {
      numid,
      name,
      email,
      address,
      phone,
      role
    };

    try {
      await axios.put(
        "/api/users/" + id,

        data
      );

      setMessage(
        <div className="alert alert-success">Se actualizo correctamente</div>
      );
      navigate("/users/view/" + id);
    } catch (e) {
      setMessage(
        <div className="alert alert-danger">No se pudo actualizar</div>
      );
    }
  };

  const eliminarUsuario = async () => {
    if (!id) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          No existe el usuario.
        </Alert>
      );
      return;
    }
    const headers = {
      Authorization: `Bearer ${user?.data.token}`,
    };
    try {
      await axios.delete("/api/users/" + id);

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
      navigate("/users");
    } catch (e) {
      setShow(true);
      setMessage(
        <Alert
          className="alert alert-danger"
          onClose={() => setShow(false)}
          dismissible
        >
          No se pudo eliminar el usuario.
        </Alert>
      );
    }
  };

  const deleteU = () => {
    eliminarUsuario();
    setShow(false);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row" style={{ marginTop: 100 }}>
      <div className="col-sm-8 mx-auto">
        <div className="card">
          <div className="card-header"> USUARIO</div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nro. Documento</label>
                  <div className="input-group ">
                    <Form.Control
                      type="text"
                      value={numid}
                      onChange={(e) => setCedula(e.target.value)}
                      className="form-control"
                      placeholder="Nro. Documento"
                      onFocus={() => setMessage("")}
                      disabled={typeRoute === "view"}
                    />
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Nombre</label>
                  <input
                    value={name}
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    className="form-control"
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <label className="form-label">Teléfono</label>
                <input
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  type="text"
                  className="form-control"
                  placeholder="Teléfono"
                  disabled={typeRoute === "view"}
                />
              </div>
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Correo Electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={typeRoute === "view"}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <textarea
                rows={4}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
                className="form-control"
                disabled={typeRoute === "view"}
              >
              </textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                type="text"
                className="form-select"
                placeholder="Rol"
                disabled={typeRoute === "view"}
              >
                {rolesVal?.map((rol) => (
                  <option key={rol} value={rol}>
                    {rol}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-md-4 d-grid">
                {typeRoute === "view" && user?.data.roles.includes("admin") && (
                  <Link
                    to={"/users/update/" + id}
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
                <Link to="/users" className="btn btn-outline-secondary">
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
        <Modal.Body>¿Desea eliminar el usuario?</Modal.Body>
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

export default UserCreate;
