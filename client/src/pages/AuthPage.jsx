import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

import { Link } from "react-router-dom";
import { useGuestLogin } from "../hooks/useGuestLogin";
import { Error } from "../components/Error";
import { Captcha } from "./Captcha";
import {
  example1,
  example2
} from "../assets/images/carousel";
import InputAnimated from "../components/InputAnimated";

function AuthPage(props) {
  // log in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, loginIsLoading } = useLogin();
  const { signup, signupError, signupIsLoading } = useSignup();
  const [token, updateToken] = useState();
  const [captchaError, setCaptchaError] = useState();
  const captchaRef = useRef(null);

  const useRecaptcha = import.meta.env.VITE_USE_RECAPTCHA === 'true' ? true : false;

  const pageTypePretty = props.type === "Login" ? "Log in" : "Sign up"



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token && useRecaptcha) {
      setCaptchaError("Please complete the captcha");
      return;
    }
    if (props.type == 'Login') {
      await login(email, password, token);
    }
    else if (props.type == 'Signup') {
      await signup(email, password, token);
    }

  };

  // guest log in
  const { guestLogin, guestLoginError, guestIsLoading } = useGuestLogin();
  const handleGuestLogin = async () => {
    if (!token && useRecaptcha) {
      setCaptchaError("Please complete the captcha");
      return;
    }
    await guestLogin(token);
  };

  // captcha
  const updateCaptcha = (e) => {
    updateToken(captchaRef.current.getValue());
  };

  return (
    <div className='flex  flex-wrap justify-around'>

      <div className='flex place-items-center'>
        <div className='flex flex-col lg:w-102 md:min-w-60 space-y-8 m-10'>
          {captchaError && (
            <Error className="error mb-4 mx-5 w-full" message={captchaError} />
          )}
          {loginError && (
            <Error className="error mb-4 mx-5 w-full" message={loginError} />
          )}
          {guestLoginError && (
            <Error className="error mb-4 mx-5 w-full" message={guestLoginError} />
          )}
          {signupError && (
            <Error className="error mb-4 mx-5 w-full" message={signupError} />
          )}
          <h2
            className="text-2xl"
            style={{ letterSpacing: "1px" }}
          >
            {pageTypePretty}
          </h2>
          <form onSubmit={handleSubmit} className="mb-0">

            <InputAnimated
              className="w-full"
              id="email"
              value={email}
              changeFunction={setEmail}
              label="Email Address"
              type="email"
              
            />



            <InputAnimated
              className="w-full"
              id="password"
              value={password}
              changeFunction={setPassword}
              label="Password"
              type="password"  
            />



            <button type="submit" className="btn w-full btn-primary mb-4">
              {pageTypePretty}
            </button>

          </form>
        {/* <InputAnimated label="Email Address" /> */}

          <hr className="hr w-full mb-4" />


          <button
            type="button"
            className="btn w-full btn-primary mb-4"
            onClick={(e) => handleGuestLogin()}
          >
            Continue as Guest
          </button>
          <Captcha updateToken={updateToken} setError={setCaptchaError} />

          {props.type === "Login" ? <p className="ms-5">Don't have an account?{" "}
            <Link to="/signup" className="link-info">
              Register here

            </Link></p>
            :
            <p className="ms-5">
              Already have an account?{" "}
              <Link to="/login" className="link-info">
                Log in here
              </Link></p>
          }

        </div>

      </div>

      <div className='bg-red flex flex-col lg:visible max-md:invisible items-center w-3/8'>
        <img
          src={example1}
          alt="Login image"
          className="w-full"
          style={{ objectFit: "cover", objectPosition: "left" }}
        />
        <img
          src={example2}
          alt="Login image"
          className="w-full"
          style={{ objectFit: "cover", objectPosition: "left" }}
        />
      </div>

    </div>
  );
};

export default AuthPage;
