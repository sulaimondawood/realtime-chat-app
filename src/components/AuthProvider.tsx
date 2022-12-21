import React, { createContext, useContext, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export const authProvider = createContext<string | {}>("");
const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState("");
  return (
    <authProvider.Provider value={{ auth }}>{children}</authProvider.Provider>
  );
};

export default AuthProvider;
