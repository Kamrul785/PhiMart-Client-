import { Navigate } from "react-router";
import useAuthContext from "../hook/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();
  if (user === null)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner text-secondary loading-xl "></span>
      </div>
    );
  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
