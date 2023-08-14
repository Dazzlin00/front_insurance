import { createContext, useContext, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const getUser = async () => {
    const { data } = await axios.get("/api/userprofile");
    setUser(data);
  };

  const login = async ({ ...data }) => {
    await csrf();
    console.log("csrf", csrf);
    try {
      await axios.post("/api/login", data);
      await getUser();

      navigate("/dashboard");
    } catch (e) {
      if (e.response.status === 422) {
        setErrors(e.response.data.errors);
        console.log(e);
      }
    }
  };
  const logout =()=>{

    axios.post("/api/logout").then(()=>{
      setUser(null);
      navigate("/");
    })
  }

  return (
    <AuthContext.Provider value={{ user, errors, getUser, login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuthContext(){

    return useContext(AuthContext);
}