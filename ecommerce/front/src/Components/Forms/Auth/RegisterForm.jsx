import React, { useContext, useState } from "react";

import styles from "./forms.module.css";
import { isAuthenticated, register } from "../../../api/auth";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";

const RegisterForm = () => {
  const { setIsLogin } = useContext(AuthContext);

  const errorsModel = {
    username: "",
    password: "",
    email: "",
    cpassword: "",
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [cpassword, setCPassword] = useState("");

  const [errors, setErrors] = useState(errorsModel);
  const [canSubmit, setCanSubmit] = useState(true);
  const [registerError, setRegisterError] = useState("");
  const [done, setDone] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    const submitErrors = { ...errorsModel };

    if (!emailRegex.test(email)) {
      submitErrors.email = "Ingresá un email válido";
    }

    if (!passwordRegex.test(password)) {
      submitErrors.password = "Ingresá una contraseña segura";
    }

    if (!cpassword) {
      submitErrors.cpassword = "Repetí la contraseña";
    }

    if (cpassword !== password) {
      submitErrors.cpassword = "Las contraseñas no coinciden";
    }
    if (!username) {
      submitErrors.username = "Ingresá un nombre de usuario.";
    }

    for (let err in submitErrors) {
      if (submitErrors[err]) {
        setErrors(submitErrors);
        return;
      }
    }

    setErrors(errorsModel);
    setCanSubmit(false);

    const result = await register(username, password, email);

    if (result.status !== 200) {
      setCanSubmit(true);
      const data = result?.data;
      if (data?.message) {
        setRegisterError(data?.message);
      }

      return;
    }

    const loginData = await isAuthenticated();
    console.log(loginData?.data);
    if (typeof loginData?.data === "boolean") {
      setIsLogin(loginData?.data);
    }

    return setDone(true);
  };

  return done ? (
    <Navigate to={"/done"} />
  ) : (
    <form onSubmit={(e) => submitHandler(e)} className={styles.form}>
      <h4 className={styles.formTitle}>Registro de usuario</h4>
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
          *{errors.username}
        </label>
      )}

      <input
        type="text"
        name="email"
        id="email"
        placeholder="Ingresa tu email"
        className={styles.input}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {errors.email && (
        <label className={styles.errorLabel} htmlFor="email">
          {errors.email}
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
      <input
        type="password"
        name="cpassword"
        id="cpassword"
        placeholder="Repetí tu contraseña"
        className={styles.input}
        value={cpassword}
        onChange={(e) => setCPassword(e.target.value)}
      />

      {errors.cpassword && (
        <label className={styles.errorLabel} htmlFor="cpassword">
          {errors.cpassword}
        </label>
      )}
      <button disabled={!canSubmit} className={styles.submit} type="submit">
        Registrate
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

export default RegisterForm;
