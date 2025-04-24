import { createContext, useCallback, useState } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  switchModeHandler: () => {},
});
export function AuthContextProvider({ children }) {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const login= useCallback(()=>{
    setIsLoginMode(true);
  },[]);
  const logout= useCallback(()=>{
    setIsLoginMode(false)
  },[]);
  const contextValue = {
    isLoggedIn:isLoginMode,
    login:login,
    logout:logout
  };
  return <AuthContext value={contextValue}>{children}</AuthContext>;
}
