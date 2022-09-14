import { createContext, useEffect } from "react";
import { useProvideAuth } from "../hooks";
const initialState = {
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  useEffect(() => {
    // console.log(auth);
  }, [auth]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
