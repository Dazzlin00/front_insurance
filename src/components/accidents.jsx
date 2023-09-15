import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import useAuthContext from "../context/AuthContext";

const endpoint = "http://localhost:8000/api";

function Accidents() {
  const [siniestros, setSiniestros] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (user?.data.roles.includes("user")) {
      setMensaje("aqui va los siniestros del usuario");
      getAllMisSiniestros();
    } else if (user?.data.roles.includes("agent")) {
      getAllSiniestros();
    }
    if (user?.data.roles.includes("admin")) {
      getAllSiniestros();
    }
  }, [user]);
  const getAllSiniestros = async () => {
    const response = await axios.get(`${endpoint}/siniestros`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setSiniestros(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };
  const getAllMisSiniestros = async () => {
    const response = await axios.get(`${endpoint}/siniestro`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setSiniestros(response.data);
      // Haz algo con las polizas
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };

  return (
    <div className="row" style={{ marginTop: 100 }}>
      {user?.data.roles.includes("agent") && (
        <div className="col-sm-8 mx-auto">
          <div className="card">
            <div className="card-header">
              SINIESTROS
              <NavLink
                to="/accidents-create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo siniestro
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cedula del afectado</th>
                    <th scope="col">Tipo de Siniestro</th>
                    <th scope="col">Pagado</th>
                    <th scope="col">Fecha de reporte</th>
                    <th scope="col">Fecha de solución</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {siniestros.map((siniestro, index) => (
                    <tr>
                      <th scope="row">{siniestro.id}</th>
                      <td>{siniestro.numid}</td>
                      <td>{siniestro.descripcion_tipo_siniestro}</td>
                      <td>Si</td>
                      <td>{siniestro.fecha_reporte}</td>
                      <td>{siniestro.fecha_declaracion}</td>
                      <td>{siniestro.estado}</td>
                      <td>
                        <Link
                          to={"/accidents/view/" + siniestro.id}
                          className="btn btn-sm btn-primary"
                        >
                          Ver detalle
                        </Link>
                        {/*<button type="button" className="btn btn-sm btn-primary">Ver detalle</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {user?.data.roles.includes("admin") && (
        <div className="col-sm-8 mx-auto">
          <div className="card">
            <div className="card-header">
              SINIESTROS
              <NavLink
                to="/accidents-create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo siniestro
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Cedula del afectado</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Pagado</th>
                    <th scope="col">Fecha de reporte</th>
                    <th scope="col">Fecha de solución</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {siniestros.map((siniestro, index) => (
                    <tr>
                      <th scope="row">{siniestro.id}</th>
                      <td>{siniestro.id_usuario}</td>

                      <td>{siniestro.descripcion_tipo_siniestro}</td>
                      <td>Si</td>
                      <td>{siniestro.fecha_reporte}</td>
                      <td>{siniestro.fecha_declaracion}</td>
                      <td>{siniestro.estado}</td>

                      <td>
                        <Link
                          to={"/accidents/view/" + siniestro.id}
                          className="btn btn-sm btn-primary"
                        >
                          Ver detalle
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {user?.data.roles.includes("user") && (
        <div className="col-sm-8 mx-auto">
          <div className="card">
            <div className="card-header">
              SINIESTROS
              <NavLink
                to="/accidents-create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo siniestro
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <th scope="col">Descripción</th>
                    <th scope="col">Pagado</th>
                    <th scope="col">Fecha de reporte</th>
                    <th scope="col">Fecha de solución</th>
                    <th scope="col">Estado</th>

                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {siniestros.map((siniestro, index) => (
                    <tr>
                      <th scope="row">{siniestro.id}</th>

                      <td>{siniestro.descripcion}</td>
                      <td>Si</td>
                      <td>{siniestro.fecha_reporte}</td>
                      <td>{siniestro.fecha_declaracion}</td>
                      <td>{siniestro.estado}</td>
                      <td>
                        <div className="row">
                          <div className="d-flex">
                            <Link
                              to={"/accidents/view/" + siniestro.id}
                              className="btn btn-sm btn-primary"
                              style={{ width: "100%" ,height:"30px",margin:"2px"}}
                            >
                              Ver detalle
                            </Link>
                            <Link
                              //  to={"/accidents/view/" + siniestro.id}
                              className="btn btn-sm btn-secondary "
                              style={{ width: "100%",height:"30px",fontSize:"13px" ,margin:"2px"}}
                            >
                              Contactar Agente
                            </Link>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Accidents;
