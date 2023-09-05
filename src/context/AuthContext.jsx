import { createContext, useContext, useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState([]);

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
      setSuccess("Mensaje enviado correctamente");
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
      setSuccess("Bienvendido");
      navigate("/dashboard");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
        console.log(e);
      }
    }
  };
  const register = async ({ ...data }) => {
    await csrf();
    console.log("csrf", csrf);
    try {
      await axios.post("/api/register", data);
      await getUser();
      setSuccess("¡Registrado Exitosamente!");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
        console.log(e);
      }
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
    }, 2000);

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
