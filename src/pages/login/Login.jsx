import "./login.css";
import { SignIn } from "../../components";
import { useDocumentTitle } from "../../helpers/helpers";
const Login = () => {
  useDocumentTitle("TrekGram | Login");
  return (
    <div className="login-container">
      <div className="login-wrapper">
        <SignIn />
      </div>
    </div>
  );
};

export default Login;
