import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);
  const [cedula, setCedula] = useState("");

  const navigate = useNavigate();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/userprofile");
    setUser(data);
  };

  const mensajes = async ({ ...data }) => {
    await csrf();
    console.log("csrf", csrf);
    try {
      await axios.post("/api/mensajes", data);

      setSuccess(
        <div class="alert alert-success">Mensaje enviado correctamente</div>
      );
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
        console.log(e);
      }
    }
  };

  const login = async ({ ...data }) => {
    await csrf();
    console.log("csrf", csrf);
    try {
      await axios.post("/api/login", data);
      await getUser();
      setSuccess(<div class="alert alert-success">Bienvendido</div>);

      navigate("/dashboard");
    } catch (e) {
      if (e.response.status === 401) {
        setErrors(
          <div class="alert alert-danger">
            El email o la contraseña son incorrectos
          </div>
        );
        console.log(e.response.status);
      } else if (e.response.status === 500) {
        setErrors(<div class="alert alert-danger">Intentelo mas tarde</div>);
      }

      console.log(e);
    }
  };
  const register = async ({ ...data }) => {
    await csrf();
    console.log("csrf", csrf);
    try {
      await axios.post("/api/register", data);
      setSuccess(
        <div class="alert alert-success">¡Registrado Exitosamente!</div>
      );

      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    } catch (e) {
      setErrors(
        <div class="alert alert-danger">
          Error: No se pudo registrar al usuario.
        </div>
      );

      console.log(e.response.status);
    }
  };
  
  const logout = () => {
    axios.post("/api/logout").then(() => {
      setUser(null);
      navigate("/");
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrors("");
      setSuccess("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [errors, success]);
  return (
    <AuthContext.Provider
      value={{
        user,
        errors,
        success,
        getUser,
        login,
        logout,
        register,
        mensajes,
      
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext() {
  return useContext(AuthContext);
}
