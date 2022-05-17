import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
// import utils from "../../utils";

const PrivateRoute = () => {
  // const trekToken = utils.getLocalStorage('trek-notes-authToken')
  const { user, authToken } = useSelector((state) => state.user);
  const location = useLocation();
  return user !== null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
