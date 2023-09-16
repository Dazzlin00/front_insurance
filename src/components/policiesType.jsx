import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const PoliciesType = () => {
  const [policiesTypes, setPoliciesTypes] = useState([]);
  const [policiesType, setPoliciesType] = useState("");

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    getAllPoliciesTypes();
  }, [user]);

  const getAllPoliciesTypes = async () => {
    const response = await axios.get(`${endpoint}/tipo-polizas`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setPoliciesTypes(response.data);
      console.log(policiesTypes)
      // Haz algo con las reportes
    } else {
      // La solicitud falló
      const error = response.error;
      console.log(error);
      // Haz algo con el error
    }
  };
  

  return (
    <div className="row" style={{ marginTop: 150 }}>
        <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              TIPOS DE PÓLIZA
              <NavLink
                to="/policiesType/create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo Tipo
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                  <th scope="col">Tipo</th>
                  <th scope="col">Cantidad de Coberturas</th>
                  <th scope="col">Creada</th>
                  <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {policiesTypes.map((policiesType, index) => (
                    <tr>
                      <th scope="row">{policiesType.descripcion}</th>
                      <td>{policiesType.coberturas}</td>
                      <td>{policiesType.created_at}</td>

                      <td>
                        <Link
                          to={'/policiesType/view/'+policiesType.id}
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
    </div>
  );
};

export default PoliciesType;
