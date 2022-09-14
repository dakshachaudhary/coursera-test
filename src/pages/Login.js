import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
// toast imports
import { toast } from "react-toastify";

import { useAuth } from "../hooks";
import styles from "../styles/login.module.css";
import { TOAST_CONFIG } from "../utils/index";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await auth.login(username, password);
    if (response.success) {
      toast.success("Login Successful!", TOAST_CONFIG);
      navigate("/");
    } else {
      toast.error(response.message);
    }
    setUsername("");
    setPassword("");
  }
  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.brandLogo}></div>
        <div className={styles.brandTitle}>LOGIN HERE</div>
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
          <label htmlFor="username" className={styles.label}>
            USERNAME
          </label>
          <input
            id="username"
            className={styles.input}
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
          <label htmlFor="password" className={styles.label}>
            PASSWORD
          </label>
          <input
            id="password"
            className={styles.input}
            placeholder="min 8 characters long"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button
            className={styles.button}
            onClick={() => setIsLoggingIn(true)}
          >
            LOGIN
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
