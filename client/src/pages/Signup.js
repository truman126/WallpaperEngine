import { useState, useRef } from "react";
import { useSignup } from "../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";
import { useGuestLogin } from "../hooks/useGuestLogin";

const Signup = () => {
  //sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, signupError, signupIsLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setCaptchaError("Please complete the captcha");
      return;
    }
    console.log(token)

    await signup(email, password, token);
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
    <div className="signup">
      {captchaError && <div className="error">{captchaError}</div>}
      {signupError && <div className="error">{signupError}</div>}
      {guestLoginError && <div className="error">{guestLoginError}</div>}

      <form onSubmit={handleSubmit}>
        <h3>Sign up</h3>
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

        <button>Sign Up</button>
      </form>

      
       
        <button onClick={(e) => handleGuestLogin()}>Continue as Guest</button>
      
    </div>
  );
};

export default Signup;
