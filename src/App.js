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
function App() {
  const {user,authToken} = useSelector((state)=>state.user);
  const dispatch = useDispatch();
// trekgram-auth-token
  useEffect(()=>{
    const token = localStorage.getItem("trekgram-auth-token")
    if(user === null && token){
      (dispatch(verifyUser()))
    }
  },[])
  return (
    <div className="app">
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
