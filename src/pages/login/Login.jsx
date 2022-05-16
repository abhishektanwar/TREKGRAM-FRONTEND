import "./login.css";
import dummy from '../../components/Header/dummy_profile_img.png'
import { SignIn } from "../../components";
// import {Login} from '../../components'
const Login = () => {
  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* <Login /> */}
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
