import React, { createContext, useEffect, useState } from "react";
import { isAuthenticated } from "../api/auth";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [checked, setChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(function () {
    async function getLoginStatus() {
      const result = await isAuthenticated();
      setChecked(true);
      if (typeof result?.data === "boolean") {
        setIsLogin(result.data);
      }
    }

    getLoginStatus();
  });

  return (
    <AuthContext.Provider value={{ isLogin, checked, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
