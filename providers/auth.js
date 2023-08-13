"use client";

import { useRouter } from "next/navigation";
import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext();

const useAuthProvider = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthProvider must be used within a AuthProvider");
  return context;
};

const AuthProvider = (props) => {
  const router = useRouter();
  const resetJWT = () => {
    localStorage.setItem("token", "");
    setAuth(false);
    router.push("/");
  };
  const setJWT = (token) => localStorage.setItem("token", token);
  const getJWT = () => localStorage.getItem("token");

  const [auth, setAuth] = useState(false);

  const value = useMemo(
    () => [auth, setAuth, resetJWT, setJWT, getJWT],
    [auth]
  );

  return <AuthContext.Provider value={value} {...props} />;
};

export { useAuthProvider, AuthProvider };
