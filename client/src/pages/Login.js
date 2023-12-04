import { useState, useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import ReCAPTCHA from "react-google-recaptcha";
import { useGuestLogin } from "../hooks/useGuestLogin";

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
      const response = await guestLogin(token);
    };
  
    // captcha
    const [token, updateToken] = useState();
    const [captchaError, setCaptchaError] = useState();
    const captchaRef = useRef(null);
    const updateCaptcha = (e) => {
      updateToken(captchaRef.current.getValue());
    };

    console.log("login Error:", loginError)
  return (
    
    <div className="login">
      {captchaError && <div className="error">{captchaError}</div>}
      {loginError && <div className="error">{loginError}</div>}
      {guestLoginError && <div className="error">{guestLoginError}</div>}

      <form className="login" onSubmit={handleSubmit}>
        <h3>Log in</h3>
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <ReCAPTCHA
            ref={captchaRef}
            sitekey="6LeBYhkpAAAAABwRVO5QRASROAi0B80JVSs6LHWf"
            onChange={(e) => updateCaptcha(e)}
          />
        <button>Log in</button>
      </form>

      <button onClick={(e) => handleGuestLogin()}>Continue as Guest</button>
      
    </div>
    
  );
};

export default Login;
