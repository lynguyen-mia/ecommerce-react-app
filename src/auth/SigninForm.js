import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SignupForm.module.css";

const SigninForm = (props) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState([]);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [dots, setDots] = useState("");

  // Redirect to homepage after logging in
  useEffect(() => {
    if (loginSuccess) {
      setInterval(() => {
        setDots((prevDots) => prevDots + ".");
      }, 700);

      setTimeout(() => {
        const prevPageJSON = localStorage.getItem("prevPage");
        const prevPage = JSON.parse(prevPageJSON);
        if (prevPage) {
          window.location.assign(`/detail/${prevPage}`);
          localStorage.removeItem("prevPage");
          return;
        }
        window.location.assign("/");
      }, 3000);
    }
  }, [loginSuccess]);

  async function onSignin(e) {
    e.preventDefault();
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const res = await fetch(
        "https://ecommerce-node-app-sfau.onrender.com/client/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email, password: password })
        }
      );

      const data = await res.json();
      if (res.status === 500 || res.status === 401) {
        setErrors(data.errors);
        console.log(data.errors);
        return;
      }
      // Store user id in local storage
      localStorage.setItem("user", JSON.stringify(data.userData));
      // // Create expiration time for this user data
      // const expiration = new Date();
      // expiration.setHours(expiration.getHours() + 1); // set expiration to 1 hour later
      // localStorage.setItem("expiration", JSON.stringify(expiration));

      setErrors([]);
      setLoginSuccess(true);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles["form-backdrop"]}>
      {/* prettier-ignore */}
      <div
          className={`container d-flex flex-column text-center mb-5 ${styles["form-container"]}`}
          style={{ width: "450px" }}
        >
          <h1 className="fs-3 fw-light fst-italic text-secondary mb-4">
           {props.isLogin ? 'Logged In' : 'Sign In'}
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
         
          {/* Form content */}
          {loginSuccess ? (
            <div>
            <p className="text-danger">Welcome to Boutique!</p>
            <p>We're redirecting you{dots}</p>
            </div>
          ) : (
            <div>
              <form className="mt-1">
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
  
                <button className="btn btn-dark text-white mt-3 w-100 rounded-1" onClick={onSignin}>
                  SIGN IN
                </button>
              </form>
              <p className="fst-italic text-secondary">
                Create an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          )}
        </div>
    </div>
  );
};

export default SigninForm;
