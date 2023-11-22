import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useGuestLogin } from "../hooks/useGuestLogin"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login, error, isLoading} = useLogin()
  const {guestLogin, error2, isLoading2} = useGuestLogin()

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  console.log("ERR", error)

  return (
    <div className="login">
    {error && <div className="error">{error}</div>}
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
      <button>Log in</button>

    </form>
    <p>Don't want to create an account?</p>
      <button onClick={(e) => guestLogin()}>Continue as Guest</button>
    </div>

  );
};

export default Login;
