import React, { useEffect } from "react";
import useAuthContext from "../context/AuthContext";

const Dashboard = () => {
  const { user, getUser } = useAuthContext();

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user,getUser]);
  return (
    <div>
      ¡Bienvenido, {user?.data.name}!
    </div>
  );
};

export default Dashboard;
