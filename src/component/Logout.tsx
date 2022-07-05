import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom"

import { SetPopupContext } from "../App";

type Newprops = {
  
};

const Logout = (props: Newprops) => {
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    setPopup({
      open: true,
      severity: "success",
      message: "Logged out successfully",
    });
  }, []);
  return <Navigate to="/login" />;
};

export default Logout;
