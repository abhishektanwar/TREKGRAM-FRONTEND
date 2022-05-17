import { useState } from "react";
import { useNavigate } from "react-router";
import { InputField,Button } from "..";
import {ChevronRight} from '@material-ui/icons';
import "./authentication.css";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../reducers/userSlice";
import { Loader } from "../Loader/Loader";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, authToken,status} = useSelector((state)=>state.user)
  const [signUpCredentials, setSignUpCredentials] = useState({
    name:"",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const isValidEmail = signUpCredentials.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword = signUpCredentials.password && signUpCredentials.confirmPassword && (signUpCredentials.password.length >= 8) && (signUpCredentials.password === signUpCredentials.confirmPassword) ? true : false;

  
  const handleSignUpCredentialInput = (e) => {
    setSignUpCredentials((creds) => ({
      ...creds,
      [e.target.name]: e.target.value,
    }));
  };

  const signUpUser = async () => {
    // const success = await signUpHandler(signUpCredentials);
    // if(success) hideModal();
    dispatch(register({
      password:signUpCredentials.password,
      email:signUpCredentials.email,
      username:signUpCredentials.name
    }))

  }

  return (
    <div className="auth-body">
      {status === "pending " && <Loader />}
      <div className="authentication-container flex-column">
        <h3 className="text-bold-weight">Signup</h3>
        <InputField
            type="text"
            name="name"
            labelClass="required-field"
            id="name"
            placeholder="Username"
            labelText="Name"
            value={signUpCredentials.name}
            onChange={handleSignUpCredentialInput}
            required={true}
            validation={true}
          />
          <InputField
            type="email"
            name="email"
            labelClass="required-field"
            id="email"
            placeholder="username@xyz.com"
            labelText="Email Address"
            value={signUpCredentials.email}
            onChange={handleSignUpCredentialInput}
            required={true}
            validation={signUpCredentials.email.length === 0 ? true :isValidEmail}
          />
          <InputField
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            labelText="Password"
            value={signUpCredentials.password}
            onChange={handleSignUpCredentialInput}
            required={true}
            validation={signUpCredentials.password.length === 0 ? true : isValidPassword}
            showTogglePasswordButton = {true}
          />
          <InputField
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter password"
            labelText="Confirm Password"
            value={signUpCredentials.confirmPassword}
            onChange={handleSignUpCredentialInput}
            required={true}
            validation={signUpCredentials.confirmPassword.length === 0 ? true : isValidPassword}
            showTogglePasswordButton = {true}
          />
          <div className="card-action-btn-container flex-column">
            <Button buttonText="Sign Up" buttonStyle={!(isValidPassword && isValidEmail) ? 'btn-disabled' : '' } onClick={() => signUpUser()} />
            <Button
              buttonText="Already have an account ?"
              buttonStyle="secondary-button"
              icon={<ChevronRight fontSize="large" />}
              onClick={() => {navigate('/login')}}
            />
          </div>
      </div>
    </div>
  );
};

export default SignUp;
