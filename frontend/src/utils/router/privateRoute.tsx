import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hook";

const PrivateRoute = () => {
  const auth = useAuth();
  return <div>{auth ? <Outlet /> : <Navigate to="login" />}</div>;
};

export default PrivateRoute;
