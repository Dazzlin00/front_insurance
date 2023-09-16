import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useAuthContext from "../context/AuthContext";
import axios from "axios";

const endpoint = "http://localhost:8000/api";

const Payments = () => {
    const [pagos, setPagos] = useState([]);
    const [mensaje, setMensaje] = useState("");

    const { user, getUser } = useAuthContext();

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser]);
    useEffect(() => {
        if (user?.data.roles.includes("user")) {
            getUserPagos();
        } else if (user?.data.roles.includes("agent")) {
            getAllPagos();
        }
        if (user?.data.roles.includes("admin")) {
            getAllPagos();
        }
    }, [user]);

    const getUserPagos = async () => {
        const response = await axios.get(`${endpoint}/user-pago`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            // La solicitud se realizó correctamente
            setPagos(response.data);
            console.log(response.data);
            // Haz algo con las pagos
        } else {
            // La solicitud falló
            const error = response.error;
            console.log(error);
            // Haz algo con el error
        }
    };

    const getAllPagos = async () => {
        const response = await axios.get(`${endpoint}/pagos`, {
            withCredentials: true,
        });

        if (response.status === 200) {
            // La solicitud se realizó correctamente
            setPagos(response.data);
            // Haz algo con las pagos
        } else {
            // La solicitud falló
            const error = response.error;
            console.log(error);
            // Haz algo con el error
        }
    };

   
    return (
        <div className="row" style={{ marginTop: 150 }}>
            {user?.data.roles.includes("user") && (
                <div className="col-sm-8 mx-auto ">
                    <div className="card">
                        <div className="card-header">
                            PAGOS
                            <NavLink
                                to="/payments/create"
                                className="btn btn-sm btn-primary float-end"
                            >
                                Nuevo Pago
                            </NavLink>
                        </div>
                        <div className="card-body">
                            <table className="table table table-striped">
                                <thead>
                                    <tr>
                                        <th scope="col">Nro. Póliza</th>
                                        <th scope="col">Nro. Transacción</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Fecha de Pago</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map((pago, index) => (
                                        <tr>
                                            <th scope="row">{pago.num_poliza}</th>
                                            <td>{pago.numero_transaccion}</td>
                                            <td>{pago.monto}</td>
                                            <td>{pago.fecha_pago}</td>
                                            <td>{pago.estado}</td>

                                            <td>
                                                <Link
                                                    to={'/payments/view/' + pago.id}
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
                            PAGOS
                            <NavLink
                                to="/payments/create"
                                className="btn btn-sm btn-primary float-end"
                            >
                                Nuevo Pago
                            </NavLink>
                        </div>
                        <div className="card-body">
                            <table className="table table table-striped">
                                <thead>
                                    <tr>
                                    <th scope="col">Nro. Poliza</th>
                                        <th scope="col">Nro. Transaccion</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Fecha de Pago</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pagos.map((pago, index) => (
                                        <tr>

                                            <th scope="row">{pago.num_poliza}</th>
                                            <td>{pago.numero_transaccion}</td>
                                            <td>{pago.username}</td>
                                            <td>{pago.monto}</td>
                                            <td>{pago.fecha_pago}</td>
                                            <td>{pago.estado}</td>
                                            <td>
                                                <Link
                                                    to={'/payments/view/' + pago.id}
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
            {user?.data.roles.includes("agent") && (<div className="col-sm-8 mx-auto ">
                <div className="card">
                    <div className="card-header">
                        PAGOS
                        <NavLink
                            to="/payments/create"
                            className="btn btn-sm btn-primary float-end"
                        >
                            Nuevo Pago
                        </NavLink>
                    </div>
                    <div className="card-body">
                        <table className="table table table-striped">
                            <thead>
                                <tr>
                                <th scope="col">Nro. Poliza</th>
                                        <th scope="col">Nro. Transaccion</th>
                                        <th scope="col">Cliente</th>
                                        <th scope="col">Monto</th>
                                        <th scope="col">Fecha de Pago</th>
                                        <th scope="col">Estado</th>
                                        <th scope="col">Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pagos.map((pago, index) => (
                                    <tr>
                                        <th scope="row">{pago.num_poliza}</th>
                                            <td>{pago.numero_transaccion}</td>
                                            <td>{pago.name}</td>
                                            <td>{pago.monto}</td>
                                            <td>{pago.fecha_pago}</td>
                                            <td>{pago.estado}</td>

                                        <td>
                                            <Link
                                                to={'/payments/view/' + pago.id}
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

export default Payments;
