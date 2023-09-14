import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState("");

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {
    getAllUsuarios();
  }, [user]);

  const getAllUsuarios = async () => {
    const response = await axios.get(`${endpoint}/users`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setUsuarios(response.data);
      console.log(usuarios)
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
        <div className="col-sm-8 mx-auto ">
          <div className="card">
            <div className="card-header">
              USUARIOS
              <NavLink
                to="/users/create"
                className="btn btn-sm btn-primary float-end"
              >
                Nuevo Usuario
              </NavLink>
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                  <th scope="col">Nro. Documento</th>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Rol</th>
                  <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.map((usuario, index) => (
                    <tr>
                      <th scope="row">{usuario.numid}</th>
                      <td>{usuario.email}</td>
                      <td>{usuario.name}</td>
                      <td>{usuario.roles[0].name}</td>

                      <td>
                        <Link
                          to={'/users/view/'+usuario.id}
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

export default Users;
