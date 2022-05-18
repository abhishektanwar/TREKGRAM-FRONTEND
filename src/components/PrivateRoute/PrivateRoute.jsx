import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import utils from "../../utils";

const PrivateRoute = () => {
  const { user, authToken } = useSelector((state) => state.user);
  const location = useLocation();
  return utils.getLocalStorage("TREKGRAM_AUTH_TOKEN") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
