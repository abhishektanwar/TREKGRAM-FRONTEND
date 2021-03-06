import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import utils from "../../utils";
// import utils from "../../utils";

const AuthRoute = () => {
  const { user, authToken } = useSelector((state) => state.user);
  const location = useLocation();
  return utils.getLocalStorage("TREKGRAM_AUTH_TOKEN") ? (
    <Navigate to="/home" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export default AuthRoute;
