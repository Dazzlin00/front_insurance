import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const Messages = () => {
  const [mensajes, setMensajes] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);
  useEffect(() => {
    getAllMensajes();
  }, [user]);

  const getAllMensajes = async () => {
    const response = await axios.get(`${endpoint}/general-mensajes`, {
      withCredentials: true,
    });

    if (response.status === 200) {
      // La solicitud se realizó correctamente
      setMensajes(response.data);
      console.log(mensajes)
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
              MENSAJES
            </div>
            <div className="card-body">
              <table className="table table table-striped">
                <thead>
                  <tr>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Fecha</th>
                  <th scope="col">Estado</th>
                  <th scope="col">Detalle</th>
                  </tr>
                </thead>
                <tbody>
                  {mensajes.map((mensaje, index) => (
                    <tr>
                      <th scope="row">{mensaje.email}</th>
                      <td>{mensaje.created_at}</td>
                      <td>{mensaje.estado}</td>

                      <td>
                        <Link
                          to={'/messages/view/'+mensaje.id}
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

export default Messages;
