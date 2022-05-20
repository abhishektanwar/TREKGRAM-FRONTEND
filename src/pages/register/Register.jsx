import "./register.css";
import dummy from '../../components/Header/dummy_profile_img.png'
import { useDocumentTitle } from '../../helpers/helpers'
import { SignUp } from "../../components";

const Register = () => {
  useDocumentTitle('TrekGram | Register')
  return (
    <div className="register-container">
      <div className="register-wrapper">
        {/* <Login /> */}
        <SignUp />
      </div>
    </div>
  );
};

export default Register;
