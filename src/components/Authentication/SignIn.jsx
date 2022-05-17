import React, { useState,useEffect } from "react";
import { InputField } from "..";
import {ChevronRight} from "@material-ui/icons"
import Button from "../Buttons/Button";
import { Loader } from "../Loader/Loader";
import "./authentication.css";
import { useNavigate } from "react-router";
import {login} from '../../reducers/userSlice'
import { useDispatch, useSelector } from "react-redux";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user, authToken,status} = useSelector((state)=>state.user)
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const isValidEmail = loginCredentials.email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  )
    ? true
    : false;

  const isValidPassword =
    loginCredentials.password && loginCredentials.password.length >= 8
      ? true
      : false;

  const handleLoginCredentialInput = (e) => {
    setLoginCredentials((creds) => ({
      ...creds,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = () => {
    dispatch(login(loginCredentials))
    
  };

  // useEffect(()=>{
  //   if(user && authToken){
  //     navigate("/");
  //   }
  // },[user])

  return (
    <div className="auth-body">
      {status === "pending" && <Loader />}
      <div className="authentication-container flex-column">
        <h3 className="text-bold-weight">Login</h3>
        <InputField
          type="email"
          name="email"
          labelClass="required-field"
          id="email"
          placeholder="username@xyz.com"
          labelText="Email Address"
          value={loginCredentials.email}
          onChange={handleLoginCredentialInput}
          required={true}
          validation={loginCredentials.email.length === 0 ? true : isValidEmail}
        />
        <InputField
          type="password"
          name="password"
          id="password"
          placeholder="Enter password"
          labelText="Password"
          value={loginCredentials.password}
          onChange={handleLoginCredentialInput}
          required={true}
          validation={
            loginCredentials.password.length === 0 ? true : isValidPassword
          }
          showTogglePasswordButton={true}
        />
        <div className="card-action-btn-container flex-column">
          {/* {error.errorExists && (
            <p className="body-typo-sm invalid-field-color text-bold-weight ">
              {error.errorMessage}
            </p>
          )} */}
          {/* loader comp */}
          <Button buttonText="Login" onClick={() => loginUser()} />
          <Button
            buttonText="Create new account"
            buttonStyle="secondary-button margin-top-0 primary-outline"
            // icon="fas fa-chevron-right"
            icon={<ChevronRight fontSize="large" />}
            onClick={() => {navigate('/register')}}
          />
          <Button
            buttonText="Login with test credenials"
            buttonStyle="secondary-button body-typo-md margin-top-0"
            onClick={() =>
              setLoginCredentials({
                email: "testuser@tg.com",
                password: "test1234",
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
