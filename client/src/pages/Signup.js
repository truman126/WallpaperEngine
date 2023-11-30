import { useState, useRef} from "react";
import { useSignup } from "../hooks/useSignup";
import ReCAPTCHA from "react-google-recaptcha";
import Modal from "react-bootstrap/Modal";
import { useGuestLogin } from "../hooks/useGuestLogin";



const Signup = () => {

  //sign up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup();
  
  const handleSubmit = async (e) => {
    setShowCaptcha(false)
    const token = captchaRef.current.getValue();
    e.preventDefault();
    await signup(email, password);
  };

  // guest log in
  const { guestLogin, error2, isLoading2 } = useGuestLogin();
  const [showCaptcha, setShowCaptcha] = useState(false)

  // captcha
  const handleClose = () => setShowCaptcha(false);
  const handleShow = () => setShowCaptcha(true);
  const captchaRef = useRef(null);

  const updateCaptcha = async(e) => {
    setShowCaptcha(false)
    const token = captchaRef.current.getValue();
    const response = await guestLogin(token)
  }

  
  return (
    <div className="signup">
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
      <button onClick={(e) => handleShow()}>Sign Up</button>

      {error && <div className="error">{error}</div>}

    </form>
    <div>
      <p>Don't want to create an account?</p>
      <button onClick={(e) => handleShow()}>Continue as Guest</button>
      
    </div>
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={showCaptcha} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prove you're a human</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ReCAPTCHA
            ref={captchaRef}
            sitekey="6LeBYhkpAAAAABwRVO5QRASROAi0B80JVSs6LHWf"
            onChange={(e) => updateCaptcha(e)}
          />
        </Modal.Body>

        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
      </div>
  );
};

export default Signup;
