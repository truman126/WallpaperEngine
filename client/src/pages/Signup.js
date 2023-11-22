import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { useGuestLogin } from "../hooks/useGuestLogin"



const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signup, error, isLoading} = useSignup()
  const {guestLogin, error2, isLoading2} = useGuestLogin()


  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <div className="signup">
    <form  onSubmit={handleSubmit}>
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
      <button>Sign Up</button>

      {error && <div className="error">{error}</div>}

    </form>
      
      <p>Don't want to create an account?</p>
      <button onClick={(e) => guestLogin()}>Continue as Guest</button>
      
      </div>
  );
};

export default Signup;
