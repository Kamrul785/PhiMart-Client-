import { useContext } from "react";
import AuthContext from "../context/authContext.jsx";


const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
