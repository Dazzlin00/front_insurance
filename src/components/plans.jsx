import React, { useEffect, useState } from 'react'
import { Container, Card, Row, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "./layouts/footer";
import axios from "../api/axios";

function Plans() {

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const [tipoPolizas, setTipoPolizas] = useState([]);

  const obTipoPolizas = async () => {
    await csrf();
    console.log("csrf", csrf);
    try {
      const response = await axios.get("/api/planes");
      setTipoPolizas(response.data);
    } catch (e) {
      if (e.response.status === 422) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    obTipoPolizas();
  }, []);


  return (
    <div fluid style={{ marginTop: "100px", backgroundColor:"#EAEAEA", color: "#333333", padding: "0", overflowX: 'hidden' }}>
      <div className='pt-5' style={{height:"500px"}}>
        <h3 style={{
          color: "#333333",
          textAlign: "center",
          textJustify: "inter-word",
          margin: 10,
        }}
        >Planes</h3>
        <Row className='d-flex justify-content-center'>
          {tipoPolizas.map((tipoPoliza, index) => (
            <Card style={{ width: '18rem', margin: '2rem' }}>
              <Card.Body>
                <Card.Title>{tipoPoliza.descripcion}</Card.Title>
                <Card.Text>
                  Coberturas:
                  <ListGroup>
                    {tipoPoliza.coberturas?.map((cobertura, index) => (
                      <ListGroup.Item style={{ textAlign: 'left' }}>{cobertura.descripcion} - <b>{cobertura.monto_cobertura}</b></ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Text>
                <Link
                  to={'/contact'}
                  className="btn btn-sm btn-primary"
                >
                  Contactar
                </Link>
              </Card.Body>
            </Card>
          ))}
        </Row>
      </div>
      <Row className="mt-5 py-5" style={{height:"100%",marginTop:"100px", backgroundColor: "#87CEEB" }}>
        <p>Para más información a cerca de los planes ofrecidos consulta con soporte.</p>
        </Row>
      <Footer />
    </div>
  )
}

export default Plans