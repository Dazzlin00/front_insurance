import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";
const endpoint = "http://localhost:8000/api";

const Policies = () => {
  const [polizas, setPolizas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (user?.data.roles.includes("user")) {
      setMensaje("aqui va solicitud")
    } else if (user?.data.roles.includes("agent")) {
      getAllPolizas();
    }
    if (user?.data.roles.includes("admin")) {
      getAllPolizas();
    }
  }, [user]);

  const getAllPolizas = async () => {
    const response = await axios.get(`${endpoint}/polizas`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setPolizas(response.data);
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
        <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              POLIZAS
              <NavLink
                to="/policies-create"
                className="btn btn-sm btn-primary float-end"
              >
                Nueva póliza
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Descripción</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha de inicio</th>
                    <th scope="col">Fecha de vencimiento</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {polizas.map((poliza, index) => (
                    <tr>
                      <th scope="row">{poliza.num_poliza}</th>
                      <td>{poliza.name}</td>
                      <td>{poliza.fecha_inicio}</td>
                      <td>{poliza.fecha_vencimiento}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                        >
                          Ver detalle
                        </button>
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
              POLIZAS
              <NavLink
                to="/policies-create"
                className="btn btn-sm btn-primary float-end"
              >
                Nueva póliza
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Descripción</th>
                    <th scope="col">Cliente</th>
                    <th scope="col">Fecha de inicio</th>
                    <th scope="col">Fecha de vencimiento</th>
                    <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {polizas.map((poliza, index) => (
                    <tr>
                      <th scope="row">{poliza.num_poliza}</th>
                      <td>{poliza.name}</td>
                      <td>{poliza.fecha_inicio}</td>
                      <td>{poliza.fecha_vencimiento}</td>

                      <td>
                        <button
                          type="button"
                          className="btn btn-sm btn-primary"
                        >
                          Ver detalle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {user?.data.roles.includes("user") && (<div>{mensaje}</div>)}
    </div>
  );
};

export default Policies;
