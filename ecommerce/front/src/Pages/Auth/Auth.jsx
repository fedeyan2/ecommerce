import React from "react";
import { Link, useLocation } from "react-router-dom";
import RegisterForm from "../../Components/Forms/Auth/RegisterForm";

import styles from "./authStyles.module.css";
import LoginForm from "../../Components/Forms/Auth/LoginForm";

const Auth = () => {
  const pathname = useLocation().pathname;

  return (
    <div className={styles.container}>
      <div className={styles.welcomeContainer}>
        <h2>Bienvenido !</h2>
      </div>
      {pathname?.includes("register") && (
        <div style={{ marginTop: "1em" }}>
          <RegisterForm />
          <span>
            <p style={{ textAlign: "center", marginTop: "1em" }}>
              Ya tenés una cuenta? &nbsp;
              <Link to={"/auth/login"}>Iniciá sesión</Link>
            </p>
          </span>
        </div>
      )}
      {pathname?.includes("login") && (
        <div style={{ marginTop: "1em" }}>
          <LoginForm />
          <span className={styles.ask}>
            <p style={{ textAlign: "center", marginTop: "1em" }}>
              Necesitas una cuenta? &nbsp;
              <Link to={"/auth/register"}>Registrate</Link>
            </p>
          </span>
        </div>
      )}
    </div>
  );
};

export default Auth;
