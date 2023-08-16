import { createContext } from "react";

import ActionAuth from "./actions/ActionAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    authenticatedUser,
    error,
    message,
    success,
    logout,
    signIn,
    signInFromCache,
  } = ActionAuth();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticatedUser,
        error,
        message,
        success,
        logout,
        signIn,
        signInFromCache,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
