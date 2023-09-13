import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const Reports = () => {
  const [reportes, setReportes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {
    if (user?.data.roles.includes("user")) {
      getUserReportes();
    } else if (user?.data.roles.includes("agent")) {
      getAllReportes();
    }
    if (user?.data.roles.includes("admin")) {
      getAllReportes();
    }
  }, [user]);

  const getUserReportes = async () => {
    const response = await axios.get(`${endpoint}/user-reclamo`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setReportes(response.data);
      // Haz algo con los reportes
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };

  const getAllReportes = async () => {
    const response = await axios.get(`${endpoint}/reclamos`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setReportes(response.data);
      // Haz algo con las reportes
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
        <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              REPORTES
              <NavLink
                to="/reports/create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo Reporte
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                  <th scope="col">Nro. Reporte</th>
                  <th scope="col">Nro. Poliza</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Descripcion</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) => (
                    <tr>
                      <th scope="row">{reporte.numero_reclamo}</th>
                      <td>{reporte.num_poliza}</td>
                      <td>{reporte.name}</td>
                      <td>{reporte.descripcion}</td>
                      <td>{reporte.fecha_reclamo}</td>

                      <td>
                        <Link
                          to={'/reports/view/'+reporte.id}
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
{user?.data.roles.includes("admin") && (
        <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              REPORTES
              <NavLink
                to="/policies/create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo Reporte
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nro. Reporte</th>
                    <th scope="col">Nro. Poliza</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Descripcion</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) => (
                    <tr>
                      <th scope="row">{reporte.numero_reclamo}</th>
                      <td>{reporte.num_poliza}</td>
                      <td>{reporte.name}</td>
                      <td>{reporte.descripcion}</td>
                      <td>{reporte.fecha_reclamo}</td>

                      <td>
                        <Link
                          to={'/reports/view/'+reporte.id}
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
      {user?.data.roles.includes("user") && ( <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              REPORTES
              <NavLink
                to="/policies/create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo Reporte
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Nro. Reporte</th>
                    <th scope="col">Nro. Poliza</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {reportes.map((reporte, index) => (
                    <tr>
                      <th scope="row">{reporte.numero_reclamo}</th>
                      <td>{reporte.num_poliza}</td>
                      <td>{reporte.descripcion}</td>
                      <td>{reporte.fecha_reclamo}</td>

                      <td>
                        <Link
                          to={'/reports/view/'+reporte.id}
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
        </div>)}
    </div>
  );
};

export default Reports;
