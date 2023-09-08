import React, { useEffect, useState } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom"
import axios from "axios";
import useAuthContext from "../context/AuthContext";

const endpoint = "http://localhost:8000/api";

function Accidents() {
    const [siniestros, setSiniestros] = useState([]);
    const [mensaje, setMensaje] = useState("");
    const { user, getUser } = useAuthContext();


    useEffect(() => {
      if (user?.data.roles.includes("user")) {
        setMensaje("aqui va los siniestros del usuario")
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
        } 
        
        else {
          // La solicitud falló
          const error = response.error;
          console.log(error);
          // Haz algo con el error
        }
     
       
    };
    
  return (
<div className="row" style={{marginTop:100}}>
{user?.data.roles.includes("agent") && (
    <div className="col-sm-8 mx-auto">
        <div className="card">
        <div className="card-header">
            SINIESTROS
            <NavLink to="/accidents-create" className="btn btn-sm btn-primary float-end">Nuevo siniestro</NavLink>
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
                <th scope="col">Detalle</th>
                </tr>
            </thead>
            <tbody>
            {siniestros.map((siniestro, index) => (
                <tr>
                <th scope="row">1</th>
                <td>{siniestro.descripcion_tipo_siniestro}</td>
                <td>Si</td>
                <td>{siniestro.fecha_reporte}</td>
                <td>02/09/2024</td>
                <td><button type="button" className="btn btn-sm btn-primary">Ver detalle</button></td>
                </tr>
                 ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>)}
    {user?.data.roles.includes("admin") && (
    <div className="col-sm-8 mx-auto">
        <div className="card">
        <div className="card-header">
            SINIESTROS
            <NavLink to="/accidents-create" className="btn btn-sm btn-primary float-end">Nuevo siniestro</NavLink>
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
                <th scope="col">Detalle</th>
                </tr>
            </thead>
            <tbody>
            {siniestros.map((siniestro, index) => (
                <tr>
                <th scope="row">1</th>
                <td>{siniestro.descripcion_tipo_siniestro}</td>
                <td>Si</td>
                <td>{siniestro.fecha_reporte}</td>
                <td>02/09/2024</td>
                <td><button type="button" className="btn btn-sm btn-primary">Ver detalle</button></td>
                </tr>
                 ))}
            </tbody>
            </table>
        </div>
        </div>
    </div>)}
    {user?.data.roles.includes("user") && (<div>{mensaje}</div>)}


</div>

)
}

export default Accidents