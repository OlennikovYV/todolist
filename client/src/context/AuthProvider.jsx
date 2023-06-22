import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider
      value={{ authenticated, setAuthenticated, auth, setAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
