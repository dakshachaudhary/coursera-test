import React, { useState, useEffect } from "react";

import { Navigate, useNavigate } from "react-router";
// toast imports
import { toast } from "react-toastify";

import { useAuth } from "../hooks";
import { TOAST_CONFIG } from "../utils/index";

import styles from "../styles/register.module.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(auth);
  // }, [auth]);

  async function handleFormSubmit(e) {
    e.preventDefault();
    const response = await auth.register(
      firstName,
      lastName,
      email,
      username,
      password,
      contactNumber
    );
    console.log(response);
    if (response.success) {
      toast.success(response.message, TOAST_CONFIG);
      navigate("/login");
    } else {
      toast.error(response.message);
    }
    // setUsername("");
    // setPassword("");
  }
  if (auth.user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.brandLogo}></div>
        <div className={styles.brandTitle}>Register HERE</div>
        <div className={styles.formContainer}>
          <form className={styles.loginForm} onSubmit={handleFormSubmit}>
            <label htmlFor="firstName" className={styles.label}>
              FIRSTNAME
            </label>
            <input
              type="text"
              id="firstName"
              className={styles.input}
              placeholder="firstname"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              required
            />

            <label htmlFor="lastName" className={styles.label}>
              LASTNAME
            </label>
            <input
              type="text"
              id="lastName"
              className={styles.input}
              placeholder="lastname"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />

            <label htmlFor="username" className={styles.label}>
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className={styles.input}
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
            />

            <label htmlFor="email" className={styles.label}>
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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

            <label htmlFor="confirmPassword" className={styles.label}>
              CONFIRM PASSWORD
            </label>
            <input
              id="confirmPassword"
              className={styles.input}
              placeholder="type password again"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />

            <label htmlFor="contactNumber" className={styles.label}>
              CONTACT NUMBER
            </label>
            <input
              type="text"
              id="contactNumber"
              className={styles.input}
              placeholder="contact"
              onChange={(e) => setContactNumber(e.target.value)}
              value={contactNumber}
              required
            />
            <button
              className={styles.button}
              onClick={() => {
                setIsLoggingIn(true);
              }}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
