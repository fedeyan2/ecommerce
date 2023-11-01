import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import styles from "./nav.module.css";
import { AuthContext } from "../../Context/AuthContext";
import { logout } from "../../api/auth";

const Nav = () => {
  const { isLogin, setIsLogin } = useContext(AuthContext);
  async function logoutHandler() {
    const response = await logout();
    const { data, status } = response;

    if (data.bool === false) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    if (data?.message) {
      alert(data?.message);
    }

    if (status === 200) {
      window.location.replace("/");
    }
  }

  return (
    <nav className={styles.nav}>
      <div style={{ color: "white" }}>
        Login Status (debug): {isLogin ? "True" : "false"}{" "}
        <button onClick={(e) => logoutHandler()}>Cerrar sesion</button>
      </div>
      <ul className={styles.nav__ul}>
        <li className={styles.nav__ul_li}>
          <Link className={styles.nav__link} to={"/auth/login"}>
            Inicia sesión
          </Link>
        </li>
        <li className={styles.nav__ul_li}>
          <Link className={styles.nav__link} to={"/auth/register"}>
            Registrate
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
