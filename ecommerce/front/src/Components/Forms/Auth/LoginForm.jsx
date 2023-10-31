import React, { useState } from "react";

import styles from "./forms.module.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form className={styles.form}>
      <h4 className={styles.formTitle}>Iniciar sesión</h4>

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Ingresá un nombre de usuario"
        className={styles.input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Ingresá tu contraseña"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className={styles.submit} type="submit">
        Registrate
      </button>
    </form>
  );
};

export default LoginForm;
