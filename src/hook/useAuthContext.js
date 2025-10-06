import { useContext } from "react";
import AuthContext from "../context/authContext";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
