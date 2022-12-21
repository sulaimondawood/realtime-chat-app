import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth as authConfig } from "../../firebase/config";
interface IProps {
  children: React.ReactNode;
}

export const authProvider = createContext<string | any>("");
const AuthProvider = ({ children }: IProps) => {
  const [authContext, setAuth] = useState({});

  useEffect(() => {
    onAuthStateChanged(authConfig, (user: any) => {
      setAuth(user);
    });
  }, []);

  return (
    <authProvider.Provider value={{ authContext }}>
      {children}
    </authProvider.Provider>
  );
};

export default AuthProvider;
