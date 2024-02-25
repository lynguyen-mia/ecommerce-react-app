import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import { useRef, useState, useEffect } from "react";

const SignupForm = () => {
  const navigate = useNavigate();
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const phoneRef = useRef();
  const [errors, setErrors] = useState([]);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [dots, setDots] = useState("");

  // Redirect to login page after registering
  useEffect(() => {
    if (registerSuccess) {
      setInterval(() => {
        setDots((prevDots) => prevDots + ".");
      }, 700);

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, [registerSuccess, navigate]);

  async function onRegister(e) {
    e.preventDefault();
    const email = emailRef.current.value;
    const name = nameRef.current.value;
    const password = passwordRef.current.value;
    const phone = phoneRef.current.value;

    const res = await fetch(
      "https://ecommerce-node-app-sfau.onrender.com/client/register",
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, phone })
      }
    );

    const data = await res.json();
    if (res.status === 500 || res.status === 401) {
      setErrors(data.errors);
      return;
    }
    setRegisterSuccess(true);
  }

  return (
    <div className={styles["form-backdrop"]}>
      <div
        className={`container d-flex flex-column text-center ${styles["form-container"]}`}
      >
        {!registerSuccess ? (
          // Not register: show sign up form
          <>
            <h1 className="fs-3 fw-light fst-italic text-secondary mb-3">
              Sign Up
            </h1>

            {/* Show errors if any */}
            <ul className="ps-3">
              {errors &&
                errors.map((error, i) => {
                  return (
                    <li className="text-start text-danger fst-italic" key={i}>
                      {error.msg}
                    </li>
                  );
                })}
            </ul>

            <form className="mt-1">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className={
                  errors.map((e) => e.path).includes("name")
                    ? `${styles.invalid}`
                    : "border-light-subtle"
                }
                ref={nameRef}
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className={
                  errors.map((e) => e.path).includes("email")
                    ? `${styles.invalid}`
                    : "border-light-subtle"
                }
                ref={emailRef}
              />
              <input
                type="password"
                name="password"
                placeholder="Password must have at least 8 characters"
                className={
                  errors.map((e) => e.path).includes("password")
                    ? `${styles.invalid}`
                    : "border-light-subtle"
                }
                ref={passwordRef}
              />
              <input
                type="number"
                name="phone"
                placeholder="Phone"
                className={`no-arrow ${
                  errors.map((e) => e.path).includes("phone")
                    ? `${styles.invalid}`
                    : "border-light-subtle"
                }`}
                ref={phoneRef}
              />

              <button
                className="btn btn-dark text-white mt-3 w-100 rounded-1"
                onClick={onRegister}
              >
                SIGN UP
              </button>
            </form>

            <p className="fst-italic text-secondary">
              Login? <Link to="/login">Click here</Link>
            </p>
          </>
        ) : (
          // Registered: show success alert
          <div>
            <p className="text-danger">Registration succeeded!</p>
            <p>Please wait{dots}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupForm;
