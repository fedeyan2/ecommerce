import React from "react";
import { Link } from "react-router-dom";
import styles from "./nav.module.css";
const Nav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__ul}>
        <li className={styles.nav__ul_li}>
          <Link className={styles.nav__link} to={"/auth/login"}>Inicia sesión</Link>
        </li>
        <li className={styles.nav__ul_li}>
          <Link className={styles.nav__link} to={"/auth/register"}>Registrate</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
