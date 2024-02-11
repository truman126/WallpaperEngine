import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import ReCAPTCHA from "react-google-recaptcha";
import { useGuestLogin } from "../hooks/useGuestLogin";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import {
  example1,
  example2,
  example3,
  example4,
  example5,
} from "../img/carousel";

const Login = () => {
  // log in
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginError, loginIsLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setCaptchaError("Please complete the captcha");
      return;
    }
    await login(email, password, token);
  };

  // guest log in
  const { guestLogin, guestLoginError, guestIsLoading } = useGuestLogin();
  const handleGuestLogin = async () => {
    if (!token) {
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
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            {captchaError && (
              <div className="error mb-4 mx-5 w-100">{captchaError}</div>
            )}
            {loginError && (
              <div className="error mb-4 mx-5 w-100">{loginError}</div>
            )}
            {guestLoginError && (
              <div className="error mb-4 mx-5 w-100">{guestLoginError}</div>
            )}
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Log in
            </h3>
            <form onSubmit={handleSubmit}>
              <MDBInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                label="Email address"
                id="formControl-sm"
                type="email"
                size="lg"
                contrast
              />
              <MDBInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                wrapperClass="mb-4 mx-5 w-100"
                label="Password"
                id="formControl-lg"
                type="password"
                size="lg"
                contrast
              />

              <MDBBtn type="submit" className="mb-4 px-5 mx-5 w-100" color="info" size="lg">
                Login
              </MDBBtn>
              <hr className="hr mb-4 px-5 mx-5 w-100" />
              <MDBBtn
              type="button"
                className="mb-4 px-5 mx-5 w-100"
                color="info"
                size="lg"
                onClick={(e) => handleGuestLogin()}
              >
                Continue as Guest
              </MDBBtn>
            </form>
            <ReCAPTCHA
              className="mb-4 mx-5 w-100"
              ref={captchaRef}
              sitekey="6LeBYhkpAAAAABwRVO5QRASROAi0B80JVSs6LHWf"
              onChange={(e) => updateCaptcha(e)}
            />
            <p className="ms-5">
              Don't have an account?{" "}
              <a href="/wallpaperengine/signup" class="link-info">
                Register here
              </a>
            </p>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src={example1}
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
          <img
            src={example2}
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
