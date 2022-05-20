import "./index.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyUser } from "./reducers/userSlice";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import utils from "./utils";
import { ModalProvider } from "./contexts/ModalContext";
import Explore from "./pages/explore/Explore";
import Bookmarks from "./pages/bookmarks/Bookmarks";
import Page404 from "./pages/Page404";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Header } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { user, authToken } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // trekgram-auth-token
  useEffect(() => {
    const token = utils.getLocalStorage("TREKGRAM_AUTH_TOKEN");
    if (!user && token) {
      dispatch(verifyUser());
    }
  }, [dispatch, user]);
  return (
    <div className="app">
      <ToastContainer theme="colored" autoClose={1200} />
      <ModalProvider>
        <nav className="nav-bar shadow-box" id="my-nav-bar">
          <Header />
        </nav>
        <Routes>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/bookmarks" element={<Bookmarks />} />

          </Route>
          <Route element={<AuthRoute />}>
        <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </ModalProvider>
    </div>
  );
}

export default App;
