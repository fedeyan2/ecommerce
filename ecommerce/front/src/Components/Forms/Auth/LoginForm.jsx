import React, { useState } from "react";

import styles from "./forms.module.css";
import { Navigate } from "react-router-dom";
import { login } from "../../../api/auth";

const LoginForm = () => {
  const errorsModel = {
    username: "",
    password: "",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState(errorsModel);
  const [registerError, setRegisterError] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  async function submitHandler(e) {
    e.preventDefault();
    const submitErrors = { ...errorsModel };
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!passwordRegex.test(password)) {
      submitErrors.password = "Ingresá una contraseña segura";
    }

    if (username.includes("@")) {
      if (!emailRegex.test(username)) {
        submitErrors.username = "El correo debe ser uno válido";
      }
    } else {
      if (!username) {
        submitErrors.username = "El nombre de usuario no debe estar vacio";
      }

      if (typeof username !== "string") {
        setErrors({
          ...errors,
          username: "Ingresa un nombre de usuario válido",
        });
      }
    }

    for (let err in submitErrors) {
      if (submitErrors[err]) {
        setErrors(submitErrors);
        return;
      }
    }

    setErrors(errorsModel);
    setCanSubmit(false);

    const result = await login(username, password);
    if (result.status !== 200) {
      setCanSubmit(true);
      const data = result?.data;
      if (data?.message) {
        setRegisterError(data?.message);
      }
      return;
    }

    return setDone(true);
  }

  return done ? (
    <Navigate to={"/done"} />
  ) : (
    <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
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
      {errors.username && (
        <label className={styles.errorLabel} htmlFor="username">
          {errors.username}
        </label>
      )}

      <input
        type="password"
        name="password"
        id="password"
        placeholder="Ingresá tu contraseña"
        className={styles.input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errors.password && (
        <label className={styles.errorLabel} htmlFor="password">
          {errors.password}
        </label>
      )}
      <button disabled={!canSubmit} className={styles.submit} type="submit">
        Iniciar sesión
      </button>
      {registerError && (
        <label className={styles.errorLabel} htmlFor="password">
          {registerError}
        </label>
      )}
      {errors?.password && (
        <span style={{ marginTop: ".4em" }}>
          <p className={styles.pwdAdv}>
            Recordá que una contraseña segura tiene: <br />
            <strong>
              6 digitos como mínimo, una mayúscula, una minúscula y un número.
            </strong>
          </p>
        </span>
      )}
    </form>
  );
};

export default LoginForm;
