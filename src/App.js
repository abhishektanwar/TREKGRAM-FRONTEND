import './index.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'
import Register from './pages/register/Register';
import {Routes,Route} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser } from './reducers/userSlice';
import AuthRoute from './components/AuthRoute/AuthRoute';
import utils from './utils';
function App() {
  const {user,authToken} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = utils.getLocalStorage("TREKGRAM_AUTH_TOKEN")
    if(!user && token){
      (dispatch(verifyUser()))
    }
  },[dispatch])
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
