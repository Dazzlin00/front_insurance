import React, { useEffect, useState, Component } from "react";
import useAuthContext from "../context/AuthContext";
import { useParams, Link } from 'react-router-dom';
import axios from "../api/axios";
import { Button, Form } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";

const Configuration = () => {
  const { user, getUser } = useAuthContext();
  
  return (
    <div>Porque no funciona esto</div>
  )
}

export default Configuration;