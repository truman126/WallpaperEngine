import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useGuestLogin } from "../hooks/useGuestLogin";
import { Error } from "../components/Error";

import {
  example1,
  example2
} from "../img/carousel";

const Login = () => {
  // log in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, loginIsLoading } = useLogin();

  const useRecaptcha = import.meta.env.VITE_USE_RECAPTCHA === 'true' ? true : false;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token && useRecaptcha) {
      setCaptchaError("Please complete the captcha");
      return;
    }
    await login(email, password, token);
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
  const [token, updateToken] = useState();
  const [captchaError, setCaptchaError] = useState();
  const captchaRef = useRef(null);
  const updateCaptcha = (e) => {
    updateToken(captchaRef.current.getValue());
  };

  return (
    <div className='flex'>

      <div className='flex w-1/2 justify-center'>
        <div className='flex flex-col w-1/2 space-y-8 m-10'>
          {captchaError && (
            <Error className="error mb-4 mx-5 w-full" message={captchaError} />
          )}
          {loginError && (
            <Error className="error mb-4 mx-5 w-full" message={loginError} />
          )}
          {guestLoginError && (
            <Error className="error mb-4 mx-5 w-full" message={guestLoginError}/>
          )}
          <h2
            className="text-2xl"
            style={{ letterSpacing: "1px" }}
          >
            Log in
          </h2>
          <form onSubmit={handleSubmit} className='space-y-2'>
            <label htmlFor="">Email Address:
              <input
                className="input w-full mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="formControl-sm"
                type="email"
                size="lg"
              />
            </label>
            <label htmlFor="">Password:
              <input
                className="input w-full mb-8"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                id="formControl-lg"
                type="password"
                size="lg"
              />
            </label>

            <button type="submit" className="btn w-full btn-primary mb-4">
              Login
            </button>
            <hr className="hr w-full mb-4" />
            <button
              type="button"
              className="btn w-full btn-primary mb-4"
              onClick={(e) => handleGuestLogin()}
            >
              Continue as Guest
            </button>
          </form>
          {useRecaptcha ? <ReCAPTCHA
            className=""
            ref={captchaRef}
            sitekey="6LeBYhkpAAAAABwRVO5QRASROAi0B80JVSs6LHWf"
            onChange={(e) => updateCaptcha(e)}
          /> : <br />}
          <p className="">
            Don't have an account?{" "}
            <Link to="/signup" className="link-info">
              Register here

            </Link>
          </p>
        </div>
      </div>

      <div className='flex flex-col items-center max-w-1/3'>
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

export default Login;
