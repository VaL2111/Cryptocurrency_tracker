import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth = true;
  return <div>{auth ? <Outlet /> : <Navigate to="login" />}</div>;
};

export default PrivateRoute;
